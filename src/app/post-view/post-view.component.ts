import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../storage/post.reducer';
import {selectPost} from '../storage/post.selectors';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {TextLimitPipe} from '../pipes/text-limit.pipe';

@Component({
  selector: 'app-post-view',
  imports: [
    AsyncPipe,
    TextLimitPipe
  ],
  templateUrl: './post-view.component.html',
  styleUrl: './post-view.component.css'
})
export class PostViewComponent {
  post$: Observable<Post | undefined>;

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {
    const id = route.snapshot.params['id'];
    this.post$ = this.store.select(selectPost(id));
  }
}
