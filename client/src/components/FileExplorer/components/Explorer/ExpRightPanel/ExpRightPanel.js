import React from "react";
import "./ExpRightPanel.css";
import MetisMenu from "react-metismenu";
import { CustomLinkRight } from "../ExpLeftPanel/CustomLink/CustomLink";
import ContextMenu from "react-context-menu";

class ExpRightPanel extends React.Component {
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
      <div className="right-panel-subgrid" id="context-menu-right">
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
          LinkComponent={CustomLinkRight}
          content={this.props.folderData}
          iconNameStateHidden=""
        />

        {/* ContextMenu - handles custom context menu on right click */}
        <ContextMenu
          contextId="context-menu-right"
          id="menu-context"
          items={[
            {
              label: "Add Folder",
              onClick: (evt) => {
                // if statement ensures that user has selected a folder to add to
                if (this.props.currentSelectedId != null) {
                  // empties the state of newFolderName once folder has been added
                  this.props.setNewFolderName();

                  // determines that "add folder" is being clicked from context menu
                  this.handleClick("Add Folder", this.props.currentSelectedId);

                  // shows "add folder" modal
                  this.props.changeShowModal(true);
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

export default ExpRightPanel;
