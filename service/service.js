Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../we7/libs/util.js");

exports.default = {
    request: e.request,
    getUserInfo: e.getUserInfo,
    getList: function(t, r, s, u) {
        e.request({
            url: t,
            showLoading: !0,
            data: r,
            success: function(e) {
                s && s(e);
            },
            fail: function(e) {
                u && u(e);
            }
        });
    },
    convertText: function(e, t) {
        return e.replace(/#昵称#/g, t || "有人");
    }
};