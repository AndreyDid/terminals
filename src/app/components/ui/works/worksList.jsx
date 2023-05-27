import React from "react";
import {useSelector} from "react-redux";
import {getWorkLoadingStatus, getWorksByIds} from "../../../store/works";
import Work from "./work";
import classes from "./works.module.css";
import PropTypes from "prop-types";

const WorksList = ({works}) => {
    const isLoading = useSelector(getWorkLoadingStatus())
    const worksList = useSelector(getWorksByIds(works))

    if (!isLoading) {
        return (
            <div className={classes.works}>
                {worksList.map(work => (
                    <Work key={work._id} {...work}/>
                ))}
            </div>
        )
    }
    return (
        <div className='card-text placeholder-glow'>
            <span className="placeholder col-7 me-1"></span>
            <span className="placeholder col-4"></span>
        </div>
    )

}
WorksList.propTypes = {
    works: PropTypes.array
}

export default WorksList