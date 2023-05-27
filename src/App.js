import React from "react";
import {Route, Switch} from "react-router-dom";
import Terminals from "./app/layouts/terminals";
import CreateTerminal from "./app/components/page/createTerminal";
import CreateBody from "./app/components/page/createBody";
import CreateWorks from "./app/components/page/createWorks";
import './App.css';
import AppLoader from "./app/components/ui/hoc/appLoader";
import EditTerminalPage from "./app/components/page/editTerminalPage";
import EditWorkPage from "./app/components/page/editWorkPage";
import CreateExtraWorks from "./app/components/page/createExtraWorks";

function App() {

    return (
        <AppLoader>
                <div>
                    <Switch>
                        <Route path='/terminals/:id?/editWork' component={EditWorkPage}/>
                        <Route path='/terminals/:id?/editTerminal' component={EditTerminalPage}/>
                        <Route path='/createExtraWorks' component={CreateExtraWorks}/>
                        <Route path='/createWorks' component={CreateWorks}/>
                        <Route path='/createBody' component={CreateBody}/>
                        <Route path='/createTerminal' component={CreateTerminal}/>
                        <Route path='/terminals' exact component={Terminals}/>
                    </Switch>
                </div>
        </AppLoader>
    );
}

export default App;
