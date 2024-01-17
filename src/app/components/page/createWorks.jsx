import React, {useState} from "react";
import TextField from "../inputs/textField";
import {createWork} from "../../store/works";
import ContainerFormWrapper from "../common/containerForm";
import Button from "../common/button";
import WorksListTable from "../worksListTable";
import useTerminals from "../../hooks/useTerminals";

const CreateWorks = () => {
    const [data, setData] = useState({
        name: '',
        sum: 0
    })

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

    const {history, dispatch, handleChange, isValid, validate, errors} = useTerminals(data, setData, validatorConfig)

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(createWork({...data, sum: Number(data.sum)}));
        setData({})
    };

    return (
        <div>
            <ContainerFormWrapper>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label={'Новая доработка'}
                        name='name'
                        value={data.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <TextField
                        label={'Стиомость доработки'}
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
            <ContainerFormWrapper>
                <WorksListTable/>
            </ContainerFormWrapper>
        </div>
    )
}

export default CreateWorks