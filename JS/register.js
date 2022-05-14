// 獲取頁面中的元素
var username = document.getElementById('username');
var password = document.getElementById('password');
var passwordTwo = document.getElementById('passwordTwo');
var register = document.getElementById('register');
// 給註冊按鈕增加點選事件，判斷使用者名稱和密碼是否為空，密碼和重複密碼是否一致，註冊成功跳轉

// 給 localStorage 載入初始資料
localStorage.username += 'myworld@gmail.com:130613;';

register.addEventListener('click', function() {
    if(username.value == '' || password.value == '' || passwordTwo.value == '') {
        alert('使用者名稱以及密碼不能為空白');
    } else if(password.value != passwordTwo.value) {
        alert('密碼和重複密碼不一致！');
    } else {
        var re = /^.+@(.+?)\.com/;
        if(!username.value.match(re)) {
            alert('輸入帳號不符合格式');
            username.value = '';
            password.value = '';
            passwordTwo.value = '';
        }else if(!exist1(username.value)) {
            alert('恭喜，註冊成功！');
            localStorage.username += username.value + ':' + password.value + ';';
            location.href = 'member.html';
        } else {
            alert('您輸入的使用者名稱已經被註冊');
            username.value = '';
            password.value = '';
            passwordTwo.value = '';
        }
    }
});

// 建立一個方法，判斷註冊的使用者名稱是否被註冊
function exist1(value) {
    var dta = localStorage.username.split(';');
    for(let i = 0; i < dta.length; i++) {
        var arrPust1 = dta[i].split(':');
        if(arrPust1[0] == value) {
            return true;
        }
    }
    return false;
}