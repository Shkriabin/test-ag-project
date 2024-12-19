import {ApplicationConfig, inject, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {InMemoryCache} from '@apollo/client/core';
import {provideApollo} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {PostEffects} from './storage/post.effects';
import {postReducer} from './storage/post.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({uri: 'https://graphqlzero.almansi.me/api'}),
        cache: new InMemoryCache()
      };
    }),
    provideStore({posts: postReducer}),
    provideEffects(PostEffects),
  ]
};
