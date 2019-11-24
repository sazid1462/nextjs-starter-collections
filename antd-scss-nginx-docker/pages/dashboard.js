import React, {useContext} from 'react';
import {Avatar, Card, Col, PageHeader, Row} from 'antd';
/* SCSS */
import '../styles/scss/dashboard.scss'

import PageWrapper from "../components/common/PageWrapper";
import DefaultLayout from "../components/layout/DefaultLayout";
import {AuthContext} from "../contexts/AuthContextProvider";
import {withAuthSync} from "../components/common/withAuthSync";

const {Meta} = Card;

const Dashboard = () => {

    const authContext = useContext(AuthContext);

    const pageHeader = <PageHeader title="Dashboard" subTitle="This is a subtitle"/>;

    return (
        <DefaultLayout>
            <PageWrapper
                pageHeader={pageHeader}
            >
                <Row gutter={4}>
                    <Col xs={24} sm={8}>
                        <Card>
                            <Meta
                                avatar={<Avatar icon='user'/>}
                                title="User"
                                description={authContext.user.name}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                </Row>
            </PageWrapper>
        </DefaultLayout>
    );
};


export default withAuthSync(Dashboard);
