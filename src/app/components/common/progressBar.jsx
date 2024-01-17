import React from "react";

const ProgressBar = ({percentage}) => {
    if (!percentage) {
        return null
    }
    return (
        <div>
            <div className="progress mb-4" role="progressbar" aria-label="Example with label" aria-valuenow="25"
                 aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar" style={{width: percentage + '%'}}>{Math.floor(percentage)}%</div>
            </div>
        </div>
    )
}
export default ProgressBar