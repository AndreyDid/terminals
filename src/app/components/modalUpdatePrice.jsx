import React from "react";
import useTerminals from "../hooks/useTerminals";
import {sumPrice} from "../utils/sumPrice";
import {updateTerminal} from "../store/terminals";
import Button from "./common/button";

const ModalUpdatePrice = ({hide, terminals, dispatch, setting, month, year}) => {

    const handleShow = () => {
        hide(false)
    }

    const {works, bodies} = useTerminals()

    function getBodiesListByIds(bodiesIds) {
        const bodyArray = []
        for (const body of bodies) {
            if (body._id === bodiesIds) {
                bodyArray.push(body)
                break
            }
        }
        return bodyArray
    }

    function getWorksListByIds(worksIds) {
        const worksArray = []
        for (const workId of worksIds) {
            for (const work of works) {
                if (work._id === workId) {
                    worksArray.push(work)
                    break
                }
            }
        }
        return worksArray
    }

    const transformDataBody = data => {
        const result = getBodiesListByIds(data).map(body => ({
            label: body.name,
            value: body._id,
        }))
        return result
    }

    const transformDataWorks = data => {
        const result = getWorksListByIds(data).map(work => ({
            label: work.name,
            value: work._id,
            sum: work.sum,
        }))
        return result
    }

    const changeMonthEnding = (month) => {
        const lastChar = month[month.length -1]
        const monthLowerCase = month.toLowerCase()
        if (lastChar === 'ь') {
            return monthLowerCase.replace('ь', 'е')
        }
        if (lastChar === 'й') {
            return monthLowerCase.replace('й', 'е')
        } else return monthLowerCase + 'е'
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const sumTerminalDefault = setting[0].sumTerminal
        const sumPgiDefault = setting[0].sumPgi
        handleShow()
        terminals.map(terminal => {
            const newData = {
                ...terminal,
                body: transformDataBody(terminal.body),
                works: transformDataWorks(terminal.works),
            }
            const works = transformDataWorks(terminal.works).map(s => s.sum)

            const allWorksPrice = sumPrice(works)

            const newTerm = {
                ...newData,
                body: newData.body.map(body => body.value).join(''),
                works: newData.works.map(work => work.value),
                sum:
                    newData.body.map(body => body.label).join('') === 'ПГИ'
                        ? Number(sumPgiDefault) + allWorksPrice
                        : Number(sumTerminalDefault) + allWorksPrice,
            }
            dispatch(updateTerminal(newTerm))
        })
    }

    return (
        <div className="modal show fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
             tabIndex="-1"
             aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Обновить цену</h1>
                        <Button
                            type="button"
                            color="light"
                            onClick={handleShow}
                            icon={<i className="bi bi-x-lg"></i>}
                            rounded="rounded-1"
                        />
                    </div>
                    <div className="modal-body">
                        <p>Цена всех терминалов
                            в <b>{month ? changeMonthEnding(month.label) : ''} {year.label} года</b> обновится в
                            соответствии с ценой сборки по умолчанию ( <b>{setting[0].sumTerminal} руб.</b> ).</p>
                        <p>Вы уверены что хотите обновить цену?</p>
                    </div>
                    <div className="modal-footer justify-content-start">
                        <Button
                            type="submit"
                            color="light"
                            rounded="rounded-1"
                            label="Обновить"
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalUpdatePrice