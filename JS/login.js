let username = document.getElementById("username");
let password = document.getElementById("password");
let login = document.getElementById("login");
let register = document.getElementById("register");

localStorage.username += "sharon@gmail.com:130613;";

const exist = (value) => {
  const dta = localStorage.username.split(";");
  for (let i = 0; i < dta.length; i++) {
    const arrPust = dta[i].split(":");
    if (arrPust[0] === value) {
      if (arrPust[1] === password.value) {
        return true;
      }
    }
  }
  return false;
};

login.addEventListener("click", () => {
  if (username.value === "" || password.value === "") {
    alert("使用者名稱和密碼不能為空白");
  } else {
    const re = /^.+@(.+?)\.com/;
    if (!username.value.match(re)) {
      alert("輸入帳號不符合格式");
      username.value = "";
      password.value = "";
    } else {
      if (exist(username.value)) {
        alert("登入成功");
        username.value = "";
        password.value = "";
        location.href = "member.html";
      } else {
        alert("沒有此帳號或是使用者帳號密碼錯誤！");
        username.value = "";
        password.value = "";
      }
    }
  }
});

register.addEventListener("click", () => {
  location.href = "register.html";
});
