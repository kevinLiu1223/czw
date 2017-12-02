Page({
    data: {
        num: 1,
        // 使用data数据对象设置样式名
        minusStatus: 'disabled',
        // condition:false,
        comment: [],
        details: [],
        image1: "../../images/detail_photo1.png",
        image2: "../../images/detail_photo2.png",
        image3: "../../images/detail_photo3.png",
        image4: "../../images/detail_photo4.png",
        image5: "../../images/detail_photo5.png",
        image6: "../../images/detail_photo6.png",
        carts: [],
        hasList: false,
        totalPrice: 0,
        totalNum: 0,
        txtOrderCode:''
    },
    onShow: function () {
        this.setData({
            hasList: true,
            carts: [
                {id: 1, title: '当季特饮', num: 0, price: 39, selected: true},
                {id: 2, title: '抹茶星冰乐', num: 0, price: 34, selected: true},
                {id: 3, title: '冷萃冰咖啡', num: 0, price: 36, selected: true},
                {id: 4, title: '拿铁', num: 0, price: 31, selected: true},
                {id: 5, title: '焦糖玛奇朵', num: 0, price: 35, selected: true},
                {id: 6, title: '轻甜冷萃', num: 0, price: 39, selected: true},
                {id: 7, title: '摩卡', num: 0, price: 34, selected: true},
                {id: 8, title: '馥芮白', num: 0, price: 36, selected: true},
                {id: 9, title: '卡布奇诺', num: 0, price: 31, selected: true},
                {id: 10, title: '星礼卡', num: 0, price: 100, selected: true},
                {id: 11, title: '星礼卡', num: 0, price: 50, selected: true},
                {id: 12, title: '高度券', num: 0, price: 3, selected: true},
                {id: 13, title: '深度券', num: 0, price: 4, selected: true},
            ]
        })
    },
    /* 点击减号 */
    bindMinus: function () {
        var num = this.data.num;
        // 如果大于1时，才可以减
        if (num > 1) {
            num--;
        }
        // 只有大于一件的时候，才能normal状态，否则disable状态
        var minusStatus = num <= 1 ? 'disabled' : 'normal';
        // 将数值与状态写回
        this.setData({
            num: num,
            minusStatus: minusStatus
        });
    },
    /* 点击加号 */
    bindPlus: function () {
        var num = this.data.num;
        // 不作过多考虑自增1
        num++;
        // 只有大于一件的时候，才能normal状态，否则disable状态
        var minusStatus = num < 1 ? 'disabled' : 'normal';
        // 将数值与状态写回
        this.setData({
            num: num,
            minusStatus: minusStatus
        });
    },
    /* 输入框事件 */
    bindManual: function (e) {
        var num = e.detail.value;
        // 将数值与状态写回
        this.setData({
            num: num
        });
    },
    getTotalPrice() {
        let carts = this.data.carts;
        let total = 0;
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].selected) {
                total += carts[i].num * carts[i].price;
            }
        }
        this.setData({
            carts: carts,
            totalPrice: total.toFixed(2)
        });
    },
    getTotalNum() {
        let carts = this.data.carts;
        let total = 0;
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].selected) {
                total += carts[i].num
            }
        }
        this.setData({
            carts: carts,
            totalNum: total
        });
    },
    // 增加数量
    addCount(e) {
        const index = e.currentTarget.dataset.index;
        let carts = this.data.carts;
        let num = carts[index].num;
        num = num + 1;
        carts[index].num = num;
        this.setData({
            carts: carts
        });
        this.getTotalPrice();
        this.getTotalNum();
    },
// 减少数量
    minusCount(e) {
        const index = e.currentTarget.dataset.index;
        let carts = this.data.carts;
        let num = carts[index].num;
        if (num <= 0) {
            return false;
        }
        num = num - 1;
        carts[index].num = num;
        this.setData({
            carts: carts
        });
        this.getTotalPrice();
        this.getTotalNum();
    },
    openLoading: function () {
        wx.showToast({
            title: '微信支付',
            icon: 'loading',
            duration: 3000
        });
        wx.requestPayment({
            appId:"wx53a85d543038233f",//小程序id
            nonceStr:"qdpys6rdizbnpj12ahwvkf568a6c1sr9", //随机字符串
            package:"prepay_id=wx2017033010242291fcfe0db70013231072", //wx的预支付交易单
            paySign:"8A7DC1A560B3B6DB0C656AC382D3E6F1",
            signType:"MD5",
            timeStamp:"1481167418",
            'success':function(res){
                console.log(res)
            },
            'fail':function(res){
                console.log(res)
            }
        })
    },
    pay: function () {
        var ordercode = this.data.txtOrderCode;
        wx.login({
            success: function (res) {
                if (res.code) {
                    wx.request({
                        url: 'https://www.yourdomain.com/pay',
                        data: {
                            code: res.code,//要去换取openid的登录凭证
                            ordercode: ordercode
                        },
                        method: 'GET',
                        success: function (res) {
                            console.log(res.data)
                            wx.requestPayment({
                                timeStamp: res.data.timeStamp,
                                nonceStr: res.data.nonceStr,
                                package: res.data.package,
                                signType: 'MD5',
                                paySign: res.data.paySign,
                                success: function (res) {
                                    // success
                                    console.log(res);
                                },
                                fail: function (res) {
                                    // fail
                                    console.log(res);
                                },
                                complete: function (res) {
                                    // complete
                                    console.log(res);
                                }
                            })
                        }
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
    },
    getOrderCode: function (event) {
        this.setData({
            txtOrderCode: event.detail.value
        });
    }
})