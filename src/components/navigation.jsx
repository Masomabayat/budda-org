import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
export const Navigation = ({ onOpenRegistrationForm }) => {
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (location.pathname !== "/past-activities") {
      setShowNav(true);
      return;
    }
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShowNav(true);
        setLastScrollY(window.scrollY);
        return;
      }
      if (window.scrollY < lastScrollY) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, [location.pathname, lastScrollY]);

  return (
    <nav
      id="menu"
      className={`navbar navbar-default navbar-fixed-top${showNav ? "" : " nav-hidden"}`}
      style={{
        transition: "top 0.3s",
        top: showNav ? 0 : "-80px",
        zIndex: 9999,
        position: "fixed",
        width: "100%"
      }}
    >
      <div className="container">
        {/* <div className="navbar-header"> */}
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <NavLink className="navbar-brand page-scroll" to="/">
            <img
              src="/img/budda-logo.png"
              alt="Budda Logo"
              style={{ width: "auto", height: "inherit" }}
            />
          </NavLink>{" "}
        {/* </div> */}

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#features" className="page-scroll">
                Features
              </a>
            </li>
            <li>
              <a href="#about" className="page-scroll">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll">
                Services
              </a>
            </li>
            {/* <li>
              <a href="#portfolio" className="page-scroll">
                Gallery
              </a>
            </li> */}
            {/* <li>
              <a href="#testimonials" className="page-scroll">
                Testimonials
              </a>
            </li> */}
            <li>
              <a href="#team" className="page-scroll">
                Team
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                Contact
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="page-scroll"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenRegistrationForm();
                }}
              >
                Regestration Form
              </a>
            </li>
            <li>
              <NavLink
                to="/past-activities"
                className={({ isActive }) =>
                  `page-scroll${isActive ? " active" : ""}`
                }
                style={({ isActive }) =>
                  isActive
                    ? {
                        borderBottom: "linear-gradient(to right, #004138 0%, #359E88 100%)",
                        color: "#608dfd",
                        fontWeight: 700,
                        textDecoration: "none"
                      }
                    : {}
                }
              >
                Past Activities
              </NavLink>
            </li>
          </ul>   
        </div>
      </div>
    </nav>
  );
};
