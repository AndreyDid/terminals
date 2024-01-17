import React, {useEffect, useState} from "react";
import ContainerFormWrapper from "../common/containerForm";
import TextField from "../inputs/textField";
import Button from "../common/button";
import useTerminals from "../../hooks/useTerminals";
import {getSettingById, updateSetting} from "../../store/settings";
import {useSelector} from "react-redux";

const CreateSetting = () => {
    const [data, setData] = useState()

    const validatorConfig = {
        sumTerminal: {
            isRequired: {
                message: "Это поле обязательно для заполнения"
            }
        },
        sumPgi: {
            isRequired: {
                message: "Это поле обязательно для заполнения"
            }
        },
    };

    const {
        history,
        dispatch,
        handleChange,
        isValid,
        validate,
        errors,
        setting,
        settingLoading,
        isLoading,
        setIsLoading
    } = useTerminals(data, setData, validatorConfig)

    const currentSettings = useSelector(getSettingById(setting[0]._id))

    useEffect(() => {
        if (!settingLoading && currentSettings && !data) {
            setData({
                ...currentSettings,
            })
        }
    }, [currentSettings, currentSettings, data])
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false)
        }
    }, [data])

    const handleUpdate = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(updateSetting({...data}));
        history.goBack()
    };
    return (
        <>
            {!isLoading && (
                <ContainerFormWrapper>
                    <form onSubmit={handleUpdate}>
                        <TextField
                            label='Стоимость сборки терминала по умолчанию'
                            name='sumTerminal'
                            type='number'
                            value={data.sumTerminal}
                            onChange={handleChange}
                            error={errors.sumTerminal}
                        />
                        <TextField
                            label='Стоимость сборки ПГИ по умолчанию'
                            name='sumPgi'
                            type='number'
                            value={data.sumPgi}
                            onChange={handleChange}
                            error={errors.sumPgi}
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

export default CreateSetting