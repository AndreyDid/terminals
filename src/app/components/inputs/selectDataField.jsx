import React from "react";
import SelectField from "./selectField";
import PropTypes from "prop-types";

const SelectDataField = ({month, year, data, handleChange}) => {
    return (
        <>
            <div className='d-flex'>
                <div className='me-4 mw-25'>
                    <SelectField
                        label='Месяц'
                        name='month'
                        options={month}
                        defaultValue={data.month}
                        onChange={handleChange}
                    />
                </div>
                <div className='mw-25'>
                    <SelectField
                        label='Год'
                        name='year'
                        options={year}
                        defaultValue={data.year}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </>
    )
}
SelectDataField.propTypes = {
    month: PropTypes.array,
    year: PropTypes.array,
    data: PropTypes.object,
    handleChange: PropTypes.func
}

export default SelectDataField