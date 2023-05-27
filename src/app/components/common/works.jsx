import React from "react";
import PropTypes from "prop-types";

const Works = ({data}) => {
    return (
        <div className="d-flex m-2">
            {data.map(d => (
                <div>
                    <div className="me-1 p-1 border rounded-1" style={{backgroundColor: `${d.color}`}}>{d.name}</div>
                </div>
            ))}
        </div>
    )
}
Works.propTypes = {
    data: PropTypes.array,
}
export default Works