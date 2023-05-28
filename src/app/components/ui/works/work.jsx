import React from "react";
import classes from "./works.module.css";
import history from "../../../utils/history";
import PropTypes from "prop-types";

const Work = ({name, sum, _id}) => {
    const handleClick = (id) => {
        // history.push(history.location.pathname + `/${id}/editWork`)
        history.push(history.location.pathname + `${id}/editWork`)
    }
    return (
            <button className={classes.work} onClick={() => handleClick(_id)}>{name}<span className={classes.workSum}>{sum}</span></button>
    )
}
Work.propTypes = {
    name: PropTypes.string,
    sum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _id: PropTypes.string
}

export default React.memo(Work)