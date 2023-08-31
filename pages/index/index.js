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
        //轮播图数据
        swiperList: [],
        baseUrl: '',
        bigTypeList:[],
        bigTypeList_row1:[],
        bigTypeList_row2:[],
        hotProductList:[]

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const baseUrl = getBaseUrl()
        this.setData({
            baseUrl
        })
       
        this.getSwiperList()
        this.getBigTypeList()
        this.getHotProductList()

    },

    async getSwiperList() {
        let result = await requestUtil({
            url: "/product/findSwiper",
            method: "GET"
        })
        this.setData({
            swiperList: result.message
        })
    },

    /**
     * 获取热卖商品
     */
    async getHotProductList() {
        let result = await requestUtil({
            url: "/product/findHot",
            method: "GET"
        })
        this.setData({
            hotProductList: result.message
        })
    },

    async getBigTypeList(){
        let result = await requestUtil({
            url: "/bigType/findAll",
            method: "GET"
        })
        const bigTypeList = result.message
        const bigTypeList_row1 = bigTypeList.filter((item,index)=>{
            return item.id<=5
        })

        const bigTypeList_row2 = bigTypeList.filter((item,index)=>{
            return item.id>5&&item.id<=10
        })

        this.setData({
            bigTypeList,
            bigTypeList_row1,
            bigTypeList_row2
        })

    },

    //跳转商品大类
    handlerTypeJump(e){
        const {index} = e.currentTarget.dataset
        const app = getApp()
        app.globalData.index = index
        wx.switchTab({
          url: '/pages/category/index',
        })
    },



  
})