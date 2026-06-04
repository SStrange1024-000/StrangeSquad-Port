import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../Utilities/axiosClient";
import axios from "axios";

export const getAllmessages = createAsyncThunk('contact/getAllmessages',
    async (body , thunkAPI)=>{
        try {
            thunkAPI.dispatch(setLoading(true))
            const result= await axiosClient.get('/contact/');
            console.log('Thunk calleed API', result);

            return result.message.message
        } catch (e) {
            return Promise.reject(e);
        }finally{
            thunkAPI.dispatch(setLoading(false))
        }
    }
)

export const deleteMessage= createAsyncThunk('contact/Delete',
    async (_id, thunkAPI)=>{
        try {
            thunkAPI.dispatch(setLoading(true))
            const result= await axiosClient.delete('/contact/delete',
                {
                    data:{_id}
                }
            )
            thunkAPI.dispatch(getAllmessages());

            console.log("This is delete message", result);
            
            return result.message
        } catch (e) {
            
        }finally{
            thunkAPI.dispatch(setLoading(true))
        }
    }
)

const appConfigSlice=createSlice({
    name:'appConfigSlice',
    initialState:{
        isLoading:false,
        allMessages:[]
    },
    reducers:{
        setLoading:(state,action)=>{
            state.isLoading=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllmessages.fulfilled,(state,action)=>{
          state.allMessages=action.payload
        })
        builder.addCase(deleteMessage.fulfilled,
            (state,action)=>{
                state.allMessages=state.allMessages.filter(
                    (item)=>item._id!==action.payload
                )
            }
        )
        
    }
})

export default appConfigSlice.reducer;
export const {setLoading}=appConfigSlice.actions;