import React, { useEffect, useRef, useState } from "react";
import { getCustomers } from "../../FrontendServices/Services";
import "./Customer.css";
import sliderelement from "../../../assets/images/slider-element.png";

function Customer() {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const getTestimonial = async () => {
      try {
        const data = await getCustomers();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    getTestimonial();
  }, []);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className="our-customers">
        <div className="custom-heading custom-heading-mobile">
          <p>
            What our <br /> Customers <br /> are Saying
          </p>
        </div>

        <div className="custom-crousol">
          <div className="slider-vector">
            <img src={sliderelement} alt="our customer" />
          </div>
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`carousel-item ${
                    index === activeIndex ? "active" : ""
                  }`}
                >
                  <div>
                    <p>{testimonial.description}</p>
                    <div className="about-client">
                      <div className="our-client-img">
                        <img
                          src={testimonial.img}
                          alt={testimonial.img_originalname}
                          loading="lazy"
                        />
                      </div>

                      <div className="client-details">
                        <p>{testimonial.name}</p>
                        <p>{testimonial.designation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              onClick={handlePrev}
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              onClick={handleNext}
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="custom-heading">
          <p>
            What our <br /> Customers <br /> are Saying
          </p>
        </div>
      </div>
    </>
  );
}

export default Customer;
