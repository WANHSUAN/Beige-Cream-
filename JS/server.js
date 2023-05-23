function checkObjByPid(id) {
  var jsonStr = cookieObj.get("datas");
  var jsonObj = JSON.parse(jsonStr);
  var isExist = false;
  for (let i = 0; i < jsonObj.length; i++) {
    if (jsonObj[i].pid == id) {
      isExist = true;
      break;
    }
  }
  return isExist;
}

function updateData(arr) {
  var jsonStr = JSON.stringify(arr);
  cookieObj.set({
    name: "datas",
    value: jsonStr,
  });
  jsonStr = cookieObj.get("datas");
  return JSON.parse(jsonStr);
}

function getTotalCount() {
  var totalCount = 0;
  var jsonStr = cookieObj.get("datas");
  var listObj = JSON.parse(jsonStr);
  for (let i = 0; i < listObj.length; i++) {
    totalCount += listObj[i].pCount;
  }
  return totalCount;
}

function updateObjById(id, num) {
  var jsonStr = cookieObj.get("datas");
  var listObj = JSON.parse(jsonStr);
  for (let i = 0; i < listObj.length; i++) {
    if (listObj[i].pid == id) {
      listObj[i].pCount += num;
      break;
    }
  }
  return updateData(listObj);
}

function getAllData() {
  var jsonStr = cookieObj.get("datas");
  var listObj = JSON.parse(jsonStr);
  return listObj;
}

function deleteObjByPid(id) {
  var listObj = getAllData();
  for (let i = 0; i < listObj.length; i++) {
    if (listObj[i].pid == id) {
      listObj.splice(i, 1);
      break;
    }
  }
  updateData(listObj);
  return listObj;
}

function deleteAllObjByPid(id) {
  var listObj = getAllData();
  for (let i = 0; i < listObj.length; i++) {
    if (listObj[i].pid == id[i]) {
      listObj.splice(i);
    }
  }
  updateData(listObj);
  return listObj;
}
