import React from "react";
import PropTypes from "prop-types";

const Filter = ({onMonthSelect, onYearSelect, selectedMonth, selectedYear, month, year, currentMonth, currentYear}) => {

    return (
        <div className='d-flex flex-column'>
            <div className="btn-group mb-2" aria-label="Basic outlined example">
                {year.map(y => (
                    <button key={y.value} type="button"
                            className={`${y.value === selectedYear ? 'active' : '' || Number(y.label) === currentYear ? 'bg-success bg-opacity-75 text-dark' : 'text-dark'} btn border btn-outline-secondary`}
                            onClick={() => onYearSelect(y.value)}
                    >
                        {y.label}
                    </button>
                ))}
            </div>
            <div className='btn-group overflow-auto' role="group" aria-label="Basic outlined example">
                {month.map(m => (
                        <button key={m.value} type="button"
                                className={`${m.value === selectedMonth ? 'active' : '' || m.label === month[currentMonth].label ? 'bg-success bg-opacity-75 text-dark' : 'text-dark'} btn border btn-outline-secondary`}
                                onClick={() => onMonthSelect(m.value)}
                        >
                            {m.label}
                        </button>
                    )
                )}
            </div>
        </div>
    )
}
Filter.propTypes = {
    onMonthSelect: PropTypes.func,
    onYearSelect: PropTypes.func,
    selectedMonth: PropTypes.string,
    selectedYear: PropTypes.string,
    month: PropTypes.array,
    year: PropTypes.array,
    currentMonth: PropTypes.number,
    currentYear: PropTypes.number
}
export default Filter