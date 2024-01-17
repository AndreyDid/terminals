import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {getBody, getBodyLoadingStatus} from "../store/body";
import {getWork, getWorkLoadingStatus} from "../store/works";
import {useEffect, useState} from "react";
import {dataMonth, dataYear} from "../../data/data";
import {validator} from "../utils/validator";
import {getSetting, getSettingLoadingStatus} from "../store/settings";

const useTerminals = (data, setData, validatorConfig) => {
    const [errors, setErrors] = useState({});

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const month = dataMonth
    const year = dataYear

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    const currentYearFilter = year.filter(y => Number(y.label) === currentDate.getFullYear())

    const history = useHistory()
    const params = useParams()

    const dispatch = useDispatch()

    const setting = useSelector(getSetting())
    const settingLoading = useSelector(getSettingLoadingStatus())

    const bodies = useSelector(getBody())
    const works = useSelector(getWork())
    const bodyLoading = useSelector(getBodyLoadingStatus());
    const workLoading = useSelector(getWorkLoadingStatus())

    const [isLoading, setIsLoading] = useState(true)

    const handleChange =(target) => {
        setData((prevState) => ({...prevState, [target.name]: target.value}));
    };
    return {
			setting,
			settingLoading,
			history,
			params,
			dispatch,
			bodies,
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
			handleChange,
			validate,
			useEffect,
			isValid,
			errors,
			data,
		}
}

export default useTerminals