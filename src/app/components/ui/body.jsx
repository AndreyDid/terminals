import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getBodyById, getBodyLoadingStatus, loadBodyList} from "../../store/body";
import PropTypes from "prop-types";

const Body = ({id}) => {
    const isLoading = useSelector(getBodyLoadingStatus())
    const body = useSelector(getBodyById(id))
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadBodyList())
    }, [id])
    if (!isLoading) {
        return <p className='m-0 p-0' style={{ fontSize: 10 }}>{body === undefined ? 'Error' : body.name}</p>
    } return (
        <div className='card-text placeholder-glow'>
            <span className="placeholder col-5"></span>
        </div>
    )
}
Body.propTypes = {
    id: PropTypes.string
}

export default Body