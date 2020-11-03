import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import MR from '../Components/MR';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div >
        <Sidebar />
        <div style={{ float: 'right', backgroundColor: 'white', width: 1270, height: 862, left: 20 }}>
          <MR />
        </div>
      </div>
    );
  }
}
export default withRouter(Home);