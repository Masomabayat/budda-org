import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
// import { Gallery } from "./components/gallery";
// import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
// import { PastActivities } from "./components/pastActivities";
import PastActivitiesPage from "./pages/PastActivitiesPage";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import RegistrationPage from "./pages/RegistrationPage";

import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const HomePage = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      {/* <Navigation /> */}
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      {/* <Gallery data={landingPageData.Gallery} /> */}
      {/* <Testimonials data={landingPageData.Testimonials} /> */}
      <Team data={landingPageData.Team} />
      {/* <PastActivities data={landingPageData.PastActivities} /> */}
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/past-activities" element={<PastActivitiesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
