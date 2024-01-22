import React from "react"
import useTerminals from "../../hooks/useTerminals"
import {useSelector} from "react-redux"
import {getTerminal, getTerminalLoadingStatus} from "../../store/terminals"
import {getExtraWork, getExtraWorkLoadingStatus} from "../../store/extraWorks"
import {sumPrice} from "../../utils/sumPrice"
import Button from "../common/button"

const Statistics = () => {

    const terminals = useSelector(getTerminal())
    const extraWorks = useSelector(getExtraWork())
    const terminalsLoading = useSelector(getTerminalLoadingStatus())
    const extraWorkLoading = useSelector(getExtraWorkLoadingStatus())
    const {year, month, history} = useTerminals()

    const filterSumTerminalsYear = (year) => {
        const filterTerminals = terminals.filter(t => t.year.label === year)
        const sumTerminals = filterTerminals.map(terminal => terminal.sum)

        const extraWorksYear = extraWorks.filter(extraWork => extraWork.year.label === year)
        const sumPriceExtraWorks = extraWorksYear.map(extraWork => extraWork.sum)

        return sumPrice(sumTerminals) + sumPrice(sumPriceExtraWorks)
    }

    const averageSalary = (year) => {
        const filterTerminalsYear = terminals.filter(t => t.year.label === year)

        const sumTerminals = filterTerminalsYear.map(terminal => terminal.sum)

        const extraWorksYear = extraWorks.filter(extraWork => extraWork.year.label === year)
        const sumPriceExtraWorks = extraWorksYear.map(extraWork => extraWork.sum)

        const sumAllTerminals = sumPrice(sumTerminals) + sumPrice(sumPriceExtraWorks)
        const count = sumAllTerminals / 12
        return Math.floor(count * 100) / 100
    }
    const filterTerminalQuantityYear = (year) => {
        const quantityTerminals = terminals.filter(t => t.year.label === year)
        return quantityTerminals.length
    }

    const filterTerminalPriceMonth = (month, year) => {
        const terminalsYear = terminals.filter(terminal => terminal.year.label === year)
        const terminalsMonth = terminalsYear.filter(terminal => terminal.month.label === month)
        const sumPriceTerminalMonth = terminalsMonth.map(terminal => terminal.sum)

        const extraWorksYear = extraWorks.filter(extraWork => extraWork.year.label === year)
        const extraWorksMonth = extraWorksYear.filter(extraWork => extraWork.month.label === month)
        const sumPriceExtraWorks = extraWorksMonth.map(extraWork => extraWork.sum)

        return sumPrice(sumPriceTerminalMonth) + sumPrice(sumPriceExtraWorks)
    }

    return (
        <>
            {!terminalsLoading && !extraWorkLoading && terminals && extraWorks && (
                <div className='container flex-column mt-2'>
                    <div>
                        <Button
                            label='Назад'
                            type='button'
                            color='light'
                            onClick={() => history.goBack()}
                            icon={<i className='bi bi-arrow-left'></i>}
                            rounded='rounded-1'
                        />
                        <div className='app_table-container mt-2'>
                            <table className='table table-sm table align-middle'>
                                <thead>
                                <tr>
                                    <th></th>
                                    {year.map(y => (
                                        <th key={y.value}>{y.label}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {month.map(m => (
                                    <tr key={m.value}>
                                        <th>{m.label}</th>
                                        {year.map(y => (
                                            <td key={y.value}>
														<span>
															{filterTerminalPriceMonth(m.label, y.label)}
														</span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                                <tfoot>
                                <tr>
                                    <td colSpan='4' className='p-3'></td>
                                </tr>
                                <tr>
                                    <th>Средняя зарплата</th>
                                    {year.map(y => (
                                        <td key={y.value}>
                                            <span>{averageSalary(y.label)}</span>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <th>Зарплата за год</th>
                                    {year.map(y => (
                                        <td key={y.value}>
                                            <span>{filterSumTerminalsYear(y.label)}</span>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td colSpan='4' className='p-3'></td>
                                </tr>
                                <tr>
                                    <th>Кол-во терминалов</th>
                                    {year.map(y => (
                                        <td key={y.value}>
                                            <span>{filterTerminalQuantityYear(y.label)}</span>
                                        </td>
                                    ))}
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Statistics