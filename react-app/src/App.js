import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import FeedPage from "./components/FeedPage";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <HomePage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/feed">
            <FeedPage />
          </Route>
          <Route path="/manage">
            <div><h1>Manage, coming soon</h1></div>
          </Route>
          <Route path="/user/:userId">
            <ProfilePage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
