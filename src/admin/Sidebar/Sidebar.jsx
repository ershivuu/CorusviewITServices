import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function Sidebar({ isOpen }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [footerDropdownOpen, setFooterDropdownOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
  const [nriDropdownOpen, setNriDropdownOpen] = useState(false);
  const [galleryDropdownOpen, setGalleryDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleHomeDropdown = () => {
    setHomeDropdownOpen(!homeDropdownOpen);
  };

  const handleAboutDropdown = () => {
    setAboutDropdownOpen(!aboutDropdownOpen);
  };
  const handleFooterDropdown = () => {
    setFooterDropdownOpen(!footerDropdownOpen);
  };

  const handleNriDropdown = () => {
    // Function to toggle NRI Corner dropdown
    setNriDropdownOpen(!nriDropdownOpen);
  };
  const handleGalleryDropdown = () => {
    setGalleryDropdownOpen(!galleryDropdownOpen);
  };
  const handleContactDropdown = () => {
    setContactDropdownOpen(!contactDropdownOpen);
  };

  const handleLinkClick = () => {
    setDropdownOpen(false);
    setHomeDropdownOpen(false);
    setAboutDropdownOpen(false);
    setNriDropdownOpen(false);
    setAboutDropdownOpen(false);
    setFooterDropdownOpen(false);
    setGalleryDropdownOpen(false);
    setContactDropdownOpen(false);
  };

  return (
    <>
      <div className="front-side-bar">
        <div className="side-bar">
          <div className={`custom-sidebar ${isOpen ? "open" : ""}`}>
            <ul>
              <button className="dropdown-btn" onClick={handleHomeDropdown}>
                Home
                <span className="custom-btn">
                  {homeDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container  ${
                  homeDropdownOpen ? "active" : ""
                }`}
              >
                <Link to="/admin/editheading" onClick={handleLinkClick}>
                  <a>Edit Heading</a>
                </Link>
                <Link to="/admin/editservices" onClick={handleLinkClick}>
                  <a>Edit Services</a>
                </Link>
                <Link to="/admin/editaboutus" onClick={handleLinkClick}>
                  <a>Edit About Us </a>
                </Link>
                <Link to="/admin/editslider" onClick={handleLinkClick}>
                  <a>Edit Slider</a>
                </Link>
                <Link to="/admin/editrecentwork" onClick={handleLinkClick}>
                  <a>Edit Recent Work</a>
                </Link>
              </div>
              <button className="dropdown-btn" onClick={handleAboutDropdown}>
                About Us
                <span className="custom-btn">
                  {aboutDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container  ${
                  aboutDropdownOpen ? "active" : ""
                }`}
                style={{ display: aboutDropdownOpen ? "block" : "none" }}
              >
                <Link to="/admin/editaboutpage" onClick={handleLinkClick}>
                  <a>Edit About  Page</a>
                </Link>
                <Link to="/admin/editaboutvalue" onClick={handleLinkClick}>
                  <a>Edit About Value</a>
                </Link>
              
              </div>
              <button className="dropdown-btn" onClick={handleGalleryDropdown}>
               Services
                <span className="custom-btn">
                  {galleryDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container ${
                  galleryDropdownOpen ? "active" : ""
                }`}
                style={{ display: galleryDropdownOpen ? "block" : "none" }}
              >
                <Link to="/admin/editservicehead" onClick={handleLinkClick}>
                  Edit Services Head
                </Link>
                <Link to="/admin/editproblemhead" onClick={handleLinkClick}>
                  Edit Problem Head
                </Link>
                <Link to="/admin/editserviceproblems" onClick={handleLinkClick}>
                Edit Services Problems
                </Link>
                <Link to="/admin/editsolutionhead" onClick={handleLinkClick}>
                Edit Solution Head
                </Link>
                <Link to="/admin/editservicesolution" onClick={handleLinkClick}>
                Edit Services Solution
                </Link>
                <Link to="/admin/editwhatyouget" onClick={handleLinkClick}>
                Edit What You'll Get
                </Link>
              
              </div>

              <button className="dropdown-btn" onClick={handleNriDropdown}>
               Carrer
                <span className="custom-btn">
                  {nriDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container  ${
                  nriDropdownOpen ? "active" : ""
                }`}
                style={{ display: nriDropdownOpen ? "block" : "none" }}
              >
                <Link to="/admin/editcarrerhead" onClick={handleLinkClick}>
                  <a>Edit Carrer Head</a>
                </Link>
                <Link to="/admin/editcarrerimages" onClick={handleLinkClick}>
                  <a>Edit Carrer Images</a>
                </Link>
              </div>

              {/* --------------------------------------------------------------------------- */}
              <button className="dropdown-btn" onClick={handleContactDropdown}>
                Contact us
                <span className="custom-btn">
                  {contactDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container  ${
                  contactDropdownOpen ? "active" : ""
                }`}
                style={{ display: contactDropdownOpen ? "block" : "none" }}
              >
                <Link
                  className="dropdown-btn"
                  to="/admin/editcontactus"
                  onClick={handleLinkClick}
                >
                  <a>Edit Contact us</a>
                </Link>
                <Link to="/admin/editcontactform" onClick={handleLinkClick}>
                  <a>Edit Contact Form </a>
                </Link>
              </div>
              {/* <button className="dropdown-btn" onClick={handleDropdown}>
                Upcoming Projects
                <span className="custom-btn">{dropdownOpen ? "-" : "+"}</span>
              </button>
              <div
                className={`dropdown-container  ${
                  dropdownOpen ? "active" : ""
                }`}
                style={{ display: dropdownOpen ? "block" : "none" }}
              >
                <Link to="/adminpanel/pageheading" onClick={handleLinkClick}>
                  <a href="#">Edit Heading</a>
                </Link>
                <Link to="/adminpanel/bannerimages" onClick={handleLinkClick}>
                  <a href="#">Edit Banner</a>
                </Link>
                <Link to="/adminpanel/slidercontent" onClick={handleLinkClick}>
                  <a href="#">Create Project</a>
                </Link>
                <Link to="/adminpanel/projectslider" onClick={handleLinkClick}>
                  <a href="#">Project Images</a>
                </Link>
              </div> */}
              {/* <button className="dropdown-btn" onClick={handleFooterDropdown}>
                Footer
                <span className="custom-btn">
                  {footerDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container  ${
                  footerDropdownOpen ? "active" : ""
                }`}
                style={{ display: footerDropdownOpen ? "block" : "none" }}
              >
                <Link to="/adminpanel/footerdata" onClick={handleLinkClick}>
                  <a>Footer Data</a>
                </Link>
                <Link to="/adminpanel/editfooter" onClick={handleLinkClick}>
                  <a>Edit Footer</a>
                </Link>
              </div> */}
            </ul>
          </div>
        </div>
        <div>{/* <Outlet /> */}</div>
      </div>
    </>
  );
}

export default Sidebar;
