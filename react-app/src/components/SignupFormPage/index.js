import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect,useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import OpenModalButton from "../OpenModalButton"
import CookiePolicy from "./cookiePolicy";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  if (sessionUser) return <Redirect to="/feed" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(firstName, lastName, email, password));
        if (data) {
          setErrors(data)
        } else {
          history.push("/feed")
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <div className="flx-col flx-ai-center width-max-1000p mrg-lr-auto">

      <h1>Make the most of your professional life</h1>

      <form onSubmit={handleSubmit} className="flx-col width-50per">
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>

        <label className="color-main-gray mrg-tb-5p">First Name</label>
        <input type="text" value={firstName} required className="mrg-b-5p hgt-135rem pad-l-5p border-black-hover border-main-gray borderR-5p"
          onChange={(e) => setFirstName(e.target.value)}/>

        <label className="mrg-tb-5p color-main-gray">Last Name</label>
        <input type="text" value={lastName} required className="mrg-b-5p hgt-135rem pad-l-5p border-black-hover border-main-gray borderR-5p"
          onChange={(e) => setLastName(e.target.value)}/>

        <label className="mrg-tb-5p color-main-gray">Email</label>
        <input type="text" value={email} required className="mrg-b-5p hgt-135rem pad-l-5p border-black-hover border-main-gray borderR-5p"
          onChange={(e) => setEmail(e.target.value)}/>

        <label className="mrg-tb-5p color-main-gray">Password (6 or more characters)</label>
        <input type="password" value={password} required className="mrg-b-5p hgt-135rem pad-l-5p border-black-hover border-main-gray borderR-5p"
          onChange={(e) => setPassword(e.target.value)} />

        <label className="mrg-tb-5p color-main-gray">Confirm password</label>
        <input type="password" value={confirmPassword} required className="mrg-b-5p hgt-135rem pad-l-5p border-black-hover border-main-gray borderR-5p"
          onChange={(e) => setConfirmPassword(e.target.value)}/>

        <div className="mrg-tb-5p color-main-gray txt-ali-center">
          By clicking Sign Up, you agree to the <OpenModalButton modalComponent={<CookiePolicy />}
            buttonText="Cookie Policy" buttonTag="span" customizeStyle="fontW-600 color-main-blue cursor-pt-hover" />
        </div>

        <button type="submit" className="bg-main-blue color-white pad-tb-13p mrg-tb-10p border-0p borderR-20p">
          Sign Up
        </button>
      </form>
      <div>Already on Link-us? <Link to="/login" className="fontW-600 color-main-blue ">Login</Link></div>
    </div>
  );
}

export default SignupFormPage;
