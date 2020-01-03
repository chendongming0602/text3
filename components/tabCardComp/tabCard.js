Component({
    properties: {
        tabItems: {
            type: Array,
            value: ""
        },
        currentTab: {
            type: Number,
            value: ""
        }
    },
    data: {
        items: [ "", "", "" ],
        currentIndex: 0
    },
    ready: function() {
        this.properties.tabItems && this.setData({
            items: this.properties.tabItems
        }), this.properties.currentTab && this.setData({
            currentIndex: this.properties.currentTab
        });
    },
    methods: {
        _tabChange: function(t) {
            var e = t.currentTarget.dataset.id;
            if (e == this.data.currentIndex) return !1;
            this.setData({
                currentIndex: e
            }), this.triggerEvent("tabClick", e);
        }
    }
});