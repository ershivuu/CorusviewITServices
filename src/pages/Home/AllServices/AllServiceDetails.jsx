import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceById } from "../../FrontendServices/Services";
import Nav from "../../../components/Headers/Nav";
import Footers from "../../../components/Footers/Footers";
import vectorgrp1 from "../../../assets/images/vectorgrp-1.png";
import closebtn from "../../../assets/logos/close.png";
import ServicesCommonData from "./ServicesCommonData";
import "./AllServiceDetails.css";
function AllServiceDetails() {
  const { id } = useParams();

  const [service, setService] = useState(null);

  const [activeTab, setActiveTab] = useState("problems");

  useEffect(() => {
    const fetchService = async () => {
      const data = await getServiceById(id);
      setService(data);
    };

    fetchService();
  }, [id]);

  if (!service) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Nav />
      <div className="page-heading">
        <p>{service.heading}</p>
        <p>{service.content}</p>
      </div>
      <div className="sub-header flex-header">
        <div onClick={() => setActiveTab("problems")}>
          <a>Problems</a>
        </div>
        <div className="dot"></div>
        <div onClick={() => setActiveTab("solutions")}>
          <a>Solutions</a>
        </div>
        <div className="dot"></div>
      </div>
      <div>
        {activeTab === "problems" ? (
          <ProblemsComponent problems={service.problems} />
        ) : (
          <SolutionsComponent solutions={service.solutions} />
        )}
      </div>
      <div className="services">
        <div className="sub-services">
          <p>What You'll Get</p>
          <ul>
            {service.services_wyg.map((item) => (
              <li key={item.wyg_id}>{item.heading}</li>
            ))}
          </ul>
        </div>
        <div className="services-vector">
          <img src={vectorgrp1} alt="" />
        </div>
      </div>
      <ServicesCommonData />
      <Footers />
    </>
  );
}

const ProblemsComponent = ({ problems }) => {
  return (
    <div className="solution-body">
      <div>{/* do not remove this div tag */}</div>
      {problems.map((problem) => (
        <div className="proble-cards" key={problem.problems_id}>
          <div className="cross-btn">
            <img src={closebtn} alt="close button" />
          </div>
          <div className="probs">
            <p>{problem.problems_inner_heading}</p>
            {problem.problems_inner_content
              ? problem.problems_inner_content
                  .split("\n")
                  .map((paragraph, index) => <p key={index}>{paragraph}</p>)
              : null}
          </div>
        </div>
      ))}
    </div>
  );
};

const SolutionsComponent = ({ solutions }) => {
  return (
    <div className="solution-body">
      <div>{/* do not remove this div tag */}</div>
      {solutions.map((solution) => (
        <div className="proble-cards" key={solution.solutions_id}>
          <div className="cross-btn">
            <img src={closebtn} alt="close button" />
          </div>
          <div className="probs">
            <p>{solution.solutions_inner_heading}</p>
            {solution.solutions_inner_content
              ? solution.solutions_inner_content
                  .split("\n")
                  .map((paragraph, index) => <p key={index}>{paragraph}</p>)
              : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllServiceDetails;
