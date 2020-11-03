import React, { Component } from 'react';
import MaterialTable from 'material-table';

var url = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site03/api/request';
var urlUsers = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site03/api/user';
var urlPlaces = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site03/api/place';

export default class MR extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { title: 'From', field: 'User_ID' },
                { title: 'To', field: 'To_Place' },
                { title: 'Status', field: 'Status' },
                { title: 'Date', field: 'Date' },
            ],
            data: [],
        }
    }
    async componentDidMount() {
        await this.getRequests();
    }
    getRequests = async () => {
        let s = await this.getRequestsWithFetch();
        console.log('returned value= ' + s);

        if (s != null) {
            this.setState({
                data: s
            });
        }
        else {
            console.log('No Sucess');
        }
    }
    getRequestsWithFetch = async () => {
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
                console.log(data);
                if (data !== "could not get all the requests!\n") {
                    returnedObj = data;
                }
                else {
                    console.log('no requests to show');
                    returnedObj = null;
                }
            })
            .catch(function (err) {
                alert(err);
            });
        return returnedObj;
    }
    btnUpdate = async (request) => {
        let s = await this.UpdateRequestWithFetch(request);
        console.log('returned value= ' + s);
        if (s != null) {
            this.getRequests();
            let namePlace = await this.getNamePlaceByID(request.To_Place);
            let take = await this.getTokenUserByID(request.User_ID);
            if (take != null && namePlace != null) {
                await this.pushFromServer(take.Token_User, namePlace.Name_Place);
            }
        }
        else console.log('Something Fall');
        // notification to user
    }
    pushFromServer = async (token, name) => {
        let pnd = {
            to: token,
            title: 'Your request was successful',
            body: `Club team of ${name} is waiting for you, please arrive by 23:30`
        };
        fetch('http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site03/sendPushNotificationByClick',
            {
                method: 'POST',
                body: JSON.stringify(pnd),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => {
                return response.json();
            })
            .then(json => {
                if (json != null) {
                    console.log(json.data);
                } else {
                    alert('err json');
                }
            });
    }
    getNamePlaceByID = async (id) => {
        let returnedObj = null;
        await fetch(urlPlaces + `/${id}`,
            {
                method: 'GET', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                console.log(data);
                if (data !== `place witn id ${id} was not found!!!`) {
                    returnedObj = data;
                }
                else {
                    console.log('no found user');
                    returnedObj = null;
                }
            })
            .catch(function (err) {
                alert(err);
            });
        return returnedObj;
    }
    getTokenUserByID = async (id) => {
        let returnedObj = null;
        await fetch(urlUsers + `/${id}`,
            {
                method: 'GET', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                console.log(data);
                if (data !== `user witn id ${id} was not found!!!`) {
                    returnedObj = data;
                }
                else {
                    console.log('no found user');
                    returnedObj = null;
                }
            })
            .catch(function (err) {
                alert(err);
            });
        return returnedObj;
    }
    UpdateRequestWithFetch = async (request) => {
        let returnedObj = null;
        await fetch(url,
            {
                method: 'PUT', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
                body: JSON.stringify({
                    "Request_ID": request.Request_ID,
                    "User_ID": request.User_ID,
                    "To_Place": request.To_Place,
                    "Status": request.Status,
                    "Date": request.Date
                })
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                console.log(data);
                if (data !== `request with id = ${request.Request_ID} exsits but could not be modified!!!`
                    && data !== `request with id = ${request.Request_ID} was not found to update!!!`) {
                    returnedObj = data;
                }
                else {
                    console.log('The Request No Updated!!!');
                    returnedObj = null;
                }
            })
            .catch(function (err) {
                alert(err);
            });
        return returnedObj;
    }
    btnDelete = async (id) => {
        let s = await this.DeleteRequestWithFetch(id);
        console.log('returned value= ' + s);
        if (s != null) this.getRequests();
        else console.log('Something Fall');
    }
    DeleteRequestWithFetch = async (id) => {
        let returnedObj = null;
        await fetch(url + `/${id}`,
            {
                method: 'DELETE', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                console.log(data);
                if (data !== `request with id = ${id} exsits but could not be deleted!!!` &&
                    data !== `request with id = ${id} was not found to delete!!!`) {
                    returnedObj = data;
                }
                else {
                    console.log('The Request No Deleted!!!');
                    returnedObj = null;
                }
            })
            .catch(function (err) {
                alert(err);
            });
        return returnedObj;
    }
    btnInsert = async (request) => {
        let s = await this.InsertRequestWithFetch(request);
        console.log('returned value= ' + s);
        if (s != null) this.getRequests();
        else console.log('Something Fall');
    }
    InsertRequestWithFetch = async (request) => {
        let returnedObj = null;
        await fetch(url + '/',
            {
                method: 'POST', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
                body: JSON.stringify({
                    "Request_ID": request.Request_ID,
                    "User_ID": request.User_ID,
                    "To_Place": request.To_Place,
                    "Status": request.Status,
                    "Date": request.Date
                })
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                console.log(data);
                if (data !== `request with id = ${request.Request_ID} was not created in DB!!!` &&
                    `request exist in DB!!!`) {
                    returnedObj = data;
                }
                else {
                    console.log('The Request No Deleted!!!');
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
            <React.Fragment>
                <MaterialTable
                    title="Requests List"
                    columns={this.state.columns}
                    data={this.state.data}
                    editable={{
                        onRowAdd: (newData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    this.setState((prevState) => {
                                        const data = [...prevState.data];
                                        data.push(newData);
                                        return { ...prevState, data };
                                    });
                                }, this.btnInsert(newData)
                                    , 600);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        this.setState((prevState) => {
                                            const data = [...prevState.data];
                                            data[data.indexOf(oldData)] = newData;
                                            return { ...prevState, data };
                                        });
                                    }
                                }, this.btnUpdate(newData)
                                    , 600);
                            }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    this.setState((prevState) => {
                                        const data = [...prevState.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        return { ...prevState, data };
                                    });
                                }, this.btnDelete(oldData.Request_ID),
                                    600);
                            }),
                    }}
                />
            </React.Fragment>
        );
    }
}