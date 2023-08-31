
const baseUrl = "http://localhost:8080"

//同时并发请求的次数
let ajaxTimes = 0

export const getBaseUrl = ()=>{
    return baseUrl
}

export const requestUtil=(params)=>{

    var start = new Date().getTime()

    ajaxTimes++
   
    wx.showLoading({
      title: '加载中',
      mask:true
    })

    while(true){
        if(new Date().getTime()-start>1*100) break
    }

    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success:(result)=>{
              resolve(result.data)
            },
            fail:(err)=>{
                reject(err)
              },
            complete:()=>{
                ajaxTimes--
                if(ajaxTimes==0){
                    wx.hideLoading()
                }
            }
        })
    })
}