import React from "react";
import { useModal } from '../../context/Modal';
import { useContext } from "react";
import { EasterEggContext } from "../../context/EasterEggContext";

function CookiePolicy() {
  const { easterEggFound } = useContext(EasterEggContext);
  const { closeModal } = useModal();

  return (
    <div className="pad-15p">
      <div className="flx-jc-fe">
        <button onClick={()=>closeModal()} className="bg-white border-0p">
          <i className="fas fa-times"></i>
        </button>
      </div>
      <p>I agree this website to use cookie only for the purpose of login.</p>
      <p>Note: No personal information is stored in cookie.</p>
      <p>Easter Egg ({Object.values(easterEggFound).length} / ?)</p>
      <button onClick={()=>closeModal()} className="bg-main-blue color-white border-0p pad-10p borderR-5p">Got it</button>
    </div>
  )
}

export default CookiePolicy
