/*
思路：
第一步：當頁面加載完後，根據本地的數據，動態生成表格（購物車列表）
獲取所要操作的節點對象
判斷購物車中是否有數據？
有： 顯示出購物列表
沒有： 提示購物車為空

第二步：當購物車列表動態生成後，獲取tbody里所有的 checkeBox 標籤節點對象，看那個被選中就獲取對應行小計進行總價格運算。

第三步：
為每一個 checkbox 添加一個 onchange 事件，根據操作更改總價格

第四步：全選

第五步：
為加減按鈕添加一個鼠標點擊事件
更改該商品的數量

第六步：刪除
獲取所有的刪除按鈕
為刪除按鈕添加一個鼠標點擊事件
刪除當前行，並更新本地數據
*/

var listObj = getAllData();
var table = document.getElementById('table');
var box = document.getElementById('box');
var tbody = document.getElementById('tbody');
var totalPrice = document.getElementById('totalPrice');
var allCheck = document.getElementById('allCheck');
if(listObj.length == 0) { // 購物車為空
    box.className = 'box'; // 顯示 #box
    table.className = 'hide'; // 隱藏 table
}else {
    box.className = 'box hide'; // 隱藏 #box
    table.className = ''; // 顯示 table
    for(var i = 0, len = listObj.length; i < len; i++) {
        var tr = document.createElement('tr'); //創建 tr
        tr.setAttribute('pid', listObj[i].pid); // <tr pid="1"></tr>
        tr.setAttribute('class', 'row align-items-center text-align-center font-Noto-Serif border-bottom');
        //{"pid":值,"pImg":值,"pName":值,"price":值,"pCount":1},
        tr.innerHTML = 
        '<td class="p-3 col-md-1 col-1">' + '<input type="checkbox" class="ck form-check-input" />' + '</td>' +
        '<td class="m-md-0 m-3 p-1 p-md-3 col-md-2 col-2">' + '<img src="' + listObj[i].pImg + '" alt="" class="w-100" />' + '</td>' +
        '<td class="p-3 p-md-3 col-md-2 col-3">' + listObj[i].pName + '</td>' +
        '<td class="p-3 col-md-2 col-5">' + '<button class="down btn btn-outline-info"> - </button><input type="text" value="' + listObj[i].pCount + '" readonly="readonly" class="w-40 font-Cormorant-Garamond p-1 m-3 text-align-center" /><button class="up btn btn-outline-info"> + </button>' + '</td>' +
        '<td class="p-3 col-md-2 col-5 font-Cormorant-Garamond">' + 'NT$<span>' + listObj[i].price + '</span>' + '</td>' +
        '<td class="p-3 col-md-2 col-5 font-Cormorant-Garamond">' + 'NT$<span>' + listObj[i].price * listObj[i].pCount + '</span>' + '</td>' +
        '<td class="p-2 col-md-1 col-2">' + '<button class="del btn btn-outline-secondary font-Cormorant-Garamond">x</button>' + '</td>';
        tbody.appendChild(tr);
    }
}

/* 功能：計算總價格 */

var cks = document.querySelectorAll('tbody .ck');
function getTotalPrice() {
    cks = document.querySelectorAll('tbody .ck');
    var sum = 0;
    for(var i = 0, len = cks.length;i < len; i++) {
        if(cks[i].checked) { // 如果當前被選中
            var tr = cks[i].parentNode.parentNode;
            var temp = tr.children[5].firstElementChild.innerHTML; // 物品總價格
            sum = Number(temp) + sum;
        }
    }
    return sum;
}

/* 循環遍歷為每一個 checkbox 添加一個 onchange 事件 */

for(var i = 0, len = cks.length; i < len; i++) {
    cks[i].onchange = function() {
        checkAllChecked();
        totalPrice.innerHTML = getTotalPrice();
    }
}

/* 全選實現 */


allCheck.onchange = function() {
    if(this.checked) { // 勾選
        for(var i = 0, len = cks.length; i < len; i++) {
            cks[i].checked = true;
        }
    }else { // 不勾選
        for(var i = 0, len = cks.length; i < len; i++) {
            cks[i].checked = false;
        }
    }
    totalPrice.innerHTML = getTotalPrice();
}

// 一組減的按鈕
var downs = document.querySelectorAll('.down');
// 一組加的按鈕
var ups = document.querySelectorAll('.up');

// 一組刪除的按鈕
var dels = document.querySelectorAll('.del');
for(var i = 0, len = downs.length; i < len; i++) {
    // 減的按鈕
    downs[i].onclick = function() {
        // 下一個兄弟節點
        var txtObj = this.nextElementSibling; // <input type="text">
        var tr = this.parentNode.parentNode; // tr
        var pid = tr.getAttribute('pid'); // <tr pid="1">
        txtObj.value = txtObj.value - 1; // value - 1
        if(txtObj.value < 1) { // 如果 value < 1
            txtObj.value = 1;
            updateObjById(pid, 0) // value = 1, value 不變
        }else {
            updateObjById(pid, -1) // value >= 1, value - 1
        }
        tr.children[0].firstElementChild.checked = true;
        checkAllChecked();
        var price = tr.children[4].firstElementChild.innerHTML; // 400
        tr.children[5].firstElementChild.innerHTML = price * txtObj.value; // 400 = 400 * txtObj.value
        totalPrice.innerHTML = getTotalPrice();
    }
    // 加的按鈕
    ups[i].onclick = function() {
        // 上一個兄弟節點
        var txtObj = this.previousElementSibling; // <input type="text">
        var tr = this.parentNode.parentNode; // tr
        var pid = tr.getAttribute('pid'); // <tr pid="1">
        txtObj.value = Number(txtObj.value) + 1; // value + 1
        updateObjById(pid, 1); // value + 1
        tr.children[0].firstElementChild.checked = true; // checkbox 勾選
        checkAllChecked()
        var price = tr.children[4].firstElementChild.innerHTML; // 400
        tr.children[5].firstElementChild.innerHTML = price * txtObj.value; // 400 = 400 * txtObj.value
        totalPrice.innerHTML = getTotalPrice();
    }
    // 刪除的按鈕
    dels[i].onclick = function() {
        var tr = this.parentNode.parentNode; // tr
        var pid = tr.getAttribute('pid'); // <tr pid="1">
        if(confirm('確定刪除？')) {
            // 移除
            tr.remove();
            listObj = deleteObjByPid(pid); // 刪除 Cookies 裡的 <tr pid="1">
        }
        if(listObj.length == 0) { // 如果購物車為空
            box.className = 'box'; // 顯示 box
            table.className = 'hide'; // 隱藏 table
        }else {
            box.className = 'box hide'; // 隱藏 box
            table.className = ''; // 顯示 table
        }
        totalPrice.innerHTML = getTotalPrice();
    }
}

/* 檢測是否要全選 */

function checkAllChecked() {
    // 全選是否會選中
    var isSelected = true; // 勾選
    for(var j = 0, len = cks.length; j < len; j++) {
        if(cks[j].checked == false) { // 如果當前的 checkbox 不勾選
            isSelected = false; // 不勾選
            break; // 停止且印出
        }
    }
    allCheck.checked = isSelected; // allCheck 勾選
}