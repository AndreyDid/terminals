import {createAction, createSlice} from "@reduxjs/toolkit";
import workService from "../services/works.services";
import {nanoid} from "nanoid";

const WorkSlice = createSlice({
    name: "works",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        worksRequested: (state) => {
            state.isLoading = true;
        },
        worksReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        worksRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        workCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        workUpdate: (state, action) => {
            state.entities[
                state.entities.findIndex((u) => u._id === action.payload._id)
                ] = action.payload;
        },
        workRemove: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const {reducer: worksReducer, actions} = WorkSlice;
const {
    worksRequested,
    worksReceived,
    worksRequestFailed,
    workCreated,
    workRemove,
    workUpdate
} = actions;

const workCreateRequested = createAction("works/workCreateRequested");
const workRemoveRequested = createAction("works/workRemoveRequested");
const workUpdateRequested = createAction("works/workUpdateRequested");
// const workUpdateFailed = createAction("works/terminalUpdateFailed");

export const getWork = () => (state) => state.works.entities;
export const getWorkLoadingStatus = () => (state) =>
    state.works.isLoading;

export const loadWorkList = () => async (dispatch) => {
    dispatch(worksRequested());
    try {
        const {content} = await workService.getWork();
        dispatch(worksReceived(content));
    } catch (error) {
        dispatch(worksRequestFailed(error.message));
    }
};
export const removeWork = (workId) => async (dispatch) => {
    dispatch(workRemoveRequested());
    await workService.removeWork(workId);
            dispatch(workRemove(workId));
};

export const createWork = (payload) => async (dispatch) => {
    dispatch(workCreateRequested());
    const work = {
        ...payload,
        _id: nanoid(),
    }
    await workService.createWork(work);
    dispatch(workCreated(work));
    // history.push("/");
};

export const updateWork = (payload) => async (dispatch) => {
    dispatch(workUpdateRequested());
    await workService.updateWork(payload);
    dispatch(workUpdate(payload));
};

export const getWorksByIds = worksIds => state => {
    if (state.works.entities) {
        const worksArray = []
        for (const wId of worksIds) {
            for (const work of state.works.entities) {
                if (work._id === wId) {
                    worksArray.push(work)
                    break
                }
            }
        }
        return worksArray
    }
    return []
}
export const getWorkById = (id) => (state) => {
    if (state.works.entities) {
        return state.works.entities.find((a) => a._id === id);
    }
};

export default worksReducer;