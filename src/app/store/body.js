import { createAction, createSlice } from "@reduxjs/toolkit";
import bodyService from "../services/body.services";
import {nanoid} from "nanoid";

const BodySlice = createSlice({
    name: "body",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        bodyRequested: (state) => {
            state.isLoading = true;
        },
        bodyReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        bodyRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        bodyCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        bodyRemove: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const { reducer: bodyReducer, actions } = BodySlice;
const {
    bodyRequested,
    bodyReceived,
    bodyRequestFailed,
    bodyCreated,
    bodyRemove,
} = actions;

const bodyCreateRequested = createAction("body/bodyCreateRequested");
const bodyRemoveRequested = createAction("body/bodyRemoveRequested");

export const getBody = () => (state) => state.body.entities;
export const getBodyLoadingStatus = () => (state) =>
    state.body.isLoading;

export const loadBodyList = () => async (dispatch) => {
    dispatch(bodyRequested());
    try {
        const { content } = await bodyService.getBody();
        dispatch(bodyReceived(content));
    } catch (error) {
        dispatch(bodyRequestFailed(error.message));
    }
};
export const removeBody = (bodyId) => async (dispatch) => {
    dispatch(bodyRemoveRequested());
        await bodyService.removeBody(bodyId);
            dispatch(bodyRemove(bodyId));
};

export const createBody = (payload) => async (dispatch) => {
    dispatch(bodyCreateRequested());
    const body = {
        ...payload,
        _id: nanoid()
    }
        await bodyService.createBody(body);
        dispatch(bodyCreated(body));
};

export const getBodyById = (id) => (state) => {
    if (state.body.entities) {
        return state.body.entities.find((a) => a._id === id);
    }
};

export default bodyReducer;