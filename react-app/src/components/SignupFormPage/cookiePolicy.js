import React from "react";
import { useModal } from '../../context/Modal';

function CookiePolicy() {
  const { closeModal } = useModal();

  return (
    <div className="">
      <button onClick={()=>closeModal()}><i className="fas fa-times"></i></button>
      <p>I agree this website to use cookie only for the purpose of login.</p>
      <p>Note: No personal information is stored in form of cookie.</p>
      <p>Easter Egg (1/ ?)</p>
      <button onClick={()=>closeModal()}>Got it</button>
    </div>
  )
}

export default CookiePolicy
