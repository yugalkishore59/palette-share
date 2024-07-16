import axios from "axios";
import { PostType } from "./interfaces";
import { POSTS_IN_ONE_PAGE } from "./constants";

export const getPosts = async (
  page: number,
  pageSize: number = POSTS_IN_ONE_PAGE
) => {
  try {
    const response = await axios.get(
      `/api/posts/getposts?page=${page}&pageSize=${pageSize}`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getPostById = async (postId: string) => {
  try {
    const response = await axios.get(`/api/posts/getpost/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post ${postId}:`, error);
    throw error;
  }
};

export const createPost = async (postData: PostType) => {
  try {
    const response = await axios.post("/api/posts/createpost", postData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const updatePost = async (postId: string, updatedPostData: PostType) => {
  try {
    const response = await axios.put(
      `/api/posts/updatepost/${postId}`,
      updatedPostData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating post ${postId}:`, error);
    throw error;
  }
};

export const deletePost = async (postId: string) => {
  try {
    const response = await axios.delete(`/api/posts/deletepost/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting post ${postId}:`, error);
    throw error;
  }
};
