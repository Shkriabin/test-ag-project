import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {Post} from '../storage/post.reducer';
import {search, setPage} from '../storage/post.actions';
import {selectPage, selectPosts, selectSearchTerm, selectTotalPages} from '../storage/post.selectors';
import {HighlightDirective} from '../directives/highlight.directive';


@Component({
  selector: 'app-post-list',
  imports: [
    RouterLink,
    AsyncPipe,
    HighlightDirective
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]>;
  totalPages$: Observable<number>;
  page$: Observable<number>;
  searchTerm$: Observable<string>;

  constructor(private store: Store) {
    this.posts$ = this.store.select(selectPosts);
    this.totalPages$ = this.store.select(selectTotalPages);
    this.page$ = this.store.select(selectPage);
    this.searchTerm$ = this.store.select(selectSearchTerm);
  }

  ngOnInit() {
    this.store.dispatch(setPage({page: 1}));
  }

  search(event: Event) {
    const element = event.target as HTMLInputElement;
    this.store.dispatch(search({searchTerm: element.value}));
  }

  changePage(page: number) {
    this.store.dispatch(setPage({page}));
  }
}
