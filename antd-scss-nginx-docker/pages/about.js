import React from "react";
import DefaultLayout from "../components/layout/DefaultLayout";
import Head from "next/head";
import PageWrapper from "../components/common/PageWrapper";
import {PageHeader} from "antd";

const pageHeader = <PageHeader title="About Us!" subTitle="This is a subtitle"/>;

const About = () => (
    <DefaultLayout>
        <Head>
            <title>About Us</title>
        </Head>
        <PageWrapper
            pageHeader={pageHeader}
        >
            <h1>About Us</h1>
        </PageWrapper>
    </DefaultLayout>
);

export default About
