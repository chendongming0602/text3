Component({
    properties: {
        adv: {
            type: Array,
            value: []
        },
        txtColor: {
            type: String,
            value: ""
        },
        backgeoundColor: {
            type: String,
            value: "#fff"
        },
        height: {
            type: String,
            value: "100rpx"
        },
        btnMessage: {
            type: String,
            value: "点击查看"
        },
        btnBorderColor: {
            type: String,
            value: ""
        },
        btncolor: {
            type: String,
            value: ""
        },
        closeColor: {
            type: String,
            value: ""
        },
        closeSrc: {
            type: String,
            value: "/components/ad/images/icons/close.png"
        },
        vertical: {
            type: Boolean,
            value: !1
        },
        autoplay: {
            type: Boolean,
            value: !0
        },
        circular: {
            type: Boolean,
            value: !0
        }
    },
    externalClasses: [ "swiperClass", "mainClass", "closeClass", "txtClass", "btnClass" ],
    data: {
        close: !1
    },
    methods: {
        closeFn: function() {
            this.setData({
                close: !0
            });
        },
        openFn: function(e) {
            var a = e.currentTarget.dataset.appid, t = e.currentTarget.dataset.opentype, r = e.currentTarget.dataset.path;
            switch (t) {
              case "page":
                wx.reLaunch({
                    url: r
                });
                break;

              case "website":
                wx.reLaunch({
                    url: "/pages/go/web?url=" + encodeURIComponent(r)
                });
                break;

              case "wxapp":
                wx.navigateToMiniProgram({
                    appId: a,
                    path: r,
                    success: function(e) {},
                    fail: function(e) {}
                });
                break;

              case "qrcode":
                var n = e.currentTarget.dataset.qrcode, o = [];
                o[0] = n, wx.previewImage({
                    urls: o
                });
            }
        }
    }
});