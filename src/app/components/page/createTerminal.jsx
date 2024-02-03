import React, {useCallback, useEffect, useState} from "react";
import {createTerminal} from "../../store/terminals";
import {sumPrice} from "../../utils/sumPrice";
import ContainerFormWrapper from "../common/containerForm";
import TextField from "../inputs/textField";
import SelectField from "../inputs/selectField";
import Button from "../common/button";
import SelectDataField from "../inputs/selectDataField";
import useTerminals from "../../hooks/useTerminals";
import MultiSelectField from "../inputs/multiSelectField";
import _ from "lodash";
import {nanoid} from "nanoid";

const CreateTerminal = () => {
    const {setting, settingLoading} = useTerminals()

    const sumTerminalDefault = !settingLoading && setting[0].sumTerminal
    const sumPgiDefault = !settingLoading && setting[0].sumPgi

    const [data, setData] = useState({
        month: '',
        year: '',
        number: '',
        city: '',
        body: '',
        works: '',
        sum: ''
    })

    const [value, setValue] = useState('')

    const [numberTo, setNumberTo] = useState({
        number: ''
    })

    const validatorConfig = {
        number: {
            isRequired: {
                message: "Это поле обязательно для заполнения"
            }
        },
        body: {
            isRequired: {
                message: "Это поле обязательно для заполнения"
            }
        },
        works: {
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
        bodies,
        works,
        bodyLoading,
        workLoading,
        currentDate,
        isLoading,
        setIsLoading,
        month,
        year,
        currentYearFilter,
        handleChange,
        isValid,
        validate,
        errors,
    } = useTerminals(data, setData, validatorConfig)

    const handleChangeStart = (target) => {
        const value = target.value
        setData((prevState) => ({...prevState, [target.name]: target.value}));
        if (value > Number(numberTo.number)) {
            setNumberTo({number: value})
        }
    };
    const handleChangeEnd = (target) => {
        setNumberTo((prevState) => ({...prevState, [target.name]: target.value}));
    };
    const filterWorksName = filterName(works)

    useEffect(() => {
        if (data && !settingLoading) {
            setData({
                ...data,
                month: month[currentDate.getMonth()],
                year: currentYearFilter[0],
                works: [filterWorksName.map(w => ({label: w.name, value: w._id, sum: w.sum})).find(w => w.label === 'Без доработок')],
                sum: data.body.label === 'ПГИ' ? Number(sumPgiDefault) : Number(sumTerminalDefault)
            })
        }
    }, [])
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false)
        }
    }, [data, isLoading, setIsLoading])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const worksPrice = data.works.map(s => s.sum)
        const allWorksPrice = sumPrice(worksPrice)
        const isValid = validate();
        if (!isValid) return;
        const orderId = nanoid()
        for (let i = Number(data.number); i <= numberTo.number; i++) {
            const newData = {
                ...data,
                number: Number(i),
                singleOrder: orderId,
                works: data.works.map(w => w.value),
                body: data.body.value,
                sum: data.body.label === 'ПГИ' ? Number(500) + allWorksPrice : Number(data.sum) + allWorksPrice
            }
            setValue(i)
            await dispatch(createTerminal({...newData}));
        }
        history.goBack()
    };
    const handleIncrement = useCallback(() => {
        return setNumberTo(prevState => ({...numberTo, number: Number(numberTo.number) + Number(1)}))
    }, [numberTo])

    function filterName(arr) {
        return _.orderBy(arr, ['name'], ['asc'])
    }

    if (!bodyLoading && !workLoading) {

        const filterBodyName = filterName(bodies)

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
                        <div className='d-flex'>
                            <div className='me-4'>
                                <TextField
                                    type='number'
                                    label='№ терминала'
                                    name='number'
                                    id='0001'
                                    value={data.number}
                                    onChange={handleChangeStart}
                                    placeholder='От'
                                    error={errors.number}
                                />
                            </div>
                            <TextField
                                type='number'
                                count={true}
                                name='number'
                                id='0002'
                                value={numberTo.number}
                                onChange={handleChangeEnd}
                                increment={handleIncrement}
                                placeholder='До'
                                error={errors.number}
                            />
                        </div>
                        <TextField
                            type='text'
                            label='Город'
                            name='city'
                            id='0003'
                            value={data.city}
                            onChange={handleChange}
                            placeholder='Введите город заказчика...'
                        />
                        <SelectField
                            label='Корпус'
                            name="body"
                            options={filterBodyName.map(b => ({
                                label: b.name,
                                value: b._id
                            }))}
                            onChange={handleChange}
                            value={data.body}
                            placeholder='Выбрать корпус...'
                            error={errors.body}
                        />
                        <MultiSelectField
                            label='Доработки'
                            name='works'
                            options={filterWorksName.map(b => ({
                                label: b.name,
                                value: b._id,
                                sum: b.sum
                            }))}
                            onChange={handleChange}
                            value={data.works}
                            defaultValue={[filterWorksName.map(w => ({label: w.name, value: w._id})).find(w => w.label === 'Без доработок')]}
                            placeholder='Выбрать доработки...'
                            error={errors.works}
                        />
                        <TextField
                            label='Сумма'
                            type='number'
                            name='sum'
                            id='0004'
                            value={data.sum}
                            onChange={handleChange}
                            error={errors.sum}
                        />
                        {!value ? (
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
                        ) : (
                            <h3>Загружено терминалов: {value}</h3>
                        )}
                    </form>
                )}
            </ContainerFormWrapper>
        )
    }
}

export default CreateTerminal