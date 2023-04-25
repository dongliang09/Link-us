import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

function HomePage() {
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) return <Redirect to="/feed" />;
  return (
    <div>
      Home Page
    </div>
  )
}

export default HomePage;
