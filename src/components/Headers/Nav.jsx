import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  getHeaderData,
  getOurServicesHeading,
} from "../../pages/FrontendServices/Services";
import "./Nav.css";
import logo from "../../assets/logos/corusview-logo.png";
import hamburger from "../../assets/logos/hamburger.png";

function Nav() {
  const [headerData, setHeaderData] = useState({
    header_color1: "#ffff",
    header_color2: "#ffff",
  });
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const data = await getHeaderData();
        setHeaderData(data);
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };

    fetchHeaderData();
  }, []);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getOurServicesHeading();
        setServices(data);
      } catch (error) {
        console.error("Error fetching service headings:", error);
      }
    };

    fetchServices();
  }, []);
  return (
    <>
      <div>
        <div
          className="header-body"
          style={{ backgroundColor: headerData.header_color1 }}
        >
          <div
            className="header-child"
            style={{ backgroundColor: headerData.header_color2 }}
          >
            <a href="/">
              <img className="header-logo" src={logo} alt="corusview IT" />
            </a>

            <div></div>
            <div>
              <Link rel="canonical" to="/contact">
                <button className="work-with-us-btn">
                  Work with us <span>.</span>
                </button>
              </Link>
            </div>

            <div>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img className="hamburger" src={hamburger} alt="hamburger" />
                </button>
                <ul
                  className="dropdown-menu"
                  style={{ backgroundColor: headerData.header_color2 }}
                >
                  <li>
                    <Link rel="canonical" to="/" className="navigations">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link rel="canonical" to="/about" className="navigations">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <div className="service-dropdown">
                      <button>Services</button>
                      <div className="service-dropdown-content">
                        {services.map((service) => (
                          <Link
                            rel="canonical"
                            key={service.id}
                            to={`/our-services/${service.id}`}
                          >
                            {service.heading}
                          </Link>
                        ))}
                      </div>
                    </div>
                    {/* <div className="services-list-mobile">
                      <p className="navigations">Services</p>
                      <div className="services-list-mobile mobile-list">
                        {services.map((service) => (
                          <Link rel="canonical"
                            className="navigations"
                            key={service.id}
                            to={`/our-services/${service.id}`}
                          >
                            {service.heading}
                          </Link>
                        ))}
                      </div>
                    </div> */}
                  </li>
                  <li>
                    <Link rel="canonical" to="/carrer" className="navigations">
                      Career
                    </Link>
                  </li>

                  <li>
                    <Link rel="canonical" to="/contact" className="navigations">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      rel="canonical"
                      to="/our-products"
                      className="navigations"
                    >
                      Products
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Nav;
