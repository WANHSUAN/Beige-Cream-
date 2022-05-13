/*
主要對購物車中各種操作進行了封裝，比如商品個數統計，
更新獲取本地數據等操作，方便代碼管理
功能：查看本地數據中是否含有指定的對象（商品），根據 id
參數：id：商品的標識
*/


/* 商品個數統計 */

function checkObjByPid(id) {
    var jsonStr = cookieObj.get('datas');
    var jsonObj = JSON.parse(jsonStr);
    var isExist = false;
    for(var i = 0; i < jsonObj.length; i++) { // 循環遍歷 jsonObj 內的 pid，如果 == id ，為存在，所以停止循環
        if(jsonObj[i].pid == id) {
            isExist = true;
            break;
        }
    }
    return isExist; //如果不存在就 return false;
}

/*
    功能：更新本地數據
    參數：arr 陣列
    回傳一個值：最新的本地轉換後的陣列
*/

function updateData(arr) {
    var jsonStr = JSON.stringify(arr); // 將 JS 值轉換成 JSON 值
    cookieObj.set({
        name: 'datas',
        value: jsonStr
    });
    jsonStr = cookieObj.get('datas'); // 取得 cookie 值
    return JSON.parse(jsonStr); // 將 JSON 值轉換成 JS 值，再回傳
}

/*
    獲取商品的總數量
    回傳數字
*/

function getTotalCount() {
    /*循環遍歷數組，獲取每一個對象中的 pCount 值相加總和*/
    var totalCount = 0; // 默認為 0
    var jsonStr = cookieObj.get('datas');
    var listObj = JSON.parse(jsonStr);
    for(var i = 0; i < listObj.length; i++) {
        totalCount += listObj[i].pCount;
    }
    return totalCount;
}
/*
    更新本地數據根據 pid
    id:商品的標識
*/

function updateObjById(id, num) {
    var jsonStr = cookieObj.get('datas');
    var listObj = JSON.parse(jsonStr);
    for(var i = 0; i < listObj.length; i++) {
        if(listObj[i].pid == id) { // datas 的 pid == id，就加該 datas 的 pCount 到 num，然後停止
            listObj[i].pCount += num;
            break;
        }
    }
    return updateData(listObj);
}

/*
    獲取本地數據
    回傳陣列
*/

function getAllData() {
    var jsonStr = cookieObj.get('datas');
    var listObj = JSON.parse(jsonStr);
    return listObj;
}

function deleteObjByPid(id) {
    var listObj = getAllData();
    for(var i = 0; i < listObj.length; i++) {
        if(listObj[i].pid == id) { 
            listObj.splice(i, 1); // 刪除自己後停止循環
            break;
        }
    }   
    updateData(listObj);
    return listObj;
}


function deleteAllObjByPid(id) {
    var listObj = getAllData();
    for(var i = 0; i < listObj.length; i++) {
        if(listObj[i].pid == id[i]) { 
            listObj.splice(i);
        }
    }   
    updateData(listObj);
    return listObj;
}

