import {createSlice} from "@reduxjs/toolkit";
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
    } = actions;

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

export default extraWorksReducer;