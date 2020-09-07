import React from "react";

export default function footer() {
  return (
    <div className="footer">
      <div className="footer__info">
        <h5 className="footer__title">7th Heaven</h5>
        <div className="footer__text">
          <span>CloudStreet 17</span>
          <span>111 77 Barcelona</span>
          <span>010 - 111 11 77</span>
        </div>
      </div>
      <div className="footer__social">
        <img
          src={require("../images/Resurs 1.png")}
          className="footer__social-icon"
        />
        <img
          src={require("../images/Resurs 3.png")}
          className="footer__social-icon"
        />
        <img
          src={require("../images/Resurs 2.png")}
          className="footer__social-icon"
        />
      </div>
    </div>
  );
}
