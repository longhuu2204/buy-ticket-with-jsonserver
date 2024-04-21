import React, { Fragment } from "react";

const Advertisement = () => {
  return (
    <Fragment>
      <div className="w-[120px] h-[600px]  fixed top-5 left-32">
        <a href="">
          <img
            src="https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/042024/120x600_1_.jpg"
            alt=""
          />
        </a>
      </div>
      <div className="w-[120px] h-[600px]  fixed top-5 right-32">
        <a href="">
          <img
            src="https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/042024/120x600_1_.jpg"
            alt=""
          />
        </a>
      </div>
    </Fragment>
  );
};

export default Advertisement;
