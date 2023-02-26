const warningTimeout = 1000 * 60; //1 minute
const timeout = 1000 * 15; //15 seconds
let warningTimerId, idleTimerId;
const loggedInCheck = localStorage.getItem("loggedInCheck");
const idleLogout = localStorage.getItem("idleLogout");

//starts the timer to watch for inactivity and triggers a warning
const startTimer = () => {
  warningTimerId = setTimeout(logoutTimer, warningTimeout);
};

//starts the final timer to logout after no activity
const logoutTimer = () => {
  modalDisplay("warning");
  idleTimerId = setTimeout(idleTimeout, timeout);
};

const idleTimeout = () => {
  localStorage.setItem("idleLogout", true);
  document.getElementById("logout-btn").click();
};

const resetTimer = () => {
  clearInterval(warningTimerId);
  clearInterval(idleTimerId);
  startTimer();
};

function setupTimers() {
  document.addEventListener("mousemove", resetTimer, false);
  document.addEventListener("mousedown", resetTimer, false);
  document.addEventListener("keypress", resetTimer, false);
  document.addEventListener("touchmove", resetTimer, false);
  document.addEventListener("onscroll", resetTimer, false);
  startTimer();
}

const modalDisplay = (reason) => {
  const modal = document.getElementById("dynamic-modal");
  const close = document.getElementById("close-modal");
  const modalText = document.getElementById("modal-text");

  modal.style.display = "block";

  switch (reason) {
    case "idleLogout":
      modalText.innerHTML = "Uh-oh! You've been logged out due to inactivity.";
      break;
    case "warning":
      modalText.innerHTML = "You are about to be logged out for inactivity.";
      break;
    case "new post":
      modalText.innerHTML = "Post created!";
      break;
    case "deletedPost":
      modalText.innerHTML = "Post deleted!";
      break;
    case "updatedPost":
      modalText.innerHTML = "Post was updated!";
      break;
    case "newComment":
      modalText.innerHTML = "Comment saved!";
      break;
  }

  close.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
};

if (loggedInCheck == "true") {
  setupTimers();
}

if (idleLogout == "true") {
  setTimeout(() => {
    modalDisplay("idleLogout");
  }, 200);

  localStorage.removeItem("idleLogout");
}

const dateFormatter = (milliseconds) => {
  const date = new Date(milliseconds).toLocaleString();

  const dateArr = date.split(",");

  const timeArr = dateArr[1].trim().split(" ");

  const hourMinArr = timeArr[0].split(":");

  const amPm = timeArr[1].toLowerCase();

  //sets date structure mm/dd/yyyy hh:mm am/pm
  const postedDate = `${dateArr[0]}, ${hourMinArr[0]}:${hourMinArr[1]} ${amPm}`;

  return postedDate;
};