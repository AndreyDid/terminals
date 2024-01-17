import React, { useEffect, useState } from "react";
import useTerminals from "../hooks/useTerminals";
import { updateTerminal } from "../store/terminals";

const CheckBox = ({terminals, tid, check}) => {
	const [btnOn, setBtnOn] = useState(check)

	useEffect(() => {
		setBtnOn(prevState => !prevState)
	},[])

	const {
		dispatch,
	} = useTerminals()

	const currentTerminal = terminals.filter(t => t._id === tid)

	const handleSubmit = async () => {
		setBtnOn(prevState => !prevState)
		const newTerminal = currentTerminal.length > 0 && {
			...currentTerminal[0],
			check: btnOn
		}
		dispatch(updateTerminal(newTerminal))
	}

	return (
		<>
			<input
				defaultChecked={check}
				className='form-check-input'
				type='checkbox'
				value=''
				onClick={handleSubmit}
			/>
		</>
	)
}

export default CheckBox