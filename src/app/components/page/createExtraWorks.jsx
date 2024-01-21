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

    const validatorConfig = {
        extraWorks: {
            isRequired: {
                message: "Это поле обязательно для заполнения"
            }
        },
        sum: {
            isRequired: {
                message: "Это поле обязательно для заполнения"
            }
        }
    };

    const {
        history,
        dispatch,
        currentDate,
        month,
        year,
        currentYearFilter,
        handleChange,
        isValid,
        validate,
        errors
    } = useTerminals(data, setData, validatorConfig)

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
        const isValid = validate();
        if (!isValid) return;
        dispatch(createExtraWork({...data, sum: Number(data.sum)}));
        history.push('/terminals')
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
                            error={errors.extraWorks}
                        />
                        <TextField
                            label='Сумма доработок'
                            type='number'
                            name='sum'
                            value={data.sum}
                            onChange={handleChange}
                            error={errors.sum}
                        />
                        <div className="d-flex justify-content-between">
                            <Button
                                type="submit"
                                color="light"
                                rounded="rounded-1"
                                label="OK"
                                disabled={!isValid}
                            />
                            <Button
                                type="button"
                                color="light"
                                onClick={() => history.goBack()}
                                icon={<i className="bi bi-x-lg"></i>}
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