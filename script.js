// login
const loginButton = document.querySelector("#button-login");

if(loginButton) {
  const loginForm = document.querySelector("#form-login");
  loginButton.addEventListener("click", (e) => {
    e.preventDefault();

    const userName = document.querySelector(`input[name="user-name"]`);
    const password = document.querySelector(`input[name="password"]`);

    window.location.href = "http://127.0.0.1:5500/Front-end%20excercise/quiz.html";
    
    loginForm.submit();
  });
}
// end login