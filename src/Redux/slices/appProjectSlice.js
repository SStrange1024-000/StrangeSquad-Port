import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoading } from "./appConfigSlice";
import { axiosClient } from "../../Utilities/axiosClient";

// Read
export const getMyProjects = createAsyncThunk(
  "admin/readProject",
  async (Body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));

      const result= await axiosClient.get('/post/getProjects', );

      console.log("CreateProjectData", result);
      
      return result?.message

    } catch (e) {
        return Promise.reject(e);
    } finally {
      thunkAPI.dispatch(setLoading(true));
    }
  },
);

// delete Project
export const deleteProject= createAsyncThunk("admin/DeleteProject",
  async ( _id ,thunkAPI)=>{
    try {
    thunkAPI.dispatch(setLoading(true));

    const result = await axiosClient.delete('/post/deleteProject',{
      data: {projectId:_id}
    });

    thunkAPI.dispatch(getMyProjects())
    console.log(result);
    
    return result
      
    } catch (e) {
      return Promise.reject(e);
      
    }finally{
    thunkAPI.dispatch(setLoading(false));

    }
    
  }
)

const appProjectSlice = createSlice({
  name: "appProjectSlice",
  initialState: {
    myProjects: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getMyProjects.fulfilled, (state,action)=>{
        state.myProjects=action.payload
    });
  },
});

export default appProjectSlice.reducer;
