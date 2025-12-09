import React, { useState } from "react";

const ReadMoreText = ({ text, maxLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!text) return null;
  
  if (text.length <= maxLength) {
    return <p>{text}</p>;
  }
  
  const truncatedText = text.substring(0, maxLength);
  
  return (
    <p>
      {isExpanded ? text : `${truncatedText}...`}
      <span
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          color: "#359E88",
          cursor: "pointer",
          marginLeft: "5px",
          fontWeight: 500,
          textDecoration: "underline"
        }}
      >
        {isExpanded ? " see less" : " see more"}
      </span>
    </p>
  );
};

export const Services = (props) => {
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>
          Budda Bridge provides educational support, scholarship coaching, and capacity-building programs to help individuals unlock opportunities and lead meaningful change.
          </p>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  {" "}
                  <i className={d.icon}></i>
                  <div className="service-desc">
                    <h3>{d.name}</h3>
                    <ReadMoreText text={d.text} maxLength={120} />
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
