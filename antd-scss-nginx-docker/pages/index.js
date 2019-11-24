import React from "react";
import PageWrapper from "../components/common/PageWrapper";
import DefaultLayout from "../components/layout/DefaultLayout";
import {PageHeader} from "antd";

const Home = () => {
    const pageHeader = <PageHeader title="Hello World!" subTitle="This is a subtitle"/>;
    return (
        <DefaultLayout>
            <PageWrapper
                pageHeader={pageHeader}
            >
                <h1>Hello World!</h1>
            </PageWrapper>
        </DefaultLayout>
    )
};

export default Home;
