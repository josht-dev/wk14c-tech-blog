// Logout Script
const logout = async() => {
  // Send logout to 'POST' route
  const res = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });

  if (res.ok) {
    // Redirect to homepage when logged out
    location.replace('/');
  }
  else {
    console.error(res.statusText);
  }
}