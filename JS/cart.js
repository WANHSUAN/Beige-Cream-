const ccount = document.getElementById("ccount");
const listStr = cookieObj.get("datas");

var listObj = JSON.parse(listStr);

let totalCount = 0;
for (let i = 0; i < listObj.length; i++) {
  totalCount += listObj[i].pCount;
}
ccount.innerHTML = totalCount;

var listObj = getAllData();
var table = document.getElementById("table");
var box = document.getElementById("box");
var tbody = document.getElementById("tbody");
var totalPrice = document.getElementById("totalPrice");
var allCheck = document.getElementById("allCheck");
if (listObj.length == 0) {
  box.className = "box";
  table.className = "hide";
} else {
  box.className = "box hide";
  table.className = "";
  for (let i = 0; i < listObj.length; i++) {
    var tr = document.createElement("tr");
    tr.setAttribute("pid", listObj[i].pid);
    tr.setAttribute(
      "class",
      "row align-items-center text-align-center font-Noto-Serif border-bottom"
    );
    tr.innerHTML =
      '<td class="p-3 col-md-1 col-1">' +
      '<input type="checkbox" class="ck form-check-input" />' +
      "</td>" +
      '<td class="m-md-0 m-3 p-1 p-md-3 col-md-2 col-2">' +
      '<img src="' +
      listObj[i].pImg +
      '" alt="" class="w-100" />' +
      "</td>" +
      '<td class="p-3 p-md-3 col-md-2 col-3">' +
      listObj[i].pName +
      "</td>" +
      '<td class="p-3 col-md-2 col-5">' +
      '<button class="down btn btn-outline-info"> - </button><input type="text" value="' +
      listObj[i].pCount +
      '" readonly="readonly" class="w-40 font-Cormorant-Garamond p-1 m-3 text-align-center" /><button class="up btn btn-outline-info"> + </button>' +
      "</td>" +
      '<td class="p-3 col-md-2 col-4 font-Cormorant-Garamond">' +
      "NT$<span>" +
      listObj[i].price +
      "</span>" +
      "</td>" +
      '<td class="p-3 col-md-2 col-5 font-Cormorant-Garamond">' +
      "NT$<span>" +
      listObj[i].price * listObj[i].pCount +
      "</span>" +
      "</td>" +
      '<td class="p-md-3 ps-45 col-md-1 col-3">' +
      '<button class="del btn btn-outline-secondary font-Cormorant-Garamond">x</button>' +
      "</td>";
    tbody.appendChild(tr);
  }
}

var cks = document.querySelectorAll("tbody .ck");
function getTotalPrice() {
  cks = document.querySelectorAll("tbody .ck");
  var sum = 0;
  for (let i = 0; i < cks.length; i++) {
    if (cks[i].checked) {
      var tr = cks[i].parentNode.parentNode;
      var temp = tr.children[5].firstElementChild.innerHTML;
      sum += Number(temp);
    }
  }
  return sum;
}

for (let i = 0; i < cks.length; i++) {
  cks[i].onchange = function () {
    checkAllChecked();
    totalPrice.innerHTML = getTotalPrice();
  };
}

allCheck.onchange = function () {
  for (let i = 0; i < cks.length; i++) {
    if (this.checked) {
      cks[i].checked = true;
    } else {
      cks[i].checked = false;
    }
  }
  totalPrice.innerHTML = getTotalPrice();
};

var downs = document.querySelectorAll(".down");
var ups = document.querySelectorAll(".up");

var dels = document.querySelectorAll(".del");
for (var i = 0; i < downs.length; i++) {
  downs[i].onclick = function () {
    var txtObj = this.nextElementSibling;
    var tr = this.parentNode.parentNode;
    var pid = tr.getAttribute("pid");
    txtObj.value = Number(txtObj.value) - 1;
    if (txtObj.value < 1) {
      txtObj.value = 1;
      updateObjById(pid, 0);
    } else {
      updateObjById(pid, -1);
    }
    tr.children[0].firstElementChild.checked = true;
    checkAllChecked();
    var price = tr.children[4].firstElementChild.innerHTML;
    tr.children[5].firstElementChild.innerHTML = price * txtObj.value;
    totalPrice.innerHTML = getTotalPrice();
    ccount.innerHTML = getTotalCount();
  };

  ups[i].onclick = function () {
    var txtObj = this.previousElementSibling;
    var tr = this.parentNode.parentNode;
    var pid = tr.getAttribute("pid");
    txtObj.value = Number(txtObj.value) + 1;
    updateObjById(pid, 1);
    tr.children[0].firstElementChild.checked = true;
    checkAllChecked();
    var price = tr.children[4].firstElementChild.innerHTML;
    tr.children[5].firstElementChild.innerHTML = price * txtObj.value;
    totalPrice.innerHTML = getTotalPrice();
    ccount.innerHTML = getTotalCount();
  };

  dels[i].onclick = function () {
    var tr = this.parentNode.parentNode;
    var pid = tr.getAttribute("pid");
    if (confirm("確定刪除？")) {
      tr.remove();
      listObj = deleteObjByPid(pid);
    }
    if (listObj.length == 0) {
      box.className = "box";
      table.className = "hide";
    } else {
      box.className = "box hide";
      table.className = "";
    }
    totalPrice.innerHTML = getTotalPrice();
    ccount.innerHTML = getTotalCount();
  };
}

function checkAllChecked() {
  var isSelected = true;
  for (let j = 0; j < cks.length; j++) {
    if (cks[j].checked == false) {
      isSelected = false;
      break;
    }
  }
  allCheck.checked = isSelected;
}

var deleteAll = document.getElementById("deleteAll");
deleteAll.onclick = function () {
  var table = this.parentNode.parentNode.children[1];
  var tr = table.children[1].children;
  var pid = [];
  for (let i = 0; i < tr.length; i++) {
    pid.push(tr[i].attributes[0].value);
  }

  if (confirm("確定刪除？")) {
    table.remove();
    listObj = deleteAllObjByPid(pid);

    if (listObj.length == 0) {
      box.className = "box";
      table.className = "hide";
    }
  }
  totalPrice.innerHTML = getTotalPrice();
  ccount.innerHTML = getTotalCount();
};
