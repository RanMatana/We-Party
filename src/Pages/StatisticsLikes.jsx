import React from 'react'
import { withRouter } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Chart from '../Components/Chart';

class StatisticsLikes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charData: {},
        }
    }
    render() {
        return (
            <div >
                <Sidebar />
                <div style={{ float: 'right', backgroundColor: 'white', width: 1265, height: 862 }}>
                    <Chart type="places_likes"/>
                </div>
            </div >
        )
    }
}
export default withRouter(StatisticsLikes);