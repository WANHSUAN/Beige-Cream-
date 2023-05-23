const ccount = document.getElementById("ccount");
const btns = document.querySelectorAll(".box button");
let listStr = cookieObj.get("datas");

if (!listStr) {
  cookieObj.set({
    name: "datas",
    value: "[]",
  });
  listStr = cookieObj.get("datas");
}

let listObj = JSON.parse(listStr);

let totalCount = 0;
for (let i = 0; i < listObj.length; i++) {
  totalCount += listObj[i].pCount;
}

ccount.innerHTML = totalCount;

for (let i = 0; i < btns.length; i++) {
  btns[i].onclick = function () {
    const div = this.parentNode.parentNode.parentNode.parentNode;
    const pid = div.getAttribute("pid");
    const arrs = div.children;
    if (checkObjByPid(pid)) {
      listObj = updateObjById(pid, 1);
    } else {
      const imgSrc = arrs[0].firstElementChild.firstElementChild.src;
      const pName = arrs[1].firstElementChild.lastElementChild.innerHTML;
      const price =
        arrs[1].lastElementChild.firstElementChild.firstElementChild.innerHTML;
      const obj = {
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
}
