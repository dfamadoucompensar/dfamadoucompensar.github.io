var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      (descriptor.enumerable = descriptor.enumerable || !1),
        (descriptor.configurable = !0),
        "value" in descriptor && (descriptor.writable = !0),
        Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    return (
      protoProps && defineProperties(Constructor.prototype, protoProps),
      staticProps && defineProperties(Constructor, staticProps),
      Constructor
    );
  };
})();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
var RocketBrowserCompatibilityChecker = (function () {
  function RocketBrowserCompatibilityChecker(options) {
    _classCallCheck(this, RocketBrowserCompatibilityChecker),
      (this.passiveSupported = !1),
      this._checkPassiveOption(this),
      (this.options = !!this.passiveSupported && options);
  }
  return (
    _createClass(RocketBrowserCompatibilityChecker, [
      {
        key: "_checkPassiveOption",
        value: function (self) {
          try {
            var options = {
              get passive() {
                return !(self.passiveSupported = !0);
              },
            };
            window.addEventListener("test", null, options),
              window.removeEventListener("test", null, options);
          } catch (err) {
            self.passiveSupported = !1;
          }
        },
      },
      {
        key: "initRequestIdleCallback",
        value: function () {
          !1 in window &&
            (window.requestIdleCallback = function (cb) {
              var start = Date.now();
              return setTimeout(function () {
                cb({
                  didTimeout: !1,
                  timeRemaining: function () {
                    return Math.max(0, 50 - (Date.now() - start));
                  },
                });
              }, 1);
            }),
            !1 in window &&
              (window.cancelIdleCallback = function (id) {
                return clearTimeout(id);
              });
        },
      },
      {
        key: "isDataSaverModeOn",
        value: function () {
          return (
            "connection" in navigator &&
            !0 === navigator.connection.saveData
          );
        },
      },
      {
        key: "supportsLinkPrefetch",
        value: function () {
          var elem = document.createElement("link");
          return (
            elem.relList &&
            elem.relList.supports &&
            elem.relList.supports("prefetch") &&
            window.IntersectionObserver &&
            "isIntersecting" in IntersectionObserverEntry.prototype
          );
        },
      },
      {
        key: "isSlowConnection",
        value: function () {
          return (
            "connection" in navigator &&
            "effectiveType" in navigator.connection &&
            ("2g" === navigator.connection.effectiveType ||
              "slow-2g" === navigator.connection.effectiveType)
          );
        },
      },
    ]),
    RocketBrowserCompatibilityChecker
  );
})();