import React from "react";
import "./ExpNavigation.css";

class ExpNavigation extends React.Component {
  render() {
    return (
      <div className="exp-navigation">
        <div className="exp-location">
          {/* Possibly Change To Header */}
          <input type="text" value="ourStudio Explorer" readOnly></input>
        </div>

        <div className="exp-search">
          {/* <input
            type="text"
            placeholder="Search Event"
            onChange={this.props.handleChangeSearch}
            value={this.props.searchInput}
          ></input> */}
          {/* <button onClick={this.props.searchTree}>Search</button> */}
        </div>
      </div>
    );
  }
}

export default ExpNavigation;
