import React from "react";
import devprocess from "../../../assets/images/dev-process.png";
import framework from "../../../assets/images/framework.png";
import language from "../../../assets/images/language.png";
import cloud from "../../../assets/images/cloud.png";
import dbms from "../../../assets/images/dbms.png";
import web from "../../../assets/images/web.png";
import mobile from "../../../assets/images/mobile.png";
import UIUX from "../../../assets/images/UIUX.png";
import DigitalMarketing from "../../../assets/images/digitalmarketing.png";
function ServicesCommonData() {
  return (
    <>
      <div className="dev-process">
        <p>Our Process</p>
        <div>
          <img src={devprocess} loading="lazy" />
        </div>
      </div>
      <div className="tools">
        <div className="tool-page-heading">
          <p>Tools & Technologies we use</p>
        </div>
        <div className="tools-sub-container">
          <div className="tool-mobile-view">
            <div className="mobile-box-1">
              <p>FRAMEWORKS</p>
              <p>EJB</p>
              <p>Reactive (Akka,RxJava, Reactor)</p>
              <p>LDAP / Active Directory</p>
              <p>Hibernate</p>
              <p>Groovy</p>
              <p>Apache Camel</p>
              <p>Nodejs</p>
              <p>JDBC / JPA</p>
              <p>JMS</p>
              <p>Firebase</p>
            </div>
            <div className="mobile-box-1">
              <p>LANGUAGES</p>
              <p>Kotlin</p>
              <p>Rust</p>
              <p>Scala</p>
              <p>PHP</p>
              <p>Objective C</p>
              <p>C#</p>
              <p>Java</p>
              <p>Groovy</p>
            </div>
            <div className="mobile-box-1">
              <p>CLOUD</p>
              <p>Google Cloud</p>
              <p>GroovMicrosoft Azurey</p>
              <p>Oracle Cloud</p>
              <p>IBM Cloud</p>
              <p>Amazon Web Services (AWS)</p>
            </div>
            <div className="mobile-box-1">
              <p>DATABASE MANAGEMENT</p>
              <p>MySQL</p>
              <p>NoSQL</p>
              <p>Oracle SQL</p>
              <p>Microsoft SQL</p>
              <p>PostgreSQL</p>
            </div>
            <div className="mobile-box-1">
              <p>WEB</p>
              <p>Angular</p>
              <p>WebGL</p>
              <p>Coffee</p>
              <p>Sass</p>
              <p>Vue</p>
            </div>
            <div className="mobile-box-1">
              <p>MOBILE</p>
              <p>iOS</p>
              <p>Android</p>
              <p>React</p>
              <p>HTML5</p>
              <p>JavaScript</p>
              <p>Xamarin</p>
            </div>
            <div className="mobile-box-1">
              <p>UI/UX</p>
              <p>Figma</p>
              <p>Framer</p>
              <p>Adobe XD</p>
              <p>Principle</p>
              <p>Wireframe</p>
              <p>InVision</p>
              <p>Animation</p>
              <p>UX Law's</p>
            </div>
            <div className="mobile-box-1">
              <p>DIGITAL MARKETING</p>
              <p>Ahrefs</p>
              <p>Google Analytics</p>
              <p>SEMrush</p>
              <p>Buffer</p>
              <p>HubSpot</p>
              <p>Sprout Social</p>
            </div>
          </div>

          <div className="tool-pc-view">
            <div className="pc-view-box-1">
              <img src={framework} alt="frameworks" loading="lazy" />
            </div>
            <div className="pc-view-box-1 pc-view-flex-box">
              <div className="pc-view-box-1">
                <img src={language} alt="programming language" loading="lazy" />
              </div>
              <div className="pc-view-box-1">
                <img src={cloud} alt="cloud services" loading="lazy" />
              </div>
            </div>
            <div className="pc-view-box-1">
              <div className="pc-view-box-1">
                <img src={dbms} alt="dbms" loading="lazy" />
              </div>
            </div>
            <div className="pc-view-box-1 pc-view-flex-box">
              <div className="pc-view-box-1">
                <img src={web} alt="Web Developement" loading="lazy" />
              </div>
              <div className="pc-view-box-1">
                <img src={mobile} alt="Mobile Developement" loading="lazy" />
              </div>
            </div>
            <div className="pc-view-box-1 pc-view-flex-box">
              <div className="pc-view-box-1">
                <img src={UIUX} alt="UIUX Design" loading="lazy" />
              </div>
              <div className="pc-view-box-1">
                <img
                  src={DigitalMarketing}
                  alt="DigitalMarketing"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServicesCommonData;
