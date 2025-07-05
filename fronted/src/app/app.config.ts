import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ActionReducer, MetaReducer, provideStore } from '@ngrx/store';
import { cartReducer } from './store/reducers/cart.reducer';
import { authReducer } from './store/reducers/auth.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['auth', 'cart'], // specify which states to persist
    rehydrate: true
  })(reducer);
}
const metaReducers: MetaReducer[] = [localStorageSyncReducer];
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),  
    provideHttpClient(),
    provideStore({
      cart: cartReducer,
      auth: authReducer
      // Add more reducers here as needed
    }, { metaReducers })
  ]
};
