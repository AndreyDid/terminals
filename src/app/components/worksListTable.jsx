 import React from "react";
import {removeWork} from "../store/works";
import Button from "./common/button";
import history from "../utils/history";
import useTerminals from "../hooks/useTerminals";
import _ from "lodash";

const WorksListTable = () => {
    const {dispatch, works, workLoading} = useTerminals()

    const filterWorksSum = _.orderBy(works, ['sum'], ['asc'])

    const handleClick = (id) => {
        history.push( `/${id}/editWork`)
    }
    const handleDelete = (id) => {
        dispatch(removeWork(id))
    }

    return (
        <div>
            {!workLoading && filterWorksSum.length > 0 && (
                <table className="table">
                    <tbody>
                    {filterWorksSum.map(work => (
                        <tr key={work._id}>
                            <td>{work.name}</td>
                            <td>{work.sum}</td>
                            <td></td>
                            <td>
                                <div className='d-flex justify-content-end'>
                                    <div className='me-1'>
                                        <Button
                                            type='button'
                                            color='light'
                                            size='btn-sm'
                                            rounded='rounded-1'
                                            icon={<i className="bi bi-pencil-square"></i>}
                                            onClick={() => handleClick(work._id)}
                                        />
                                    </div>
                                    <div>
                                        <Button
                                            type='button'
                                            color='danger'
                                            size='btn-sm'
                                            rounded='rounded-1'
                                            icon={<i className="bi bi-trash"></i>}
                                            onClick={() => handleDelete(work._id)}
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default WorksListTable