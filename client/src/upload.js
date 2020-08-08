import React from "react";
import FileUpload from "./components/FileUpload";
import Navbar from "./components/Navbar";
import Explorer from "./components/FileExplorer/components/Explorer/Explorer";

const Upload = () => (
  <div>
    <div className="container mt-4">
      <FileUpload />
      <Explorer />
    </div>
  </div>
);

export default Upload;
