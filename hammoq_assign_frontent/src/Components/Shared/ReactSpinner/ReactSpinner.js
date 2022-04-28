import { css } from "@emotion/react";

import "./ReactSpinner.css";

import PuffLoader from "react-spinners/PuffLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function ReactSpinner(props) {
  return (
    <div className="sweet-loading">
      <div className={`${props.className} card__margin react-spinner`}>
        <PuffLoader color="#fb641b" loading="true" css={override} size={150} />
      </div>
    </div>
  );
}

export default ReactSpinner;
