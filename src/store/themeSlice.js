import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isDarkMode:false
}
const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        setDarkMode:(state)=>{
            state.isDarkMode=true
        },
        setLightMode:(state)=>{
            state.isDarkMode=true
        },
        toggleDarkMode:(state)=>{
            state.isDarkMode=!state.isDarkMode
        }
    }
})
export const {setDarkMode,setLightMode,toggleDarkMode} = themeSlice.actions
export default themeSlice.reducer;