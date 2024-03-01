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
const buttonAdd = document.querySelector(".button-add");
if(buttonAdd) {
  buttonAdd.addEventListener("click", (e) => {
    e.preventDefault();

    const div = document.createElement("div");
    const string = `
      <div class="form-group col-12">
        <label for="desc"><b>Mô tả</b></label>
        <div>
          <b>Câu hỏi số:</b> <input type="number" min="1">
        </div>
        <textarea class="form-control textarea-mce" id="desc" name="description" rows="5"></textarea>
      </div>
      <ul>
        <li><input type="checkbox"><b>A</b> <input type="text"></li>
        <li><input type="checkbox"><b>B</b> <input type="text"></li>
        <li><input type="checkbox"><b>C</b> <input type="text"></li>
        <li><input type="checkbox"><b>D</b> <input type="text"></li>
      </ul>
      <a class="btn btn-danger btn-sm mr-2 button-delete" style="margin-left: 5px; margin-bottom: 5px;">Xoá</a>
    `;
    div.innerHTML = string;
    div.classList.add("form-question");

    const buttonAdd = document.querySelector(".button-add");
    const formCreate = document.querySelector("#form-create-product");

    formCreate.insertBefore(div, buttonAdd);

  // delete question
    const formQuestion = document.querySelectorAll("#form-create-product .form-question");
    const buttonDel = document.querySelectorAll("#form-create-product .form-question .button-delete");
    if(buttonDel) {
      buttonDel.forEach((button, index) => {
        button.addEventListener("click", (e) => {
          formQuestion[index].remove();
        });
      });
    }
  // end delete question
  });
}
// end add question



