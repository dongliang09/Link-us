import React from "react";

function FeedRightPanel() {
  return (
    <div className="bg-white boxS-0-0-2-gray pad-15p borderR-5p hgt-fit width-fit">
      <h3>LinkYet News</h3>
      <div className="mrg-tb-5p fontW-600">Completed Features</div>
      <div><i className="fas fa-highlighter"></i> Posts</div>
      <div><i className="fas fa-highlighter"></i> Comments</div>
      <div><i className="fas fa-highlighter"></i> Educations</div>
      <div><i className="fas fa-highlighter"></i> Skills</div>

      <div className="mrg-tb-5p fontW-600">Coming Features</div>
      <div><i className="far fa-lightbulb"></i> Following</div>
      <div><i className="far fa-lightbulb"></i> Search</div>
      <div><i className="far fa-lightbulb"></i> Like</div>
      <div><i className="far fa-lightbulb"></i> AWS upload</div>
    </div>
  )
}

export default FeedRightPanel;
