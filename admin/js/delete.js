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
          <li>
            <a href="https://vulong.me/BTN1_LTW/admin/public/dashboard/edit.html" > Sửa kì thi </a>
          </li>
          <li class="active"> 
            <a href="https://vulong.me/BTN1_LTW/admin/public/dashboard/delete.html" style="color: white;"> Xoá kì thi </a>
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
