import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getWorkById, updateWork} from "../../store/works";
import TextField from "../inputs/textField";
import Button from "../common/button";
import ContainerFormWrapper from "../common/containerForm";
import useTerminals from "../../hooks/useTerminals";

const EditWorkPage = () => {
    const [data, setData] = useState()

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Это поле обязательно для заполнения"
            }
        },
        sum: {
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
        handleChange,
        isValid,
        validate,
        errors
    } = useTerminals(data, setData, validatorConfig)

    const {id} = params

    const currentWork = useSelector(getWorkById(id))

    useEffect(() => {
        if (currentWork && !data) {
            setData({...currentWork});
        }
    }, [currentWork, data]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);
    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate();
        if (!isValid) return;
        dispatch(updateWork({...data, sum: Number(data.sum)}))
        history.goBack()
    }
    return (
        <ContainerFormWrapper>
            {!isLoading && (
                <form onSubmit={handleSubmit}>
                    <TextField
                        label='Новая доработка'
                        name='name'
                        value={data.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <TextField
                        label='Стиомость доработки'
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
            )}
        </ContainerFormWrapper>
    )
}
export default EditWorkPage