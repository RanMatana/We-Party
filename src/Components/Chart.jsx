import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

var url = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site03/api/place';

export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            charData: {},
        };
    }
    componentWillMount() {
        if (this.props.type === 'places_likes') {
            this.getPlacesLikes()
        }
    }

    async getPlacesLikes() {
        let s = await this.getPlacesWithFetch();
        //console.log('s==>',s)
        let temp_names = [], temp_likes = []

        for (let i = 0; i < s.length; i++) {
            temp_names.push(s[i].Name_Place)
            temp_likes.push(s[i].Likes_Place)
        }

        this.setState({ names: temp_names, likes: temp_likes }, () => {
            this.setState({
                charData: {
                    labels: this.state.names,
                    datasets: [{
                        label: 'Popolation',
                        data: this.state.likes,
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
    render() {
        return (
            <div className="chart" style={{ width: 1250, height: 862, backgroundColor: 'white' }}  >
                <Bar
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
