var couponData = require('../../data/coupon.js')

Page({
    data:{
        color:'',
        backgroundColor:'',
        text:'立即领取',
        price:'',
        title:'',
        date:'',
        cuponPrice:''
    },
    getSuccess:function(event){

    },
    onLoad:function (option) {
        console.log(option.price)
        this.setData({
            price:option.price,
            title:option.title,
            date:option.date,
            cuponPrice:option.cuponPrice
        })
    },
    openConfirm: function () {
        this.setData({
            color:'',
            text:'领取成功',
            backgroundColor:'#eeeeee'
        })
        wx.showToast({
            title: '领取成功',
            icon: 'loading',
            duration: 3000,
            'success': function () {
                setTimeout(function () {
                    wx.navigateTo({
                        url: '../coupon_center/coupon_center'
                    })
                },2000)
            }
        });
        // wx.showModal({
        //     title: '车蛛网',
        //     content: '请关注车蛛网公众号',
        //     confirmText: "关注使用",
        //     cancelText: "取消使用",
        //     success: function (res) {
        //         console.log(res);
        //         if (res.confirm) {
        //             wx.showToast({
        //                 title: '关注成功',
        //                 icon: 'success',
        //                 duration: 3100
        //             });
        //         }else{
        //             console.log('用户点击辅助操作')
        //         }
        //     }
        // });
    }
})