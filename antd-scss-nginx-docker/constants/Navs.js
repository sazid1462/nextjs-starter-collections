import React from 'react';
import {Icon} from "antd";
import {ABOUT_PATH, DASHBOARD_PATH, LOGIN_PATH} from '../constants/Routes';

const Navs = [
    {
        key: 'dashboard',
        title: 'Dashboard',
        path: DASHBOARD_PATH,
        icon: <Icon type="pie-chart"/>,
        subMenu: null
    },
    {
        key: 'about',
        title: 'About',
        path: ABOUT_PATH,
        icon: <Icon type="user"/>,
        subMenu: null
    },
    {
        key: 'login',
        title: 'Login',
        path: LOGIN_PATH,
        icon: <Icon type="login"/>,
        subMenu: null
    }
];

export default Navs;
