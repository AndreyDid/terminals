import { combineReducers, configureStore } from "@reduxjs/toolkit";
import terminalsReducer from "./terminals";
import bodyReducer from "./body";
import worksReducer from "./works";
import extraWorksReducer from "./extraWorks";
import settingReducer from "./settings";

const rootReducer = combineReducers({
    terminals: terminalsReducer,
    body: bodyReducer,
    works: worksReducer,
    extraWorks: extraWorksReducer,
    setting: settingReducer,
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}