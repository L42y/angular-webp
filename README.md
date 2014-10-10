# [angular](https://angularjs.org)-[webp](https://developers.google.com/speed/webp/)

## Installation

1. `bower install --save L42y/angular-webp`

2. including script file provided by this component into your application

3. adding `l42y.webp` as a module dependency to your application

## Usage

```js
angular.module('App', [
  'l42y.webp'
]).controller('AppCtrl', function (
  WebP
) {
  WebP.detect().then(function (isSupported) {
    // if WebP is supported by the browser, `isSupported` is
    // an Object contains feature flags including
    // `lossy`, `lossless`, `alpha`, `animation`, eg:
    // `{lossy: true, lossless: false, alpha: false, animation: false}`,
    // if not, `isSupported` is `false`
  })
})
```

## License

[WTFPL](http://wtfpl.org)
