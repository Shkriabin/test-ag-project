import {createReducer, on} from '@ngrx/store';
import {addPost, getPostsSuccess, search, setPage} from './post.actions';

export interface Post {
  id: string;
  title: string;
  body: string;
}

export interface PostsState {
  page: number;
  totalPages: number;
  posts: Post[];
  addedPosts: Post[];
  searchTerm: string;

}

const initialState: PostsState = {
  page: 1,
  totalPages: 0,
  posts: [],
  addedPosts: [],
  searchTerm: ''
}

export const postReducer = createReducer(
  initialState,

  on(addPost, (state: PostsState, action: { title: string, body: string }): PostsState => ({
    ...state, addedPosts: [
      {
        id: Math.round(Math.random() * 1000000).toString(),
        title: action.title,
        body: action.body
      },
      ...state.addedPosts
    ]
  })),

  on(getPostsSuccess, (state: PostsState, {posts, totalPages}): PostsState => ({
    ...state, posts, totalPages
  })),

  on(search, (state: PostsState, {searchTerm}): PostsState => ({
    ...state, searchTerm
  })),

  on(setPage, (state: PostsState, {page}): PostsState => ({
    ...state, page
  }))
);
