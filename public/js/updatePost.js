//fills in the post textarea to be edited
const getPost = async () => {
  const responseData = await fetch("/api/posts/", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const response = await responseData.json();

  document.getElementById("update-post-title").value = response.title;
  document.getElementById("update-post-content").value = response.content;
};

//
const updatePost = async () => {
    const title = document.getElementById("update-post-title").value;
    const content = document.getElementById("update-post-content").value;
  
    if (title && content) {
      const response = await fetch("/api/posts/", {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        setTimeout(() => {
          // TODO: Post updated modal 
          document.location.href = '/dashboard'
        }, 1000);
      }
    }
};

document
.getElementById('update-post-button')
.addEventListener('click', updatePost)

getPost();
