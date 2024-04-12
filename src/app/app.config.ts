import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { foodDataCentralApiKeyInterceptor } from './core/interceptors/food-data-central-api-key/food-data-central-api-key.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([ foodDataCentralApiKeyInterceptor ])),
  ]
};
