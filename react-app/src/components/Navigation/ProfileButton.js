import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    closeMenu();
    history.push("/");
  };

  const viewProfile = (e) => {
    e.preventDefault();
    closeMenu();
    history.push(`/user/${user.id}`);
  }

  const managePosts = (e) => {
    e.preventDefault();
    closeMenu();
    history.push(`/manage`);
  }

  const ulClassName = "pos-abs bg-white pad-15p li-none boxS-0-0-2-gray borderR-5p" + (showMenu ? "" : " dis-none");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu} className="mrg-tb-auto border-0p bg-white fontS-175rem color-main-blue-hover">
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef} >
          <>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={viewProfile}
                className="bg-white color-main-blue fontW-600 border-second-blue borderR-15p pad-lr-150rem">
                  View Profile
              </button>
            </li>
            <li>
              <div>
                <hr/>
                <div>Manage</div>
                <button onClick={managePosts} className="border-0p bg-white color-main-blue-hover fontW-600">
                  Posts
                </button>
              </div>
            </li>
            <li>
              <div>
                <hr />
                <button onClick={handleLogout} className="border-0p bg-white color-main-blue-hover fontW-600">
                  Log Out
                </button>
              </div>
            </li>
          </>
      </ul>
    </>
  );
}

export default ProfileButton;
