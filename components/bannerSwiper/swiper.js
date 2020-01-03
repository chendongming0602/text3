Component({
    properties: {
        bannerList: {
            type: Object
        },
        width: {
            type: String,
            value: "100%"
        },
        swiperConfig: {
            type: Object,
            value: {}
        }
    },
    externalClasses: [ "wrapperClass" ],
    data: {
        list: [],
        imgheights: [],
        swiperDefault: {
            hasDesc: !1,
            indicatorDots: !1,
            indicatorColor: "rgba(0, 0, 0, .3)",
            indicatorActiveColor: "#000000",
            autoplay: !1,
            interval: 3e3,
            duration: 500,
            circular: !0,
            previousMargin: "0rpx",
            nextMargin: "0rpx",
            height: "370",
            autoHeight: !1
        },
        current: 0
    },
    ready: function() {
        if (this.properties.swiperConfig) {
            for (var t in this.data.swiperDefault) this.properties.swiperConfig.hasOwnProperty(t) ? this.data.swiperDefault[t] = this.properties.swiperConfig[t] : this.properties.swiperConfig[t] = this.data.swiperDefault[t];
            this.setData({
                swiperDefault: this.properties.swiperConfig
            });
        }
    },
    methods: {
        _imageLoaded: function(t) {
            var i = 750 / (t.detail.width / t.detail.height), e = this.data.imgheights.slice(0);
            e[t.target.dataset.id] = i, this.setData({
                imgheights: e
            });
        },
        _swiperChange: function(t) {
            this.setData({
                current: t.detail.current
            });
        },
        _openMiniProgram: function(t) {
            var i = t.currentTarget.dataset.id;
            t.currentTarget.dataset.appid;
            this.data.list[i];
        }
    }
});