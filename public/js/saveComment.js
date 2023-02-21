//saves comment to post
const saveComment = async () => {
    const comment = document.getElementById("new-comment").value;

    if (comment) {
      const response = await fetch("/api/comments/", {
        method: "POST",
        body: JSON.stringify({comment}),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.reload();
      }
    }
  };
  
  //creates event listener to save comments to post
  document
    .getElementById("comment-box-btn")
    .addEventListener("click", saveComment);
  