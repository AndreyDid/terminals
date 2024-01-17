import React from "react";
import {Route, Switch} from "react-router-dom";
import Terminals from "./app/layouts/terminals";
import CreateTerminal from "./app/components/page/createTerminal";
import CreateBody from "./app/components/page/createBody";
import CreateWorks from "./app/components/page/createWorks";
import AppLoader from "./app/components/ui/hoc/appLoader";
import EditTerminalPage from "./app/components/page/editTerminalPage";
import EditWorkPage from "./app/components/page/editWorkPage";
import CreateExtraWorks from "./app/components/page/createExtraWorks";
import EditExtraWorksPage from "./app/components/page/editExtraWorksPage";
import CreateSetting from "./app/components/page/createSettings";
import {ThemeProvider} from "./app/hooks/themeProvider";

import './app/components/inputs/multiSelectField/react-multi-select.scss'
import './app/components/inputs/selectField/react-select.scss'

import './index.css'
import Statistics from "./app/components/page/statistics";

function App() {

    return (
			<ThemeProvider>
				<AppLoader>
					<Switch>
						<Route path='/:id?/editExtraWorks' component={EditExtraWorksPage} />
						<Route path='/:id?/editWork' component={EditWorkPage} />
						<Route path='/:id?/editTerminal' component={EditTerminalPage} />
						<Route path='/statistics' component={Statistics} />
						<Route path='/createExtraWorks' component={CreateExtraWorks} />
						<Route path='/createWorks' component={CreateWorks} />
						<Route path='/createSetting' component={CreateSetting} />
						<Route path='/createBody' component={CreateBody} />
						<Route path='/createTerminal' component={CreateTerminal} />
						<Route path='/terminals' exact component={Terminals} />
					</Switch>
				</AppLoader>
			</ThemeProvider>
		)
}

export default App;
