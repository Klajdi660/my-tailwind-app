import moment from "moment";
import { FC, useEffect } from "react";
import { Tooltip, Badge } from "antd";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  useAppSelector,
  clearSavedAuthUser,
  setCurrentAuthUserToken,
  clearUserLastLogin,
} from "../../store";
import { Icon, Image } from "../../components";
import { useAuthService } from "../../services";
import { userIcon, iconName } from "../../assets";
import { paths, thresholdsLastLognBadgeColor, dateFormat } from "../../data";
import { convertTimeAgoName, isTokenExpired, nameTruncate } from "../../utils";

export const UserSaveForm: FC = () => {
  const { LOGIN, HOME } = paths;

  const { loginSavedUser } = useAuthService();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { saveAuthUserData, userLastLogin } = useAppSelector(
    (state) => state.user
  );

  const handleRemoveUser = (id: string) => {
    dispatch(clearSavedAuthUser(id));
    dispatch(clearUserLastLogin(id));
  };

  const getValidUsers = () => {
    return saveAuthUserData.filter((user) => {
      if (isTokenExpired(user.saveAuthUserToken)) {
        dispatch(clearSavedAuthUser(user.id));
        return false;
      }
      return true;
    });
  };

  const getLastLoginText = (userId: string) => {
    const userLogin = userLastLogin.find((login) => login.id === userId);

    if (!userLogin) return "Not available";

    const lastLoginTime = moment(userLogin.lastLogin, dateFormat);
    const timeAgo = lastLoginTime.fromNow(true);

    return convertTimeAgoName(timeAgo);
  };

  const getLastLoginColor = (userId: string) => {
    const userLogin = userLastLogin.find((login) => login.id === userId);

    if (!userLogin) return "gray";

    const lastLoginTime = moment(userLogin.lastLogin, dateFormat);
    const now = moment();
    const durationInMinutes = now.diff(lastLoginTime, "minutes");

    const lastLoginBadgeColor =
      thresholdsLastLognBadgeColor.find(
        (threshold) => durationInMinutes < threshold.limit
      )?.color || "gray";

    return lastLoginBadgeColor;
  };

  const onSubmitLoginSavedUserHandler = async (token: string) => {
    try {
      dispatch(setCurrentAuthUserToken(token));
      await loginSavedUser();
    } catch (error) {
      console.error(`Failed to login! ${error}`);
    }
  };

  useEffect(() => {
    if (saveAuthUserData.length === 0) {
      navigate(LOGIN);
    }
  }, [saveAuthUserData, navigate, LOGIN]);

  const validUsers = getValidUsers();

  return (
    <div className="flex_justify_between flex-col text-onNeutralBg md:py-20 py-40 h-screen">
      <div className="flex_justify_center flex-col gap-4">
        <Link to={HOME}>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Image
              imgUrl={iconName}
              name="App Logo"
              width={150}
              effect="opacity"
            />
          </motion.div>
        </Link>
        <p className="text-4xl">Choose account to continue to GrooveIT</p>
      </div>
      <div className="flex_justify_center gap-6">
        {validUsers.map((saveAuthUser) => {
          const lastLoginUser = getLastLoginText(saveAuthUser.id);
          const badgeColor = getLastLoginColor(saveAuthUser.id);

          return (
            <button
              type="button"
              key={saveAuthUser.id}
              className="relative flex_justify_center flex-col text-onNeutralBg bg-card rounded-xl hover:bg-primary-opacity w-44 h-52 p-2 group"
              onClick={() =>
                onSubmitLoginSavedUserHandler(saveAuthUser.saveAuthUserToken)
              }
            >
              <div className="absolute top-2 left-2 hidden group-hover:flex">
                <Tooltip
                  title="Remove account from this page"
                  placement="topLeft"
                >
                  <div
                    className="flex_justify_center bg-card h-6 w-6 rounded-full cursor-pointer"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleRemoveUser(saveAuthUser.id);
                    }}
                  >
                    <Icon
                      name="MdClear"
                      size={14}
                      className="hover:text-primary"
                    />
                  </div>
                </Tooltip>
              </div>
              <div className="relative flex_justify_center flex-col gap-4">
                <Tooltip
                  arrow={false}
                  placement="bottom"
                  title={saveAuthUser.email}
                >
                  <p>{nameTruncate(saveAuthUser.email)}</p>
                </Tooltip>
                <Badge count={`${lastLoginUser}`} color={badgeColor}>
                  {saveAuthUser.photo ? (
                    <Image
                      imgUrl={saveAuthUser.photo}
                      name="Profile Img"
                      styles="w-20 h-20 rounded-full object-cover"
                      effect="blur"
                    />
                  ) : (
                    <Image
                      imgUrl={userIcon}
                      name="Profile Img"
                      styles="w-20 h-20 rounded-full p-1 ring-1 ring-onNeutralBg bg-main"
                      effect="blur"
                    />
                  )}
                </Badge>
                <p className="h-4">{saveAuthUser.username}</p>
              </div>
            </button>
          );
        })}
        <button
          className="flex_justify_center flex-col text-onNeutralBg bg-card rounded-xl hover:bg-primary-opacity w-44 h-52 p-2"
          onClick={() => navigate(LOGIN)}
        >
          <div className="flex_justify_center flex-col gap-4">
            <p>Switch accounts</p>
            <Icon name="FaCirclePlus" className="w-20 h-20 text-secondary" />
            <p className="h-4"></p>
          </div>
        </button>
      </div>
    </div>
  );
};
