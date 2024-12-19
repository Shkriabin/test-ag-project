import {createAction, props} from '@ngrx/store';

export const addPost = createAction(
  '[Post] Add Post', props<{ title: string; body: string }>())
;

export const getPostsSuccess = createAction(
  '[Post] Get Posts Success',
  props<{ posts: any[]; totalPages: number }>()
);

export const search = createAction(
  '[Post] Search',
  props<{ searchTerm: string }>()
);

export const setPage = createAction(
  '[Post] Set Page',
  props<{ page: number }>()
);
