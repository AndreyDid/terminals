import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {sumPrice} from "../../utils/sumPrice";
import Body from "./body";
import Works from "./works";
import Button from "../common/button";
import _ from 'lodash'
import SearchField from "../common/form/searchField";
import useTerminals from "../../hooks/useTerminals";
import history from "../../utils/history";
import PropTypes from "prop-types";
import Select from "react-select";
import {removeTerminal} from "../../store/terminals";
import {ThemeContext} from "../../hooks/themeProvider";
import UpdateSumBtn from "../updateSumBtn";
import CheckBox from "../checkbox";

const TerminalsTable = ({terminals, extraWorks}) => {
    const [btnOn, setBtnOn] = useState(true)

    const [theme, setTheme] = useContext(ThemeContext)

    const changeTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    const {year, month, currentMonth, currentYear, dispatch, setting} = useTerminals()
    const selectMonth = localStorage.getItem('month')
    const selectYear = localStorage.getItem('year')

    const filterCurrentYear = year.filter(y => Number(y.label) === currentYear)
    //--- Фильтрация по месяцу и поисковая строка---
    const [selectedMonth, setSelectedMonth] = useState(selectMonth === null ? month[currentMonth] : JSON.parse(selectMonth))
    const [selectedYear, setSelectedYear] = useState(selectYear === null ? filterCurrentYear[0] : JSON.parse(selectYear))
    const [searchQuery, setSearchQuery] = useState('')
    const handleMonthSelect = item => {
        if (searchQuery !== '') setSearchQuery('')
        setSelectedMonth(item)
        localStorage.setItem('month', JSON.stringify(item))
    }
    const handleYearSelected = item => {
        if (searchQuery !== '') setSearchQuery('')
        setSelectedMonth(null)
        setSelectedYear(item)
        localStorage.setItem('year', JSON.stringify(item))
    }

    const handleSearchQuery = ({target}) => {
        setSearchQuery(target.value)
    }

    function filterTerminals(sortedDataTerminals, selectedYear, selectedMonth, searchQuery) {
        let filteredTerminals = sortedDataTerminals;

        if (selectedYear) {
            filteredTerminals = filteredTerminals.filter(
                terminal => terminal.year.value === selectedYear.value
            );
            if (!selectedMonth) {
                localStorage.setItem('month', JSON.stringify(''))
            }
        }

        if (selectedMonth) {
            filteredTerminals = filteredTerminals.filter(
                terminal => terminal.month.value === selectedMonth.value
            );
        }

        if (searchQuery) {
            filteredTerminals = sortedDataTerminals.filter(
                terminal => String(terminal.number).includes(searchQuery)
            );
        }

        return filteredTerminals;
    }

    const sortedDataTerminals = _.orderBy(terminals, ['created_at'], ['asc'])

    const filteredExtraWorks = filterTerminals(extraWorks, selectedYear, selectedMonth)
    const filteredTerminal = filterTerminals(sortedDataTerminals, selectedYear, selectedMonth, searchQuery)
    // ----------------------------------------------------------

    //--- Кол-во терминалов и сумма всех терминалов и доработок---
    const terminalCount = filteredTerminal.length

    const filterSumAllPrice = filteredTerminal.map(s => s.sum)
    const filterSumAllPriceExtraWorks = filteredExtraWorks.map(e => e.sum)
    const sumAllTermPrice = sumPrice(filterSumAllPrice)
    const allExtraWorkSumPrice = sumPrice(filterSumAllPriceExtraWorks)

    const resultAllExtraWorkSumPrice = allExtraWorkSumPrice
    const resultAllTermSumPrice = sumAllTermPrice

    const percent = 5
    const worksSumPrice = filteredExtraWorks.length > 0 ? resultAllTermSumPrice + (selectedMonth === null ? resultAllExtraWorkSumPrice : Number(filteredExtraWorks[0].sum)) : resultAllTermSumPrice + 0
    const result = worksSumPrice / 100 * percent


    //--------------------------------------------------
    const handleClick = (id) => {
        history.push(history.location.pathname + `/${id}/editTerminal`)
        // history.push(history.location.pathname + `${id}/editTerminal`)
    }

    const handleClickExtraWorks = (id) => {
        history.push(history.location.pathname + `/${id}/editExtraWorks`)
        // history.push(history.location.pathname + `${id}/editExtraWorks`)
    }

    const handleDelete = (orderId) => {
        const order = filteredTerminal.filter(order => order.singleOrder === orderId)
        for (const items of order) {
            dispatch(removeTerminal(items._id))
        }
    }

    const [showUpdateSumBtn, setShowUpdateSumBtn] = useState(false)

    const handleShowModal = () => {
        setShowUpdateSumBtn((prevState) => !prevState)
    }

    const checkBtn = () => {
        setBtnOn((prevState) => !prevState)
    }
    return (
        <div className='container flex-column mt-2'>
            <div className='app_table-container'>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex'>
                        <Link
                            to={'/Statistics'}
                            className='d-flex justify-content-between btn btn-light mb-2'
                        >
                            <div>
                                <i className="bi bi-bar-chart-line"></i>
                            </div>
                        </Link>
                    </div>
                    <div className='d-flex'>
                        <i className='bi bi-brightness-high-fill me-2 '></i>
                        <div className='form-switch'>
                            <input
                                className='form-check-input'
                                type='checkbox'
                                role='switch'
                                id='flexSwitchCheckDefault'
                                onChange={() => changeTheme()}
                                checked={theme === 'light' ? false : true}
                            />
                            <i className='bi bi-moon-fill ms-2 '></i>
                        </div>
                    </div>
                    <Link
                        to={'/createSetting'}
                        className='d-flex justify-content-between btn btn-light mb-2'
                    >
                        <div>
                            <i className="bi bi-gear"></i>
                        </div>
                    </Link>
                </div>
                <div className='d-flex pt-1 mb-2'>
                    <div style={{width: 250, marginRight: 15}}>
                        <Select
                            classNamePrefix='custom-select'
                            isSearchable={false}
                            closeMenuOnSelect={true}
                            defaultValue={selectedYear}
                            options={year}
                            onChange={handleYearSelected}
                        />
                    </div>
                    <div style={{width: 250, marginRight: 15}}>
                        {selectedMonth === null ? (
                            <div>
                                <Select
                                    classNamePrefix='custom-select'
                                    isSearchable={false}
                                    closeMenuOnSelect={true}
                                    defaultValue={null}
                                    options={month}
                                    onChange={handleMonthSelect}
                                />
                            </div>
                        ) : (
                            <Select
                                classNamePrefix='custom-select'
                                isSearchable={false}
                                closeMenuOnSelect={true}
                                defaultValue={selectedMonth}
                                options={month}
                                onChange={handleMonthSelect}
                            />
                        )}

                    </div>
                    <SearchField
                        name='search'
                        onChange={handleSearchQuery}
                        value={searchQuery}
                    />
                </div>
                <div className='form-check'>
                    <input
                        onClick={checkBtn}
                        className='form-check-input'
                        type='checkbox'
                        value=''
                        id='flexCheckDefault'
                    />
                    <label className='form-check-label' htmlFor='flexCheckDefault'>
                        Удаление заказа
                    </label>
                </div>
            </div>
            <div className='app_table-container mt-2'>
                <table className='table table-sm table align-middle'>
                    <thead>
                    <tr>
                        <th scope='col' className='check-box-col'></th>
                        <th scope='col' className='col-1'>
                            №
                        </th>
                        <th scope='col' className='col-2'>
                            <div>
                                <Link
                                    className='btn btn-light btn-sm d-flex justify-content-between'
                                    to={'/createBody'}
                                >
                                    <span>Корпус</span>
                                    <span>+</span>
                                </Link>
                            </div>
                        </th>
                        <th scope='col'>
                            <Link
                                className='btn btn-light btn-sm d-flex justify-content-between'
                                to={'/createWorks'}
                            >
                                <span>Доработки</span>
                                <span>+</span>
                            </Link>
                        </th>
                        <th scope='col' className='col-1' colSpan='2'>
                            {!showUpdateSumBtn && (
                                <button
                                    type='button'
                                    className='btn btn-light btn-sm d-flex justify-content-between fw-bold'
                                    data-bs-toggle='tooltip'
                                    data-bs-placement='top'
                                    title='Обновить цену терминалов в месяце'
                                    onClick={handleShowModal}
                                >
                                    <span>Цена</span>
                                </button>
                            )}
                            {showUpdateSumBtn && (
                                <UpdateSumBtn
                                    terminals={filteredTerminal}
                                    showModal={showUpdateSumBtn}
                                    setShowModal={setShowUpdateSumBtn}
                                    dispatch={dispatch}
                                    setting={setting}
                                />
                            )}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTerminal.length > 0 &&
                        filteredTerminal.map(t => (
                            <tr key={t._id}>
                                <td className='td-check-box'>
                                    <CheckBox
                                        terminals={filteredTerminal}
                                        tid={t._id}
                                        check={t.check}
                                    />
                                </td>
                                <td key={t._id}>
                                    <div></div>
                                    <p className='m-0 p-0 fw-bold'>{t.number}</p>
                                </td>

                                <td>
                                    {searchQuery && (
                                        <span
                                            className='fst-italic fw-light'
                                            style={{fontSize: 12}}
                                        >
													{t.month.label} {t.year.label}
												</span>
                                    )}
                                    <Body id={t.body}/>
                                </td>
                                <td>
                                    <div>
                                        <Works
                                            city={t.city}
                                            works={t.works}
                                            sumTerminal={t.sum}
                                            bodyTerminal={t.body}
                                            setting={setting}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <p className='m-0 p-0'>{t.sum}</p>
                                </td>
                                <td>
                                    <div className='d-flex justify-content-end'>
                                        <div className='d-flex'>
                                            <Button
                                                type='button'
                                                color='light'
                                                size='btn-sm'
                                                rounded='rounded-1'
                                                icon={<i className='bi bi-pencil-square'></i>}
                                                onClick={() => handleClick(t._id)}
                                            />
                                            {!btnOn && t.singleOrder && (
                                                <div className='ms-1'>
                                                    <Button
                                                        type='button'
                                                        color='danger'
                                                        size='btn-sm'
                                                        rounded='rounded-1'
                                                        icon={<i className='bi bi-trash'></i>}
                                                        onClick={() => handleDelete(t.singleOrder)}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    {!searchQuery && (
                        <tfoot>
                        <tr>
                            <th scope='row' colSpan='6'>
                                <div className='d-grid mx-auto'>
                                    {!filteredExtraWorks.length > 0 ? (
                                        <Link
                                            to={'/createExtraWorks'}
                                            className='d-flex justify-content-between btn btn-light'
                                        >
                                            <div>Доп. работы:</div>
                                            <div>+</div>
                                        </Link>
                                    ) : (
                                        <div>
                                            <span>Доп. работы:</span>
                                        </div>
                                    )}
                                </div>
                            </th>
                        </tr>
                        {filteredExtraWorks.length > 0 &&
                            filteredExtraWorks.map(e => (
                                <tr key={e._id}>
                                    <th scope='row' colSpan='4'>
                                        <div
                                            className='fw-semibold'
                                            style={{whiteSpace: 'pre-wrap'}}
                                        >
                                            <p>{e.extraWorks}</p>
                                        </div>
                                    </th>
                                    <th colSpan='1'>{e.sum}</th>
                                    <th className='text-end'>
                                        <Button
                                            type='button'
                                            color='light'
                                            size='btn-sm'
                                            rounded='rounded-1'
                                            icon={<i className='bi bi-pencil-square'></i>}
                                            onClick={() => handleClickExtraWorks(e._id)}
                                        />
                                    </th>
                                </tr>
                            ))}
                        <>
                            <tr>
                                <th scope='row' colSpan='2'>
                                    Итого:
                                </th>
                                <th>{terminalCount}</th>
                                <th colSpan='3' className='text-end'>
                                    {resultAllTermSumPrice} + {resultAllExtraWorkSumPrice} ={' '}
                                    {resultAllTermSumPrice + resultAllExtraWorkSumPrice} - 5%(
                                    {result}) = {worksSumPrice - result}
                                </th>
                            </tr>
                            <tr>
                                <th scope='row' colSpan='6'>
                                    <div className='d-grid mx-auto'>
                                        <Link to={'/createTerminal'} className='btn btn-light'>
                                            +
                                        </Link>
                                    </div>
                                </th>
                            </tr>
                        </>
                        </tfoot>
                    )}
                </table>
            </div>
            {/*<Modal showModal={showModal} onClose={() => setShowModal(false)}>*/}
            {/*	<CreateSetting/>*/}
            {/*</Modal>*/}
        </div>
    )
}
TerminalsTable.propTypes = {
    terminals: PropTypes.array,
    extraWorks: PropTypes.array
}
export default TerminalsTable
