import React from 'react'
import PropTypes from 'prop-types'

const SearchField = ({ name, value, onChange }) => {
    return (
        <div className="input-group flex-nowrap">
            <input
                type="number"
                className="app_input form-control"
                placeholder="Поиск по номеру..."
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}
SearchField.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default SearchField
