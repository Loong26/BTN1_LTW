const validateUsername = (userName) => {
  const regex = /^(N|B)\d{2}DC(CN|AT)\d{3}$/;
  return regex.test(userName);
};

const validateEmail = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
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

    window.location.href = "https://vulong.me/BTN1_LTW/home.html";
  });
}
// end login

// reset password
const formReset = document.querySelector("#form-reset");
if(formReset) {
  const registerButton = document.querySelector("#button-reset-password");

  registerButton.addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.querySelector(`input[name="email"]`);
    if(email.value == "") {
      alert("Vui lòng nhập email!");
      return;
    }

    if (!validateEmail(email.value)) {
      alert("Vui lòng nhập đúng định dạng email!");
      return;
    }

    window.location.href = "https://vulong.me/BTN1_LTW/index.html";
    alert("Kiểm tra email để lấy mã OTP!");
  });
}
// end reset password

// register
const registerForm = document.querySelector("#form-register");
if(registerForm) {
  const registerButton = document.querySelector("#button-register");
  registerButton.addEventListener("click", (e) => {
    e.preventDefault();
    
    const email = document.querySelector(`input[name="email"]`);
    const userName = document.querySelector(`input[name="user-name"]`);
    const password = document.querySelector(`input[name="password"]`);

    if(email.value == "") {
      alert("Vui lòng nhập email!");
      return;
    }

    if(userName.value == "") {
      alert("Vui lòng nhập tên đăng nhập!");
      return;
    }

    if(password.value == "") {
      alert("Vui lòng nhập mật khẩu!");
      return;
    }

    if (!validateEmail(email.value)) {
      alert("Vui lòng nhập đúng định dạng email!");
      return;
    }

    if (!validateUsername(userName.value)) {
      alert("Vui lòng nhập đúng định dạng là mã sinh viên!");
      return;
    }

    alert("Đăng kí tài khoản thành công!");
    window.location.href = "https://vulong.me/BTN1_LTW/index.html";
  });
}
// end register