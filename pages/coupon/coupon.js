Page({
    data: {
        message: 'kjhkljghj',
    },
    onTap: function (event) {
        console.log(event)
        wx.navigateTo({
            url: '../coupon_detail/coupon_detail?id=1'
        })
    },
    onLoad: function () {
        this.setData({
            message: 'aaaaaafdsfasdfa'
        })
    }
})