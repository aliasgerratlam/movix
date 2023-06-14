import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation, Link } from "react-router-dom";

import "./Header.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // useEffect(() => {
    //   window.scrollY(0, 0);
    // }, [location])

    const scrollHandler = () => {
      // console.log(window.scrollY)
      if(window.scrollY > 200) {
        window.scrollY > lastScrollY && !mobileMenu ? setShow("hide") : setShow("show");
      } else {
        setShow("top");
      }
      // console.log('lastScrollY', lastScrollY)
      setLastScrollY(window.scrollY);
    }

    useEffect(() => {
      window.addEventListener('scroll', scrollHandler);
      return () => {
        window.removeEventListener('scroll', scrollHandler);
      }
    }, [lastScrollY])

    const openSearch = () => {
      setMobileMenu(false);
      setShowSearch(true);
    }

    const openMobileMenu = () => {
      setMobileMenu(true);
      setShowSearch(false);
    }

    const SearchEventHandler = event => {
      event.preventDefault();
      if(query.length > 0) {
        navigate(`/search/${query}`);
        setShowSearch(false)
      }
    };

    return (
        <header className={`header ${mobileMenu && "mobileView"} ${show}`}>
          <ContentWrapper>
            <div className="logo">
              <Link to={'/'}><img src={logo} alt="" /></Link>
            </div>

            <ul className="menuItems">
              <li className="menuItem" onClick={() => {navigate('/explore/movie'); setMobileMenu(false) }}>Movies</li>
              <li className="menuItem" onClick={() => {navigate('/explore/tv'); setMobileMenu(false) }}>TV Shows</li>
              <li className="menuItem"><HiOutlineSearch onClick={openSearch} /></li>
            </ul>

            <div className="mobileMenuItems">
              <HiOutlineSearch onClick={openSearch} />
              {mobileMenu ? <VscChromeClose onClick={() => setMobileMenu(false)} /> : <SlMenu onClick={openMobileMenu} /> }
            </div>
          </ContentWrapper>

          {showSearch && <div className="searchBar">
            <ContentWrapper>
              <div className="searchInput">
                <form onSubmit={SearchEventHandler}>
                  <input type="text" placeholder='Search for a Movie or TV shows...' onChange={(e) => setQuery(e.target.value)} />
                  <VscChromeClose onClick={() => setShowSearch(false)} />
                </form>
              </div>
            </ContentWrapper>
          </div>}
        </header>
    );
};

export default Header;