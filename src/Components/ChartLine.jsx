import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

var url = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site03/api/place';
var urlReq = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site03/api/request';

export default class ChartLine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            charData: {},
        };
    }
    componentWillMount() {
        if (this.props.type === 'places_requests') {
            this.getPlaces()
        }
    }

    async getPlaces() {
        let s = await this.getPlacesWithFetch();
        let req = await this.getRequestByID();
        console.log('s==>', s);
        console.log('req==>', req);
        let temp_names = [];
        let temp_req = Array.apply(null, new Array(s.length)).map(Number.prototype.valueOf, 0);

        for (let i = 0; i < s.length; i++) {
            temp_names.push(s[i].Name_Place);
        }
        for (let i = 0; i < s.length; i++) {
            for (let j = 0; j < req.length; j++) {
                if (s[i].Place_ID === req[j].To_Place) {
                    temp_req[i]++;
                }
            }
        }
        this.setState({ names: temp_names, req: temp_req }, () => {
            console.log("names", this.state.names);
            console.log("request", this.state.req);
            this.setState({
                charData: {
                    labels: this.state.names,
                    datasets: [{
                        label: 'Popolation',
                        data: this.state.req,
                        backgroundColor: [
                            'rgba(255,99,132,0.6)',
                            'rgba(54,162,235,0.6)',
                            'rgba(255,206,86,0.6)',
                            'rgba(75,192,192,0.6)',
                            'rgba(153,102,255,0.6)',
                            'rgba(255,159,64,0.6)',
                            'rgba(255,99,132,0.6)',
                            'rgba(54,162,235,0.6)',
                            'rgba(255,206,86,0.6)',
                            'rgba(75,192,192,0.6)',
                            'rgba(153,102,255,0.6)',
                            'rgba(255,159,64,0.6)'
                        ]
                    }]
                },
            })
        })
    }
    getRequestByID = async () => {
        let returnedObj = null;
        await fetch(urlReq,
            {
                method: 'GET', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                if (data !== "could not get all the places!\n") {
                    returnedObj = data;
                }
                else {
                    console.log('no places to show');
                    returnedObj = null;
                }
            })
            .catch(function (err) {
                alert(err);
            });
        return returnedObj;
    }
    getPlacesWithFetch = async () => {
        let returnedObj = null;
        await fetch(url,
            {
                method: 'GET', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                if (data !== "could not get all the places!\n") {
                    returnedObj = data;
                }
                else {
                    console.log('no places to show');
                    returnedObj = null;
                }
            })
            .catch(function (err) {
                alert(err);
            });
        return returnedObj;
    }

    // static defaultProps = {
    //     text: '',
    // }
    render() {
        return (
            <div className="chart" style={{ width: 1250, height: 862, backgroundColor: 'white' }}  >
                <Line
                    data={this.state.charData}
                    options={{
                        title: {
                            display: true,
                            text: 'likes',
                            fontSize: 35,
                            fontColor: 'white',
                            fullWidth: true,
                        },
                        legend: {
                            display: false,
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />
            </div>
        );
    }
}
