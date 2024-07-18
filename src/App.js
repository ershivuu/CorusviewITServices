import React, { lazy, Suspense } from "react";
import { BrowserRouter as Main, Route, Routes } from "react-router-dom";

// Lazy-loaded components
const AdminPanel = lazy(() => import("./admin/AdminPanel/AdminPanel"));
const EditServices = lazy(() =>
  import("./admin/AdminPages/EditHome/EditServices")
);
const EditSlider = lazy(() => import("./admin/AdminPages/EditHome/EditSlider"));
const EditRecentWork = lazy(() =>
  import("./admin/AdminPages/EditHome/EditRecentWork")
);
const EditAboutUs = lazy(() =>
  import("./admin/AdminPages/EditHome/EditAboutUs")
);
const EditHeading = lazy(() =>
  import("./admin/AdminPages/EditHome/EditHeading")
);
const EditAboutPage = lazy(() =>
  import("./admin/AdminPages/EditAbout/EditAboutPage")
);
const EditAboutValue = lazy(() =>
  import("./admin/AdminPages/EditAbout/EditAboutValue")
);
const EditServicesHead = lazy(() =>
  import("./admin/AdminPages/EditServices/EditServicesHead")
);
const EditServiceProblem = lazy(() =>
  import("./admin/AdminPages/EditServices/EditServiceProblem")
);
const EditServiceSolution = lazy(() =>
  import("./admin/AdminPages/EditServices/EditServiceSolution")
);
const EditWhatYouGet = lazy(() =>
  import("./admin/AdminPages/EditServices/EditWhatYouGet")
);
const EditContactUs = lazy(() =>
  import("./admin/AdminPages/EditContact/EditContactUs")
);
const EditContactForm = lazy(() =>
  import("./admin/AdminPages/EditContact/EditContactForm")
);
const EditCarrerHead = lazy(() =>
  import("./admin/AdminPages/EditCarrer/EditCarrerHead")
);
const EditCarrerImages = lazy(() =>
  import("./admin/AdminPages/EditCarrer/EditCarrerImages")
);
const EditCarrerWYS = lazy(() =>
  import("./admin/AdminPages/EditCarrer/EditCarrerWYS")
);
const EditCarrerRYS = lazy(() =>
  import("./admin/AdminPages/EditCarrer/EditCarrerRYS")
);
const EditJobOpening = lazy(() =>
  import("./admin/AdminPages/EditCarrer/EditJobOpenings/EditJobOpening")
);
const EditHeader = lazy(() =>
  import("./admin/AdminPages/EditHeader/EditHeader")
);
const EditFooter = lazy(() =>
  import("./admin/AdminPages/EditFooter/EditFooter")
);
const EditProductsForm = lazy(() =>
  import("./admin/AdminPages/EditProducts/EditProductsForm")
);
const AddJobRole = lazy(() =>
  import("./admin/AdminPages/EditCarrer/AddJobRole")
);
const RecentworkHead = lazy(() =>
  import("./admin/AdminPages/EditHome/RecentworkHead")
);
const NoPage = lazy(() => import("./pages/NotFound/NoPage"));
const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Carrer = lazy(() => import("./pages/Carrer/Carrer"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Products = lazy(() => import("./pages/Products/Products"));
const Policy = lazy(() => import("./pages/PolicyPage/Policy"));
const ApplyNow = lazy(() => import("./admin/AdminPages/ApplyNow/ApplyNow"));
const AllServiceDetails = lazy(() =>
  import("./pages/Home/AllServices/AllServiceDetails")
);

function App() {
  return (
    <Main>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="admin" element={<AdminPanel />}>
            <Route path="editheading" element={<EditHeading />} />
            <Route path="editaboutus" element={<EditAboutUs />} />
            <Route path="editservices" element={<EditServices />} />
            <Route path="editservicehead" element={<EditServicesHead />} />
            <Route
              path="editserviceproblems"
              element={<EditServiceProblem />}
            />
            <Route
              path="editservicesolution"
              element={<EditServiceSolution />}
            />
            <Route path="editwhatyouget" element={<EditWhatYouGet />} />
            <Route path="editcontactus" element={<EditContactUs />} />
            <Route path="editcontactform" element={<EditContactForm />} />
            <Route path="editcarrerhead" element={<EditCarrerHead />} />
            <Route path="editcarrerimages" element={<EditCarrerImages />} />
            <Route path="editcarrerwys" element={<EditCarrerWYS />} />
            <Route path="recentworktitle" element={<RecentworkHead />} />
            <Route path="editcarrerrys" element={<EditCarrerRYS />} />
            <Route path="editjobopening" element={<EditJobOpening />} />
            <Route path="editheader" element={<EditHeader />} />
            <Route path="editfooter" element={<EditFooter />} />
            <Route path="createjobroles" element={<AddJobRole />} />
            <Route path="editProducts" element={<EditProductsForm />} />
            <Route path="applynow" element={<ApplyNow />} />
            <Route path="editslider" element={<EditSlider />} />
            <Route path="editrecentwork" element={<EditRecentWork />} />
            <Route path="editaboutpage" element={<EditAboutPage />} />
            <Route path="editaboutvalue" element={<EditAboutValue />} />
          </Route>

          <Route path="*" element={<NoPage />} />
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="career" element={<Carrer />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="our-services/:id" element={<AllServiceDetails />} />
          <Route path="our-products" element={<Products />} />
          <Route path="privacy-policy" element={<Policy />} />
        </Routes>
      </Suspense>
    </Main>
  );
}

export default App;
