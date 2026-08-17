import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const submitSearch = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery.length > 0) {
      navigate(`/search/${trimmedQuery}`);
      setShowSearch(false);
      setQuery("");
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <button className="logo" type="button" onClick={() => navigate("/")}>
          <span className="mark">play</span>
          <span className="wordmark">movieflix</span>
        </button>
        <ul className="menuItems">
          <li>
            <button
              className="menuItem"
              type="button"
              onClick={() => navigationHandler("movie")}
            >
              Movies
            </button>
          </li>
          <li>
            <button
              className="menuItem"
              type="button"
              onClick={() => navigationHandler("tv")}
            >
              TV Shows
            </button>
          </li>
          <li>
            <button
              className="menuItem iconButton"
              type="button"
              aria-label="Open search"
              onClick={openSearch}
            >
              <HiOutlineSearch />
            </button>
          </li>
        </ul>

        <div className="mobileMenuItems">
          <button type="button" aria-label="Open search" onClick={openSearch}>
            <HiOutlineSearch />
          </button>
          {mobileMenu ? (
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setMobileMenu(false)}
            >
              <VscChromeClose />
            </button>
          ) : (
            <button
              type="button"
              aria-label="Open navigation menu"
              onClick={openMobileMenu}
            >
              <SlMenu />
            </button>
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <form className="searchInput" onSubmit={submitSearch}>
              <input
                type="text"
                placeholder="Search movies, shows, artists"
                aria-label="Search movies, shows, artists"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setShowSearch(false)}
              >
                <VscChromeClose />
              </button>
            </form>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
