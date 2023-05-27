import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getWorkById, updateWork} from "../../store/works";
import TextField from "../inputs/textField";
import Button from "../common/button";
import ContainerFormWrapper from "../common/containerForm";
import useTerminals from "../../hooks/useTerminals";

const EditWorkPage = () => {
    const [data, setData] = useState()

    const {history, dispatch, params, isLoading, setIsLoading, handleChange} = useTerminals(setData)

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
        dispatch(updateWork({...data}))
        history.goBack()
    }

    return (
        <ContainerFormWrapper>
            {!isLoading && (
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
            )}
        </ContainerFormWrapper>
    )
}
export default EditWorkPage