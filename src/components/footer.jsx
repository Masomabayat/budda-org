import React from "react";

export const Footer = (props) => {
  return (
    <div id="footer">
      <div className="container">
        <div className="col-md-12">
          <div className="row footer-content">
            <div className="footer-logo">
              <a href={props.data?.instagram || "#"} target="_blank" rel="noopener noreferrer">
                <img src="/img/budda-logo.png" alt="Buddha Logo" style={{width: 'auto', height: '100px'}}/>
              </a>
            </div>
            <div className="social">
              <ul>
                {props.data?.facebook && (
                  <li>
                    <a href={props.data.facebook} target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                )}
                {props.data?.linkedin && (
                  <li>
                    <a href={props.data.linkedin} target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                )}
                {props.data?.youtube && (
                  <li>
                    <a href={props.data.youtube} target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

