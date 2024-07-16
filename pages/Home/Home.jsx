import React, { useEffect, useState } from "react";
import { getHomeHeading } from "../FrontendServices/Services";
import "./Home.css";
import Customer from "./Customers/Customer";
import vector1 from "../../assets/images/vector.png";
import vector2 from "../../assets/images/vector2.png";
import OurServices from "./OurServices/OurServices";
import Nav from "../../components/Headers/Nav";
import Footers from "../../components/Footers/Footers";
import uipos from "../../assets/images/projects/uipos.png";
import cview from "../../assets/images/projects/cview.png";
import RecentWork from "./RecentWork";
import clientA from "../../assets/logos/clients/client.png";

function Home() {
  const [mainTableData, setMainTableData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHomeHeading();
      setMainTableData(data);
    };

    fetchData();
  }, []);

  if (!mainTableData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Nav></Nav>
      <div className="home-heading">
        <p>
          <span>{mainTableData.heading_1}</span> {mainTableData.heading_2}
        </p>
      </div>
      <div className="our-client-logo">
        {/* <div>
          <img src={clientA} alt="" />
        </div> */}
      </div>
      <div>
        <OurServices></OurServices>
      </div>

      <div className="about-company">
        <div className="vector-grp">
          <img src={vector1} alt="" />
          <img src={vector2} alt="" />
        </div>

        <div className="abt-com-flex">
          <div>
            <p>About Us</p>
          </div>

          <div>
            <p>{mainTableData.about_us}</p>
          </div>
        </div>
      </div>
      <div>
        <Customer></Customer>
      </div>

      <div className="recent-works">
        <div className="recent-works-heading">
          <p>Recent work</p>
          <p>{mainTableData.recent_work_heading}</p>
        </div>
        <div style={{ paddingBlock: "20px" }}>
          <RecentWork></RecentWork>
        </div>
      </div>
      <Footers></Footers>
    </>
  );
}

export default Home;
