// Load the post function
const loadPost = (id) => { location.assign(`/api/post/${id}`) }

// Edit the post function
const editPost = (id) => { location.assign(`/api/dashboard/edit-post/${id}`) }

// New post function
const newPost = () => { location.assign('/api/dashboard/new') }