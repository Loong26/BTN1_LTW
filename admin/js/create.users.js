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
    const time = 5000;
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(() => showAlert.classList.add("alert-hidden"), time);

    closeAlert.addEventListener("click", () => {
      showAlert.classList.add("alert-hidden");
    });
  }
};

const removeAlert = () => {
  const messageElement = document.querySelector(".message.info");
  if(messageElement) {
    document.body.removeChild(messageElement);
  }
};

const showPopup1 = () => {
  removeAlert();
  var popup = document.getElementById('popup1');
  popup.style.display = 'block';
}

const closePopup1 = () => {
  var popup = document.getElementById('popup1');
  popup.style.display = 'none';
  createAlert("Cập nhật thành công! ", "success");
}

const showPopup2 = () => {
  removeAlert();
  var popup = document.getElementById('popup2');
  popup.style.display = 'block';
}

const closePopup2 = () => {
  var popup = document.getElementById('popup2');
  popup.style.display = 'none';
  createAlert("Cập nhật thành công! ", "success");
}

const showPopup3 = () => {
  removeAlert();
  var popup = document.getElementById('popup3');
  popup.style.display = 'block';
}

const closePopup3 = () => {
  var popup = document.getElementById('popup3');
  popup.style.display = 'none';
  createAlert("Cập nhật thành công! ", "success");
}

const showPopup4 = () => {
  removeAlert();
  var popup = document.getElementById('popup4');
  popup.style.display = 'block';
}

const closePopup4 = () => {
  var popup = document.getElementById('popup4');
  popup.style.display = 'none';
  createAlert("Cập nhật thành công! ", "success");
}

// submit
const buttonCreate = document.querySelector("#button-create");
if(buttonCreate) {
  buttonCreate.addEventListener("click", (e) => {
    e.preventDefault();
    
    removeAlert();

    const title = document.querySelector(`input[name="title"]`);
    if(title.value == "") {
      createAlert("Vui lòng nhập tên sinh viên! ", "danger");
      
      return;
    }

    const cardId = document.querySelector(`input[name="id"]`);
    if(cardId.value == "") {
      createAlert("Vui lòng nhập mã sinh viên! ", "danger");
      
      return;
    }

    const classroom = document.querySelector(`input[name="clsr"]`);
    if(classroom.value == "") {
      createAlert("Vui lòng nhập lớp của sinh viên! ", "danger");
      
      return;
    }

    const email = document.querySelector(`input[name="email"]`);
    if(email.value == "") {
      createAlert("Vui lòng nhập email của sinh viên! ", "danger");
      
      return;
    }

    if(!validateEmail(email.value)) {
      createAlert("Vui lòng nhập đúng định dạng là email(đuôi @gmail.com)! ", "danger");
      
      return;
    }


    createAlert("Tạo mới sinh viên thành công! ", "success");

    setTimeout(() => { window.location.href = 'https://vulong.me/BTN1_LTW/admin/public/users/index.html'; }, 1500);
  });
}
// end submit

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