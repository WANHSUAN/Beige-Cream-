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
    for(var i = 0, len = jsonObj.length; i < len; i++) {
        if(jsonObj[i].pid == id) {
            isExist = true;
            break;
        }
    }
    return isExist; //return false;
}

/*
    功能：更新本地數據
    參數：arr 數組對象
    返回一個值：最新的本地轉換後的數組對象
*/

function updateData(arr) {
    var jsonStr = JSON.stringify(arr);
    cookieObj.set({
        name: 'datas',
        value: jsonStr
    });
    jsonStr = cookieObj.get('datas');
    return JSON.parse(jsonStr);
}

/*
    獲取商品的總數量
    返回：數字
*/

function getTotalCount() {
    /*循環遍歷數組，獲取每一個對象中的 pCount 值相加總和*/
    var totalCount = 0; // 默認為 0
    var jsonStr = cookieObj.get('datas');
    var listObj = JSON.parse(jsonStr);
    for(var i = 0, len = listObj.length; i < len; i++) {
        totalCount = listObj[i].pCount + totalCount;
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
    for(var i = 0, len = listObj.length; i < len; i++) {
        if(listObj[i].pid == id) {
            listObj[i].pCount = listObj[i].pCount + num;
            break;
        }
    }
    return updateData(listObj)
}

/*
    獲取本地數據
    返回 數組對象
*/

function getAllData() {
    var jsonStr = cookieObj.get('datas');
    var listObj = JSON.parse(jsonStr);
    return listObj;
}

function deleteObjByPid(id) {
    var lisObj = getAllData();
    for(var i = 0, len = lisObj.length; i < len; i++) {
        if(lisObj[i].pid == id) {
            lisObj.splice(i, 1);
            break;
        }
    }   
    updateData(lisObj);
    return lisObj;
}

