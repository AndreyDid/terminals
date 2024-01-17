import React, {useState} from "react";
import ContainerFormWrapper from "../common/containerForm";
import {createBody} from "../../store/body";
import TextField from "../inputs/textField";
import Button from "../common/button";
import useTerminals from "../../hooks/useTerminals";
import BodyListTable from "../bodyListTable";
import {ThemeProvider} from "../../hooks/themeProvider"

const CreateBody = () => {
    const [data, setData] = useState({
        name: '',
    })

    const validatorConfig = {
        name: {
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
        dispatch(createBody({...data}));
        setData({})
    };

    return (
			<>
				<ThemeProvider>
					<ContainerFormWrapper>
						<form onSubmit={handleSubmit}>
							<TextField
								label={'Добавить корпус'}
								name='name'
								value={data.name}
								onChange={handleChange}
								error={errors.name}
							/>
							<div className='d-flex justify-content-between'>
								<Button
									type='submit'
									color='light'
									rounded='rounded-1'
									label='OK'
									disabled={!isValid}
								/>
								<Button
									type='button'
									color='light'
									onClick={() => history.goBack()}
									icon={<i className='bi bi-x-lg'></i>}
									rounded='rounded-1'
								/>
							</div>
						</form>
					</ContainerFormWrapper>
					<ContainerFormWrapper>
						<BodyListTable />
					</ContainerFormWrapper>
				</ThemeProvider>
			</>
		)
}

export default CreateBody