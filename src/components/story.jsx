import React, { useState } from "react";

export const Story = (props) => {
  const [activeTab, setActiveTab] = useState("English");
  const data = props.data || {};
  const englishStories = data.English || [];
  const dariStories = data.Dari || [];

  const renderStoryCard = (story) => {
    return (
      <div key={story.id} className="col-md-6 col-lg-4 mb-4">
        <div className="story-card" style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s, box-shadow 0.3s",
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        }}
        >
          {/* Cover Image */}
          <div style={{
            width: "100%",
            height: "250px",
            overflow: "hidden",
            backgroundColor: "#f0f0f0",
            position: "relative"
          }}>
            {story.coverImage ? (
              <img
                src={story.coverImage}
                alt={story.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div style={{
              display: story.coverImage ? "none" : "flex",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "linear-gradient(135deg, #004138 0%, #359E88 100%)",
              background: "linear-gradient(135deg, #004138 0%, #359E88 100%)",
              color: "#fff",
              fontSize: "48px",
              fontWeight: "bold"
            }}>
              {story.title.charAt(0)}
            </div>
          </div>

          {/* Story Content */}
          <div style={{
            padding: "20px",
            flex: 1,
            display: "flex",
            flexDirection: "column"
          }}>
            <h3 style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#333",
              marginBottom: "12px",
              lineHeight: "1.4"
            }}>
              {story.title}
            </h3>

            {story.author && (
              <p style={{
                fontSize: "14px",
                color: "#666",
                marginBottom: "8px",
                fontStyle: "italic"
              }}>
                By {story.author}
              </p>
            )}

            <p style={{
              fontSize: "15px",
              color: "#555",
              lineHeight: "1.6",
              marginBottom: "20px",
              flex: 1,
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}>
              {story.excerpt}
            </p>

            {/* Download Button */}
            <a
              href={story.pdfUrl}
              download
              className="btn btn-primary"
              style={{
                background: "linear-gradient(to right, #004138 0%, #359E88 100%)",
                border: "none",
                padding: "10px 24px",
                fontSize: "14px",
                borderRadius: "6px",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 500,
                textDecoration: "none",
                display: "inline-block",
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                width: "100%"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              <i className="fa fa-download" style={{ marginRight: "8px" }}></i>
              Download PDF
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="story" className="story-container">
      <div className="container-story">
        <div className="section-title mt-5">
          <h2 className="story-title">Our Story</h2>
          <p>
            The true story of girls in this land of sorrows.
          </p>
        </div>

        {/* Language Tabs */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "40px",
          borderBottom: "2px solid #e0e0e0"
        }}>
          <button
            onClick={() => setActiveTab("English")}
            style={{
              padding: "12px 40px",
              fontSize: "16px",
              fontWeight: 600,
              border: "none",
              backgroundColor: "transparent",
              color: activeTab === "English" ? "#004138" : "#666",
              borderBottom: activeTab === "English" ? "3px solid #004138" : "3px solid transparent",
              cursor: "pointer",
              transition: "all 0.3s",
              marginRight: "20px"
            }}
          >
            English
          </button>
          <button
            onClick={() => setActiveTab("Dari1")}
            style={{
              padding: "12px 40px",
              fontSize: "16px",
              fontWeight: 600,
              border: "none",
              backgroundColor: "transparent",
              color: activeTab === "Dari1" ? "#004138" : "#666",
              borderBottom: activeTab === "Dari1" ? "3px solid #004138" : "3px solid transparent",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
          >
            دری (Dari)
          </button>
        </div>

        {/* Stories Grid */}
        <div className="row">
          {activeTab === "English" && englishStories.length > 0 ? (
            englishStories.map((story) => renderStoryCard(story))
          ) : activeTab === "Dari1" && dariStories.length > 0 ? (
            dariStories.map((story) => renderStoryCard(story))
          ) : (
            <div className="col-md-12" style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#666"
            }}>
              <p style={{ fontSize: "18px" }}>
                {activeTab === "English" 
                  ? "No English stories available yet." 
                  : activeTab === "Dari1" 
                    ? "هنوز داستان‌های دری موجود نیست."
                    : activeTab === "Dari2" 
                      ? "هنوز داستان‌های دری موجود نیست."
                      : activeTab === "Dari3" 
                        ? "هنوز داستان‌های دری موجود نیست."
                        : activeTab === "Dari4" 
                          ? "هنوز داستان‌های دری موجود نیست."
                          : "هنوز داستان‌های دری موجود نیست."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
