import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {getBody, getBodyLoadingStatus} from "../store/body";
import {getWork, getWorkLoadingStatus} from "../store/works";
import {useState} from "react";
import {dataMonth, dataYear} from "../../data/data";

const useTerminals = (setData) => {
    const month = dataMonth
    const year = dataYear

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    const currentYearFilter = year.filter(y => Number(y.label) === currentDate.getFullYear())

    const history = useHistory()
    const params = useParams()

    const dispatch = useDispatch()

    const body = useSelector(getBody());
    const works = useSelector(getWork())
    const bodyLoading = useSelector(getBodyLoadingStatus());
    const workLoading = useSelector(getWorkLoadingStatus())

    const [isLoading, setIsLoading] = useState(true)

    const handleChange = (target) => {
        setData((prevState) => ({...prevState, [target.name]: target.value}));
    };
    return {
        history,
        params,
        dispatch,
        body,
        works,
        bodyLoading,
        workLoading,
        currentDate,
        isLoading,
        setIsLoading,
        month,
        year,
        currentYearFilter,
        currentYear,
        currentMonth,
        handleChange
    }
}

export default useTerminals