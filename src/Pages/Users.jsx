import React, { Component } from 'react'
import Sidebar from '../Components/Sidebar';
import { withRouter } from 'react-router-dom';
import MT from '../Components/MT';

class Users extends Component {
    render() {
        return (
            <div>
                <Sidebar />
                <div style={{ float: 'right', backgroundColor: 'white', width: 1270, height: 862,left:20 }}>
                    <MT />
                </div>
            </div>
        )
    }
}
export default withRouter(Users);