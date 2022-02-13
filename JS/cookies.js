/* 
單例設計模式
完整形式：[]中是可選項
document.cookie = 「name=value[;expires=date][;path=path-to-resource][;domain=域名][;secure]」
*/

var cookieObj = {
    /*
    增加或修改cookie
    參數：o 對象{}
    name:string cookie名
    value:string cookie值
    expires:Date對象 過期時間
    path:string 路徑限制
    domain:string 域名限制
    secure:boolean true https false或undeinfed
    */
    set: function(o) {
        var cookieStr = encodeURIComponent(o.name) + "=" + encodeURIComponent(o.value);
        if(o.expires) {
            cookieStr += ";expires=" + o.expires;
        }
        if(o.path) {
            cookieStr += ";path=" + o.path;
        }
        if(o.domain) {
            cookieStr += ";domain=" + o.domain;    
        }
        if(o.secure) {
            cookieStr += ";secure";
        }
        document.cookie = cookieStr;
    },
    /* 
    刪除  
    參數：n string cookie的名字 
    */
    del: function(n) {
        var date = new Date();
        date.setHours(-1); // 前一天的 23 時
    //this代表的是當前函數的對象
        this.set({
            name: n,
            expires: date
        });
    },
    
    /* 查找 */
    get: function(n) {
        n = encodeURIComponent(n);
        var cookieTotal = document.cookie;
        var cookies = cookieTotal.split("; ");
        for(var i = 0, len = cookies.length; i < len; i++) {
            var arr = cookies[i].split("=");
            if(n == arr[0]) {
                return decodeURIComponent(arr[1]);
            }   
        }
    }
}