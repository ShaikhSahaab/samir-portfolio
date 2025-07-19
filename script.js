// Handle Form Submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const form = event.target;
  const statusMessage = document.getElementById('form-status');

  // Clear any previous status messages
  statusMessage.textContent = '';
  
  // Show loading text
  statusMessage.textContent = 'Sending your message...';
  statusMessage.style.color = 'blue';

  // Submit the form to Web3Forms API
  fetch(form.action, {
    method: form.method,
    body: new FormData(form)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      statusMessage.textContent = 'Message sent successfully!';
      statusMessage.style.color = 'green';
      form.reset(); // Clear the form fields
    } else {
      statusMessage.textContent = 'Failed to send message. Please try again.';
      statusMessage.style.color = 'red';
    }
  })
  .catch(error => {
    statusMessage.textContent = 'Something went wrong. Please try again.';
    statusMessage.style.color = 'red';
  });
});
