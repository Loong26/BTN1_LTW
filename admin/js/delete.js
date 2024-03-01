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
            <a href="http://127.0.0.1:5500/BTN1_LTW/admin/public/dashboard/create.html"> Tạo kỳ thi </a>
          </li>
          <li>
            <a href="http://127.0.0.1:5500/BTN1_LTW/admin/public/dashboard/edit.html" > Sửa kì thi </a>
          </li>
          <li class="active"> 
            <a href="http://127.0.0.1:5500/BTN1_LTW/admin/public/dashboard/delete.html" style="color: white;"> Xoá kì thi </a>
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