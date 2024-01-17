import React from 'react'
import PropTypes from 'prop-types'

const TextAreaField = ({label, name, value, onChange, error}) => {

    const handleChange = ({target}) => {
        onChange({name: target.name, value: target.value})
    }
    const getInputClasses = () => {
        return 'app_textarea form-control' + (error ? ' is-invalid' : '')
    }

    return (
        <div className="mb-4">
                <label className="form-label" htmlFor={name}> {label}</label>
            <div className="form-floating has-validation overflow-auto">
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                    style={{height: 500}}
                />
            </div>
        </div>
    )
}
TextAreaField.defaultProps = {
    type: 'text'
}
TextAreaField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
}

export default TextAreaField
