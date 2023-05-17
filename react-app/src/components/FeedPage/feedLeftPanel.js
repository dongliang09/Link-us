import React from "react";

function FeedLeftPanel({currentUser}) {
  return (
    <div className="">
      <div className="flx-col fontS-115rem bg-white pad-15p borderR-5p boxS-0-0-2-gray">
        <div className="mrg-b-15p">You are signed in as</div>
        <div>
          <i className="fas fa-user-circle"></i> {currentUser.firstName+" "+currentUser.lastName}
        </div>
      </div>
      <div className="flx-col gap-10p mrg-tb-10p fontS-115rem bg-white pad-15p borderR-5p boxS-0-0-2-gray">
        <div className="mrg-b-5p">Developer Contacts</div>
        <a href="https://github.com/dongliang09" target="_blank" rel="noopener noreferrer"
          className="color-main-blue-hover">
          <i className="fab fa-github"></i> GitHub
        </a>
        <a href="https://www.linkedin.com/in/dongliang-li-a9ab038a/" target="_blank" rel="noopener noreferrer"
          className="color-main-blue-hover" >
          <i className="fab fa-linkedin"></i> LinkedIn
        </a>

      </div>
    </div>
  )
}

export default FeedLeftPanel;
