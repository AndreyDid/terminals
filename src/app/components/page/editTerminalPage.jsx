import React, {useEffect, useState} from "react";
import {getTerminalById, updateTerminal} from "../../store/terminals";
import {useSelector} from "react-redux";
import {getBodyById} from "../../store/body";
import {sumPrice} from "../../utils/sumPrice";
import TextField from "../inputs/textField";
import SelectField from "../inputs/selectField";
import MultiSelectField from "../inputs/multiSelectField";
import Button from "../common/button";
import ContainerFormWrapper from "../common/containerForm";
import SelectDataField from "../inputs/selectDataField";
import useTerminals from "../../hooks/useTerminals";

const EditTerminalPage = () => {
    const [data, setData] = useState()

    const {
        history,
        params,
        dispatch,
        body,
        works,
        workLoading,
        bodyLoading,
        isLoading,
        setIsLoading,
        month,
        year,
        handleChange
    } = useTerminals(setData)

    const {id} = params

    const currentTerminal = useSelector(getTerminalById(id))

    const currentBody = useSelector(getBodyById(currentTerminal.body))

    const transformBody = {
        label: currentBody === undefined ? 'Error' : currentBody.name,
        value: currentBody === undefined ? 'Error' : currentBody._id
    }

    const bodyList = body.map(b => ({
        label: b.name,
        value: b._id
    }))

    const worksList = works.map(b => ({
        label: b.name,
        value: b._id,
        sum: b.sum
    }))

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

    const transformData = (data) => {
        const result = getWorksListByIds(data).map(work => ({
            label: work.name,
            value: work._id,
            sum: work.sum
        }))
        return result
    }

    useEffect(() => {
        if (!bodyLoading && !workLoading && transformBody && currentTerminal && !data) {
            setData(prevState => ({
                ...currentTerminal,
                body: transformBody,
                works: transformData(currentTerminal.works)
            }))
        }
    }, [bodyLoading, workLoading, currentTerminal, transformBody, data])
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false)
        }
    }, [data])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const worksPrice = data.works.map(s => s.sum)
        const allWorksPrice = sumPrice(worksPrice)
        const newData = {
            ...data,
            works: data.works.map(w => w.value),
            body: data.body.value,
            sum: Number(data.sum) + allWorksPrice
        }
        dispatch(
            updateTerminal({...newData})
        )
    }

    function handleIncrement() {
        return setData(prevState => ({...data, number: Number(data.number) + Number(1)}))
    }

    return (
        <>
            {!isLoading && body.length > 0 && works.length > 0 && (
                <ContainerFormWrapper>
                    <form onSubmit={handleSubmit}>
                        <h2 className='text-secondary'>Редактировать терминал</h2>
                        <SelectDataField
                            month={month}
                            year={year}
                            data={data}
                            handleChange={handleChange}
                        />
                        <TextField
                            type='number'
                            count={true}
                            label={'№ терминала'}
                            name='number'
                            value={data.number}
                            onChange={handleChange}
                            increment={handleIncrement}
                        />
                        <SelectField
                            label='Корпус'
                            name="body"
                            options={bodyList}
                            onChange={handleChange}
                            defaultValue={data.body}
                        />
                        <MultiSelectField
                            label={'Выбрать доработки'}
                            defaultOption='Доработки...'
                            name='works'
                            options={worksList}
                            onChange={handleChange}
                            defaultValue={data.works}
                        />
                        <TextField
                            label={'Сумма'}
                            type='number'
                            name='sum'
                            value={data.sum = 1000}
                            onChange={handleChange}
                            isDisabled={true}
                        />
                        <div className="d-flex justify-content-between">
                            <Button
                                type="submit"
                                color="light"
                                rounded="rounded-1"
                                border="border"
                                label="OK"
                            />
                            <Button
                                type="button"
                                color="light"
                                onClick={() => history.goBack()}
                                icon={<i className="bi bi-x-lg"></i>}
                                border='border'
                                rounded="rounded-1"
                            />
                        </div>
                    </form>
                </ContainerFormWrapper>
            )}
        </>
    )
}
export default EditTerminalPage