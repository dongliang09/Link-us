import React from "react";
import { useModal } from '../../context/Modal';
import { useContext } from "react";
import { EasterEggContext } from "../../context/EasterEggContext";

function ProfileEasterEgg() {
  const { easterEggFound } = useContext(EasterEggContext);
  const { closeModal } = useModal();

  return (
    <div className="pad-15p">
      <div className="flx-jc-fe">
        <button onClick={()=>closeModal()} className="bg-white border-0p">
          <i className="fas fa-times"></i>
        </button>
      </div>
      <p>You have found the developer who creates this website!</p>
      <p>Do you enjoy the website so far?</p>
      <p>Easter Egg ({Object.values(easterEggFound).length} / ?)</p>
      <button onClick={()=>closeModal()} className="bg-main-blue color-white border-0p pad-10p borderR-5p">Got it</button>
    </div>
  )
}

export default ProfileEasterEgg
