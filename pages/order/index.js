// pages/order/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[
            {
                id:0,
                value:"全部订单",
                isActive:true
            },
            {
                id:1,
                value:"待付款",
                isActive:false
            },
            {
                id:2,
                value:"待收货",
                isActive:false
            },
            {
                id:3,
                value:"退款/退货",
                isActive:false
            },
        ]
    },

    //点击全部订单/待付款、待收货、退款 
    handleTabsItemChange(e){
        // const {index} = e.currentTarget.dataset
        const {index} =e.detail
        let {tabs} = this.data
        tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
        this.setData({
            tabs
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})