//saves a new post to the user
const createNewPost = async () => {
  //saves comment to post
  const title = document.getElementById("new-post-title").value;
  const content = document.getElementById("new-post-content").value;

  if (title && content) {
    const response = await fetch("/api/posts/", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      modalDisplay("new post");
      
      setTimeout(() => {
        document.location.href = '/dashboard'
      }, 1300);
    }
  }
};

document
  .getElementById("new-post-button")
  .addEventListener("click", createNewPost);
