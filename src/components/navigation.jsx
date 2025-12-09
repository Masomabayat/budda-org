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

  // Handle menu open/close for overlay
  useEffect(() => {
    const checkMenuState = () => {
      const menuCollapse = document.getElementById('bs-example-navbar-collapse-1');
      if (menuCollapse) {
        const isOpen = menuCollapse.classList.contains('in');
        if (isOpen) {
          document.body.classList.add('menu-open');
        } else {
          document.body.classList.remove('menu-open');
        }
      }
    };

    // Use MutationObserver to watch for class changes
    const menuCollapse = document.getElementById('bs-example-navbar-collapse-1');
    if (menuCollapse) {
      const observer = new MutationObserver(checkMenuState);
      observer.observe(menuCollapse, {
        attributes: true,
        attributeFilter: ['class']
      });

      // Close menu when clicking overlay
      const handleOverlayClick = (e) => {
        if (document.body.classList.contains('menu-open')) {
          // Check if click is on the overlay (body's ::after pseudo-element area)
          const menuButton = document.querySelector('.navbar-toggle');
          if (menuButton && !menuButton.classList.contains('collapsed')) {
            menuButton.click();
          }
        }
      };

      // Use setTimeout to ensure overlay is rendered
      setTimeout(() => {
        document.addEventListener('click', handleOverlayClick, true);
      }, 100);

      return () => {
        observer.disconnect();
        document.removeEventListener('click', handleOverlayClick, true);
        document.body.classList.remove('menu-open');
      };
    }
  }, []);

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
        <div className="navbar-header">
          <NavLink className="navbar-brand page-scroll" to="/">
            <img
              src="/img/budda-logo.png"
              alt="Budda Logo"
            />
          </NavLink>
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
          onClick={(e) => {
            // Close menu when clicking on a link (mobile only)
            if (window.innerWidth <= 767) {
              const target = e.target.closest('a');
              if (target) {
                const menuButton = document.querySelector('.navbar-toggle');
                if (menuButton && !menuButton.classList.contains('collapsed')) {
                  setTimeout(() => {
                    menuButton.click();
                  }, 100);
                }
              }
            }
          }}
        >
          <ul className="nav navbar-nav navbar-right">
            {/* Primary menu items - shown first in mobile */}
            <li className="menu-primary">
              <NavLink
                to="/registration"
                className={({ isActive }) =>
                  `page-scroll${isActive ? " active" : ""}`
                }
              >
                Registration Form
              </NavLink>
            </li>
            <li className="menu-primary">
              <NavLink
                to="/past-activities"
                className={({ isActive }) =>
                  `page-scroll${isActive ? " active" : ""}`
                }
              >
                Past Activities
              </NavLink>
            </li>
            <li className="menu-primary">
              <NavLink
                to="/story"
                className={({ isActive }) =>
                  `page-scroll${isActive ? " active" : ""}`
                }
              >
                Story
              </NavLink>
            </li>
            {/* Secondary menu items - shown after primary items */}
            {location.pathname !== "/registration" && location.pathname !== "/past-activities" && location.pathname !== "/story" && (
              <>
                <li className="menu-secondary">
                  <a href="#features" className="page-scroll">
                    Features
                  </a>
                </li>
                <li className="menu-secondary">
                  <a href="#about" className="page-scroll">
                    About
                  </a>
                </li>
                <li className="menu-secondary">
                  <a href="#services" className="page-scroll">
                    Services
                  </a>
                </li>
                {/* <li className="menu-secondary">
                  <a href="#portfolio" className="page-scroll">
                    Gallery
                  </a>
                </li> */}
                {/* <li className="menu-secondary">
                  <a href="#testimonials" className="page-scroll">
                    Testimonials
                  </a>
                </li> */}
                <li className="menu-secondary">
                  <a href="#team" className="page-scroll">
                    Team
                  </a>
                </li>
                <li className="menu-secondary">
                  <a href="#contact" className="page-scroll">
                    Contact
                  </a>
                </li>
              </>
            )}
          </ul>   
        </div>
      </div>
    </nav>
  );
};
