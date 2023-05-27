import React from "react";
import PropTypes from "prop-types";

const ContainerFormWrapper = ({ children }) => {
    return (
        <div className="container-lg mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow-sm bg-light p-4 rounded-1 border">
                    {children}
                </div>
            </div>
        </div>
    );
};
ContainerFormWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ContainerFormWrapper;