import React from 'react'
import PropTypes from "prop-types";

const TextField = ({id, placeholder, label, type, name, value, onChange, error, increment, count, isDisabled}) => {
    const handleChange = ({target}) => {
        onChange({name: target.name, value: target.value})
    }

    const getInputClasses = () => {
        return 'app_input form-control ' + (error ? 'is-invalid z-n1' : '')
    }

    return (
			<div className='mb-4'>
				<div className='form-label' data-bs-theme='dark' style={{ paddingTop: !label ? 24 : 0 }}>
					{label}
				</div>
				<div className='input-group '>
					<input
						type={type}
						name={name}
						id={id}
						value={value || ''}
						onChange={handleChange}
						className={getInputClasses()}
						style={{ zIndex: 0 }}
						disabled={isDisabled}
						placeholder={placeholder}
					/>
					{count === true && (
						<button
							className='btn btn-light'
							type='button'
							onClick={increment}
							style={{ zIndex: 0 }}
						>
							<span className='text-secondary'>+1</span>
						</button>
					)}
				</div>
			</div>
		)
}
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    error: PropTypes.string,
    count: PropTypes.bool,
    isDisabled: PropTypes.bool,
    increment: PropTypes.func,
    placeholder: PropTypes.string,

};

export default React.memo(TextField)