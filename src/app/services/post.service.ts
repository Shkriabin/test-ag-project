import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {Post} from '../storage/post.reducer';
import {ApolloQueryResult} from '@apollo/client';
import {map} from 'rxjs/operators';

export const POSTS_PER_PAGE = 10;

export interface PostsData {
  posts: {
    data: Post[],
    meta: {
      totalCount: number;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private apollo: Apollo) {
  }

  getPosts(page: number): Observable<PostsData> {
    return this.apollo
    .query<PostsData>({
      query: gql`
        query (
          $options: PageQueryOptions
        ) {
          posts(options: $options) {
            data {
              id
              title
              body
            }
            meta {
              totalCount
            }
          }
        }
      `,
      variables: {
        "options": {
          "paginate": {
            "page": page,
            "limit": POSTS_PER_PAGE
          }
        }
      }
    }).pipe(
      map((result: ApolloQueryResult<PostsData>) => result.data)
    )
  }
}
