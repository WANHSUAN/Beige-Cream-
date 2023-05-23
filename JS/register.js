let username = document.getElementById("username");
let password = document.getElementById("password");
let passwordTwo = document.getElementById("passwordTwo");
let register = document.getElementById("register");

localStorage.username += "sharon@gmail.com:130613;";

const exist1 = (value) => {
  const dta = localStorage.username.split(";");
  for (let i = 0; i < dta.length; i++) {
    const arrPust1 = dta[i].split(":");
    if (arrPust1[0] == value) {
      return true;
    }
  }
  return false;
};

register.addEventListener("click", () => {
  if (username.value == "" || password.value == "" || passwordTwo.value == "") {
    alert("使用者名稱以及密碼不能為空白");
  } else if (password.value != passwordTwo.value) {
    alert("密碼和重複密碼不一致！");
  } else {
    const re = /^.+@(.+?)\.com/;
    if (!username.value.match(re)) {
      alert("輸入帳號不符合格式");
      username.value = "";
      password.value = "";
      passwordTwo.value = "";
    } else if (!exist1(username.value)) {
      alert("恭喜，註冊成功！");
      localStorage.username += username.value + ":" + password.value + ";";
      location.href = "member.html";
    } else {
      alert("您輸入的使用者名稱已經被註冊");
      username.value = "";
      password.value = "";
      passwordTwo.value = "";
    }
  }
});
