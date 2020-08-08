import React from "react";
import UpdateLocationContext from "../../../../contexts/UpdateLocationContext";

// generates custom link for left panel
export const CustomLink = class CustomLink extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  // determines if node has sub menu
  onClick(evt) {
    if (this.props.hasSubMenu) {
      this.props.toggleSubMenu(evt);
    } else {
      this.props.activateMe({
        newLocation: this.props.to,
        selectedMenuLabel: this.props.label,
      });
    }
  }

  // renders menu in correct format
  renderHelper = (children) => {
    const type = children[1];

    // renders master folder. IF master folder name changes then
    // MUST change "Master" to name of new master folder or will not render correctly
    if (type === "Master") {
      return children;
    } else {
      // renders children
      return (
        <React.Fragment>
          <p className="preventOverflow">
            {children[0]}
            {children[1]}
          </p>
          {children[2]}
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <>
        <UpdateLocationContext.Consumer>
          {(value) => {
            let folderId = this.props.id;

            // renders anchor tags with event listeners in each list element
            return (
              <a
                id={this.props.id}
                onClick={(evt) => {
                  this.onClick(evt);

                  // triggers grabData() from Explorer.js
                  value.grabData(folderId);
                }}
                onContextMenu={() => {
                  // sets current selected id
                  value.changeCurrentSelectedId(document.activeElement.id);

                  // sets activeLinkId to null
                  value.setIdNull();
                }}
                href="#"
                className="metismenu-link has-active-child metis_custom_a_link"
                aria-expanded="true"
              >
                {this.renderHelper(this.props.children)}
              </a>
            );
          }}
        </UpdateLocationContext.Consumer>
      </>
    );
  }
};

// generates custom link for right panel
export const CustomLinkRight = class CustomLinkRight extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  // determines if node has sub menu
  onClick(evt) {
    if (this.props.hasSubMenu) {
      this.props.toggleSubMenu(evt);
    } else {
      this.props.activateMe({
        newLocation: this.props.to,
        selectedMenuLabel: this.props.label,
      });
    }
  }

  render() {
    return (
      <>
        <UpdateLocationContext.Consumer>
          {(value) => {
            let folderId = this.props.id;
            let folderType = this.props.type;
            return (
              <a
                id={this.props.id}
                type={this.props.type}
                onDoubleClick={(evt) => {
                  // triggers listenForEvent() from Explorer.js
                  value.listenForEvent(folderId);
                  this.onClick(evt);

                  // triggers grabData() from Explorer.js
                  value.grabData(folderId);
                }}
                onContextMenu={() => {
                  // sets current selected id
                  value.changeCurrentSelectedId(document.activeElement.id);

                  // sets activeLinkId to null
                  value.setIdNull();
                }}
                href="#"
                className="metismenu-link has-active-child metis_custom_a_link"
                aria-expanded="true"
              >
                {this.props.children}
              </a>
            );
          }}
        </UpdateLocationContext.Consumer>
      </>
    );
  }
};
