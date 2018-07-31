import React, { Fragment } from "react";
import { withReducer } from 'react-redux-dynamic-reducer'
import reducer from "./reducer";
import { Route, Link } from "react-router-dom";

/**
 * This is a little strange. You'd likely connect a component like this to
 * display the record listing, but for demo purposes I just hard-coded it.
 */
const Records = () => (
  <div>
    <h1>Records I Can See Right Now</h1>
    <ul>
      <li>
        <Link to="/records/record-1">Record 1</Link>
      </li>
      <li>
        <Link to="/records/record-2">Record 2</Link>
      </li>
      <li>
        <Link to="/records/record-3">Record 3</Link>
      </li>
    </ul>
  </div>
);

export default Records;
