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

const showPopup1 = () => {
  const messageElement = document.querySelector(".message.info");
  if(messageElement) {
    document.body.removeChild(messageElement);
  }
  var popup = document.getElementById('popup1');
  popup.style.display = 'block';
}

const closePopup1 = () => {
  var popup = document.getElementById('popup1');
  popup.style.display = 'none';
  createAlert("Cập nhật thành công! ", "success");
}

const showPopup2 = () => {
  const messageElement = document.querySelector(".message.info");
  if(messageElement) {
    document.body.removeChild(messageElement);
  }
  var popup = document.getElementById('popup2');
  popup.style.display = 'block';
}

const closePopup2 = () => {
  var popup = document.getElementById('popup2');
  popup.style.display = 'none';
  createAlert("Cập nhật thành công! ", "success");
}

const showPopup3 = () => {
  const messageElement = document.querySelector(".message.info");
  if(messageElement) {
    document.body.removeChild(messageElement);
  }
  var popup = document.getElementById('popup3');
  popup.style.display = 'block';
}

const closePopup3 = () => {
  var popup = document.getElementById('popup3');
  popup.style.display = 'none';
  createAlert("Cập nhật thành công! ", "success");
}

const showPopup4 = () => {
  const messageElement = document.querySelector(".message.info");
  if(messageElement) {
    document.body.removeChild(messageElement);
  }
  var popup = document.getElementById('popup4');
  popup.style.display = 'block';
}

const closePopup4 = () => {
  var popup = document.getElementById('popup4');
  popup.style.display = 'none';
  createAlert("Cập nhật thành công! ", "success");
}