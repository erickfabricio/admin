// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

class Environment {

  public static optionsHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFQUCIsIm5hbWUiOiJUZXN0LURldiIsInN0YXRlIjoiQSIsImlhdCI6MTU3MTU0MDQxNn0.gZcTHjD9hYzgAL0hh3nJpra55OVgRNdTImTIeDA3l5o'
  }

  public static headers : HttpHeaders = new HttpHeaders(Environment.optionsHeaders);
  
  public static  options = {
    headers: Environment.headers
  };
}



export const environment = {
  production: false,
  api: 'http://localhost:3000/api',
  token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFQUCIsIm5hbWUiOiJUZXN0LURldiIsInN0YXRlIjoiQSIsImlhdCI6MTU3MTU0MDQxNn0.gZcTHjD9hYzgAL0hh3nJpra55OVgRNdTImTIeDA3l5o',
  options: Environment.options
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
