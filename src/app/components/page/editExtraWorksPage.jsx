import React, {useEffect, useState} from "react";
import ContainerFormWrapper from "../common/containerForm";
import SelectDataField from "../inputs/selectDataField";
import TextAreaField from "../common/form/textAreaField";
import Button from "../common/button";
import useTerminals from "../../hooks/useTerminals";
import TextField from "../inputs/textField";
import {useSelector} from "react-redux";
import {getExtraWorksById, removeExtraWorks, updateExtraWorks} from "../../store/extraWorks";

const EditExtraWorksPage = () => {
    const [data, setData] = useState()

    const validatorConfig = {
        extraWorks: {
            isRequired: {
                message: "Это поле обязательно для заполнения"
            }
        },
    };

    const {
        history,
        dispatch,
        params,
        isLoading,
        setIsLoading,
        month,
        year,
        handleChange,
        isValid,
        validate,
        errors
    } = useTerminals(data, setData, validatorConfig)

    const {id} = params

    const currentExtraWorks = useSelector(getExtraWorksById(id))

    useEffect(() => {
        if (currentExtraWorks && !data) {
            setData(prevState => ({...currentExtraWorks}));
        }
    }, [currentExtraWorks, data]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const handleDelete = (id) => {
        dispatch(removeExtraWorks(id))
        history.push('/terminals')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate();
        if (!isValid) return;
        dispatch(updateExtraWorks({...data, sum: Number(data.sum)}))
        history.goBack()
    }
    return (
        <>
            {!isLoading && (
                <ContainerFormWrapper>
                    <form onSubmit={handleSubmit}>
                        <div className='d-flex justify-content-between'>
                            <SelectDataField
                                month={month}
                                year={year}
                                data={data}
                                handleChange={handleChange}
                            />
                            <div className='d-flex align-items-center justify-content-end'>
                                <Button
                                    type='button'
                                    color='danger'
                                    size='btn-sm'
                                    rounded='rounded-1'
                                    icon={<i className="bi bi-trash"></i>}
                                    onClick={() => handleDelete(currentExtraWorks._id)}
                                />
                            </div>
                        </div>
                        <TextAreaField
                            label='Дополнительные работы'
                            type='text'
                            name='extraWorks'
                            value={data.extraWorks}
                            onChange={handleChange}
                            error={errors.extraWorks}
                        />
                        <TextField
                            label='Сумма доработок'
                            type='number'
                            name='sum'
                            value={String(data.sum)}
                            onChange={handleChange}
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
export default EditExtraWorksPage