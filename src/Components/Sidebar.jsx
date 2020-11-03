import React from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import PeopleIcon from '@material-ui/icons/People';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import BuildIcon from '@material-ui/icons/Build';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

export default function Sidebar() {
    return (
        <div style={{ height: 862, position: 'absolute' }}>
            <ProSidebar >
                <Menu iconShape="square">
                    <MenuItem icon={<PeopleIcon />} >Requests
                    <Link to="/home/" /> </MenuItem>
                    <SubMenu icon={<EqualizerIcon />} title="Statistics" >
                        <MenuItem>Likes
                        <Link to="/statisticslikes/" /> </MenuItem>
                        <MenuItem >Requests
                        <Link to="/statisticsreqs/" /> </MenuItem>
                    </SubMenu>
                    <SubMenu icon={<BuildIcon />} title="Management" >
                        <MenuItem>Users
                        <Link to="/users/" /></MenuItem>
                        <MenuItem >Places
                        <Link to="/places/" /></MenuItem>
                    </SubMenu>
                    <MenuItem icon={<PowerSettingsNewIcon />} >Log out
                    <Link to="/" /> </MenuItem>
                </Menu>
            </ProSidebar>
        </div>
    )
}
