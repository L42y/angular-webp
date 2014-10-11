angular.module('l42y.webp', [
]).factory('WebP', function (
  $q
) {
  // shamelessly taken from Modernizr project:
  // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/img/webp.js
  var webpUri = 'UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';

  // shamelessly taken from WebP FAQ:
  // https://developers.google.com/speed/webp/faq#how_can_i_detect_browser_support_using_javascript
  var testImages = {
    lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
    lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
    alpha: 'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
    animation: 'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA'
  };

  var flags = {};

  function detectFeature (uri) {
    var deferred = $q.defer();
    var img = new Image();
    img.onload = function () {
      if ((img.width > 0) && (img.height > 0)) {
        deferred.resolve(true);
      }
    };
    img.onerror = function () {
      deferred.resolve(false);
    };
    img.src = 'data:image/webp;base64,' + uri;

    return deferred.promise;
  }

  return {
    detect: function detectWebPSupport () {
      // if WebP detection already finished, return the result
      if (flags === false ||
          Object.keys(flags).length === Object.keys(testImages).length) {
        return $q.when(flags);
      } else {
        return detectFeature(webpUri).then(function (isSupported) {
          if (isSupported) {
            var promises = {};
            angular.forEach(testImages, function (image, feature) {
              // if WebP feature detection already finished, return the result
              if (flags.hasOwnProperty(feature)) {
                promises[feature] = $q.when(flags[feature]);
              } else {
                promises[feature] = detectFeature(image).then(function (flag) {
                  flags[feature] = flag; // save the result
                  return flag;
                });
              }
            });

            return $q.all(promises);
          }

          flags = isSupported;
          return isSupported;
        });
      }
    }
  };
});
