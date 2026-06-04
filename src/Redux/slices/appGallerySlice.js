import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../Utilities/axiosClient";
import { setLoading } from "./appConfigSlice";

export const getMygallery = createAsyncThunk(
  "admin/Gallery",
  async (__, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const result = await axiosClient.get("/post/getPosts");

      console.log("Gallery items ", result);

      return result.message;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e?.response?.data || e.message);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export const deletePost= createAsyncThunk("admin/deletePost",
  async (postId,thunkAPI)=>{
    try {
      thunkAPI.dispatch(setLoading(true));
      const result= await axiosClient.delete("/post/deletePost",{
        data:{
          postId
        }
      })
      console.log(result.message);
      thunkAPI.dispatch(getMygallery())
      return result
    } catch (e) {
      return thunkAPI.rejectWithValue(e?.message?.data || e.message)      
    }finally{
      thunkAPI.dispatch(setLoading(false))
    }
  }
)



const appGallerySlice = createSlice({
  name: "appGallerySlice",
  initialState: {
    myGallery: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getMygallery.fulfilled, (state, action) => {
      state.myGallery = action.payload;
    });
  },
});

export default appGallerySlice.reducer;
