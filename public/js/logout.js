const logoutEvent = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    localStorage.removeItem('loggedInCheck')
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.getElementById('logout-btn').addEventListener('click', logoutEvent);
