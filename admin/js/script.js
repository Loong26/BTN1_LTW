const validateUsername = (userName) => {
  const regex = /^(N|B)\d{2}DC(CN|AT)\d{3}$/;
  return regex.test(userName);
};

const validateEmail = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
};

// show tag list exam
document.addEventListener("DOMContentLoaded", () => {
  const parentItems = document.querySelectorAll(".parent-item-exam");
  parentItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const listTag = document.querySelector(".inner-menu ul.active-li");
      const examList = listTag.querySelector("#item-exam");

      const arrowIcon = listTag.querySelector("#icon-status");
      
      if(!examList) {
        const ul = document.createElement("ul");

        const string = `
            <li> 
              <a href="http://127.0.0.1:5500/BTN1_LTW/admin/public/dashboard/create.html" style="background: black";> Tạo kỳ thi </a>
            </li>
            <li> 
              <a href="http://127.0.0.1:5500/BTN1_LTW/admin/public/dashboard/edit.html" style="background: black";> Sửa kì thi </a>
            </li>
            <li> 
              <a href="http://127.0.0.1:5500/BTN1_LTW/admin/public/dashboard/delete.html" style="background: black";> Xoá kì thi </a>
            </li>
        `;

        ul.innerHTML = string;
        ul.setAttribute("id", "item-exam");

        const statisticTag = document.querySelector(".statistic");
        listTag.insertBefore(ul, statisticTag);

        arrowIcon.setAttribute("class", "fa-solid fa-chevron-up");

      } else {
        listTag.removeChild(examList);
        arrowIcon.setAttribute("class", "fa-solid fa-chevron-down");
      }
    });
  });
});
// end show tag list exam

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

    window.location.href = "http://127.0.0.1:5500/BTN1_LTW/admin/public/dashboard/dashboard.html";
  });
}
// end login