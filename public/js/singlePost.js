const singlePostRender = async (id) => {
    document.location = `/post/${id}`
  };
  
  const postBtns = document
    .querySelectorAll(".post-select-btn")
    
  postBtns.forEach(btn => {
    const postId = btn.getAttribute("name"); 
      
    btn.addEventListener("click", () => {
        singlePostRender(postId);
    });
  })
  