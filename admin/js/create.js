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
            <li class="active">
              <a href="http://127.0.0.1:5500/BTN1_LTW/admin/public/dashboard/create.html" style="color: white;"> Tạo kỳ thi </a>
            </li>
            <li>
              <a href="http://127.0.0.1:5500/BTN1_LTW/admin/public/dashboard/edit.html"> Sửa kì thi </a>
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
      <li><input type="checkbox"><b>B</b> <input type="text" value=${B}></li>
      <li><input type="checkbox"><b>C</b> <input type="text" value=${C}></li>
      <li><input type="checkbox"><b>D</b> <input type="text" value=${D}></li>
    </ul>
    <a class="btn btn-danger btn-sm mr-2 button-delete" style="margin-left: 1020px; margin-bottom: 5px;">Xoá</a>
  `;
  div.innerHTML = string;
  div.classList.add("form-question");

  const buttonAdd = document.querySelector(".button-add");
  const formCreate = document.querySelector("#form-create-product");

  formCreate.insertBefore(div, buttonAdd);
};

const deleteQuestion = () => {
  const formQuestion = document.querySelectorAll("#form-create-product .form-question");
  const buttonDel = document.querySelectorAll("#form-create-product .form-question .button-delete");

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
    const files = excelFile.files;
    if (files.length > 0) {
      // Lấy tên của file đầu tiên
      const fileName = files[0].name.split(".")[1];
      if(fileName != "xlsx" && fileName != "xls"){
        alert("Chỉ cho phép tải lên file Excel.");
        excelFile.value = ''; // Xóa giá trị của input
        return;
      }
    };
  });
}

document.getElementById("excel_file").addEventListener("change", handleFileSelect, false);

// end import excel file



