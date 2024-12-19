import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Post, PostsState} from './post.reducer';

export const selectPostsState = createFeatureSelector<PostsState>('posts');

export const selectPost = (id: string) =>
  createSelector(selectPostsState, (state) =>
    state.posts.concat(state.addedPosts).find((post: Post) => post.id === id)
);

export const selectPosts = createSelector(
  selectPostsState,
  (state: PostsState) => state.page === 1 ?
    [...state.addedPosts, ...state.posts] : state.posts
);

export const selectTotalPages = createSelector(
  selectPostsState,
  (state: PostsState) => state.totalPages
);

export const selectPage = createSelector(
  selectPostsState,
  (state: PostsState) => state.page
);

export const selectSearchTerm = createSelector(
  selectPostsState,
  (state) => state.searchTerm
);

