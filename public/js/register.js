const registerEvent = async (event) => {
    event.preventDefault();
  
    const first_name = document
      .getElementById("first-name-register-user")
      .value.trim();
    const last_name = document
      .getElementById("last-name-register-user")
      .value.trim();
    const email = document.getElementById("email-register-user").value.trim();
    const username = document.getElementById("username-register-user").value.trim();
    const password = document
      .getElementById("password-register-user")
      .value.trim();
  
    if (first_name && last_name && email && password) {
      const response = await fetch("/api/users/register", {
        method: "POST",
        body: JSON.stringify({ first_name, last_name, email, username, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      }
    }
  };
  
  document
    .getElementById("register-user-btn")
    .addEventListener("click", registerEvent);