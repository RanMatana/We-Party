import React, { Component } from 'react'
import Sidebar from '../Components/Sidebar';
import { withRouter } from 'react-router-dom';
import MP from '../Components/MP';

class Places extends Component {
    render() {
        return (
            <div>
                <Sidebar />
                <div style={{ float: 'right', backgroundColor: 'white', width: 1270, height: 862,left:20 }}>
                    <MP />
                </div>
            </div>
        )
    }
}
export default withRouter(Places);