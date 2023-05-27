import { combineReducers, configureStore } from "@reduxjs/toolkit";
import terminalsReducer from "./terminals";
import bodyReducer from "./body";
import worksReducer from "./works";
import extraWorksReducer from "./extraWorks";

const rootReducer = combineReducers({
    terminals: terminalsReducer,
    body: bodyReducer,
    works: worksReducer,
    extraWorks: extraWorksReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}