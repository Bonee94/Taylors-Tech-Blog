//fills in the post textarea to be edited
const getPost = async () => {
  const responseData = await fetch("/api/posts/", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const response = await responseData.json();

  console.log(response)
  document.getElementById("update-post-title").value = response.title;
  document.getElementById("update-post-content").value = response.content;
};

//updates post content
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
        modalDisplay('updatedPost')

        setTimeout(() => {
          document.location.href = '/dashboard'
        }, 1500);
      }
    }
};

//deletes post from db
const deletePost = async () => {
  const response = await fetch('/api/posts/', {
    method: 'DELETE',
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    modalDisplay('deletedPost');

    setTimeout(() => {
      document.location.href = '/dashboard'
    }, 1500);
  }
};

document
.getElementById('update-post-button')
.addEventListener('click', updatePost)

document
.getElementById('delete-post-button')
.addEventListener('click', deletePost)

getPost();
