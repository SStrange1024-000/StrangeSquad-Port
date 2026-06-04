import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from './slices/appConfigSlice'
import appProfileReducer from './slices/appProfileSlice'
import appProjectReducer from './slices/appProjectSlice';
import appGalleryReducer from './slices/appGallerySlice'

export default configureStore({
    reducer:{
        appConfigReducer,
        appProfileReducer,
        appProjectReducer,
        appGalleryReducer

    }

})