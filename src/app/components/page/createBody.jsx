import React, {useState} from "react";
import ContainerFormWrapper from "../common/containerForm";
import {createBody} from "../../store/body";
import TextField from "../inputs/textField";
import Button from "../common/button";
import useTerminals from "../../hooks/useTerminals";
import BodyListTable from "../bodyListTable";

const CreateBody = () => {
    const [data, setData] = useState({
        name: '',
    })

    const {history, dispatch, handleChange} = useTerminals(setData)

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createBody({...data}));
        setData({})
    };

    return (
        <>
            <ContainerFormWrapper>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label={'Добавить корпус'}
                        name='name'
                        value={data.name}
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
            <ContainerFormWrapper>
                <BodyListTable/>
            </ContainerFormWrapper>
        </>
    )
}

export default CreateBody