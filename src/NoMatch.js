import React from "react";
import { Link } from "react-router-dom";

function NoMatch() {
  return (
    <div className="content justify-content-center">
      <h1 className="dark-brown mt-3 text-center">404</h1>
      <h5 className="dark-brown mt-3 text-center">NOT FOUND</h5>
      <h5 className="light-brown text-center">
        You just hit a route that doesn't exist...
      </h5>
      <Link to="/">
        <h4 className="mt-4 light-brown">Back</h4>
      </Link>
    </div>
  );
}

export default NoMatch;
