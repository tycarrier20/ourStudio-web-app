import React from "react";
import FileUpload from "./components/FileUpload";
import Navbar from "./components/Navbar";
import Explorer from "./components/FileExplorer/components/Explorer/Explorer";
import { FileManagerComponent } from '@syncfusion/ej2-react-filemanager';
import { Container } from "react-bootstrap";

class Upload extends React.Component {

  constructor() {
    super(...arguments);
    this.hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";
  }

  render() {
    return (
        <div className="control-section">
          <br/>
          <Container>
          <FileUpload />
          <FileManagerComponent id="file" ajaxSettings={{
            url: this.hostUrl + "api/FileManager/FileOperations",
            downloadUrl: this.hostUrl + 'api/FileManager/Download',
            uploadUrl: this.hostUrl + 'api/FileManager/Upload'
          }} />
          </Container>
        </div>

    );
  }
}


export default Upload;
