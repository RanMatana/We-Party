import React, { Component } from 'react';
import MaterialTable from 'material-table';

var url = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site03/api/user';

export default class MT extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { title: 'First Name', field: 'First_Name' },
                { title: 'Last Name', field: 'Last_Name' },
                { title: 'Email', field: 'Email' },
                { title: 'Url Photo', field: 'Url_Photo' },
                { title: 'Latitude', field: 'Latitude' },
                { title: 'Longitude', field: 'Longitude' },
                { title: 'Token', field: 'Token_User' },
                { title: 'Range', field: 'Range_User' },
            ],
            data: [],
        }
    }
    async componentDidMount() {
        await this.getUsers();
    }

    getUsers = async () => {
        let s = await this.getUsersWithFetch();
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
    getUsersWithFetch = async () => {
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
                if (data !== "could not get all the students!\n") {
                    returnedObj = data;
                }
                else {
                    console.log('no students to show');
                    returnedObj = null;
                }
            })
            .catch(function (err) {
                alert(err);
            });
        return returnedObj;
    }
    btnUpdate = async (user) => {
        let s = await this.UpdateUserWithFetch(user);
        console.log('returned value= ' + s);
        if (s != null) {
            this.getUsers();
        }
        else console.log('Something Fall');
    }
    UpdateUserWithFetch = async (user) => {
        let returnedObj = null;
        await fetch(url,
            {
                method: 'PUT', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
                body: JSON.stringify({
                    "User_ID": user.User_ID,
                    "First_Name": user.First_Name,
                    "Last_Name": user.Last_Name,
                    "Email": user.Email,
                    "Password": user.Password,
                    "Url_Photo": user.Url_Photo,
                    "Latitude": user.Latitude,
                    "Longitude": user.Longitude,
                    "Token_User": user.Token_User,
                    "Range_User": user.Range_User
                })
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                console.log(data);
                if (data !== `user with id = ${user.User_ID} exsits but could not be modified!!!`
                    && data !== `user with id = ${user.User_ID} was not found to update!!!`) {
                    returnedObj = data;
                }
                else {
                    console.log('The User No Updated!!!');
                    returnedObj = null;
                }
            })
            .catch(function (err) {
                alert(err);
            });
        return returnedObj;
    }
    btnDelete = async (id) => {
        let s = await this.DeleteUserWithFetch(id);
        console.log('returned value= ' + s);
        if (s != null) this.getUsers();
        else console.log('Something Fall');
    }
    DeleteUserWithFetch = async (id) => {
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
                if (data !== `user with id = ${id} exsits but could not be deleted!!!` &&
                    data !== `user with id = ${id} was not found to delete!!!`) {
                    returnedObj = data;
                }
                else {
                    console.log('The User No Deleted!!!');
                    returnedObj = null;
                }
            })
            .catch(function (err) {
                alert(err);
            });
        return returnedObj;
    }
    btnInsert = async (user) => {
        let s = await this.InsertUserWithFetch(user);
        console.log('returned value= ' + s);
        if (s != null) this.getUsers();
        else console.log('Something Fall');
    }
    InsertUserWithFetch = async (user) => {
        let returnedObj = null;
        await fetch(url + '/',
            {
                method: 'POST', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
                body: JSON.stringify({
                    "User_ID": user.User_ID,
                    "First_Name": user.First_Name,
                    "Last_Name": user.Last_Name,
                    "Email": user.Email,
                    "Password": user.Password,
                    "Url_Photo": user.Url_Photo,
                    "Latitude": user.Latitude,
                    "Longitude": user.Longitude,
                    "Token_User": user.Token_User,
                    "Range_User": user.Range_User
                })
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                console.log(data);
                if (data !== `user with id = ${user.User_ID} was not created in DB!!!` &&
                    `user exist in DB!!!`) {
                    returnedObj = data;
                }
                else {
                    console.log('The User No Deleted!!!');
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
                    title="Users List"
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
                                }, this.btnDelete(oldData.User_ID),
                                    600);
                            }),
                    }}
                />
            </React.Fragment>
        );
    }
}