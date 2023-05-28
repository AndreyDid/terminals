import React, {useState} from "react";
import {Link} from "react-router-dom";
import {removeTerminal} from "../../store/terminals";
import {sumPrice} from "../../utils/sumPrice";
import Body from "./body";
import Works from "./works";
import Button from "../common/button";
import _ from 'lodash'
import Filter from "../filter";
import SearchField from "../common/form/searchField";
import useTerminals from "../../hooks/useTerminals";
import history from "../../utils/history";
import PropTypes from "prop-types";

const TerminalsTable = ({data, extraWorks}) => {
    const {dispatch, year, month, currentMonth, currentYear} = useTerminals()

    const filterCurrentYear = year.filter(y => Number(y.label) === currentYear)
    const valueYear = filterCurrentYear.map(y => y.value)

    //--- Фильтрация по месяцу и поисковая строка---
    const [selectedMonth, setSelectedMonth] = useState(month[currentMonth].value)
    const [selectedYear, setSelectedYear] = useState(valueYear.join(''))
    const [searchQuery, setSearchQuery] = useState('')

    const handleMonthSelect = item => {
        if (searchQuery !== '') setSearchQuery('')
        setSelectedMonth(item)
    }
    const handleYearSelected = item => {
        if (searchQuery !== '') setSearchQuery('')
        setSelectedMonth('')
        setSelectedYear(item)
    }

    const handleSearchQuery = ({target}) => {
        setSearchQuery(target.value)
    }

    function filterTerminals(data, currentDataYear, currentDataMonth, filterCurrentYearToMonth) {

        const filterTerminalsYear = setSelectedYear ? data.filter(
            terminal =>
                JSON.stringify(terminal.year.value) === JSON.stringify(selectedYear)
        ) : filterCurrentYearToMonth
        const filteredTerminals = searchQuery
            ? data.filter(
                terminal =>
                    terminal.number === Number(searchQuery)
            ) : selectedMonth
                ? filterTerminalsYear.filter(
                    terminal =>
                        JSON.stringify(terminal.month.value) === JSON.stringify(selectedMonth)
                ) : filterCurrentYearToMonth

        return filteredTerminals
    }

    const sortedDataTerminals = _.orderBy(data, ['created_at'], ['asc'])

    const filterCurrentTerminalYear = sortedDataTerminals.filter(terminal => Number(terminal.year.label) === currentYear)
    const filterCurrentYearToMonth = filterCurrentTerminalYear.filter(terminal => terminal.month.value === month[currentMonth].value)
    const filterCurrentMonth = sortedDataTerminals.filter(terminal => terminal.month.value === month[currentMonth].value)

    const filteredExtraWorks = filterTerminals(extraWorks, filterCurrentYear, filterCurrentMonth, filterCurrentYearToMonth)

    const filteredTerminal = filterTerminals(sortedDataTerminals, filterCurrentYear, filterCurrentMonth, filterCurrentYearToMonth)
    // ----------------------------------------------------------

    //--- Кол-во терминалов и сумма всех терминалов---
    const terminalCount = filteredTerminal.length

    const allPrice = filteredTerminal.map(s => s.sum)
    const allSumPrice = sumPrice(allPrice)

    const percent = 5
    const worksSumPrice = filteredExtraWorks.length > 0 ? allSumPrice + Number(filteredExtraWorks[0].sum) : allSumPrice + 0

    const result = worksSumPrice / 100 * percent
    //--------------------------------------------------

    const handleClick = (id) => {
        // history.push(history.location.pathname + `/${id}/editTerminal`)
        history.push(history.location.pathname + `${id}/editTerminal`)
    }

    const handleDelete = (id) => {
        dispatch(removeTerminal(id))
    }

    return (
        <div className='container flex-column mt-2'>
            <div>
                <SearchField
                    onChange={handleSearchQuery}
                    value={searchQuery}
                />
            </div>
            <div className='my-2 overflow-x-auto'>
                <Filter
                    year={year}
                    month={month}
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    onMonthSelect={handleMonthSelect}
                    onYearSelect={handleYearSelected}
                />
            </div>
            <hr/>
            <table className="table table-sm table align-middle">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">№</th>
                    <th scope="col">
                        <div>
                            <Link className='btn btn-light btn-sm border d-flex justify-content-between'
                                  to={'/createBody'}>
                                <span>
                                    Корпус
                                </span>
                                <span>
                                    +
                                </span>
                            </Link>
                        </div>
                    </th>
                    <th scope="col">
                            <Link className='btn btn-light border btn-sm d-flex justify-content-between'
                                  to={'/createWorks'}>
                            <span>
                                Доработки
                            </span>
                                <span>
                                +
                            </span>
                            </Link>
                    </th>
                    <th scope="col">Цена</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {filteredTerminal.length > 0 && filteredTerminal.map(t => (
                    <tr key={t._id}>
                        <th scope="row" key={t._id} className='align-items-center'>
                            <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value=''
                                   aria-label="..."/>
                        </th>
                        <td><p className='m-0 p-0'>{t.number}</p></td>
                        <td><Body id={t.body}/></td>
                        <td>
                            <Works works={t.works}/>
                        </td>
                        <td><p className='m-0 p-0'>{t.sum}</p></td>
                        <td>
                            <div className='d-flex'>
                                <div className='me-1'>
                                    <Button
                                        type='button'
                                        color='light'
                                        border="border"
                                        size='btn-sm'
                                        rounded='rounded-1'
                                        icon={<i className="bi bi-pencil-square"></i>}
                                        onClick={() => handleClick(t._id)}
                                    />
                                </div>
                                <div>
                                    <Button
                                        type='button'
                                        color='danger'
                                        size='btn-sm'
                                        rounded='rounded-1'
                                        icon={<i className="bi bi-trash"></i>}
                                        onClick={() => handleDelete(t._id)}
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
                <tr>
                    <th scope='row' colSpan='6'>
                        <div className='d-grid mx-auto'>
                            <Link to={'/createExtraWorks'}
                                  className='d-flex justify-content-between btn btn-light border'>
                                <div>Доп. работы:</div>
                                <div>+</div>
                            </Link>
                        </div>
                    </th>
                </tr>
                <tr>
                    <th scope='row' colSpan='4'>
                        <div>
                            {filteredExtraWorks.length > 0 ? filteredExtraWorks[0].extraWorks : ''}
                        </div>
                    </th>
                    <th colSpan='1'>{filteredExtraWorks.length > 0 ? filteredExtraWorks[0].sum : 0}</th>
                    <th></th>
                </tr>
                <tr>
                    <th scope='row' colSpan='2'>
                        Итого:
                    </th>
                    <th>{terminalCount}</th>
                    <th colSpan='3' className='text-end'>
                        {allSumPrice} + {filteredExtraWorks.length > 0 ? filteredExtraWorks[0].sum : 0} - 5%({result})
                        = {worksSumPrice - result}
                    </th>
                </tr>
                <tr>
                    <th scope='row' colSpan='6'>
                        <div className='d-grid mx-auto'>
                            <Link to={'/createTerminal'} className='btn btn-light border'>+</Link>
                        </div>
                    </th>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
TerminalsTable.propTypes = {
    data: PropTypes.array,
    extraWorks: PropTypes.array,
}
export default TerminalsTable