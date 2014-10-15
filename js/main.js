define(function (require,exports,module) {

    console.log("main");

    String.prototype.Trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    };

    String.prototype.LTrim = function () {
        return this.replace(/(^[\\s]*)/g, "");
    };

    String.prototype.RTrim = function () {
        return this.replace(/([\\s]*$)/g, "");
    };
    String.prototype.HtmlDecode = function () {
        return this.replace(/&quot;/g, '\"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    };
    String.prototype.HtmlEncode = function () {
        return this.replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };
    function isUndefined(obj) {
        return typeof (obj) == "undefined";
    }
    function isNull(obj) {
        return typeof (obj) == "undefined" || obj == null;
    }
    Array.prototype.ConvertAll = function (fun) {
        var r = [];
        for (var i = 0; i < this.length; i++) {
            r.push(fun(this[i]));
        }
        return r;
    };
    Array.prototype.FindAll = function (fun) {
        var r = [];
        for (var i = 0; i < this.length; i++) {
            if (fun(this[i])) r.push(this[i]);
        }
        return r;
    };
    Array.prototype.Find = function (fun) {
        for (var i = 0; i < this.length; i++) {
            if (fun(this[i])) return this[i];
        }
        return null;
    };
    Array.prototype.Exists = function (fun) {
        for (var i = 0; i < this.length; i++) {
            if (fun(this[i])) return true;
        }
        return false;

    };
    Array.prototype.Each = function (fun) {
        for (var i = 0; i < this.length; i++) {
            fun(this[i]);
        }
    };
    window.init = require("dinit");
});