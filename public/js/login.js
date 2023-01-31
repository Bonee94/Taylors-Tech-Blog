const loginEvent = (event) => {
  event.preventDefault();

  alert("Logged in");
};

document.getElementById("login-btn").addEventListener("click", loginEvent);