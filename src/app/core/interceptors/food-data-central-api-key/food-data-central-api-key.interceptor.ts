import { HttpInterceptorFn } from '@angular/common/http';
import { FOOD_DATA_CENTRAL_API_KEY } from '../../../secrets';
import { environment } from '../../../environment';

export const foodDataCentralApiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req, environment.foodDataCentralAPIBaseURL);
  if(!req.url.includes(environment.foodDataCentralAPIBaseURL)) return next(req);
  const params = req.params.set('api_key', FOOD_DATA_CENTRAL_API_KEY);
  return next(req.clone({ params }));
};
