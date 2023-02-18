//collects all post btn elements and creates event listener for each post to call redirect
document.querySelectorAll(".post-select-btn").forEach((btn) => {
  const postId = btn.getAttribute("name");

  btn.addEventListener("click", () => {
    document.location = `/post/${postId}`
  });
});