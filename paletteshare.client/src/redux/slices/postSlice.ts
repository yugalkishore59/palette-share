import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PostType, PostsType } from "../../utils/interfaces"; // Adjust path as necessary
import { getPosts } from "../../utils/api";

const initialState: PostsType = {
  posts: [],
  page: 1,
  isLastPost: false,
  loading: false,
  error: false,
};

// Async thunk for fetching posts
export const fetchPosts: any = createAsyncThunk(
  "posts/fetchPosts",
  async (page: number, { rejectWithValue }) => {
    try {
      const data = await getPosts(page);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    incrementPageSlice(state) {
      state.page += 1;
    },
    resetPostsSlice(state) {
      state.posts = [];
      state.page = 1;
    },
    deletePostSlice(state, action: PayloadAction<string>) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    updatePost(state, action: PayloadAction<PostType>) {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
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
        if (action.payload.length === 0) {
          state.isLastPost = true;
          state.loading = false;
          state.error = false;
          return;
        }
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

export const {
  incrementPageSlice,
  resetPostsSlice,
  deletePostSlice,
  updatePost,
} = postsSlice.actions;
export default postsSlice.reducer;
