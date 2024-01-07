import { FunctionComponent } from "react";
import { AiOutlineHistory, AiOutlineHome } from "react-icons/ai";
import { BiSearch, BiUserCircle } from "react-icons/bi";
import { BsBookmarkHeart } from "react-icons/bs";
import { MdOutlineExplore } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../hooks";
import { navlinks } from "../data";
import { Button } from "antd";

const sidebarLinks = [
  {
    id: 1,
    icon: <AiOutlineHome size={25} />,
    link: "/",
  },
  {
    id: 2,
    icon: <MdOutlineExplore size={25} />,
    link: "/explore",
  },
  {
    id: 3,
    icon: <BiSearch size={25} />,
    link: "/search",
  },
  {
    id: 4,
    icon: <BsBookmarkHeart size={25} />,
    link: "/bookmarked",
  },
  {
    id: 5,
    icon: <AiOutlineHistory size={25} />,
    link: "/history",
  },
  {
    id: 6,
    icon: <BiUserCircle size={25} />,
    link: "/profile",
  }, 
];

const SidebarMini: FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const personalPageHandler = (destinationUrl: string) => {
    if (!isAuthenticated) {
      toast.info("You need to login to use this feature", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    navigate(destinationUrl);
  };

  return (
    <>
      <ToastContainer />

      <div className="shrink-0 max-w-[80px] w-full py-8 flex flex-col items-center justify-between sticky top-0">
        <Link to="/">
          <LazyLoadImage
            alt="Logo"
            src="/logo.png"
            effect="opacity"
            className="w-10 h-10"
          />
        </Link>
        <div className="flex flex-col gap-1">
          {navlinks.map((navlink) => (
            <Button
              // to={sidebarLink.link} 
              key={navlink.id}
              className={`rounded-xl hover:text-primary transition duration-300 hover:bg-[#2C333F] ${
                location.pathname === navlink.link && "text-[#EB6536] bg-[#2C333F]"
              }`}
              icon={navlink.imgUrl}
            //   onClick={() => {
            //     if (["/bookmarked", "/history", "/profile"].includes(sidebarLink.link)) {
            //       personalPageHandler(sidebarLink.link);
            //     } else {
            //       navigate(sidebarLink.link);
            //     }
            //   }}
            />
          ))}
        </div>
        <button onClick={() => personalPageHandler("/profile")}>
          <LazyLoadImage
            src={
              user
                ? (user.image as string)
                : "/defaultAvatar.jpg"
            }
            alt="Avatar"
            effect="opacity"
            className="w-10 h-10 rounded-full"
          />
        </button>
      </div>
    </>
  );
};

export default SidebarMini;
