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
              <a href="https://vulong.me/BTN1_LTW/admin/public/dashboard/create.html" style="background: black";> Tạo kỳ thi </a>
            </li>
            <li> 
              <a href="https://vulong.me/BTN1_LTW/admin/public/dashboard/edit.html" style="background: black";> Sửa kì thi </a>
            </li>
            <li> 
              <a href="https://vulong.me/BTN1_LTW/admin/public/dashboard/delete.html" style="background: black";> Xoá kì thi </a>
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

const createAlert = (message, typeButton) => {
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="alert alert-${typeButton}" show-alert="show-alert">${message} <span close-alert><i class="fa-solid fa-circle-xmark"></i></span> </div>
  `;
  div.classList.add("message");
  div.classList.add("info");
  
  document.body.appendChild(div);

  const showAlert = document.querySelector("[show-alert]");
  if(showAlert){
    const time = 100000000;
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(() => showAlert.classList.add("alert-hidden"), time);

    closeAlert.addEventListener("click", () => {
      showAlert.classList.add("alert-hidden");
    });
  }
};

// login
const loginForm = document.querySelector("#form-login");
if(loginForm) {
  const loginButton = document.querySelector("#button-login");
  
  loginButton.addEventListener("click", (e) => {
    e.preventDefault();

    const messageElement = document.querySelector(".message.info");
    if(messageElement) {
      document.body.removeChild(messageElement);
    }

    const userName = document.querySelector(`input[name="user-name"]`);
    const password = document.querySelector(`input[name="password"]`);

    if(userName.value == "") {
      createAlert("Vui lòng nhập tên đăng nhập! ", "danger");
      return;
    }

    if(password.value == "") {
      createAlert("Vui lòng nhập mật khẩu! ", "danger");
      return;
    }

    if (!validateUsername(userName.value)) {
      createAlert("Vui lòng nhập đúng định dạng là mã sinh viên! ", "danger");
      return;
    }

    createAlert("Đăng nhập thành công! ", "success");

    setTimeout(() => { window.location.href = 'https://vulong.me/BTN1_LTW/admin/public/dashboard/dashboard.html'; }, 1500);
  });
}
// end login

// upload image 
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if(file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
// end upload image 

// delete all 
const checkboxMulti = document.querySelector(`[checkbox-multi]`);

if(checkboxMulti){
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsID = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    if(inputCheckAll.checked){
      inputsID.forEach(input => {
        input.checked = true;
      });
    }
    else{
      inputsID.forEach(input => {
        input.checked = false;
      });
    }
  });

  inputsID.forEach(input => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length;

      if(countChecked == inputsID.length){
        inputCheckAll.checked = true;
      }
      else{
        inputCheckAll.checked = false;
      }
    });
  });
}
// end delete all 