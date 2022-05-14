// 顯示商品總數量的標籤節點對象
var ccount = document.getElementById('ccount');
// 購物車按鈕
var btns = document.getElementById('button');
// 約定好用名稱為 datas 的 cookie 來存放購物車裡的數據信息， datas 里所存放的就是一個 json 字串
var listStr = cookieObj.get('datas');

/* 判斷一下本地是否有一個購物車（datas），沒有的話，創建一個空的購物車，有的話就直接拿來使用 */
if(!listStr) { // 沒有購物車 datas json
    cookieObj.set({
        name: 'datas',
        value: '[]'
    });
    listStr = cookieObj.get('datas');
}

// 陣列

var listObj = JSON.parse(listStr);


/* 獲取陣列中對象的 pCount 值相加總和 */
var totalCount = 0; // 默認為 0
for(var i = 0;i < listObj.length; i++) {
    totalCount += listObj[i].pCount;
}

ccount.innerHTML = totalCount; // 總和賦值給顯示商品總數量的標籤節點對象

/* 為按鈕添加點擊事件 */


btns.onclick = function() {
    var div = this.parentNode.parentNode.parentNode;
    // 獲取自定義屬性
    var pid = div.getAttribute('pid');
    // 獲取所有子節點
    var arrs = div.children;
    if(checkObjByPid(pid)) { // 此商品已在購物車內
        listObj = updateObjById(pid, 1);
    }else { // 不在購物車內，就建立一個索引
        var imgSrc = arrs[1].firstElementChild.src;
        var pName = arrs[2].firstElementChild.innerHTML;
        var price = arrs[2].firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.innerHTML;
        var obj = {
            pid: pid,
            pImg: imgSrc,
            pName: pName,
            price: price,
            pCount: 1 // 數量
        };
        listObj.push(obj);
        listObj = updateData(listObj);
    }
    ccount.innerHTML = getTotalCount();
}


