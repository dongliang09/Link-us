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

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
          <>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={viewProfile}>View Profile</button>
            </li>
            <li>
              <div>
                <p>Manage</p>
                <button onClick={managePosts}>Posts</button>
              </div>
            </li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
      </ul>
    </>
  );
}

export default ProfileButton;
