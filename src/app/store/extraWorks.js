import {createAction, createSlice} from "@reduxjs/toolkit";
import {nanoid} from "nanoid";
import extraWorksService from "../services/extraWorks.services";

const extraWorkSlice = createSlice({
    name: "extraWorks",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        extraWorksRequested: (state) => {
            state.isLoading = true;
        },
        extraWorksReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        extraWorksRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        extraWorkCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        extraWorkUpdate: (state, action) => {
            state.entities[
                state.entities.findIndex((u) => u._id === action.payload._id)
                ] = action.payload;
        },
        extraWorkRemove: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const {reducer: extraWorksReducer, actions} = extraWorkSlice;
const {
    extraWorksRequested,
    extraWorksReceived,
    extraWorksRequestFailed,
    extraWorkCreated,
    extraWorkRemove,
    extraWorkUpdate
} = actions;

const extraWorkRemoveRequested = createAction("extraWorks/extraWorkRemoveRequested");
const extraWorkUpdateRequested = createAction("extraWorks/extraWorkUpdateRequested");

export const getExtraWork = () => (state) => state.extraWorks.entities;
export const getExtraWorkLoadingStatus = () => (state) =>
    state.extraWorks.isLoading;

export const loadExtraWorkList = () => async (dispatch) => {
    dispatch(extraWorksRequested());
    try {
        const {content} = await extraWorksService.getExtraWork();
        dispatch(extraWorksReceived(content));
    } catch (error) {
        dispatch(extraWorksRequestFailed(error.message));
    }
};

export const createExtraWork = (payload) => async (dispatch) => {
    const extraWork = {
        ...payload,
        _id: nanoid()
    }
    await extraWorksService.createExtraWork(extraWork);
    dispatch(extraWorkCreated(extraWork));
};

export const removeExtraWorks = (workId) => async (dispatch) => {
    dispatch(extraWorkRemoveRequested());
    await extraWorksService.removeExtraWork(workId);
    dispatch(extraWorkRemove(workId));
};

export const updateExtraWorks = (payload) => async (dispatch) => {
    dispatch(extraWorkUpdateRequested());
    await extraWorksService.updateExtraWork(payload);
    dispatch(extraWorkUpdate(payload));
};


export const getExtraWorksById = (id) => (state) => {
    if (state.extraWorks.entities) {
        return state.extraWorks.entities.find((a) => a._id === id);
    }
};

export default extraWorksReducer;