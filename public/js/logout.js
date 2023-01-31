const logoutEvent = (event) => {
    event.preventDefault();
  
    alert("Logged out");
  };
  
  document.getElementById("logout-btn").addEventListener("click", logoutEvent);