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
      return detectFeature(webpUri).then(function (isSupported) {
        if (isSupported) {
          var promises = {};
          angular.forEach(testImages, function (image, feature) {
            promises[feature] = detectFeature(image);
          });

          return $q.all(promises);
        }

        return isSupported;
      });
    }
  };
});
