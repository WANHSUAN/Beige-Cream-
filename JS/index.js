//顯示商品總數量的標籤節點對象
var ccount = document.getElementById('ccount');
//所有的購物車按鈕
var btns = document.querySelectorAll('.box button');
//約定好用名稱為 datas 的 cookie 來存放購物車裡的數據信息， datas 里所存放的就是一個 json 字串
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

/* 循環遍歷陣列，獲取每一個對象中的 pCount 值相加總和 */
var totalCount = 0; // 默認為 0
for(var i = 0, len = listObj.length;i < len; i++) {
    totalCount = listObj[i].pCount + totalCount;
}

ccount.innerHTML = totalCount;

/* 循環為每一個按鈕添加點擊事件 */

for(var i = 0, len = btns.length; i < len; i++) {
    btns[i].onclick = function() {
        var div = this.parentNode.parentNode.parentNode.parentNode;
        // 獲取自定義屬性
        var pid = div.getAttribute('pid');
        // 獲取所有子節點
        var arrs = div.children;
        if(checkObjByPid(pid)) {
            listObj = updateObjById(pid, 1)
        }else {
            var imgSrc = arrs[0].firstElementChild.firstElementChild.src;
            var pName = arrs[1].firstElementChild.lastElementChild.innerHTML;
            var price = arrs[1].lastElementChild.firstElementChild.firstElementChild.innerHTML;
            var obj = {
                pid: pid,
                pImg: imgSrc,
                pName: pName,
                price: price,
                pCount: 1 // 數量
            };
            listObj.push(obj)
            listObj = updateData(listObj);
        }
        ccount.innerHTML = getTotalCount();
        
    }
}