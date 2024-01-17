import React from "react";
import {useSelector} from "react-redux";
import {getWorkLoadingStatus, getWorksByIds} from "../../../store/works";
import Work from "./work";
import PropTypes from "prop-types";
import {sumPrice} from "../../../utils/sumPrice";
import {getBodyById} from "../../../store/body";

const WorksList = ({city, works, handleSum, sumTerminal, bodyTerminal, setting,}) => {

    const sumTerminalDefault = setting && setting[0].sumTerminal
    const sumPgiDefault = setting && setting[0].sumPgi

    const isLoading = useSelector(getWorkLoadingStatus())
    const worksList = useSelector(getWorksByIds(works))
    const bodyList = useSelector(getBodyById(bodyTerminal))
    const listWorksSum = worksList.map(work => work.sum)
    const sumWorks = sumPrice(listWorksSum)

    if (!isLoading && bodyList) {
        const updateWorks = sumTerminal - sumWorks - (bodyList.name === 'ПГИ' ? sumPgiDefault : sumTerminalDefault)

        return (
            <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex flex-column '>
                    <div className='fst-italic fw-light' style={{fontSize: 12}}>
                        {city}
                    </div>
                    <div>
                        {worksList.map(work => (
                                <Work handleSum={handleSum} key={work._id} {...work} />
                        ))}
                    </div>
                </div>
                <div>
                    {updateWorks !== 0 && (
                        <div
                            className='bg-danger rounded-pill'
                            style={{height: 10, width: 10}}
                        ></div>
                    )}
                </div>
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