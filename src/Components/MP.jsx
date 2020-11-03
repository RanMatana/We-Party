import React, { Component } from 'react';
import MaterialTable from 'material-table';

var url = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site03/api/place';

export default class MP extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { title: 'Name', field: 'Name_Place' },
                { title: 'Address', field: 'Address_Place' },
                { title: 'Area', field: 'Area' },
                { title: 'Latitude', field: 'Latitude_Place' },
                { title: 'Longitude', field: 'Longitude_Place' },
                { title: 'Image', field: 'Image_Url' },
                { title: 'Cover', field: 'Cover_Image' },
                { title: 'Likes', field: 'Likes_Place' },
            ],
            data: [],
        }
    }
    async componentDidMount() {
        await this.getPlaces();
    }

    getPlaces = async () => {
        let s = await this.getPlacesWithFetch();
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
    btnUpdate = async (place) => {
        let s = await this.UpdatePlaceWithFetch(place);
        console.log('returned value= ' + s);
        if (s != null) this.getPlaces();
        else console.log('Something Fall');
    }
    UpdatePlaceWithFetch = async (place) => {
        let returnedObj = null;
        await fetch(url,
            {
                method: 'PUT', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
                body: JSON.stringify({
                    "Place_ID": place.Place_ID,
                    "Name_Place": place.Name_Place,
                    "Address_Place": place.Address_Place,
                    "Area": place.Area,
                    "Latitude_Place": place.Latitude_Place,
                    "Longitude_Place": place.Longitude_Place,
                    "About_Place": place.About_Place,
                    "Image_Url": place.Image_Url,
                    "Cover_Image": place.Cover_Image,
                    "Likes_Place": place.Likes_Place
                })
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                console.log(data);
                if (data !== `place with id = ${place.Place_ID} exsits but could not be modified!!!`
                    && data !== `place with id = ${place.Place_ID} was not found to update!!!`) {
                    returnedObj = data;
                }
                else {
                    console.log('The Place No Updated!!!');
                    returnedObj = null;
                }
            })
            .catch(function (err) {
                alert(err);
            });
        return returnedObj;
    }
    btnDelete = async (id) => {
        let s = await this.DeletePlaceWithFetch(id);
        console.log('returned value= ' + s);
        if (s != null) this.getPlaces();
        else console.log('Something Fall');
    }
    DeletePlaceWithFetch = async (id) => {
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
                if (data !== `place with id = ${id} exsits but could not be deleted!!!` &&
                    data !== `place with id = ${id} was not found to delete!!!`) {
                    returnedObj = data;
                }
                else {
                    console.log('The place No Deleted!!!');
                    returnedObj = null;
                }
            })
            .catch(function (err) {
                alert(err);
            });
        return returnedObj;
    }
    btnInsert = async (place) => {
        let s = await this.InsertPlaceWithFetch(place);
        console.log('returned value= ' + s);
        if (s != null) this.getPlaces();
        else console.log('Something Fall');
    }
    InsertPlaceWithFetch = async (place) => {
        let returnedObj = null;
        await fetch(url + '/',
            {
                method: 'POST', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
                body: JSON.stringify({
                    "Place_ID": place.Place_ID,
                    "Name_Place": place.Name_Place,
                    "Address_Place": place.Address_Place,
                    "Area": place.Area,
                    "Latitude_Place": place.Latitude_Place,
                    "Longitude_Place": place.Longitude_Place,
                    "About_Place": place.About_Place,
                    "Image_Url": place.Image_Url,
                    "Cover_Image": place.Cover_Image,
                    "Likes_Place": place.Likes_Place
                })
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                console.log(data);
                if (data !== `place with id = ${place.Place_ID} was not created in DB!!!` &&
                    `place exist in DB!!!`) {
                    returnedObj = data;
                }
                else {
                    console.log('The Place No Deleted!!!');
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
                    title="Places List"
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
                                }, this.btnDelete(oldData.Place_ID),
                                    600);
                            }),
                    }}
                />
            </React.Fragment>
        );
    }
}