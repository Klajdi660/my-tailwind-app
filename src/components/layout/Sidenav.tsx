import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { AiOutlineAppstore, AiOutlineCloudUpload, AiOutlineFolderOpen, AiOutlineSetting  } from "react-icons/ai";
import { LuBadgeHelp } from "react-icons/lu";
import { PiSignIn } from "react-icons/pi";
import { CgLogOut } from "react-icons/cg";

const Sidenav = ({ color }: any) => {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>StudyNotion</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
      <Menu.Item className="menu-item-header" key="1">
          Dashboard Pages
        </Menu.Item>
        <Menu.Item key="2">
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
        <Menu.Item key="3">
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
        <Menu.Item key="4">
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
        <Menu.Item className="menu-item-header" key="5">
          Account Pages
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/profile">
            <span
              className="icon"
              style={{
                background: page === "profile" ? color : "",
              }}
            >
                <AiOutlineSetting size={20} />
            </span>
            <span className="label">Settings</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="7">
          <NavLink to="/sign-in">
            <span className="icon"><CgLogOut size={20}/></span>
            <span className="label">Logout</span>
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
