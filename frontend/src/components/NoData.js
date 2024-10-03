import React from "react";
import { Link } from "react-router-dom";
const NoData = () => {
  return (
    <div className="w-[50%] border">
      <div className="flex flex-col items-center justify-center mt-12">
        <div
          className="flex flex-col items-center justify-center
        "
        >
          <img
            className="w-100"
            src="https://static.vecteezy.com/system/resources/thumbnails/010/856/652/small/no-result-data-document-or-file-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg"
          />
          <h1 className="text-6xl font-bold text-gray-300">404</h1>
        </div>
        <div className="mt-12">
          <Link
            to="/"
            className="text-md text-blue-600 underline hover:cursor-pointer"
          >
            Go to home page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoData;
