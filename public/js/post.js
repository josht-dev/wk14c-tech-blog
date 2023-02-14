// Load the post function
const loadPost = (id) => { location.assign(`/api/post/${id}`) };

// Load the edit post function
const editPost = (id) => { location.assign(`/api/dashboard/edit-post/${id}`) };

// Load the new post function
const newPost = () => { location.assign('/api/dashboard/new') };

// Save the edited post
const savePost = async () => {
  try {
    // Get form values
    const url = document.getElementById('edit-form').getAttribute('action');
    const bodyObj = {
      id: document.getElementById('edit-post').getAttribute('data-id'),
      title: document.getElementById('title').value,
      summary: document.getElementById('summary').value,
      content: document.getElementById('content').value,
      user_id: document.getElementById('user_id').value,
    }

    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyObj),
    });

    if (response.ok) {
      location.assign(`/api/dashboard/${document.getElementById('user_id').value}`);
    }
  }
  catch (err) { console.error(err.message); }
};

// Delete Post
const deletePost = async (id, userId) => {
  try {
    const response = await fetch(`/api/dashboard/edit-post/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId}),
    });

    if (response.ok) {
      location.assign(`/api/dashboard/${document.getElementById('user_id').value}`);
    }
    
  } catch (err) { console.error(err.message); }
}