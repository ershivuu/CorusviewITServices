import React, { useState, useEffect } from "react";

import { getProblems } from "../FrontendServices/Services";
import closebtn from "../../assets/logos/close.png";

function Problems() {
  const [problemsData, setProblemsData] = useState([]);
  const [heading, setHeading] = useState("");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const data = await getProblems();
        setProblemsData(data);
        setHeading(data.heading);
      } catch (error) {
        console.error("Error fetching problems data:", error);
      }
    };
    fetchProblems();
  }, []);

  return (
    <>
      <div className="problem-body">
        <div>
          <p>{heading}</p>
        </div>

        {problemsData && problemsData.problems ? (
          problemsData.problems.map((problem) => (
            <div className="proble-cards" key={problem.id}>
              <div className="cross-btn">
                <img src={closebtn} alt="" />
              </div>
              <div className="probs">
                <p>{problem.inner_heading}</p>
                <p>{problem.inner_content}</p>
              </div>
              <div></div>
            </div>
          ))
        ) : (
          <p>Loading...</p> // Render a loading indicator or handle empty state as needed
        )}
      </div>
    </>
  );
}

export default Problems;
