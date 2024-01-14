import React from "react";
import { Link } from "react-router-dom";
import Components from "./class-vs-function/components";
function MenuItem() {
  return (
    <div>
      <ul>
        <Link to='/components'>
          <li>Components</li>
        </Link>
        <Link to='/namechanger'>
          <li>NamechangeJSX</li>
        </Link>
        <Link to='/likeapp'>
          <li>LikeApp</li>
        </Link>
        <Link to='/plusminus'>
          <li>Increament Decreament</li>
        </Link>
        <Link to='/api'>
          <li>Data Fetching</li>
        </Link>
        <Link to='/crud'>
          <li>Crud</li>
        </Link>
      </ul>
    </div>
  );
}

export default MenuItem;
