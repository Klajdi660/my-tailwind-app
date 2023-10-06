import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { AiOutlineAppstore, AiOutlineCloudUpload, AiOutlineFolderOpen  } from "react-icons/ai";
import { LuBadgeHelp } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { PiSignIn } from "react-icons/pi";
import { FaRegAddressCard } from "react-icons/fa";

const Sidenav = ({ color }: any) => {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>Muse Dashboard</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/dashboard">
            <span
              className="icon"
              style={{
                background: page === "dashboard" ? color : "",
              }}
            >
              <AiOutlineAppstore size={20}/>
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/tables">
            <span
              className="icon"
              style={{
                background: page === "tables" ? color : "",
              }}
            >
              <AiOutlineFolderOpen size={20} />
            </span>
            <span className="label">My Courses</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/billing">
            <span
              className="icon"
              style={{
                background: page === "billing" ? color : "",
              }}
            >
              <AiOutlineCloudUpload size={20}/>
            </span>
            <span className="label">Add Course</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="menu-item-header" key="4">
          Account Pages
        </Menu.Item>
        <Menu.Item key="5">
          <NavLink to="/profile">
            <span
              className="icon"
              style={{
                background: page === "profile" ? color : "",
              }}
            >
                <CgProfile size={20} />
            </span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/sign-in">
            <span className="icon"><PiSignIn size={20}/></span>
            <span className="label">Sign In</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="7">
          <NavLink to="/sign-up">
            <span className="icon"><FaRegAddressCard size={20}/></span>
            <span className="label">Sign Up</span>
          </NavLink>
        </Menu.Item>
      </Menu>
      <div className="aside-footer">
        <div
          className="footer-box"
          style={{
            background: color,
          }}
        >
          <span className="icon" style={{ color }}>
            <LuBadgeHelp size={20}/>
          </span>
          <h6>Need Help?</h6>
          <p>Please check our docs</p>
          <Button type="primary" className="ant-btn-sm ant-btn-block" style={{ height: 40 }}>
            DOCUMENTATION
          </Button>
        </div>
      </div>
    </>
  );
}

export default Sidenav;
