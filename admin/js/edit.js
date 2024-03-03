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
            <a href="https://vulong.me/BTN1_LTW/admin/public/dashboard/create.html"> Tạo kỳ thi </a>
          </li>
          <li class="active">
            <a href="https://vulong.me/BTN1_LTW/admin/public/dashboard/edit.html" style="color: white;"> Sửa kì thi </a>
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

const showPopup = () => {
  const messageElement = document.querySelector(".message.info");
  if(messageElement) {
    document.body.removeChild(messageElement);
  }
  var popup = document.getElementById('popup');
  popup.style.display = 'block';
}

const closePopup = () => {
  const messageElement = document.querySelector(".message.info");
  if(messageElement) {
    document.body.removeChild(messageElement);
  }
  var popup = document.getElementById('popup');
  popup.style.display = 'none';
  createAlert("Cập nhật thành công! ", "success");
}

// set time
const checkbox = document.querySelectorAll("input.form-check-input")[1];
const checkboxNone = document.querySelectorAll("input.form-check-input")[0];
const timeCheck = document.querySelector("#time-check");

if(checkbox && checkboxNone) {
  const handleRadioChange = () => {
    if(checkbox.checked) {
      timeCheck.classList.remove("time-hidden");
    } else {
      timeCheck.classList.add("time-hidden");
    }
  };

  checkbox.addEventListener("change", handleRadioChange);
  checkboxNone.addEventListener("change", handleRadioChange);
}
// end set time

// add question
const innerQuestion = (TT, Content, A, B, C, D) => {
  const div = document.createElement("div");
  const string = `
    <div class="form-group col-12">
      <label for="desc"><b>Mô tả</b></label>
      <div>
        <b>Câu hỏi số:</b> <input type="number" min="1" value=${TT} required>
      </div>
      <textarea class="form-control textarea-mce" id="desc" name="description" value= rows="5">${Content}</textarea>
    </div>
    <ul>
      <li><input type="checkbox"><b>A</b> <input type="text" value=${A}></li>
      <li><input type="checkbox" checked><b>B</b> <input type="text" value=${B}></li>
      <li><input type="checkbox"><b>C</b> <input type="text" value=${C}></li>
      <li><input type="checkbox"><b>D</b> <input type="text" value=${D}></li>
    </ul>
    <a class="btn btn-danger btn-sm mr-2 button-delete" style="margin-left: 1020px; margin-bottom: 5px;">Xoá</a>
  `;
  div.innerHTML = string;
  div.classList.add("form-question");

  const buttonAdd = document.querySelector(".button-add");
  const popup = document.querySelector("#popup");

  popup.insertBefore(div, buttonAdd);
};

const deleteQuestion = () => {
  const formQuestion = document.querySelectorAll("#popup .form-question");
  const buttonDel = document.querySelectorAll("#popup .form-question .button-delete");

  if(buttonDel) {
    buttonDel.forEach((button, index) => {
      button.addEventListener("click", (e) => {
        formQuestion[index].remove();
      });
    });
  }
};

const buttonAdd = document.querySelector(".button-add");
if(buttonAdd) {
  buttonAdd.addEventListener("click", (e) => {
    e.preventDefault();

    innerQuestion(1, "", "", "", "", "");

  // delete question
    deleteQuestion();
  // end delete question
  });
}
// end add question

// import excel file
const ExcelToJSON = function () {
  this.parseExcel = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, {
        type: "binary",
      });
      workbook.SheetNames.forEach(function (sheetName) {
        // Tạo đối tượng từ sheet Excel
        const XL_row_object = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        );

        const json_object = JSON.stringify(XL_row_object);

        const productList = JSON.parse(json_object);
        productList.forEach((item) => {
          innerQuestion(parseInt(item.TT), item.Content, item.A, item.B, item.C, item.D);

          // delete question
          deleteQuestion();
          // end delete question
        });
      });
    };
    reader.onerror = function (ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
  };
};

const handleFileSelect = (evt) => {
  const files = evt.target.files;
  const xl2json = new ExcelToJSON();
  xl2json.parseExcel(files[0]);
}

const excelFile = document.querySelector("#excel_file");

if(excelFile) {
  excelFile.addEventListener("change", () => {
    const messageElement = document.querySelector(".message.info");
    if(messageElement) {
      document.body.removeChild(messageElement);
    }

    const files = excelFile.files;
    if (files.length > 0) {
      // Lấy tên của file đầu tiên
      const fileName = files[0].name.split(".")[1];
      if(fileName != "xlsx" && fileName != "xls"){
        createAlert("Chỉ cho phép tải lên file Excel. ", "danger");
        excelFile.value = ''; // Xóa giá trị của input
        return;
      }
    };
  });
}

document.getElementById("excel_file").addEventListener("change", handleFileSelect, false);