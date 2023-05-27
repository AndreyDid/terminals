import React from 'react'
import PropTypes from "prop-types";

const TextField = ({label, type, name, value, onChange, error, increment, count, isDisabled}) => {
    const handleChange = ({target}) => {
        onChange({name: target.name, value: target.value})
    }
    const getInputClasses = () => {
        return 'form-control' + (error ? ' is-invalid' : '')
    }

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group">
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value || ''}
                    onChange={handleChange}
                    className={getInputClasses()}
                    disabled={isDisabled}
                />
                {count === true && (
                    <button
                        className="btn btn-light border"
                        type="button"
                        onClick={increment}
                        style={{zIndex: 0}}
                    >
                        <span className='text-secondary'>+1</span>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
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
    increment: PropTypes.func
};

export default TextField