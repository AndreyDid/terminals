import { createAction, createSlice } from "@reduxjs/toolkit";
import settingService from "../services/setting.services";

const SettingSlice = createSlice({
    name: "setting",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        settingRequested: (state) => {
            state.isLoading = true;
        },
        settingReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        settingRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        settingCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        settingUpdate: (state, action) => {
            state.entities[
                state.entities.findIndex((u) => u._id === action.payload._id)
                ] = action.payload;
        },
        settingRemove: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const { reducer: settingReducer, actions } = SettingSlice;
const {
    settingRequested,
    settingReceived,
    settingRequestFailed,
    settingUpdate
} = actions;

const settingUpdateRequested = createAction("settings/settingUpdateRequested");

export const getSetting = () => (state) => state.setting.entities;
export const getSettingLoadingStatus = () => (state) =>
    state.setting.isLoading;

export const loadSettingList = () => async (dispatch) => {
    dispatch(settingRequested());
    try {
        const { content } = await settingService.getSetting();
        dispatch(settingReceived(content));
    } catch (error) {
        dispatch(settingRequestFailed(error.message));
    }
};

export const updateSetting = (payload) => async (dispatch) => {
    dispatch(settingUpdateRequested());
    await settingService.updateSetting(payload);
    dispatch(settingUpdate(payload));
};

export const getSettingById = (id) => (state) => {
    if (state.setting.entities) {
        return state.setting.entities.find((a) => a._id === id);
    }
};

export default settingReducer;