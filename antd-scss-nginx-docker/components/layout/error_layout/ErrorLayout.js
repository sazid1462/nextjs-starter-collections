import React from 'react';
/* SCSS */
import './../../../styles/scss/error_layout.scss';

const ErrorLayout = ({status, subTitle, children}) => {

    return (
        <div className="error_layout">
            <h1 className="status">{status}</h1>
            <h4 className="sub_title">{subTitle}</h4>
            <div>
                {children}
            </div>
        </div>
    );
};

export default ErrorLayout;
