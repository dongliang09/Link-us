import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push("/feed")
    }
  };

  return (
    <div className="flx-col flx-ai-center width-max-1000p mrg-lr-auto">
      <h1>Stay updated on your professional world</h1>
      <form onSubmit={handleSubmit} className="flx-col width-50per">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className="color-red">{error}</li>
          ))}
        </ul>
          <input type="text" value={email} required placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="mrg-b-5p fontS-115rem pad-l-13p pad-tb-13p mrg-tb-10p border-black-hover border-main-gray borderR-5p"
          />
          <input type="password" value={password} required placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="mrg-b-5p fontS-115rem pad-l-13p pad-tb-13p mrg-tb-10p border-black-hover border-main-gray borderR-5p"
          />
        <button type="submit" className="bg-main-blue bg-deep-blue-hover color-white fontW-600 pad-tb-13p mrg-tb-10p border-0p borderR-20p">
          Log In
        </button>
        <button type='submit'
            onClick={() => {
              setEmail('demo@aa.io');
              setPassword('password');
            }}
            className="bg-main-blue bg-deep-blue-hover color-white fontW-600 pad-tb-13p mrg-tb-10p border-0p borderR-20p">
            Log in as Demo User
        </button>
      </form>
      <div>New to Link-us? <Link to="/signup" className="fontW-600 color-main-blue ">Sign up now</Link></div>
    </div>
  );
}

export default LoginFormPage;
