import React from "react";
import "./ExpLeftPanel.css";
import "../Explorer.css";
import MetisMenu from "react-metismenu";
import { CustomLink } from "../ExpLeftPanel/CustomLink/CustomLink";
import ContextMenu from "react-context-menu";

class ExpLeftPanel extends React.Component {
  // determines what is being clicked on context menu
  handleClick(type, currentSelectedId) {
    switch (type) {
      case "Add Folder":
        console.log(type, currentSelectedId);
        break;
      case "Delete Folder":
        console.log(type, currentSelectedId);
        break;
      case "Add Event":
        console.log(type, currentSelectedId);
        break;
      default:
        console.log("Handle Gracefully");
    }
  }

  render() {
    return (
      <div className="left-panel-subgrid" id="context-menu">
        {/* MetisMenu - handles how metis menu renders
        see https://www.npmjs.com/package/react-metismenu for documentation
        */}
        <MetisMenu
          className="metis_custom"
          activeLinkId={this.props.activeLinkId}
          classNameContainer="metis_custom_ul_visible"
          classNameContainerVisible="metis_custom_ul_visible"
          classNameLink="metis_custom_a_link"
          classNameLinkActive="metis_custom_a_link_active"
          classNameLinkHasActiveChild="metis_custom_a_link_hasActive"
          LinkComponent={CustomLink}
          content={this.props.folderDataLeft}
        />

        {/* ContextMenu - handles custom context menu on right click */}
        <ContextMenu
          contextId="context-menu"
          id="menu-context"
          items={[
            {
              label: "Add Folder",
              onClick: (evt) => {
                // if statement ensures that user has selected a folder to add to
                if (this.props.currentSelectedId != null) {
                  // determines that "add folder" is being clicked from context menu
                  this.handleClick("Add Folder", this.props.currentSelectedId);

                  // shows "add folder" modal
                  this.props.changeShowModal(true);

                  // empties the state of newFolderName once folder has been added
                  this.props.setNewFolderName();
                } else {
                  alert("Please right click the folder you wish to add to..");
                }
              },
            },
            {
              label: "Delete Folder",
              onClick: (evt) => {
                // if statement ensures that user has selected a folder to delete
                if (this.props.currentSelectedId != null) {
                  // determines that "delete folder" is being clicked from context menu
                  this.handleClick(
                    "Delete Folder",
                    this.props.currentSelectedId
                  );

                  // shows "delete folder" modal
                  this.props.changeShowSecondModal(true);
                } else {
                  alert("Please right click the folder you wish to delete..");
                }
              },
            },
            {
              label: "Add Event",
              onClick: (evt) => {
                // if statement ensures that user has selected a folder to add event to
                if (this.props.currentSelectedId != null) {
                  // determines that "add event" is being clicked from context menu
                  this.handleClick("Add Event", this.props.currentSelectedId);

                  // calls determineTypeHandler from Explorer.js
                  this.props.determineTypeHandler();
                } else {
                  alert(
                    "Please right click the folder you wish to add event to.."
                  );
                }
              },
            },
          ]}
          closeOnClick={true}
          closeOnClickOut={true}
        />
      </div>
    );
  }
}

export default ExpLeftPanel;
