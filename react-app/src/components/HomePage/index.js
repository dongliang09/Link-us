import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import AboutFooter from "../AboutFooter";

function HomePage() {
  const sessionUser = useSelector(state => state.session.user);
  let imgUrl = "https://user-images.githubusercontent.com/67977179/234372273-733a89e7-d46b-406d-b445-f87fa7c71875.png";


  if (sessionUser) return <Redirect to="/feed" />;
  return (
    <div>
      <div className="grid-1-1">
        <div className="width-max-550p mrg-tb-auto mrg-lr-auto">
          <h1 className="fontS-300rem color-home-brown">Welcome to your professional community</h1>
          <Link to="/signup" className="bg-main-blue bg-deep-blue-hover color-white fontS-125rem fontW-600 pad-tb-13p pad-lr-150rem mrg-tb-10p border-0p borderR-20p">
            Sign up now
          </Link>
        </div>
        <div className="width-max-700p">
          <img src={imgUrl} className="width-max-700p"/>
        </div>
      </div>
      <AboutFooter />
    </div>
  )
}

export default HomePage;
