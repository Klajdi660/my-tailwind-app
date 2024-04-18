import { Request, Response } from "express";
import crypto from "crypto";
import { redisCLI } from "../clients";
import { User } from "../models";
import { sendEmail, uploadImgToCloudinary } from "../utils";
import {
  getUserById,
  deleteUser,
  getAndUpdateUser,
  //   getContactByEmail,
  //   createContact,
} from "../services/user.service";

export const getAllUsersHandler = async (req: Request, res: Response) => {
  const { page, limit } = req.query;

  const parsedPage = Number(page) || 1;
  const parsedLimit = Number(limit) || 10;

  const offset = (parsedPage - 1) * parsedLimit;

  const { rows: users, count: totalUsers } = await User.findAndCountAll({
    limit: parsedLimit,
    offset,
    order: [["id", "ASC"]], // sorted by id (1, 2, ...)
  });

  const totalPages = Math.ceil(totalUsers / parsedLimit);

  res.json({
    error: false,
    data: {
      users,
      totalPages,
      currentPage: parsedPage,
      totalUsers,
    },
  });
};

export const getUserByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await getUserById(+id);
  if (!user) {
    return res.json({
      error: true,
      message: "User does not exist in our database!",
    });
  }

  res.json({ error: false, data: user });
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedUser = await deleteUser(+id);
  if (!deletedUser) {
    return res.json({ error: true, message: "Unable to delete user!" });
  }

  res.json({ error: false, message: "User deleted successfully" });
};

export const updateUserProfileHandler = async (req: Request, res: Response) => {
  // const { id } = req.params;
  const updates = req.body;
  const { user } = res.locals;

  // const user = await getUserById(+id);
  // if (!user) {
  //     return res.json({ error: true, message: "User not found!" });
  // };

  const { extra, ...userUpdates } = updates;

  Object.assign(user, userUpdates);

  // const extraData = { ...JSON.parse(user.extra || '{}'), ...extra };
  const extraData = Object.assign({}, JSON.parse(user.extra || "{}"), extra);

  const updatedProfileUser = await getAndUpdateUser(user.id, {
    ...user,
    extra: JSON.stringify(extraData),
  });
  if (!updatedProfileUser) {
    return res.json({
      error: true,
      message: "Profile not updated. Please try again later.",
    });
  }

  const updatedUser = await getUserById(user.id);

  res.json({
    error: false,
    message: "Profile updated successfully!",
    data: updatedUser,
  });
};

export const changeUserPasswordHandler = async (
  req: Request,
  res: Response
) => {
  const { newPassword } = req.body;
  const { user } = res.locals;
  const { username, email, firstName, lastName } = user;

  const hash = crypto
    .createHash("sha1")
    .update(newPassword + username)
    .digest("hex");

  const updatedUserPassword = await getAndUpdateUser(user.id, {
    password: hash,
  });

  if (!updatedUserPassword) {
    return res.json({
      error: true,
      message: "Error occurred while updating password",
    });
  }

  let templatePath = "UpdatePassword";
  const templateData = {
    title: "Password Updated",
    name: `${firstName} ${lastName}`,
    email,
  };

  const mailSent = await sendEmail(templatePath, templateData);
  if (!mailSent) {
    return res.json({
      error: true,
      message: "Somenthing went wrong. Email not sent.",
    });
  }

  res.json({ error: false, message: "Password updated successfully" });
};

export const updatedUserPhotoHandler = async (req: Request, res: Response) => {
  const { user } = res.locals;
  const { displayImg } = req.files as any;
  const image = (await uploadImgToCloudinary(
    displayImg,
    "grooveit",
    1000,
    1000
  )) as any;
  // const updatedProfileImg = await getAndUpdateUser(user.id, { extra: image.source_url });
};

export const contactUsHandler = async (req: Request, res: Response) => {
  const { email, name, phoneNr, subject, message } = req.body;

  // const existingContact = await getContactByEmail(email);
  const existingContact = await redisCLI.get(`contact_us_${email}`);
  if (existingContact) {
    return res.json({
      error: true,
      message: "A request already existed for same email address",
    });
  }
  const user_contact = {
    email,
    name,
    phoneNr,
    subject,
    message,
  };

  // const contactDoc = await createContact(req.body);
  const contactDoc = await redisCLI.setnx(
    `contact_us_${email}`,
    JSON.stringify(user_contact)
  );

  if (!contactDoc) {
    return res.json({
      error: true,
      message: "Your request could not be processed. Please try again.",
    });
  }

  await redisCLI.expire(`contact_us_${email}`, 3600);

  res.json({
    error: false,
    message: `We receved your message, we will reach you on email address ${email} or in phone`,
    data: {
      contact: req.body,
    },
  });
};
