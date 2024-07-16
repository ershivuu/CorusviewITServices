import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar({ isOpen }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleLinkClick = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <div className="front-side-bar">
        <div className="side-bar">
          <div className={`custom-sidebar ${isOpen ? "open" : ""}`}>
            <ul>
              <li>
                <button
                  className="dropdown-btn"
                  onClick={() => handleDropdown("editheader")}
                >
                  Edit Header
                  <span className="custom-dropdown-btn">
                    {activeDropdown === "editheader" ? "-" : "+"}
                  </span>
                </button>
                <div
                  className={`dropdown-container ${
                    activeDropdown === "editheader" ? "active" : ""
                  }`}
                >
                  <Link rel="canonical" to="/admin/editheader" onClick={handleLinkClick}>
                    Edit Header
                  </Link>
                </div>
              </li>

              <button
                className="dropdown-btn"
                onClick={() => handleDropdown("home")}
              >
                Home
                <span className="custom-dropdown-btn">
                  {activeDropdown === "home" ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container ${
                  activeDropdown === "home" ? "active" : ""
                }`}
              >
                <Link rel="canonical" to="/admin/editheading" onClick={handleLinkClick}>
                  Edit Heading
                </Link>
                <Link rel="canonical" to="/admin/editservices" onClick={handleLinkClick}>
                  Edit Services
                </Link>
                <Link rel="canonical" to="/admin/editaboutus" onClick={handleLinkClick}>
                  Edit About Us
                </Link>
                <Link rel="canonical" to="/admin/editslider" onClick={handleLinkClick}>
                  Edit Testimonials
                </Link>
                <Link rel="canonical" to="/admin/editrecentwork" onClick={handleLinkClick}>
                  Edit Recent Work
                </Link>
                <Link rel="canonical" to="/admin/recentworktitle" onClick={handleLinkClick}>
                  Edit Recent Title
                </Link>
              </div>

              <button
                className="dropdown-btn"
                onClick={() => handleDropdown("about")}
              >
                About Us
                <span className="custom-dropdown-btn">
                  {activeDropdown === "about" ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container ${
                  activeDropdown === "about" ? "active" : ""
                }`}
              >
                <Link rel="canonical" to="/admin/editaboutpage" onClick={handleLinkClick}>
                  Edit About Page
                </Link>
                <Link rel="canonical" to="/admin/editaboutvalue" onClick={handleLinkClick}>
                  Edit About Value
                </Link>
              </div>

              <button
                className="dropdown-btn"
                onClick={() => handleDropdown("services")}
              >
                Services
                <span className="custom-dropdown-btn">
                  {activeDropdown === "services" ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container ${
                  activeDropdown === "services" ? "active" : ""
                }`}
              >
                {/* <Link rel="canonical" to="/admin/editservicehead" onClick={handleLinkClick}>
                  Edit Heading
                </Link> */}

                <Link rel="canonical" to="/admin/editserviceproblems" onClick={handleLinkClick}>
                  Edit Problems
                </Link>
                <Link rel="canonical" to="/admin/editservicesolution" onClick={handleLinkClick}>
                  Edit Solution
                </Link>
                <Link rel="canonical" to="/admin/editwhatyouget" onClick={handleLinkClick}>
                  Edit What You'll Get
                </Link>
              </div>

              <button
                className="dropdown-btn"
                onClick={() => handleDropdown("career")}
              >
                Career
                <span className="custom-dropdown-btn">
                  {activeDropdown === "career" ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container ${
                  activeDropdown === "career" ? "active" : ""
                }`}
              >
                <Link rel="canonical" to="/admin/editcarrerhead" onClick={handleLinkClick}>
                  Edit Heading
                </Link>
                <Link rel="canonical" to="/admin/createjobroles" onClick={handleLinkClick}>
                  Create Job Role
                </Link>
                <Link rel="canonical" to="/admin/editcarrerimages" onClick={handleLinkClick}>
                  Edit Gallery
                </Link>
                <Link rel="canonical" to="/admin/editcarrerrys" onClick={handleLinkClick}>
                  Edit Go Ahead
                </Link>
                <Link rel="canonical" to="/admin/editcarrerwys" onClick={handleLinkClick}>
                  Edit Career What you see
                </Link>
                <Link rel="canonical" to="/admin/editjobopening" onClick={handleLinkClick}>
                  Create Job Opening
                </Link>
              </div>

              <button
                className="dropdown-btn"
                onClick={() => handleDropdown("contact")}
              >
                Contact Us
                <span className="custom-dropdown-btn">
                  {activeDropdown === "contact" ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container ${
                  activeDropdown === "contact" ? "active" : ""
                }`}
              >
                <Link rel="canonical" to="/admin/editcontactus" onClick={handleLinkClick}>
                  Edit Contact Us
                </Link>
                <Link rel="canonical" to="/admin/editcontactform" onClick={handleLinkClick}>
                  Contact Entries
                </Link>
              </div>

              <button
                className="dropdown-btn"
                onClick={() => handleDropdown("products")}
              >
                Products
                <span className="custom-dropdown-btn">
                  {activeDropdown === "products" ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container ${
                  activeDropdown === "products" ? "active" : ""
                }`}
              >
                <Link rel="canonical" to="/admin/editproducts" onClick={handleLinkClick}>
                  Add Products
                </Link>
              </div>

              <li>
                <button
                  className="dropdown-btn"
                  onClick={() => handleDropdown("applynow")}
                >
                  Apply Now
                  <span className="custom-dropdown-btn">
                    {activeDropdown === "applynow" ? "-" : "+"}
                  </span>
                </button>
                <div
                  className={`dropdown-container ${
                    activeDropdown === "applynow" ? "active" : ""
                  }`}
                >
                  <Link rel="canonical" to="/admin/applynow" onClick={handleLinkClick}>
                    Apply Now
                  </Link>
                </div>
              </li>
              <li>
                <button
                  className="dropdown-btn"
                  onClick={() => handleDropdown("editfooter")}
                >
                  Edit Footer
                  <span className="custom-dropdown-btn">
                    {activeDropdown === "editfooter" ? "-" : "+"}
                  </span>
                </button>
                <div
                  className={`dropdown-container ${
                    activeDropdown === "editfooter" ? "active" : ""
                  }`}
                >
                  <Link rel="canonical" to="/admin/editfooter" onClick={handleLinkClick}>
                    Edit Footer
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div>{/* <Outlet /> */}</div>
      </div>
    </>
  );
}

export default Sidebar;
