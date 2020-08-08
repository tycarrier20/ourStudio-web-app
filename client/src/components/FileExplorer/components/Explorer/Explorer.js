import React from "react";
import "./Explorer.css";
import Modal from "./ReusableComponents/Modal";
import ExpNavigation from "./ExpNavigation/ExpNavigation";
import ExpLeftPanel from "./ExpLeftPanel/ExpLeftPanel";
import ExpRightPanel from "./ExpRightPanel/ExpRightPanel";
import UpdateLocationContext from "../../contexts/UpdateLocationContext";
import uuid from "react-uuid";

class Explorer extends React.Component {
  constructor(props) {
    super(props);

    // all states are being used besides searchInput. Do not remove
    this.state = {
      showModal: false,
      showSecondModal: false,
      showEventModal: false,
      activeLinkId: null,
      activeId: null,
      lastSelectedId: null,
      currentSelectedId: null,
      newFolderName: "",
      newDate: "",
      folderData: [],
      folderDataLeft: [],
      folderDataRight: [],
      searchInput: "",
    };

    // these three handleChanges bind the target values of
    // inputting folder names, dates, and searches (searches not implemented)
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    //this.handleChangeSearch = this.handleChangeSearch.bind(this);
  }

  componentDidMount() {
    console.log("Mounted..");
    let masterFolder = "My Music";
    var here = this;

    let data = {
      icon: "fas fa-folder",
      label: masterFolder.trim(),
      eventId: null,
      eventGuid: null,
      type: "folder",
      id: uuid(),
      content: [
        {
          icon: "fas fa-folder",
          label: "Ty Carrier",
          eventId: null,
          eventGuid: null,
          type: "folder",
          id: uuid(),
          content: [],
        },
      ],
    };

    // gets data and last selected id from parent
    // window.parent.App.vent.trigger("explorer:activity:onLoadExplorer");
    // window.parent.App.vent.on(
    //   "App:EventsHomeLoader:explorerDataFetchSuccess",
    //   function (data, id) {
    //     console.log("Data fetch worked:" + data);

    //     // populates the left and right panel data accordingly
    //     here.populateExplorer(data);

    //     // sets last selected id from parent
    //     if (id !== null) {
    //       console.log("setting active..");
    //       here.setState({ activeLinkId: id });

    //       // sets the right panel to show the contents of the folder which was
    //       // last selected in previous session
    //       here.showRightDataOnLoad(
    //         here.state.folderData,
    //         here.state.activeLinkId
    //       );
    //     } else {
    //       console.log("no active id..setting master as active id");
    //       // only uncomment the setState if the Master folder id is 'a2a02176-1913-40ef-a741-e5876d1755a5'
    //       // otherwise change 'a2a02176-1913-40ef-a741-e5876d1755a5' to the Master folder id before uncommenting
    //       // here.setState({
    //       //   activeLinkId: "a2a02176-1913-40ef-a741-e5876d1755a5",
    //       // });
    //     }
    //   }
    // );
    here.populateExplorer(data);
    here.showRightDataOnLoad(here.state.folderData, here.state.activeLinkId);
  }

  // populates the left and right panel data accordingly
  // populateExplorer = (fullContext) => {
  //   // decodes fullContext from parent
  //   // let treeDecoded = decodeURIComponent(fullContext);
  //   // let tree = JSON.parse(treeDecoded);
  //   let tree = fullContext;

  //   // creates deep copy of the parsed fullContext and creates
  //   // two instances - one instance for left panel and one for right panel
  //   const fullContextLeft = this.deepCopy(tree);
  //   const fullContextRight = this.deepCopy(tree);

  //   // filters the deep copy - fullContextLeft to only display folders NOT events on left panel
  //   this.filterHandler(fullContextLeft);

  //   // set state of right panel to display folders AND events
  //   this.setState({
  //     folderData: [...fullContextRight],
  //   });
  // };

  populateExplorer = (fullContext) => {
    // creates deep copy of the parsed fullContext and creates
    // two instances - one instance for left panel and one for right panel
    const fullContextRight = this.deepCopy(fullContext);

    // filters the deep copy - fullContextLeft to only display folders NOT events on left panel
    // this.filterHandler(fullContextLeft);

    // set state of right panel to display folders AND events
    this.setState({
      folderData: [fullContextRight],
    });
  };

  // runs every time a folder is added or deleted
  // ensures the right panel and left panel display properly -
  // folders ONLY on left panel/folders AND events in right panel
  populateOnUpdate = (fullContext) => {
    // creates deep copy of the parsed fullContext and creates
    // two instances - one instance for left panel and one for right panel
    const fullContextLeft = this.deepCopy(fullContext);
    const fullContextRight = this.deepCopy(fullContext);

    // filters the deep copy - fullContextLeft to only display folders NOT events on left panel
    // this.filterHandler(fullContextLeft);
    this.setState({ folderDataLeft: [...fullContextLeft] });
    // set state of right panel to display folders AND events
    this.setState({
      folderData: [...fullContextRight],
    });
  };

  // parses the JSON object in order to create deep copy for
  // populateExplorer() and populateOnUpdate()
  deepCopy = (obj) => {
    const copy = JSON.parse(JSON.stringify(obj));
    return copy;
  };

  // filters left panel - fullContextLeft to only display folders NOT events on left panel
  filterHandler = (fullContextLeft) => {
    // recursively filters left panel data to only display folders
    //this.recursiveFilter(fullContextLeft);
    // (unfinished) recursiveSort to alphabetically sort left panel
    // this.recursiveSort(fullContextLeft);
    // set the left panel state to display filtered/sorted data
    // this.setState({ folderDataLeft: [...fullContextLeft] });
  };

  // recursively filters left panel data to only display folders
  recursiveFilter = (treeNodes) => {
    for (var nodeIdx = 0; nodeIdx <= treeNodes.length - 1; nodeIdx++) {
      var currentNode = treeNodes[nodeIdx],
        currentType = currentNode.type,
        currentChildren = currentNode.content;

      if (currentType == "event") {
        // if event exists, removes it from this instance
        treeNodes.splice(nodeIdx, 1);
      } else {
        this.recursiveFilter(currentChildren);
      }
    }
  };

  // binds the "enter" key to "add folder" button
  bindEnterKeyFolder = (target) => {
    if (target.charCode == 13) {
      this.compareHandler();
    }
  };

  // binds the "enter" key to "add event" button
  bindEnterKeyEvent = (target) => {
    if (target.charCode == 13) {
      this.addEvent();
    }
  };

  // empties the state of newFolderName once folder has been added
  setNewFolderName = () => {
    this.setState({
      newFolderName: "",
    });
  };

  // empties the state of activeLinkId when folder is right-clicked on left or right panel
  setIdNull = () => {
    this.setState({
      activeLinkId: null,
    });
  };

  // when user clicks item, sets item as active
  changeActiveLink = () => {
    this.setState((prevState) => ({
      activeLinkId: prevState.activeId,
    }));
  };

  // hides/shows "add folder" modal
  changeShowModal = (status) => {
    this.setState({
      showModal: status,
    });
  };

  // hides/shows "delete folder" modal
  changeShowEventModal = (status) => {
    this.setState({
      showEventModal: status,
    });
  };

  // hides/shows "add event" modal
  changeShowSecondModal = (status) => {
    this.setState({
      showSecondModal: status,
    });
  };

  // removes current selected id when user exits "add folder" modal
  removeIdOnAddCancel = () => {
    this.setState({
      currentSelectedId: null,
    });
    this.changeShowModal(false);
  };

  // removes current selected id when user exits "delete folder" modal
  removeIdOnDeleteCancel = () => {
    this.setState({
      currentSelectedId: null,
    });
    this.changeShowSecondModal(false);
  };

  // removes current selected id when user exits "add event" modal
  removeIdOnEventCancel = () => {
    this.setState({
      currentSelectedId: null,
    });
    this.changeShowEventModal(false);
  };

  // sets the state of the current selected id
  changeCurrentSelectedId = (id) => {
    this.setState({ currentSelectedId: id });
  };

  // sets the state of newFolderName to use when new folder is added
  handleChange(event) {
    this.setState({ newFolderName: event.target.value });
  }

  // sets the state of newDate to be used to send date to parent
  handleChangeDate(event) {
    this.setState({ newDate: event.target.value });
  }

  // creates reference to folderData and current selected id, then calls determineType function
  // and passes those references as parameters
  determineTypeHandler = () => {
    let array = [...this.state.folderData];
    let currentId = this.state.currentSelectedId;
    this.determineType(array, currentId);
  };

  // ensures the current node is not an event
  // runs when user clicks add event in context menu
  // if the type equals event, does not allow user to create event 'inside an event'
  determineType = (treeNodes, searchID) => {
    for (var nodeIdx = 0; nodeIdx <= treeNodes.length - 1; nodeIdx++) {
      var currentNode = treeNodes[nodeIdx],
        currentId = currentNode.id,
        currentChildren = currentNode.content;

      if (currentId == searchID) {
        if (treeNodes[nodeIdx].type !== "event") {
          this.changeShowEventModal(true);
        } else {
          alert("Error: Cannot add event to an event");
        }
        return currentNode;
      } else {
        var foundDescendant = this.determineType(currentChildren, searchID);
        if (foundDescendant) {
          return foundDescendant;
        }
      }
    }

    return false;
  };

  // adds event to copy

  // creates reference to folderData and current selected id, then calls compareFolderNames function
  // and passes those references as parameters
  compareHandler = () => {
    let array = [...this.state.folderData];
    let currentId = this.state.currentSelectedId;
    this.compareFolderNames(array, currentId);
  };

  // ensures the inputted name does not exist before user adds a new folder
  compareFolderNames = (treeNodes, searchID) => {
    let currentContent = [];

    for (var nodeIdx = 0; nodeIdx <= treeNodes.length - 1; nodeIdx++) {
      var currentNode = treeNodes[nodeIdx],
        currentId = currentNode.id,
        currentChildren = currentNode.content;
      if (currentId == searchID) {
        for (var newIdx = 0; newIdx <= currentChildren.length - 1; newIdx++) {
          currentContent.push(currentChildren[newIdx].label.toUpperCase());
        }

        if (
          currentContent.includes(this.state.newFolderName.trim().toUpperCase())
        ) {
          alert(
            "Error: Folder name already exists. Please choose another name."
          );
        } else {
          this.addFolder();
        }

        return currentNode;
      } else {
        var foundDescendant = this.compareFolderNames(
          treeNodes[nodeIdx].content,
          searchID
        );
        if (foundDescendant) {
          return foundDescendant;
        }
      }
    }
    console.log(
      "Done trying " + treeNodes.length + " children. Returning False"
    );
    return false;
  };

  // adds folder to folderData and handles other processes (see below)
  addFolder = () => {
    let array = [...this.state.folderData];
    let currentId = this.state.currentSelectedId;

    // adds folder to folderData
    this.folderAdd(array, currentId);

    // sets active link id
    this.changeActiveLink();

    // ensures the right panel and left panel display properly -
    // folders ONLY on left panel/folders AND events in right panel
    this.populateOnUpdate(array);

    // sets current selcted id to null
    this.setState({
      currentSelectedId: null,
    });

    // sends new data to parent to update database
    // window.parent.App.vent.trigger(
    //   "explorer:activity:postExplorerUpdate",
    //   this.state.folderData
    // );

    // hides "add folder" modal
    this.changeShowModal(false);
  };

  // adds folder to folderData
  folderAdd = (treeNodes, searchID) => {
    let newObj = {
      icon: "fas fa-folder",
      label: this.state.newFolderName.trim(),
      eventId: null,
      eventGuid: null,
      type: "folder",
      id: uuid(),
      content: [],
    };

    for (var nodeIdx = 0; nodeIdx <= treeNodes.length - 1; nodeIdx++) {
      var currentNode = treeNodes[nodeIdx],
        currentId = currentNode.id,
        currentChildren = currentNode.content;

      if (currentId == searchID) {
        if (treeNodes[nodeIdx].type !== "event") {
          treeNodes[nodeIdx].content.push(newObj);

          // sets activeid to be set to activelinkid after this function runs
          // updates right panel to show contents of current folder
          this.setState({
            activeId: treeNodes[nodeIdx].id,
            folderDataRight: [...treeNodes[nodeIdx].content],
          });
        } else {
          alert("Error: Cannot add folder to an event");
        }
        return currentNode;
      } else {
        var foundDescendant = this.folderAdd(currentChildren, searchID);
        if (foundDescendant) {
          return foundDescendant;
        }
      }
    }
    console.log(
      "Done trying " + treeNodes.length + " children. Returning False"
    );
    return false;
  };

  // deletes folder in folderData and handles other processes (see below)
  deleteFolder = () => {
    let array = [...this.state.folderData];
    let currentId = this.state.currentSelectedId;

    // deletes folder in folderData
    this.folderDelete(array, currentId);

    // sets active link id
    this.changeActiveLink();

    // ensures the right panel and left panel display properly -
    // folders ONLY on left panel/folders AND events in right panel
    this.populateOnUpdate(array);

    // sets current selcted id to null
    this.setState({
      currentSelectedId: null,
    });

    // sends new data to parent to update database
    // window.parent.App.vent.trigger(
    //   "explorer:activity:postExplorerUpdate",
    //   this.state.folderData
    // );

    // hides "delete folder" modal
    this.changeShowSecondModal(false);
  };

  // deletes folder in folderData
  folderDelete = (treeNodes, searchID) => {
    for (var nodeIdx = 0; nodeIdx <= treeNodes.length - 1; nodeIdx++) {
      var currentNode = treeNodes[nodeIdx],
        currentId = currentNode.id,
        currentChildren = currentNode.content;

      if (currentId == searchID) {
        if (treeNodes[nodeIdx].type == "folder-master") {
          alert("Error: Cannot delete Master folder");
        } else if (treeNodes[nodeIdx].type == "event") {
          alert("Error: Cannot delete Event");
        } else if (treeNodes[nodeIdx].content.length !== 0) {
          alert("Error: Cannot delete folders with content");
        } else {
          treeNodes.splice(nodeIdx, 1);

          this.setState({
            folderDataRight: [],
          });
        }
        return currentNode;
      } else {
        // sets activeid to be set to activelinkid after this function runs
        this.setState({
          activeId: treeNodes[nodeIdx].id,
        });

        var foundDescendant = this.folderDelete(currentChildren, searchID);
        if (foundDescendant) {
          return foundDescendant;
        }
      }
    }

    return false;
  };

  // runs when user clicks a node
  // causes nodeSearch to run
  grabData = (folderId) => {
    this.nodeSearch(this.state.folderData, folderId);
  };

  // sets the right panel to display the contents of selected node
  // tells parent what id was clicked so user can return that
  // folder when they leave and re-enter session
  nodeSearch = (treeNodes, searchID) => {
    for (var nodeIdx = 0; nodeIdx <= treeNodes.length - 1; nodeIdx++) {
      var currentNode = treeNodes[nodeIdx],
        currentId = currentNode.id,
        currentChildren = currentNode.content;

      if (currentId == searchID) {
        if (treeNodes[nodeIdx].type !== "event") {
          this.setState(
            {
              folderData: [...currentNode.content],
              lastSelectedId: treeNodes[nodeIdx].id,
            },
            () => {
              console.log(`active id: ${this.state.lastSelectedId}`);
              // tells parent what the active id is
              // window.parent.App.vent.trigger(
              //   "App:EventHome:explorerActiveNode",
              //   this.state.lastSelectedId
              // );
            }
          );
        }
        return currentNode;
      } else {
        var foundDescendant = this.nodeSearch(currentChildren, searchID);
        if (foundDescendant) {
          return foundDescendant;
        }
      }
    }

    return false;
  };

  // runs the function eventDetermine() with folderId and folderData
  listenForEvent = (folderId) => {
    this.eventDetermine(this.state.folderData, folderId);
  };

  // runs when user double clicks node in left or right panel
  // if type of node is an event, directs user to that event
  eventDetermine = (treeNodes, searchID) => {
    for (var nodeIdx = 0; nodeIdx <= treeNodes.length - 1; nodeIdx++) {
      var currentNode = treeNodes[nodeIdx],
        currentId = currentNode.id,
        currentChildren = currentNode.content;

      if (currentId == searchID) {
        if (treeNodes[nodeIdx].type === "event") {
          // tells parent the eventId and eventGuid of what event was clicked
          // window.parent.App.vent.trigger(
          //   "App:calendar:onEventClicked",
          //   treeNodes[nodeIdx].eventId,
          //   treeNodes[nodeIdx].eventGuid
          // );
        }
        return currentNode;
      } else {
        var foundDescendant = this.eventDetermine(currentChildren, searchID);
        if (foundDescendant) {
          return foundDescendant;
        }
      }
    }

    return false;
  };

  // runs when component mounts
  // sets the right panel to show the contents of the folder which was
  // last selected in previous session
  showRightDataOnLoad = (treeNodes, searchID) => {
    for (var nodeIdx = 0; nodeIdx <= treeNodes.length - 1; nodeIdx++) {
      var currentNode = treeNodes[nodeIdx],
        currentId = currentNode.id,
        currentChildren = currentNode.content;

      if (currentId == searchID) {
        if (treeNodes[nodeIdx].type !== "event") {
          this.setState({
            folderDataRight: [...currentNode.content],
          });
        }
        return currentNode;
      } else {
        var foundDescendant = this.showRightDataOnLoad(
          currentChildren,
          searchID
        );
        if (foundDescendant) {
          return foundDescendant;
        }
      }
    }
    return false;
  };

  // (unfinished) recursiveSort to alphabetically sort left panel
  // recursiveSort = (treeNodes) => {
  //   for (var nodeIdx = 0; nodeIdx <= treeNodes.length - 1; nodeIdx++) {
  //     var currentNode = treeNodes[nodeIdx],
  //       currentChildren = currentNode.content;
  //     treeNodes.sort(function (a, b) {
  //       return a.label > b.label ? 1 : -1;
  //     });
  //     this.recursiveSort(currentChildren);
  //   }
  //   //   return treeNodes;
  // };

  ///////////////////////SEARCH FUNCTIONALITY (UNFINISHED)////////////////////////////////////
  // (unifinished) sets the state of searchInput to change the value of what is being searched
  // handleChangeSearch(event) {
  //   this.setState({ searchInput: event.target.value });
  // }

  // searchTree = () => {
  //   // recursively sift through folderData
  //   this.filterTree(this.state.folderData, this.state.searchInput);
  //   // filter baed on search
  //   // set state of folderdata right to folderdata filtered
  // };

  // filterTree = (treeNodes, userInput) => {
  //   let arr = [];
  //   for (var nodeIdx = 0; nodeIdx <= treeNodes.length - 1; nodeIdx++) {
  //     var currentNode = treeNodes[nodeIdx],
  //       currentLabel = currentNode.label,
  //       currentChildren = currentNode.content;
  //     if (currentLabel.includes(userInput)) {
  //       // alert("found");

  //       arr.push(currentNode);

  //       return currentNode;
  //     } else {
  //       var foundDescendant = this.filterTree(currentChildren, userInput);
  //       if (foundDescendant) {
  //         return foundDescendant;
  //       }
  //     }
  //   }

  //   return false;
  // };
  /////////////////////////////////////////////////////////////////////////////////////

  render() {
    const { showModal } = this.state;
    const { showSecondModal } = this.state;
    const { showEventModal } = this.state;

    const handleFocus = (e) => e.target.select();

    return (
      <div className="grid">
        {/* All properties passed into value are used in CustomLink.js */}
        <UpdateLocationContext.Provider
          value={{
            listenForEvent: this.listenForEvent,
            setIdNull: this.setIdNull,
            grabData: this.grabData,
            changeCurrentSelectedId: this.changeCurrentSelectedId,
          }}
        >
          {/* Top Navigation bar to be used when search is implemented */}
          {/* <ExpNavigation
            currentLocation={this.state.currentLocation}
            handleChangeSearch={this.handleChangeSearch}
            searchTree={this.searchTree}
            search={this.state.searchInput}
          /> */}

          {/* Left Panel. Passes down the included properties to ExpLeftPanel.js */}
          {/* <ExpLeftPanel
            folderDataLeft={this.state.folderDataLeft}
            determineTypeHandler={this.determineTypeHandler}
            activeLinkId={this.state.activeLinkId}
            compareHandler={this.compareHandler}
            addEvent={this.addEvent}
            deleteFolder={this.deleteFolder}
            folderData={this.state.folderData}
            setNewFolderName={this.setNewFolderName}
            currentSelectedId={this.state.currentSelectedId}
            changeShowModal={this.changeShowModal}
            changeShowSecondModal={this.changeShowSecondModal}
            changeShowEventModal={this.changeShowEventModal}
          /> */}

          {/* Right Panel. Passes down the included properties to ExpRightPanel.js */}
          <ExpRightPanel
            folderData={this.state.folderData}
            determineTypeHandler={this.determineTypeHandler}
            activeLinkId={this.state.activeLinkId}
            compareHandler={this.compareHandler}
            addEvent={this.addEvent}
            setNewFolderName={this.setNewFolderName}
            currentSelectedId={this.state.currentSelectedId}
            folderDataRight={this.state.folderDataRight}
            changeShowModal={this.changeShowModal}
            changeShowSecondModal={this.changeShowSecondModal}
            changeShowEventModal={this.changeShowEventModal}
          />
        </UpdateLocationContext.Provider>

        {/* Add Folder Modal */}
        <React.Fragment>
          {showModal ? (
            <Modal>
              <div className="container">
                <div className="row">
                  <div className="my-modal">
                    <h4 className="folderHeader">
                      <i className="fas fa-folder-plus"></i>
                      Add Folder
                    </h4>
                    <br></br>
                    <div className="col-md-12">
                      <input
                        id="addInput"
                        onKeyPress={this.bindEnterKeyFolder}
                        placeholder="untitled.."
                        type="text"
                        className="form-control form-group"
                        onChange={this.handleChange}
                        value={this.state.newFolderName}
                        onFocus={handleFocus}
                        autoFocus
                      />
                    </div>
                    <button
                      className="modal-close"
                      onClick={() => this.changeShowModal(false)}
                    >
                      <i className="fas fa-times"></i>
                    </button>

                    <div className="buttonRack">
                      <button
                        onClick={() => this.removeIdOnAddCancel()}
                        className="modalButton btn btn-default"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          this.compareHandler();
                        }}
                        className="mainButton modalButton btn btn-primary"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </Modal>
          ) : null}
        </React.Fragment>

        {/* Delete Folder Modal */}
        <React.Fragment>
          {showSecondModal ? (
            <Modal>
              <div className="container">
                <div className="row">
                  <div className="my-modal">
                    <h4 className="folderHeader">
                      <i className="fas fa-trash-alt"></i>
                      Delete Folder
                    </h4>
                    <br></br>
                    <div className="deleteItem col-md-12">
                      <p>
                        Are you sure you want to permanently delete this item?
                      </p>
                    </div>
                    <button
                      className="modal-close"
                      onClick={() => this.changeShowSecondModal(false)}
                    >
                      <i className="fas fa-times"></i>
                    </button>

                    <div className="buttonRack">
                      <button
                        onClick={() => this.removeIdOnDeleteCancel()}
                        className="modalButton btn btn-default"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          this.deleteFolder();
                        }}
                        className="mainButton modalButton btn btn-primary"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </Modal>
          ) : null}
        </React.Fragment>

        {/* Add Event Modal */}
        <React.Fragment>
          {showEventModal ? (
            <Modal>
              <div className="container">
                <div className="row">
                  <div className="my-modal">
                    <h4 className="folderHeader">
                      {/* <i className="fas fa-trash-alt"></i> */}
                      Add Event
                    </h4>
                    <br></br>
                    <div className="col-md-12">
                      <p>Select Date: </p>
                      <input
                        onKeyPress={this.bindEnterKeyEvent}
                        className="form-control form-group"
                        type="date"
                        onChange={this.handleChangeDate}
                        value={this.state.newDate}
                        onFocus={handleFocus}
                      />
                    </div>
                    <button
                      className="modal-close"
                      onClick={() => this.changeShowEventModal(false)}
                    >
                      <i className="fas fa-times"></i>
                    </button>

                    <div className="buttonRack">
                      <button
                        onClick={() => this.removeIdOnEventCancel()}
                        className="modalButton btn btn-default"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          this.addEvent();
                        }}
                        className="mainButton modalButton btn btn-primary"
                      >
                        Submit Date
                      </button>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </Modal>
          ) : null}
        </React.Fragment>
      </div>
    );
  }
}

export default Explorer;
