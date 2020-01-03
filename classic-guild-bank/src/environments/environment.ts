// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: "https://localhost:44375/api",
  client: "http://localhost:4200",
  patreon: {
    oauth_redirect: 'http://localhost:4200/patreon/callback',
    client_id: '9kNHdgLDtkGIcOUTQYy3bFlNooYiUfvsdvgK8XsqbaZ23Fka1Ge5hhxoVJINrjbi'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
