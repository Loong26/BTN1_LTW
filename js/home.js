function load_data_content() {
  let jsonPath = "../data/exams.json";
  fetch(jsonPath)
    .then((response) => response.json())
    .then((data) => {
      load_content(data.exams);
    });
}

function load_content(exams) {
  const content = document.getElementById("main-container");
  let html = "";

  for (key in exams) {
    let status;
    switch (key) {
      case "ongoing":
        status = ["Đang diễn ra", "Tham gia"];
        break;
      case "upcoming":
        status = ["Sắp diễn ra", "Chưa bắt đầu"];
        break;
      case "ended":
        status = ["Đã kết thúc", "Đã kết thúc"];
        break;
    }
    html += `<div class="text-center col-3 mb-3 fs-4 fw-medium fst-italic">${status[0]}</div>`;

    exams[key].forEach((exam) => {
      html += exam_content(exam, status[1], key);
    });
  }

  content.innerHTML = html;
}

function exam_content(exam, status, key) {
  btn_attr = "";
  if (key == "ongoing") {
    btn_attr = "btn-danger";
  } else {
    btn_attr = "btn-outline-danger disabled";
  }
  return `
  <div class="contest contest-problem">
    <div class="container text-center col-10">
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" >
            <div class="col-auto d-none d-lg-block">
                <img class="bd-placeholder-img rounded-2" style="object-fit: cover; margin: 20px; width: 160px; height: 160px;"  src="${exam.image}" ></img>
            </div>
            <div class="col p-4 d-flex flex-column position-static text-start">
                <strong class="d-inline-block mb-2 text-primary-emphasis ">${exam.class}</strong>
                <h3 class="mb-0">${exam.name}</h3>
                <div class="mb-1 text-body-secondary">Thời gian bắt đầu: ${exam.time}</div>
                <p class="card-text mb-auto">${exam.description}</p>
            </div>
            <div class="container text-center row align-items-center col-2 me-5">
                <a href="./quiz.html" class="icon-link-hover btn ${btn_attr}" style="font-size: 20px;">${status}</a>
            </div>
        </div>
    </div>
</div>
  `;
}

function searchByEnter(input) {
  if (event.key === "Enter") {
    search();
  }
}

function search() {
  let search = document.getElementById("search-input").value;
  let jsonPath = "exams.json";
  fetch(jsonPath)
    .then((response) => response.json())
    .then((data) => {
      let exams = data.exams;
      let result = {};
      for (key in exams) {
        result[key] = exams[key].filter((exam) => {
          let name = removeVietnameseTones(exam.name.toLowerCase());
          let search_input = removeVietnameseTones(search.toLowerCase());
          return name.includes(search_input);
        });
      }
      load_content(result);
    });
}

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}
