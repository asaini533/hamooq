import React from "react";

import "./404.css";

import errorImg from "../../../assets/images/errorImg.svg";

const ErrorPage = () => {
  return (
    <React.Fragment>
      <div className="error">
        <div className="error_text">
          <h1 className="error_text-heading">Not found(404)</h1>
          <p className="error_text-para">Oops! We can't find that page.</p>
          <p className="error_text-para">
            Why not check our top products and curated categories.
          </p>
        </div>
        <div className="error_img">
          <img src={errorImg} alt={"404"} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ErrorPage;
