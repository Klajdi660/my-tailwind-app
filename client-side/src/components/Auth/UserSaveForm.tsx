import { FC } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store";
import { Button } from "../UI";
// import { userIcon } from "../../assets";
import { paths } from "../../data";

export const OneUserSaveForm: FC = () => {
  const { login, register } = paths;

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const { saveAuthUserData } = useAppSelector((state) => state.user);

  console.log("saveAuthUserData :>> ", saveAuthUserData);
  // const labelTitle = `Continue as ${username}`;

  const handleSwitchAccount = () => {
    navigate(login);
  };

  return (
    <div className="flex_justify_center flex-col gap-10 text-onNeutralBg">
      {/* <div className="relative w-40 h-40 rounded-full ring-2 ring-white bg-white">
        {avatar ? (
          <Image
            imgUrl={avatar}
            name="Profile Img"
            styles="w-40 h-40 rounded-full p-1 object-cover"
            effect="blur"
          />
        ) : (
          <Image
            imgUrl={userIcon}
            name="Profile Img"
            styles="w-40 h-40 rounded-full p-1 ring-1 ring-white bg-main"
            effect="blur"
          />
        )}
      </div> */}
      {/* <div className="flex flex-col gap-6">
        <Button variant="contained" label={labelTitle} />
        <Button
          variant="none"
          label="Remove account"
          className="text-primary hover:text-onNeutralBg"
        />
      </div>*/}
      <div className="w-full h-[1px] bg-divider" />
      <div>
        {/* <p className="text-secondary text-center">Not {username}?</p> */}
        <Button
          variant="none"
          className="text-primary hover:text-onNeutralBg"
          label="Switch accounts"
          onClick={handleSwitchAccount}
        />
        or
        <Button
          variant="none"
          className="text-primary hover:text-onNeutralBg"
          label="Sign Up"
          onClick={() => navigate(register)}
        />
      </div>
    </div>
  );
};

export const SomeUserSaveForm: FC = () => {
  return <></>;
};
