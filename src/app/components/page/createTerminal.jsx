import React, {useEffect, useState} from "react";
import {createTerminal} from "../../store/terminals";
import {sumPrice} from "../../utils/sumPrice";
import ContainerFormWrapper from "../common/containerForm";
import TextField from "../inputs/textField";
import MultiSelectField from "../inputs/multiSelectField";
import SelectField from "../inputs/selectField";
import Button from "../common/button";
import SelectDataField from "../inputs/selectDataField";
import useTerminals from "../../hooks/useTerminals";

const CreateTerminal = () => {
    const [data, setData] = useState({
        month: '',
        year: '',
        number: '',
        body: '',
        works: '',
        sum: 1000
    })

    const {
        history,
        dispatch,
        body,
        works,
        bodyLoading,
        workLoading,
        currentDate,
        isLoading,
        setIsLoading,
        month,
        year,
        currentYearFilter,
        handleChange
    } = useTerminals(setData)

    useEffect(() => {
        if (data) {
            setData(prevState => ({
                ...data,
                month: month[currentDate.getMonth()],
                year: currentYearFilter[0]
            }))
        }
    }, [])
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false)
        }
    }, [data])

    const handleSubmit = (e) => {
        e.preventDefault();
        const worksPrice = data.works.map(s => s.sum)
        const allWorksPrice = sumPrice(worksPrice)
        const newData = {
            ...data,
            number: Number(data.number),
            works: data.works.map(w => w.value),
            body: data.body.value,
            sum: Number(data.sum) + allWorksPrice
        }
        dispatch(createTerminal({...newData}));
    };

    function handleIncrement() {
        return setData(prevState => ({...data, number: Number(data.number) + Number(1)}))
    }

    if (!bodyLoading && !workLoading) {

        const bodyList = body.map(b => ({
            label: b.name,
            value: b._id
        }))

        const worksList = works.map(b => ({
            label: b.name,
            value: b._id,
            sum: b.sum
        }))

        return (
            <ContainerFormWrapper>
                <h2 className='text-secondary'>Новый терминал</h2>
                {!isLoading && (
                    <form onSubmit={handleSubmit}>
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
                            defaultOption="В каком корпусе?..."
                            name="body"
                            options={bodyList}
                            onChange={handleChange}
                            value={data.body}
                        />
                        <MultiSelectField
                            label={'Выбрать доработки'}
                            defaultOption='Доработки...'
                            name='works'
                            options={worksList}
                            onChange={handleChange}
                            value={data.works}
                        />
                        <TextField
                            label={'Сумма'}
                            type='number'
                            name='sum'
                            value={data.sum}
                            onChange={handleChange}
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

                )}
            </ContainerFormWrapper>
        )

    }

}

export default CreateTerminal