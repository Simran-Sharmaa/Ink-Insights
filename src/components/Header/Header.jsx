import React, { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Logo } from "../index";
import LogoutBtn from "./LogoutBtn";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { toggleDarkMode } from "../../store/themeSlice";
function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const isDarkMode = useSelector((state)=>state.theme.isDarkMode)
  
  useEffect(()=>{
    // if (document.documentElement.getAttribute('data-bs-theme') === 'dark') {
    if (!isDarkMode) {
      document.documentElement.setAttribute('data-bs-theme','light')
  }
  else {
      document.documentElement.setAttribute('data-bs-theme','dark')
  }
  },[isDarkMode])
  const navItems = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    {
      name: "Login",
      url: "/login",
      active: !authStatus,
    },
    {
      name: "Register",
      url: "/signup",
      active: !authStatus,
    },
    {
      name: "Your Posts",
      url: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      url: "/add-post",
      active: authStatus,
    },
  ];
  // const [isDarkMode, setDarkMode] = React.useState(false);


  return (
    <Container>
    <nav className={`navbar navbar-expand-lg border-bottom p-0 `}>
      <div className="container-fluid p-0">
        <Link className="navbar-brand" style={{fontWeight:"700"}} to="/">
          {/* <Logo/> */}
          Ink & Insights
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navItems.map((item) =>
              item.active ? (
                <li
                  className={`nav-item`}
                  key={item.name}
                  onClick={() => navigate(item.url)}
                >
                  <Link
                    className={`nav-link  ${
                      location.pathname === item.url && "active"
                    }`}
                    to={item.url}
                  >
                    {item.name}
                  </Link>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="nav-item">
                <LogoutBtn />
              </li>
            )}
            <li className="nav-link">
              <DarkModeSwitch
                // style={{  width:"35px",height:"20px" }}
                checked={isDarkMode}
                onChange={()=>dispatch(toggleDarkMode())}
                size={20}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
     </Container>
  );
}

export default Header;
