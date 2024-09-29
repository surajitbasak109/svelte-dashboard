export default function logout() {
  fetch('/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async (response) => {
      const data = await response.json();
      if (data.success) {
        window.location.href = '/login';
      } else {
        console.error(data.message);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
