import React, { useState, useEffect } from "react";
import { Story } from "../components/story";
import JsonData from "../data/data.json";

const StoryPage = () => {
  const [pageData, setPageData] = useState({});

  useEffect(() => {
    setPageData(JsonData);
  }, []);

  return (
    <div className="story-page" style={{ paddingTop: 120, paddingBottom: 40 }}>
      <div className="container">
        <Story data={pageData.Story} />
      </div>
    </div>
  );
};

export default StoryPage;

