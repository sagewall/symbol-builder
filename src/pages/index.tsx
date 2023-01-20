import React from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  return (
    <React.Fragment>
      <main>
        <ul>
          <li>
            <Link to="/picture-fill-symbol/">PictureFillSymbol</Link>
          </li>
          <li>
            <Link to="/picture-marker-symbol/">PictureMarkerSymbol</Link>
          </li>
          <li>
            <Link to="/point-symbol-3d/">PointSymbol3D</Link>
          </li>
          <li>
            <Link to="/simple-fill-symbol/">SimpleFillSymbol</Link>
          </li>
          <li>
            <Link to="/simple-line-symbol/">SimpleLineSymbol</Link>
          </li>
          <li>
            <Link to="/simple-marker-symbol/">SimpleMarkerSymbol</Link>
          </li>
          <li>
            <Link to="/text-symbol/">TextSymbol</Link>
          </li>
        </ul>
      </main>
    </React.Fragment>
  );
};

export default IndexPage;
