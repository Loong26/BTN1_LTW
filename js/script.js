const validateUsername = (userName) => {
  const regex = /^(N|B)\d{2}DC(CN|AT)\d{3}$/;
  return regex.test(userName);
};

// login
const loginForm = document.querySelector("#form-login");
if(loginForm) {
  const loginButton = document.querySelector("#button-login");
  
  loginButton.addEventListener("click", (e) => {
    e.preventDefault();

    const userName = document.querySelector(`input[name="user-name"]`);
    const password = document.querySelector(`input[name="password"]`);

    if(userName.value == "") {
      alert("Vui lòng nhập tên đăng nhập!");
      return;
    }

    if(password.value == "") {
      alert("Vui lòng nhập mật khẩu!");
      return;
    }

    if (!validateUsername(userName.value)) {
      alert("Vui lòng nhập đúng định dạng là mã sinh viên!");
      return;
    }

    window.location.href = "http://127.0.0.1:5500/BTN1_LTW/quiz.html";
  });
}
// end login