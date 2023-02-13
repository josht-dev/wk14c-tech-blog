// Load the post function
const loadPost = (id) => { location.assign(`/api/post/${id}`) }

// Load the edit post function
const editPost = (id) => { location.assign(`/api/dashboard/edit-post/${id}`) }

// load the new post function
const newPost = () => { location.assign('/api/dashboard/new') }