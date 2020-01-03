function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../service/app.setting.js")), e = t(require("../../config/api.config.js")), i = t(require("../../service/service.js")), n = getApp();

Page({
    data: {
        pageConfig: a.default.settings,
        lists: null,
        pageTotal: 0,
        currentPage: 0
    },
    _init: function() {
        var t = this;
        a.default.request(function(e) {
            var i = a.default.settings;
            t.setData({
                pageConfig: i
            });
        }), i.default.getList(e.default.api.fav, {
            page: this.data.currentPage
        }, function(a) {
            if (!a.data.data) return !1;
            t.setData({
                lists: a.data.data.lists,
                currentPage: a.data.data.current_page,
                pageTotal: a.data.data.page_total
            });
        });
    },
    onLoad: function(t) {},
    onShow: function() {
        var t = this;
        wx.getStorageSync("userInfo") ? this._init() : n.loginCallBack = function(a) {
            t._init();
        };
    },
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        var t = this, a = this.data.currentPage, n = this.data.lists;
        a < this.data.pageTotal && (a++, i.default.getList(e.default.api.fav, {
            page: a
        }, function(e) {
            n.push.apply(n, e.data.data.lists), t.setData({
                lists: n,
                currentPage: a
            });
        }));
    },
    _toDetail: function(t) {
        var a = t.currentTarget.dataset.aid;
        wx.navigateTo({
            url: "/pages/article/detail?aid=" + a
        });
    },
    _deleteFav: function(t) {
        var a = this, n = t.currentTarget.dataset.aid, s = t.currentTarget.dataset.index;
        wx.showModal({
            title: "提示",
            content: "确认从收藏中删除该文章？",
            success: function(t) {
                t.confirm && i.default.request({
                    url: e.default.api.delfav,
                    data: {
                        cid: n
                    },
                    success: function(t) {
                        t.data.error || wx.showToast({
                            title: "" + t.data.msg
                        });
                        var e = a.data.lists.slice(0);
                        e.splice(s, 1), a.setData({
                            lists: e
                        });
                    }
                });
            }
        });
    }
});