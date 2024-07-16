import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PostType, PostsType } from "../../utils/interfaces"; // Adjust path as necessary
import { getPosts } from "../../utils/api";

const initialState: PostsType = {
  posts: [],
  page: 1,
  loading: false,
  error: false,
};

// Async thunk for fetching posts
export const fetchPosts: any = createAsyncThunk(
  "posts/fetchPosts",
  async (page: number) => {
    const data = await getPosts(page);
    return data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    incrementPage(state) {
      state.page += 1;
    },
    resetPosts(state) {
      state.posts = [];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<PostType[]>) => {
        if (state.page === 1) {
          state.posts = action.payload; // Set posts for initial load
        } else {
          state.posts = [...state.posts, ...action.payload]; // Append for subsequent loads
        }
        state.loading = false;
        state.error = false;
      }
    );
    builder.addCase(fetchPosts.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { incrementPage, resetPosts } = postsSlice.actions;
export default postsSlice.reducer;
