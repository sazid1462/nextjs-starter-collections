import React from "react";
import App from "next/app";
import nextCookie from "next-cookies";
import PageWrapper from "../components/common/PageWrapper";
import AuthContextProvider from "../contexts/AuthContextProvider";
import {Router} from "next/router";
import "animate.css";
import {message} from "antd";

Router.events.on("routeChangeComplete", () => {
    if (process.env.NODE_ENV !== "production") {
        const els = document.querySelectorAll("link[href*=\"/_next/static/css/styles.chunk.css\"]");
        const timestamp = new Date().valueOf();
        els[0] && (els[0].href = "/_next/static/css/styles.chunk.css?v=" + timestamp);
    }
});

class MyApp extends App {

    static getInitialProps = async ({Component, ctx}) => {

        const {auth} = nextCookie(ctx);
        const pageProps = Component.getInitialProps && (await Component.getInitialProps(ctx)) || {};

        return {pageProps, auth};
    };

    componentDidCatch(error, _errorInfo) {
        super.componentDidCatch(error, _errorInfo);
        console.error(error, _errorInfo);
        message.error(error.message);
    }

    render() {

        const {Component, pageProps, auth} = this.props;

        return (
            <AuthContextProvider auth={auth}>
                <PageWrapper>
                    <Component {...pageProps} />
                </PageWrapper>
            </AuthContextProvider>
        );
    }
}

export default MyApp;
