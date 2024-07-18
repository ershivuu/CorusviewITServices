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
import cviewsurvey from "../../assets/logos/clients/cviewsurvey.png";
import medicaps from "../../assets/logos/clients/medicaps.png";
import goldenBansi from "../../assets/logos/clients/GoldenBansi.png";
import iposup from "../../assets/logos/clients/iposup.png";
import wemalife from "../../assets/logos/clients/wemalife.png";

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
        <div>
          <a href="https://cviewsurvey.com/home" target="_blank">
            <img src={cviewsurvey} alt="cviewsurvey" />
          </a>
        </div>
        <div>
          <a href="https://www.medicaps.ac.in/" target="_blank">
            <img src={medicaps} alt="medicaps" />
          </a>
        </div>
        <div>
          <a href="https://iposup.com/" target="_blank">
            <img src={iposup} alt="iposup" />
          </a>
        </div>
        <div>
          <a href="https://www.goldenbansi.com/" target="_blank">
            <img src={goldenBansi} alt="goldenbansi" />
          </a>
        </div>

        <div>
          <a href="https://www.wemacare.com/" target="_blank">
            <img src={wemalife} alt="wemacare" />
          </a>
        </div>
      </div>
      <div>
        <OurServices></OurServices>
      </div>

      <div className="about-company">
        <div className="vector-grp">
          <img src={vector1} alt="vector1" />
          <img src={vector2} alt="vector2" />
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
