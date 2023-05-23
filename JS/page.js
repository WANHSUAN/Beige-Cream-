var ccount = document.getElementById("ccount");
var btns = document.getElementById("button");
var listStr = cookieObj.get("datas");

if (!listStr) {
  cookieObj.set({
    name: "datas",
    value: "[]",
  });
  listStr = cookieObj.get("datas");
}

var listObj = JSON.parse(listStr);

var totalCount = 0;
for (var i = 0; i < listObj.length; i++) {
  totalCount += listObj[i].pCount;
}

ccount.innerHTML = totalCount;

btns.onclick = function () {
  var div = this.parentNode.parentNode.parentNode;
  var pid = div.getAttribute("pid");
  var arrs = div.children;
  if (checkObjByPid(pid)) {
    listObj = updateObjById(pid, 1);
  } else {
    var imgSrc = arrs[1].firstElementChild.src;
    var pName = arrs[2].firstElementChild.innerHTML;
    var price =
      arrs[2].firstElementChild.nextElementSibling.nextElementSibling
        .firstElementChild.innerHTML;
    var obj = {
      pid: pid,
      pImg: imgSrc,
      pName: pName,
      price: price,
      pCount: 1,
    };
    listObj.push(obj);
    listObj = updateData(listObj);
  }
  ccount.innerHTML = getTotalCount();
};
