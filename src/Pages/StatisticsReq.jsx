import React from 'react'
import { withRouter } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import ChartLine from '../Components/ChartLine';

class StatisticsLikes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charData: {}
        }
    }
    render() {
        return (
            <div  >
                <Sidebar />
                <div style={{ float: 'right', backgroundColor: 'white', width: 1265, height: 862 }}>
                    <ChartLine type="places_requests" />
                </div>
            </div >
        )
    }
}
export default withRouter(StatisticsLikes);