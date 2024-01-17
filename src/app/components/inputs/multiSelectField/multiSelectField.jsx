import React from 'react'
import Select from 'react-select'
import PropTypes from "prop-types";

const MultiSelectField = ({placeholder, options, onChange, name, label, defaultValue, error}) => {
   
    const optionsArray =
        !Array.isArray(options) && typeof options === 'object'
            ? Object.keys(options).map(optionName => ({
                label: options[optionName].name,
                value: options[optionName]._id,
                sum: options[optionName].sum
            }))
            : options
    const handleChange = value => {
        onChange({name, value})
    }
    return (
			<div className='mb-4'>
				<div className='form-label'>{label}</div>
				<Select
					classNamePrefix='custom-multi-select'
					className={
						(error && 'border border-1 rounded-2 border-danger')
					}
					isSearchable={false}
					isMulti
					closeMenuOnSelect={false}
					defaultValue={defaultValue}
					options={optionsArray}
					onChange={handleChange}
					name={name}
					placeholder={placeholder}
				/>
			</div>
		)
}
MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
}

export default MultiSelectField