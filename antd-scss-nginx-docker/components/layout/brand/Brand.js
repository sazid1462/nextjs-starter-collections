import React from 'react';
/* SCSS */
import '../../../styles/scss/brand.scss'

const Brand = ({icon, brandText, className}) => {
    return (
        <div className={className}>
            <span className="icon">{icon}</span>
            <span className="text">{brandText}</span>
        </div>
    );
};

Brand.defaultProps = {
    className: "brand",
    brandText: "Brand"
};

export default Brand;
