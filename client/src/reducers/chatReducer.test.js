import { SET_SOCKET, UNSET_SOCKET, CONNECT_SOCKET, JOIN_ROOM, LOAD_PAST_MESSAGES,
    DISCONNECT_SOCKET, SEND_MESSAGE, DELETE_MESSAGE, RECEIVE_NEW_MESSAGES,
    RECEIVE_VIDEO_CALL, PICK_UP_VIDEO_CALL, HANG_UP_VIDEO_CALL,
    INITIATE_VIDEO_CALL, SET_CALLEE_ONLINE, SET_CALLEE_OFFLINE,
    STOP_WAITING_FOR_CALLEE_RESPONSE, SET_ITEM_STATUS, VIDEO_CALL_REJECTED, RESET_VIDEO_CALL_REJECTED, 
    CALLER_HANGED_CALL, DELETE_CONVERSATION
   } from '../actions/types';
import chatReducer from './chatReducer';

describe('Auth Reducer', ()=>{
    it('Should return default state', ()=>{
        const newState = chatReducer(undefined, {});
        expect(newState).toEqual({
            socket: null,
            pairId: null,
            sender: null, //email
            receiver: null, // email
            senderName: null,
            receiverName: null,
            messages: [], // [{ pairId, from, to, message, datetime, type }]
            itemStatusMap: {}, // {index: status}, e.g. { 1 : LOADING, 2 : LOADED... }
            ringing: false,
            calling: false,
            waiting: false,
            rejected: false,
            calleeOnline: true,
        });
    });
    it ('join room', () =>{
        // pairId, sender, receiver, senderName, receiverName
        const chat = {
            socket: null,
            pairId: 'testid',
            sender: 'testsender', //email
            receiver: 'test receiver', // email
            senderName: 'test sender name',
            receiverName: 'test reciever name',
            // messages: [
            //     {pairId: 'testid', from: 'testid', to: 'testsender', message: 'hey', datetime:'2020/09/01', type:'text'} 
            // ], 
            messages: [],
            itemStatusMap: {}, // {index: status}, e.g. { 1 : LOADING, 2 : LOADED... }
            ringing: false,
            calling: false,
            waiting: false,
            rejected: false,
            calleeOnline: true,
        };
        const newState = chatReducer(undefined, {
            type: JOIN_ROOM,
            payload: chat
        });
        expect(newState).toEqual(chat);
    });

    it ('SET_ITEM_STATUS', () =>{
        const chat = {
            socket: null,
            pairId: null,
            sender: null, //email
            receiver: null, // email
            senderName: null,
            receiverName: null,
            messages: [], 
            itemStatusMap: {}, // {index: status}, e.g. { 1 : LOADING, 2 : LOADED... }
            ringing: false,
            calling: false,
            waiting: false,
            rejected: false,
            calleeOnline: true,
        };
        const newState = chatReducer(undefined, {
            type: SET_ITEM_STATUS,
            payload: chat
        });
        expect(newState).toEqual(chat);
    });

    // it ('LOAD_PAST_MESSAGES', () =>{
    //     const chat1 = {
    //         socket: null,
    //         pairId: null,
    //         sender: null, //email
    //         receiver: null, // email
    //         senderName: null,
    //         receiverName: null,
    //         messages: [
    //             {pairId: 'testid', from: 'testid', to: 'testsender', message: 'hey', datetime:'2020/09/01', type:'text'} 
    //         ], 
    //         itemStatusMap: {}, // {index: status}, e.g. { 1 : LOADING, 2 : LOADED... }
    //         ringing: false,
    //         calling: false,
    //         waiting: false,
    //         rejected: false,
    //         calleeOnline: true,
    //     }
    //     const chat = {
    //         socket: null,
    //         pairId: null,
    //         sender: null, //email
    //         receiver: null, // email
    //         senderName: null,
    //         receiverName: null,
    //         messages: [
    //             {pairId: 'testid', from: 'testid', to: 'testsender', message: 'hey', datetime:'2020/09/01', type:'text'},
    //             {pairId: 'testid', from: 'testid', to: 'testsender', message: 'heyhey', datetime:'2020/09/01', type:'text'}  
    //         ], 
    //         itemStatusMap: {}, // {index: status}, e.g. { 1 : LOADING, 2 : LOADED... }
    //         ringing: false,
    //         calling: false,
    //         waiting: false,
    //         rejected: false,
    //         calleeOnline: true,
    //     };
    //     const newState = chatReducer(chat, {
    //         type: LOAD_PAST_MESSAGES,
    //         payload: chat
    //     });
    //     expect(newState).toEqual(chat);
    // });
    it ('INITIATE_VIDEO_CALL', () =>{
        // pairId, sender, receiver, senderName, receiverName
        const chat = {
            socket: null,
            pairId: null,
            sender: null, //email
            receiver: null, // email
            senderName: null,
            receiverName: null,
            messages: [], 
            itemStatusMap: {}, // {index: status}, e.g. { 1 : LOADING, 2 : LOADED... }
            ringing: false,
            calling: false,
            waiting: true,
            rejected: false,
            calleeOnline: true,
        };
        const newState = chatReducer(undefined, {
            type: INITIATE_VIDEO_CALL,
            payload: chat
        });
        expect(newState).toEqual(chat);
    });

    it ('RECEIVE_VIDEO_CALL', () =>{
        // pairId, sender, receiver, senderName, receiverName
        const chat = {
            socket: null,
            pairId: null,
            sender: null, //email
            receiver: null, // email
            senderName: null,
            receiverName: null,
            messages: [], 
            itemStatusMap: {}, // {index: status}, e.g. { 1 : LOADING, 2 : LOADED... }
            ringing: true,
            calling: false,
            waiting: false,
            rejected: false,
            calleeOnline: true,
        };
        const newState = chatReducer(undefined, {
            type: RECEIVE_VIDEO_CALL,
            payload: chat
        });
        expect(newState).toEqual(chat);
    });

    it ('PICK_UP_VIDEO_CALL', () =>{
        // pairId, sender, receiver, senderName, receiverName
        const chat = {
            socket: null,
            pairId: null,
            sender: null, //email
            receiver: null, // email
            senderName: null,
            receiverName: null,
            messages: [], 
            itemStatusMap: {}, // {index: status}, e.g. { 1 : LOADING, 2 : LOADED... }
            ringing: false,
            calling: true,
            waiting: false,
            rejected: false,
            calleeOnline: true,
        };
        const newState = chatReducer(undefined, {
            type: PICK_UP_VIDEO_CALL,
            payload: chat
        });
        expect(newState).toEqual(chat);
    });  

    it ('HANG_UP_VIDEO_CALL', () =>{
        // pairId, sender, receiver, senderName, receiverName
        const chat = {
            socket: null,
            pairId: null,
            sender: null, //email
            receiver: null, // email
            senderName: null,
            receiverName: null,
            messages: [], 
            itemStatusMap: {}, // {index: status}, e.g. { 1 : LOADING, 2 : LOADED... }
            ringing: false,
            calling: false,
            waiting: false,
            rejected: false,
            calleeOnline: true,
        };
        const newState = chatReducer(undefined, {
            type: HANG_UP_VIDEO_CALL,
            payload: chat
        });
        expect(newState).toEqual(chat);
    });  

    it ('CONNECT_SOCKET', () =>{
        // pairId, sender, receiver, senderName, receiverName
        const chat = {
            socket: null,
            pairId: null,
            sender: null, //email
            receiver: null, // email
            senderName: null,
            receiverName: null,
            messages: [], 
            itemStatusMap: {}, // {index: status}, e.g. { 1 : LOADING, 2 : LOADED... }
            ringing: false,
            calling: false,
            waiting: false,
            rejected: false,
            calleeOnline: true,
        };
        const newState = chatReducer(undefined, {
            type: CONNECT_SOCKET,
            payload: chat
        });
        expect(newState).toEqual(chat);
    });  

    it ('DISCONNECT_SOCKET', () =>{
        // pairId, sender, receiver, senderName, receiverName
        const chat = {
            socket: null,
            pairId: null,
            sender: null, //email
            receiver: null, // email
            senderName: null,
            receiverName: null,
            messages: [], 
            itemStatusMap: {}, // {index: status}, e.g. { 1 : LOADING, 2 : LOADED... }
            ringing: false,
            calling: false,
            waiting: false,
            rejected: false,
            calleeOnline: true,
        };
        const newState = chatReducer(undefined, {
            type: DISCONNECT_SOCKET,
            payload: chat
        });
        expect(newState).toEqual(chat);
    });
    
    it ('UNSET_SOCKET', () =>{
        // pairId, sender, receiver, senderName, receiverName
        const chat = {
            socket: null,
            pairId: null,
            sender: null, //email
            receiver: null, // email
            senderName: null,
            receiverName: null,
            messages: [], 
            itemStatusMap: {}, // {index: status}, e.g. { 1 : LOADING, 2 : LOADED... }
            ringing: false,
            calling: false,
            waiting: false,
            rejected: false,
            calleeOnline: true,
        };
        const newState = chatReducer(undefined, {
            type: UNSET_SOCKET,
            payload: chat
        });
        expect(newState).toEqual(chat);
    });

    it ('SET_CALLEE_ONLINE', () =>{
        // pairId, sender, receiver, senderName, receiverName
        const chat = {
            socket: null,
            pairId: null,
            sender: null, //email
            receiver: null, // email
            senderName: null,
            receiverName: null,
            messages: [], 
            itemStatusMap: {}, // {index: status}, e.g. { 1 : LOADING, 2 : LOADED... }
            ringing: false,
            calling: false,
            waiting: false,
            rejected: false,
            calleeOnline: true,
        };
        const newState = chatReducer(undefined, {
            type: SET_CALLEE_ONLINE,
            payload: chat
        });
        expect(newState).toEqual(chat);
    });

    it ('SET_CALLEE_OFFLINE', () =>{
        // pairId, sender, receiver, senderName, receiverName
        const chat = {
            socket: null,
            pairId: null,
            sender: null, //email
            receiver: null, // email
            senderName: null,
            receiverName: null,
            messages: [], 
            itemStatusMap: {}, // {index: status}, e.g. { 1 : LOADING, 2 : LOADED... }
            ringing: false,
            calling: false,
            waiting: false,
            rejected: false,
            calleeOnline: false,
        };
        const newState = chatReducer(undefined, {
            type: SET_CALLEE_OFFLINE,
            payload: chat
        });
        expect(newState).toEqual(chat);
    });

    it ('STOP_WAITING_FOR_CALLEE_RESPONSE', () =>{
        // pairId, sender, receiver, senderName, receiverName
        const chat = {
            socket: null,
            pairId: null,
            sender: null, //email
            receiver: null, // email
            senderName: null,
            receiverName: null,
            messages: [], 
            itemStatusMap: {}, // {index: status}, e.g. { 1 : LOADING, 2 : LOADED... }
            ringing: false,
            calling: false,
            waiting: false,
            rejected: false,
            calleeOnline: true,
        };
        const newState = chatReducer(undefined, {
            type: STOP_WAITING_FOR_CALLEE_RESPONSE,
            payload: chat
        });
        expect(newState).toEqual(chat);
    });

    it ('VIDEO_CALL_REJECTED', () =>{
        // pairId, sender, receiver, senderName, receiverName
        const chat = {
            socket: null,
            pairId: null,
            sender: null, //email
            receiver: null, // email
            senderName: null,
            receiverName: null,
            messages: [], 
            itemStatusMap: {}, // {index: status}, e.g. { 1 : LOADING, 2 : LOADED... }
            ringing: false,
            calling: false,
            waiting: false,
            rejected: true,
            calleeOnline: true,
        };
        const newState = chatReducer(undefined, {
            type: VIDEO_CALL_REJECTED,
            payload: chat
        });
        expect(newState).toEqual(chat);
    });

    it ('RESET_VIDEO_CALL_REJECTED', () =>{
        // pairId, sender, receiver, senderName, receiverName
        const chat = {
            socket: null,
            pairId: null,
            sender: null, //email
            receiver: null, // email
            senderName: null,
            receiverName: null,
            messages: [], 
            itemStatusMap: {}, // {index: status}, e.g. { 1 : LOADING, 2 : LOADED... }
            ringing: false,
            calling: false,
            waiting: false,
            rejected: false,
            calleeOnline: true,
        };
        const newState = chatReducer(undefined, {
            type: RESET_VIDEO_CALL_REJECTED,
            payload: chat
        });
        expect(newState).toEqual(chat);
    });

    it ('CALLER_HANGED_CALL', () =>{
        // pairId, sender, receiver, senderName, receiverName
        const chat = {
            socket: null,
            pairId: null,
            sender: null, //email
            receiver: null, // email
            senderName: null,
            receiverName: null,
            messages: [], 
            itemStatusMap: {}, // {index: status}, e.g. { 1 : LOADING, 2 : LOADED... }
            ringing: false,
            calling: false,
            waiting: false,
            rejected: false,
            calleeOnline: true,
        };
        const newState = chatReducer(undefined, {
            type: CALLER_HANGED_CALL,
            payload: chat
        });
        expect(newState).toEqual(chat);
    });

    it ('DELETE_CONVERSATION', () =>{
        // pairId, sender, receiver, senderName, receiverName
        const chat = {
            socket: null,
            pairId: null,
            sender: null, //email
            receiver: null, // email
            senderName: null,
            receiverName: null,
            messages: [], 
            itemStatusMap: {}, // {index: status}, e.g. { 1 : LOADING, 2 : LOADED... }
            ringing: false,
            calling: false,
            waiting: false,
            rejected: false,
            calleeOnline: true,
        };
        const newState = chatReducer(undefined, {
            type: DELETE_CONVERSATION,
            payload: chat
        });
        expect(newState).toEqual(chat);
    });

    it ('should return initial state', ()=>{
        expect(chatReducer(undefined, {})).toMatchSnapshot();
    });
});