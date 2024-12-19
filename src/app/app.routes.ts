import {Routes} from '@angular/router';
import {PostViewComponent} from './post-view/post-view.component';
import {PostListComponent} from './post-list/post-list.component';
import {PostNewComponent} from './post-new/post-new.component';

export const routes: Routes = [
  {path: 'post/:id', component: PostViewComponent},
  {path: 'new', component: PostNewComponent},
  {path: '', component: PostListComponent}
];
