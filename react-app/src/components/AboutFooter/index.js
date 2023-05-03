import React from "react";

function AboutFooter() {
  return (
    <div className="flx flx-jc-center fontS-115rem bg-gray width-100per gap-15p pad-tb-25p mrg-t-100p">
      <div className="flx gap-15p">
        <div className="flx fontF-Bruno">Link<div className="bg-black color-white borderR-5p pad-lr-3p">Yet</div></div>
        <div>@2023</div>
      </div>
      <div className="flx gap-15p">
        <div className="">Dongliang Li</div>
        <a href="https://github.com/dongliang09" target="_blank" rel="noopener noreferrer"
          className="color-main-gray color-black-hover">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/dongliang-li-a9ab038a/" target="_blank" rel="noopener noreferrer"
          className="color-main-gray color-main-blue-hover" >
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  )
}

export default AboutFooter;
