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
        // encodeURIComponent(str) ->  函數通過將一個、兩個、三個或四個表示字符的 UTF-8 編碼的轉譯序列替換某些字符的每個實例來編碼 URI（對於由兩個“代理”字符組成的字符而言，將僅是四個轉譯序列）
        // 會處理 ＃ 字元為 %23，空白字元轉換為 %20，中文字處理為 UTF-8
        // 把 URI 字符串採用 UTF-8 編碼格式轉化成 escape 格式的字串
        // escape() 方法：採用 ISO Latin 字符集對指定的字符串進行編碼，所有的空格符、標點符號、特殊字符以及其他非 ASCII 字符都將被轉化成 %xx 格式的字符編碼（ xx 等於該字符在字符集表裡面的編碼的 16 進制數字）
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
        var date = new Date(); // 建立一個表示現在的 Date 物件（Current Date and Time）
        date.setHours(-1); // 根據本地端當下前一天的最後小時開始計算（必須要寫）
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
        // console.log(cookies)
        for(var i = 0; i < cookies.length; i++) {
            var arr = cookies[i].split("=");
            // console.log(arr)
            if(n == arr[0]) { // 如果 n == datas
                return decodeURIComponent(arr[1]); // 就回傳 n 的內容
            }   
        }
    }
}