import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { apiInstance } from "../../api";
const api = apiInstance();

export type UserState = {
    userInfo: any;
    isLogin: boolean;
};

const initialState: UserState = {
    userInfo: [],
    isLogin: false,
}

export const getLogin = createAsyncThunk(
    "USER/LOGIN/GITHUB",
    async (_, thunkAPI) => {
        const code = localStorage.getItem("code");
        
        return await axios
            .get(`http://k6c107.p.ssafy.io:8080/user/login/github?code=${code}`)
            .then((res) => {
                localStorage.setItem("Authorization", res.data.jwtToken);
                thunkAPI.dispatch(getUserInfo());
    })
        .catch((err) => thunkAPI.rejectWithValue(err.response.data));
    }
);

export const getUserInfo = createAsyncThunk(
    "USER/DATA",
    async (_, { rejectWithValue }) => {

        const Authorization = localStorage.getItem("Authorization");
        return await axios
            .get(`http://k6c107.p.ssafy.io:8080/user/data`, {
                headers: {
                    Authorization: `Bearer ${Authorization}`
                },
        })
        .then((res) => res.data)
        .catch((err) => rejectWithValue(err.response.data));
    }
);

export const getLogout = createAsyncThunk(
    "USER/LOGOUT",
    async (_, { rejectWithValue }) => {
        return await api
            .get(`/user/logout`)
            .then((res) => res.data)
            .catch((err) => rejectWithValue(err.response.data));
        }
);

const memberSlice = createSlice({
    name: "member",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getUserInfo.fulfilled,
            (state, { payload }: { payload: { userInfo: any } }) => {
                state.userInfo = payload;
            }
        ).addCase(
            getLogin.fulfilled, (state) => {
                state.isLogin = true;
                window.location.href = "/";
            }
        ).addCase(
            getLogout.fulfilled, (state) => {
                console.log("로그아웃");
                state.isLogin = false;
            }
        )
    },
});

// export const { } = memberSlice.actions;
export default memberSlice.reducer;