import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {getPostsSuccess, setPage} from './post.actions';
import {EMPTY, switchMap} from 'rxjs';
import {catchError, map, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {POSTS_PER_PAGE, PostsData, PostService} from '../services/post.service';
import {selectPage} from './post.selectors';

@Injectable()
export class PostEffects {

  private actions$ = inject(Actions);
  private postService = inject(PostService);
  private store = inject(Store);

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setPage),
      withLatestFrom(
        this.store.select(selectPage)
      ),
      switchMap(([_, page]) =>
        this.postService.getPosts(page).pipe(
          map(({posts: {data, meta}}: PostsData) =>
            getPostsSuccess({
              posts: data,
              totalPages: Math.ceil(meta.totalCount / POSTS_PER_PAGE)
            })
          ),
          catchError((error) => {
              console.error(error);
              return EMPTY;
            }
          )
        )
      )
    );
  });
}
