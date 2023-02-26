//saves comment to post
const saveComment = async () => {
    const comment = document.getElementById("new-comment").value;
    const date = dateFormatter(Date.now());
    
    if (comment) {
      const response = await fetch("/api/comments/", {
        method: "POST",
        body: JSON.stringify({comment, date}),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        modalDisplay('newComment');
        
        setTimeout(() => {
          document.location.reload();
        }, 1300);
      }
    }
  };
  
  //creates event listener to save comments to post
  document
    .getElementById("comment-box-btn")
    .addEventListener("click", saveComment);
  