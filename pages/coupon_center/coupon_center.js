var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
    data: {
        tabs: ["未使用", "已使用", "已过期"],
        activeIndex: 1,
        sliderOffset: 0,
        sliderLeft: 0
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },

    shareFriend: function () {
        return {
            title: '这里是机智life小程序',
            path: '/page/index/index?id=123',
            success: function (res) {
                console.log(res.shareTickets[0])
                // console.log
                wx.getShareInfo({
                    shareTicket: res.shareTickets[0],
                    success: function (res) { console.log(res) },
                    fail: function (res) { console.log(res) },
                    complete: function (res) { console.log(res) }
                })
            },
            fail: function (res) {
                // 分享失败
                console.log(res)
            }
        }
    },
    openConfirm: function () {
        this.setData({
            color:'',
            text:'立即使用',
            backgroundColor:'#eeeeee'
        })
        wx.showModal({
            title: '车蛛网',
            content: '请关注车蛛网公众号',
            confirmText: "关注使用",
            cancelText: "取消使用",
            success: function (res) {
                console.log(res);
                if (res.confirm) {
                    wx.showToast({
                        title: '关注成功',
                        icon: 'success',
                        duration: 3100
                    });
                }else{
                    console.log('用户点击辅助操作')
                }
            }
        });
    }
});