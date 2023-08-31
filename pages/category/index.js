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
        currentIndex:0,//当前选中左侧菜单的索引
        scrollTop:0,//设置竖状滚动条位置
        leftMenuList: [],
        rightContext: []
    },

    //所有商品数据
    Cates: [],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const baseUrl = getBaseUrl()
        this.setData({
            baseUrl
        })
        this.getCates()
    },
    /**
     * 获取商品分类
     */
    async getCates() {
        let result = await requestUtil({
            url: "/bigType/findCategories",
            method: "GET"
        })
        this.Cates = result.message
        let leftMenuList = this.Cates.map(v=> v.name)
        let rightContext = this.Cates[0].smallTypeList
        
        this.setData({
            leftMenuList,
            rightContext
        })
    },

    /**
     * 获取商品分类,解决跳转异步冲突
     */
    async getCates2(index) {
        const baseUrl = getBaseUrl()
        let result = await requestUtil({
            url: "/bigType/findCategories",
            method: "GET"
        })
        this.Cates = result.message
        let leftMenuList = this.Cates.map(v=> v.name)
        let rightContext = this.Cates[index].smallTypeList
        this.setData({
            leftMenuList,
            rightContext,
            currentIndex:index,
            scrollTop:0,
            baseUrl
        })
    },

    //左侧菜单切换点击事件
    handleMenuItemChange(e){
        const { index } = e.currentTarget.dataset
        let rightContext = this.Cates[index].smallTypeList
        this.setData({
            currentIndex:index,
            rightContext,
            scrollTop:0
        })
    },

      /**
     * 生命周期函数 监听页面显示
     */
    onShow:function(){
        const app = getApp()
        const {index} = app.globalData
        this.getCates2(index)
        app.globalData.index = 0//重置

    }
})