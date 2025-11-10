import React from "react";

export const Story = (props) => {
    return (
      <div id="story" className="story-container">
        <div className="container-story">
          <div className="section-title mt-5">
            <h2 className="story-title">Our Story</h2>
            <p>
              Discover the journey of Budda Bridge, from its inception to its impact on the lives of students and communities.
            </p>
          </div>
          <div className="row">
            {props.data && props.data.length > 0 ? (
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
                      {activity.impact && (
                        <div className="activity-impact">
                          <strong>Impact:</strong> {activity.impact}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="hidden">No activities found</div>
            )
                }
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="activity-item">
                <img
                  src="/img/Sessions.jpeg"
                  alt="Sessions"
                  className="img-responsive"
                  style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
                />
                <div className="activity-content mt-3">
                  <h3>Our Sessions</h3>
                  <p>
                    Our sessions are designed to be interactive and engaging, providing students with practical knowledge and skills. We focus on capacity building, leadership, and scholarship guidance, ensuring every participant leaves with valuable insights and motivation to pursue their goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="activity-item">
                <img
                  src="/img/Students-Gift.jpeg"
                  alt="Students Gift"
                  className="img-responsive"
                  style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
                />
                <div className="activity-content mt-3 border">
                  <h3>Student Recognition</h3>
                  <p>
                    We celebrate the achievements of our students by recognizing their hard work and dedication. Our organization provides certificates and small gifts to outstanding participants, fostering a culture of encouragement and excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
