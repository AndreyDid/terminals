import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getIsLoggedIn, getTerminalLoadingStatus, loadTerminalList} from "../../../store/terminals";
import {loadBodyList} from "../../../store/body";
import {loadWorkList} from "../../../store/works";
import {loadExtraWorkList} from "../../../store/extraWorks";
import Loader from "../../common/loader";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch()
    const terminalStatusLoading = useSelector(getTerminalLoadingStatus())

    const isLoggedIn = useSelector(getIsLoggedIn())

    useEffect(() => {
        if (isLoggedIn) {
        dispatch(loadTerminalList())
        dispatch(loadBodyList())
        dispatch(loadWorkList())
        dispatch(loadExtraWorkList())
        }
    }, [isLoggedIn])
if (terminalStatusLoading) return <Loader />
    return children
}

export default AppLoader