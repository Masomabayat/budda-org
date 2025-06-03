import React from "react";
// import "../css/style.css";

export const PastActivities = (props) => {
  return (
    <div id="past-activities" className="activities-container">
      <div className="container">
        <div className="section-title">
          <h2>Past Activities</h2>
          <p>Take a look at some of our recent events and initiatives.</p>
        </div>
        <div className="row">
          {props.data ? (
            props.data.map((activity) => (
              <div key={activity.id} className="col-md-4 col-sm-6">
                <div className="activity-item">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="img-responsive"
                  />
                  <div className="activity-content">
                    <h3>{activity.title}</h3>
                    <p>{activity.description}</p>
                    <video
                      controls
                      className="img-responsive"
                      poster={activity.image}
                    >
                      <source src={activity.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};
