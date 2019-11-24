import React, { Fragment, useContext } from "react";
import WrappedLoginForm from "../components/forms/LoginForm";
import Head from "next/head";
import nextCookie from "next-cookies";
import { redirectTo } from "../components/common/Redirect";
import { DASHBOARD_PATH } from "../constants/Routes";


const Login = () => {

    return (
        <Fragment>
            <Head>
                <title>Log In</title>
            </Head>
            <WrappedLoginForm />
        </Fragment>
    );
};

Login.getInitialProps =  async (ctx) => {

    const { auth } = nextCookie(ctx);
    if (auth) return redirectTo(DASHBOARD_PATH, ctx);
};

export default Login;
