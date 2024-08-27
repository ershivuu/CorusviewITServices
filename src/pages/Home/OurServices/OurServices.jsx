import React, { useEffect, useState } from "react";

import { getHomeServices } from "../../FrontendServices/Services";
import "./OurServices.css";
import { Link } from "react-router-dom";

function OurServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHomeServices();
      setServices(data);
    };

    fetchData();
  }, []);

  const handleReadMoreClick = (service) => {
    console.log(service.id, "?????");
  };
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };
  return (
    <div className="container">
      <div>
        <p className="services-heading">Our Services</p>
      </div>
      <div>
        <div className="accordion accordion-flush" id="accordionFlushExample">
          {services.map((service) => (
            <div className="accordion-item" key={service.id}>
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapse-${service.id}`}
                  aria-expanded="false"
                  aria-controls={`flush-collapse-${service.id}`}
                >
                  <img
                    src={service.icon_img}
                    alt={service.icon_img_originalname}
                    loading="lazy"
                  />
                  <p>
                    <span>{service.heading}</span>
                  </p>
                </button>
              </h2>
              <div
                id={`flush-collapse-${service.id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`flush-heading-${service.id}`}
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <p>{truncateText(service.content, 20)}</p>
                  <button onClick={() => handleReadMoreClick(service)}>
                    <Link rel="canonical" to={`/our-services/${service.id}`} target="_top">
                      Read More...
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurServices;
