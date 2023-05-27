import React from 'react'
import Select from "react-select";
import PropTypes from "prop-types";

const SelectField = ({
                         label,
                         defaultValue,
                         onChange,
                         options,
                         name,
                         error
                     }) => {
    const handleChange = value => {
        onChange({name, value})
    }
    const optionsArray =
        !Array.isArray(options) && typeof options === 'object'
            ? Object.values(options)
            : options
    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <Select
                isSearchable={false}
                closeMenuOnSelect={true}
                defaultValue={defaultValue}
                options={optionsArray}
                onChange={handleChange}
                name={name}

            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}
SelectField.propTypes = {
    defaultValue: PropTypes.object,
    name: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default SelectField