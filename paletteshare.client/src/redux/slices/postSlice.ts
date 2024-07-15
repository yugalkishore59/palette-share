import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PostType, PostsType } from "../../utils/interfaces"; // Adjust path as necessary

const initialState: PostsType = {
  posts: [],
  page: 1,
  loading: false,
  error: false,
};

export const fetchPostsFromAPI = async (page: number) => {
  // const response = await fetch(`/weatherforecast`);
  // const data = await response.json();
  const data: PostType[] = [
    {
      _id: "123",
      description: "test description",
      artistId: "4521",
      name: "Hero",
      username: "yugal",
      imageUrl:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      tags: ["tag1", "tag2"],
      createdAt: "2022-01-01T00:00:00.000Z",
      updatedAt: "2022-01-01T00:00:00.000Z",
      likes: 0,
      comments: [],
      license: "MIT",
    },
  ];
  return data;
};

// Async thunk for fetching posts
export const fetchPosts: any = createAsyncThunk(
  "posts/fetchPosts",
  async (page: number) => {
    const data = await fetchPostsFromAPI(page);
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
        state.posts = [...state.posts, ...action.payload];
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
