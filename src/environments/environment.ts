// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiUrl: 'https://api.openaq.org/v1/',
  waqAPIUrl : 'https://api.waqi.info/feed/' ,
  waqAPIKey : 'daf62264fe499fa4b7dd827d7a71d76d63076511' ,
  openweatherKey: '1057acc2bc4acacdc45b8d6e73683cb6',
  openweatherApiUrl: 'https://api.openweathermap.org/data/2.5/',
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
