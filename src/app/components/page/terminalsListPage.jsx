import React from "react";
import TerminalsTable from "../ui/terminasTable";
import {useSelector} from "react-redux";
import {getTerminal, getTerminalLoadingStatus} from "../../store/terminals";
import {getExtraWork, getExtraWorkLoadingStatus} from "../../store/extraWorks";

const TerminalsListPage = () => {
    const terminals = useSelector(getTerminal())
    const extraWorks = useSelector(getExtraWork())
    const terminalsLoading = useSelector(getTerminalLoadingStatus())
    const extraWorkLoading = useSelector(getExtraWorkLoadingStatus())
    return (
        <>
            {!terminalsLoading && !extraWorkLoading && terminals && extraWorks && (
                <TerminalsTable data={terminals} extraWorks={extraWorks}/>
            )}
        </>
    )

}
export default TerminalsListPage