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
        sum: ''
    })

    const {history, dispatch, handleChange} = useTerminals(setData)

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createWork({...data}));
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
                    />
                    <TextField
                        label={'Стиомость доработки'}
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
            <ContainerFormWrapper>
                <WorksListTable/>
            </ContainerFormWrapper>
        </div>
    )
}

export default CreateWorks