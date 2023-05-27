import React, {useEffect, useState} from "react";
import {createExtraWork} from "../../store/extraWorks";
import ContainerFormWrapper from "../common/containerForm";
import TextAreaField from "../common/form/textAreaField";
import Button from "../common/button";
import TextField from "../inputs/textField";
import SelectDataField from "../inputs/selectDataField";
import useTerminals from "../../hooks/useTerminals";

const CreateExtraWorks = () => {
    const [data, setData] = useState({
        extraWorks: '',
        sum: '0'
    })

    const {history, dispatch, currentDate, month, year, currentYearFilter, handleChange} = useTerminals(setData)

    const [isLoading, setIsLoading] = useState(true)

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
        dispatch(createExtraWork({...data}));
    };

    return (
        <>
            {!isLoading && (
                <ContainerFormWrapper>
                    <form onSubmit={handleSubmit}>
                        <SelectDataField
                            month={month}
                            year={year}
                            data={data}
                            handleChange={handleChange}
                        />
                        <TextAreaField
                            label='Дополнительные работы'
                            type='text'
                            name='extraWorks'
                            data={data.extraWorks}
                            onChange={handleChange}
                        />
                        <TextField
                            label='Сумма доработок'
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
                </ContainerFormWrapper>
            )}
        </>
    )
}
export default CreateExtraWorks