import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoading } from "./appConfigSlice";
import { axiosClient } from "../../Utilities/axiosClient";

export const myProfileUpdate=createAsyncThunk('admin/profile',
    async (body,thunkAPI)=>{
        try {
            thunkAPI.dispatch(setLoading(true))
            const result=await axiosClient.put('/admin/updateProfile', body)
            console.log("Profile Info", result)

            return result
            
        } catch (e) {
            return Promise.reject(e);
        }finally{
            thunkAPI.dispatch(setLoading(false))
        }
    }
)

export const myProfile=createAsyncThunk('admin/myProfile',
    async (_,thunkAPI)=>{
        try {
            thunkAPI.dispatch(setLoading(true))

            const result =await axiosClient.get('/admin/myinfo')

            console.log("My Info ", result);
            

            return result;
            
        } catch (e) {
            return Promise.reject(e);            
        }finally{
            thunkAPI.dispatch(setLoading(false))
        }
    }
)

export const myPublicInfo=createAsyncThunk('admin/mypublicinfo',
    async (_,thunkAPI)=>{
        try {
            thunkAPI.dispatch(setLoading(true))

            const result =await axiosClient.get('/admin/')

            console.log("My Public Info ", result);
            

            return result;
            
        } catch (e) {
            return Promise.reject(e);            
        }finally{
            thunkAPI.dispatch(setLoading(false))
        }
    }
)


const appProfileSlice=createSlice({
    name:'appProfileSlice',
    initialState:{
        myProfile:{}
    },
    extraReducers:(builder)=>{
        builder.addCase(myProfile.fulfilled,(state,action)=>{
            state.myProfile=action.payload
        }).addCase(myProfileUpdate.fulfilled,(state,action)=>{
            state.myProfile=action.payload
        }).addCase(myPublicInfo.fulfilled, (state, action) => {
            state.myProfile = action.payload;
        });

    }
})

export default appProfileSlice.reducer;
