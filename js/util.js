define(function (require, exports, module) {
    var format = function () {
        if (!arguments[0]) {
            return "";
        }
        if (arguments.length == 1) {
            return arguments[0];
        }
        else if (arguments.length >= 2) {

            for (var i = 1; i < arguments.length; i++) {
                arguments[0] = arguments[0].replace(new RegExp("\\{" + (i - 1) + "\\}", "gm"), arguments[i]);
            }
            return arguments[0].replace(new RegExp("\\{", "gm"), "{").replace(new RegExp("\\}", "gm"), "}");
        }
    };

    var cloneObj = function (target) {
        var obj = {};
        if (typeof target == "object") {
            var cb = arguments.callee;
            if (target instanceof Array) {
                for (var i = 0, obj = [], l = target.length; i < l; i++) {
                    obj.push(cb(target[i]));
                }
                return obj;
            }
            for (var i in target) {
                obj[i] = cb(target[i]);
            }
            return obj;
        }
        return target;
    }

    var url = function(){
        var self = this;
        self.regEx =  function (url) {
            //如果加上/g参数，那么只返回$0匹配。也就是说arr.length = 0
            var re = /(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i;
            //re.exec(url);
            var arr = url.match(re);
            return arr;
        };
        self.getQueryString=function (name, url) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var sUrl = window.location.search;
            if (typeof (url) != "undefined") sUrl = self.query(url);
            var r = sUrl.replace("?", "").match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        };        
        self.host = function (url) {
            var arr = self.regEx(url);
            return typeof (arr[2]) == "undefined" ? "" : arr[2];
        };
        self.path = function (url) {
            var arr = self.regEx(url);
            return typeof (arr[4]) == "undefined" ? "" : arr[4];
        };
        self.fileName = function (url) {
            var arr = self.regEx(url);
            return typeof (arr[5]) == "undefined" ? "" : arr[5];
        };
        self.query = function (url) {
            var arr = self.regEx(url);
            var str = typeof (arr[7]) == "undefined" ? '' : arr[7];
            str += typeof (arr[6]) == "undefined" ? '' : arr[6];
            if (str.indexOf("#!") >= 0)
                return str.replace("#!", "&");
            else if (str.indexOf("#") >= 0)
                return str.replace("#", "&");
            else
                return str;
        };
        self.queryParams = function (url) {
            var sUrl;
            if (typeof (url) != "undefined")
                sUrl = url;
            else
                sUrl = window.location.href;
            var query = self.query(sUrl);
            if (query.length > 1) {
                // 获取链接中参数部分
                var queryString = query.substring(query.indexOf("?") + 1);
                // 分离参数对 ?key=value&key2=value2
                var parameters = queryString.split("&");
                if (parameters.length > 0) {
                    var pos, paraName, paraValue;
                    var qs = {};
                    var qstr = '';
                    for (var i = 0; i < parameters.length; i++) {
                        // 获取等号位置
                        pos = parameters[i].indexOf('=');
                        if (pos == -1) { continue; }

                        qstr += ',\"' + parameters[i].substring(0, pos) + '\":\"' + parameters[i].substring(pos + 1) + '\"';
                    }
                    if (qstr.length > 1) {
                        qstr = '{' + qstr.substring(1) + '}';
                        qs = eval("(" + qstr + ")");
                        return qs;
                    }
                }
            }
            return null;
        };
    }

    exports.util = {
        format: format,
        clone: cloneObj,
        url: new url()
    };
});