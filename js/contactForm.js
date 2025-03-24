// Contact form functionality

document.addEventListener("DOMContentLoaded", function () {
  // Initialize contact form if it exists on the page
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    initContactForm(contactForm);
  }
});

function initContactForm(form) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const statusMessage = document.getElementById("form-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset status message
    if (statusMessage) {
      statusMessage.textContent = "";
      statusMessage.className = "";
      statusMessage.style.display = "none";
    }

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Collect form data
    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      subject: subjectInput ? subjectInput.value : "",
      message: messageInput.value,
    };

    // Send form data to server
    submitForm(formData);
  });

  function validateForm() {
    let isValid = true;

    // Reset validation styles
    [nameInput, emailInput, messageInput].forEach((input) => {
      input.classList.remove("error");
      const errorElement = document.getElementById(`${input.id}-error`);
      if (errorElement) {
        errorElement.textContent = "";
      }
    });

    // Validate name
    if (!nameInput.value.trim()) {
      showError(nameInput, "Name is required");
      isValid = false;
    }

    // Validate email
    if (!emailInput.value.trim()) {
      showError(emailInput, "Email is required");
      isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, "Please enter a valid email address");
      isValid = false;
    }

    // Validate message
    if (!messageInput.value.trim()) {
      showError(messageInput, "Message is required");
      isValid = false;
    }

    return isValid;
  }

  function showError(input, message) {
    input.classList.add("error");
    const errorElement = document.getElementById(`${input.id}-error`);
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function submitForm(formData) {
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    // Send data to server using fetch API
    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Show success or error message
        if (data.success) {
          showStatus(data.message, "success");

          // Reset form
          form.reset();
        } else {
          showStatus(data.message, "error");
        }
      })
      .catch((error) => {
        showStatus("An error occurred. Please try again later.", "error");
        console.error("Error:", error);
      })
      .finally(() => {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      });
  }

  function showStatus(message, type) {
    if (statusMessage) {
      statusMessage.textContent = message;
      statusMessage.className =
        type === "success" ? "success-message" : "error-message";
      statusMessage.style.display = "block";
    }
  }
}
