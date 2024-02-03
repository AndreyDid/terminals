import React from "react";
import Button from "./common/button";
import {removeTerminal} from "../store/terminals";

const ModalDeleteOrderTerm = ({hide, filteredTerminal, dispatch, orderId}) => {
    const order = filteredTerminal.filter(order => order.singleOrder === orderId)
    const handleShow = () => {
        hide(false)
    }
    const handleDelete = () => {
        for (const items of order) {
            dispatch(removeTerminal(items._id))
        }
        handleShow()
    }

    return (
        <div className="modal show fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
             tabIndex="-1"
             aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Удаление заказа</h1>
                        <Button
                            type="button"
                            color="light"
                            onClick={handleShow}
                            icon={<i className="bi bi-x-lg"></i>}
                            rounded="rounded-1"
                        />
                    </div>
                    <div className="modal-body">
                        <p>Вы действительно хотите безвозвратно удалить терминалы?</p>
                        <p>{order[0].city && order[0].city} ({order.length} шт.)</p>

                    </div>
                    <div className="modal-footer justify-content-start">
                        <Button
                            type="submit"
                            color="light"
                            rounded="rounded-1"
                            label="Удалить"
                            onClick={handleDelete}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDeleteOrderTerm