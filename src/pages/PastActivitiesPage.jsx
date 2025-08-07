import React, { useState, useEffect } from "react";
import { PastActivities } from "../components/pastActivities";
import JsonData from "../data/data.json";
import { Navigation } from "../components/navigation";

const PastActivitiesPage = () => {
  const [pageData, setPageData] = useState({});

  useEffect(() => {
    setPageData(JsonData);
  }, []);

  return (
    <>
      <Navigation />
      <div className="past-activities-page">
        <div className="container">
          {/* <div className="section-title mt-5">
            <h2 className="past-activities-title">Past Activities</h2>
            <p>
              Explore the impactful events, workshops, and initiatives organized by our team to empower and inspire the youth of Afghanistan.
            </p>
          </div> */}
          <PastActivities data={pageData.PastActivities} />
        </div>
      </div>
    </>
  );
};

export default PastActivitiesPage; 