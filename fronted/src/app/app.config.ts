import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { cartReducer } from './store/reducers/cart.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),  
    provideHttpClient(),
    provideStore({
      cart: cartReducer,
      //auth: authReducer
      // Add more reducers here as needed
    })
  ]
};
