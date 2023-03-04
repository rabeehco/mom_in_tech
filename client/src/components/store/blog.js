import { createSlice } from "@reduxjs/toolkit";

const blogReducer = createSlice({
  name: "blog",
  initialState: { token: localStorage.getItem("token"), blogList: [], blog: {} },

  reducers: {
    setBlogs(state, action){
      const blog = action.payload.post
      state.blogList = blog
    },
    setBlog(state, action){
      const blog = action.payload
      state.blog = blog
    }
  }
});

export const blogActions = blogReducer.actions;
export default blogReducer.reducer;
