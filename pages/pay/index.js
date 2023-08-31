import {
    requestUtil,
    getBaseUrl
} from '../../utils/requestUtil.js'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        baseUrl: '',
        cart:[],
        totalPrice:0,
        totalNum:0
    },

 

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const baseUrl = getBaseUrl()
        this.setData({
            baseUrl
        })
    },

    //订单支付
    handleOrderPay(){
        wx.showToast({
          title: '支付成功',
        })
        wx.navigateTo({
          url: '/pages/order/index',
        })
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        const address = wx.getStorageSync('address')
        let cart = wx.getStorageSync('cart')||[]
        cart = cart.filter(v=>v.checked)
            let totalPrice=0
            let totalNum=0
            cart.forEach(v => {
                if(v.checked){
                    totalPrice += v.price*v.num
                    totalNum += v.num
                }else{
                    
                }
              
            });
            this.setData({
                cart,
                totalNum,
                totalPrice,
                address
            })
    
        
    },



   
})