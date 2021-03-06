import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { apiInstance, userInstance } from "../../api";
import { getProjectList } from "./project";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
const api = apiInstance();
const userApi = userInstance();

export type UserState = {
    chatList: Array<Object>;
    chatInfo: Object;
};

const initialState: UserState = {
    chatList: [],
    chatInfo: {},
};


export const projectChat = createAsyncThunk(
    "CHAT/ROOM/PROJECT",
    async (projectNo: string, thunkAPI) => {
        return await api
            .get(`/chat/room/project/${projectNo}`)
            .then((res) => {
                console.log(res.data.response)
                localStorage.setItem("messageList", JSON.stringify(res.data.response.messageList));
                return res.data
            })
            // .then((res) => console.log(res.data))
            .catch((err) => thunkAPI.rejectWithValue(err.response.data));
    }
);

export function chatSubscribe() {
    const Authorization = localStorage.getItem("Authorization")?.split(" ")[1].toString();
    if (!Authorization) return;
    let sock = new SockJS("https://k6c107.p.ssafy.io/api/ws-stomp");
    let client = Stomp.over(sock);

    client.connect(
        { Authorization },
        () => {
                // 채팅 주소 구독
                client.subscribe(`/sub/chat/room/project/${localStorage.getItem("roomNo")}`, (res) => {
                const messagedto = JSON.parse(res.body);
                console.log(messagedto);
                alert(messagedto.nickname + "이 " + messagedto.roomNo + "번방에 채팅을 작성했습니다.");
            });
        }
    );
}

export function chatSend() {
    const Authorization = localStorage.getItem("Authorization")?.split(" ")[1].toString();
    if (!Authorization) return;
    console.log(Authorization);
    let sock = new SockJS("https://k6c107.p.ssafy.io/api/ws-stomp");
    let client = Stomp.over(sock);

    client.connect(
        { Authorization },
        () => {
            // // 채팅 전송 
            let chat = {
            // 채팅장 번호
            roomNo: localStorage.getItem("roomNo"),
            // 채팅 작성자 코드
            pubNo: localStorage.getItem("userNo"),
            // 채팅 내용
            content: localStorage.getItem("chatContent"),
            }
        
            client.send(`/pub/chat/project-msg`, JSON.stringify(chat));
        }
    );
}



const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(projectChat.fulfilled, (state, { payload }) => {
                state.chatInfo = payload.response;
                localStorage.setItem("roomNo", payload.response.roomNo)
            });
        },
    });

export default chatSlice.reducer;
