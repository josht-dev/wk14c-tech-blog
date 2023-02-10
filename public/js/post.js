// Load the post function
const loadPost = async (id) => {
  try {
    const res = await fetch(`/api/post/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    // TODO - Figure out how to load the render from route instead
    if (res.ok) {
      location.assign(`/api/post/${id}`);
    }
    
  }
  catch(err) { console.error(res.statusText); }
  
}

// Edit the post function
const editPost = async () => {
  
}