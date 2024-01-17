import React from 'react'
import Select from "react-select";
import PropTypes from "prop-types";

const SelectField = ({
                         label,
                         defaultValue,
                         onChange,
                         options,
                         name,
                         error,
                         placeholder
                     }) => {
    const handleChange = value => {
        onChange({name, value})
    }

    const optionsArray =
        !Array.isArray(options) && typeof options === 'object'
            ? Object.values(options)
            : options
    return (
			<div className='mb-4'>
				<div className='form-label'>{label}</div>
				<Select
					classNamePrefix='custom-select'
					className={
						(error && 'border border-1 rounded-2 border-danger')
					}
					isSearchable={false}
					closeMenuOnSelect={true}
					defaultValue={defaultValue}
					options={optionsArray}
					onChange={handleChange}
					name={name}
					placeholder={placeholder}
					theme={theme => ({
						...theme,
						borderRadius: 0,
						colors: {
							...theme.colors,
							backgroundColor: 'var(--background-color)',
							primary25: 'var(--background-color)',
							primary: 'black',
						},
					})}
				/>
			</div>
		)
}
SelectField.propTypes = {
    defaultValue: PropTypes.object,
    name: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    placeholder: PropTypes.string,
};

export default SelectField