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
        productObj:{},
        activeIndex:0
    },

    productInfo:{

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const baseUrl = getBaseUrl()
        this.setData({
            baseUrl
        })
        this.getProductDetail(options.id)
       
    },

    handlerItemTap(e){
        const {index} = e.currentTarget.dataset
        this.setData({
            activeIndex:index
        })
    },


   /**
     * 获取商品详情
     */
    async getProductDetail(id) {
        let result = await requestUtil({
            url: "/product/detail",
            data:{id},
            method: "GET"
        })
        this.productInfo = result.message
        this.setData({
            productObj:result.message
        })
    },

    //点击加入购物车事件
    handlerCartAdd(){
        this.setCartadd()
        wx.showToast({
          title: '加入成功',
          icon:'success',
          mask:true
        })
    },


    //加入购物车函数处理
    setCartadd(){
        let cart = wx.getStorageSync('cart')||[]
        let index = cart.findIndex(v=>v.id===this.productInfo.id)
        if(index===-1){
            this.productInfo.num=1
            this.productInfo.checked=true
            cart.push(this.productInfo)
        }else{
            cart[index].num++
        }
        wx.setStorageSync('cart', cart)
    },

    //点击 立即购买
    handleBuy(){
        this.setCartadd()
        wx.switchTab({
          url: '/pages/cart/index',
        })
    }


})