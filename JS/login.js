// 獲取頁面中的元素
var username = document.getElementById('username');
var password = document.getElementById('password');
var login = document.getElementById('login');
var register = document.getElementById('register');

// 給 localStorage 載入初始資料
localStorage.username += 'myworld@gmail.com:130613;';

// 設定個函式判斷 localStorage 中是否有對應的帳號密碼
function exist(value) {
    var dta = localStorage.username.split(';');
    for(let i = 0; i < dta.length; i++) {
        var arrPust = dta[i].split(':');
        if(arrPust[0] == value) {
            if(arrPust[1] == password.value) {
                return true;
            }
        }
    }
    return false;
}

// 給登入按鈕添加判斷，先判斷使用者名稱和密碼框不為空，並且資料庫中有沒有對應的數值
login.addEventListener('click', function() {
    if(username.value == '' || password.value == '') {
        alert('使用者名稱和密碼不能為空白');
    } else {
        var re = /^.+@(.+?)\.com/; // ^ -> 字串開頭, . -> 比對任意字元, + -> 一個以上, ? -> 匹配前面一字元 0 至 1 次，等同於 {0, 1}, 
        if(!username.value.match(re)) {
            alert('輸入帳號不符合格式');
            username.value = '';
            password.value = '';
        } else {
            if(exist(username.value)) {
                alert('登入成功');
                username.value = '';
                password.value = '';
                location.href = 'member.html';  
            } else {
                alert('沒有此帳號或是使用者帳號密碼錯誤！');
            }
        }
    }
});

// 跳轉到註冊畫面
register.addEventListener('click', function() {
    location.href = 'register.html';
});
