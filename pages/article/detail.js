function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../service/app.setting.js")), e = t(require("../../config/api.config.js")), i = t(require("../../service/service.js")), r = t(require("../../wxParse/wxParse.js"));

getApp();

Page({
    data: {
        btnPosition: {
            right: "6%",
            top: "70%",
            showTips: !1
        },
        pageConfig: a.default.settings,
        music: "",
        article: null,
        title: "",
        updated_at: "",
        aid: 0,
        recommend: null,
        pageBg: "",
        thumb: "",
        share_title: "",
        isLoading: !0
    },
    _init: function() {
        var t = this;
        wx.getStorageSync("settings") ? (this.setData({
            pageConfig: wx.getStorageSync("settings")
        }), a.default.setNavBarTitle()) : a.default.request(function(e) {
            var i = a.default.settings;
            t.setData({
                pageConfig: i
            });
        }), i.default.request({
            url: e.default.api.detail,
            data: {
                aid: this.data.aid
            },
            success: function(a) {
                a.data && a.data.error && wx.showModal({
                    title: "系统提示",
                    content: "" + a.data.msg,
                    showCancel: !1
                });
                var e = a.data.data, i = e.content;
                if (e && e.recommend) {
                    var s = e.recommend.length;
                    s > 0 && (e.recommend[parseInt(Math.random() * s)].unit_id = t.data.pageConfig.txts.unit_id);
                }
                r.default.wxParse("article", "html", i, t, 5), t.setData({
                    title: e.name,
                    updated_at: e.updated_at,
                    recommend: e.recommend || [],
                    music: e.music,
                    pageBg: e.bg,
                    thumb: e.thumb,
                    titleColor: e.title_color || "",
                    share_title: e.share_title || "",
                    audio: e.audio || "",
                    author: e.author || "",
                    isLoading: !1
                });
            }
        }), a.default.setNavBarTitle();
    },
    onLoad: function(t) {
        t.aid && this.setData({
            aid: t.aid
        }), this._init();
    },
    onHide: function() {
        this.setData({
            audio: null
        });
    },
    onShow: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                showTips: !0
            });
        }, 1e4);
    },
    onShareAppMessage: function() {
        var t = this.data.share_title ? i.default.convertText(this.data.share_title) : this.data.title;
        return wx.updateShareMenu({
            withShareTicket: !0
        }), {
            title: t,
            path: "/pages/article/detail?aid=" + this.data.aid,
            imageUrl: this.data.thumb || ""
        };
    },
    _addFav: function() {
        i.default.request({
            url: e.default.api.addfav,
            data: {
                aid: this.data.aid
            },
            success: function(t) {
                wx.showToast({
                    title: "" + t.data.msg
                });
            }
        });
    },
    _asideBtnTap: function(t) {
        var a = t.currentTarget.dataset.appid, e = t.currentTarget.dataset.opentype, i = t.currentTarget.dataset.path;
        switch (e) {
          case "page":
            wx.reLaunch({
                url: i
            });
            break;

          case "website":
            wx.redirectTo({
                url: "/pages/gotoUrl/gotoUrl?url=" + encodeURIComponent(i)
            });
            break;

          case "wxapp":
            wx.navigateToMiniProgram({
                appId: a,
                path: i,
                extraData: {
                    fromId: "wish"
                },
                success: function(t) {},
                fail: function(t) {
                    console.log(t), console.log(t);
                }
            });
            break;

          case "qrcode":
            var r = t.currentTarget.dataset.qrcode, s = [];
            s[0] = r, wx.previewImage({
                urls: s
            });
        }
    },
    _toDetail: function(t) {
        var a = t.currentTarget.dataset.aid;
        wx.navigateTo({
            url: "/pages/article/detail?aid=" + a
        });
    }
});