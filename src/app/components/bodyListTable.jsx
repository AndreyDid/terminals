import React from "react";
import useTerminals from "../hooks/useTerminals";
import Button from "./common/button";
import {removeBody} from "../store/body";

const BodyListTable = () => {
    const {dispatch, body, bodyLoading} = useTerminals()

    const handleDelete = (id) => {
        dispatch(removeBody(id))
    }

    return (
        <>
            {!bodyLoading && (
                <table className='table'>
                    <tbody>
                    {body.map(body => (
                        <tr key={body._id}>
                            <td>{body.name}</td>
                            <td>
                                <div className='d-flex justify-content-end'>
                                    <Button
                                        type='button'
                                        color='danger'
                                        size='btn-sm'
                                        rounded='rounded-1'
                                        icon={<i className="bi bi-trash"></i>}
                                        onClick={() => handleDelete(body._id)}
                                    />
                                </div>
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    )
}
export default BodyListTable