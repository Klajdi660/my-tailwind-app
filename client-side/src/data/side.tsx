import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { FaDropbox } from "react-icons/fa";
import { MdFavoriteBorder, MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";


export const sidebarLinks = [
    {
        id: 1,
        name: "Home",
        icon: <IoHomeOutline />,
        link: "/"
    },
    {
        id: 2,
        name: "Browse",
        icon: <MdOutlineExplore />,
        // link: "/explore"
        link: "/"
    },
    {
        id: 3,
        name: "Search",
        icon: <AiOutlineSearch />,
        link: "/search",
    },    
    {
        id: 4,
        name: "Favorite Games",
        icon: <MdFavoriteBorder />,
        link: "/favorite"
    },
    {
        id: 5,
        name: "My Games",
        icon: <FaDropbox />,
        link: "/my-games"
    },
    {
        id: 6,
        name: "History",
        icon: <MdOutlineWatchLater />,
        link: "/history"
    }
];
