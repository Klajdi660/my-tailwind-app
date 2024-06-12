import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { iconName } from "../../assets";
import { Image, Button, HomeFooter } from "../../components";
import { HomePageProps } from "../../types";

export const HomePage: FunctionComponent<HomePageProps> = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex h-navbar items-center justify-center bg-neutralBgOpacity backdrop-blur-[50px]">
        <div className="flex w-11/12 max-w-full items-center justify-between my-4">
          <Link to="/">
            <Image imgUrl={iconName} name="App Logo" width={100} />
          </Link>
          <div className="hover:brightness-110">
            <Button
              variant="contained"
              label="Login"
              onClick={() => navigate("/login")}
            />
          </div>
        </div>
      </div>
      <div></div>
      <HomeFooter />
    </>
  );
};

export default HomePage;
