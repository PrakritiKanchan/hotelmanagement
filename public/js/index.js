console.log("JS file loaded ✅");
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector("#signup form");
  const loginForm = document.querySelector("#login form");

  // Signup form submit handler
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = signupForm.querySelectorAll("input");
    let allFilled = true;

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        allFilled = false;
        input.style.borderColor = "red";
      } else {
        input.style.borderColor = "#ccc";
      }
    });

    if (!allFilled) {
      swal("Oops!", "Please fill in all fields.", "error");
      return;
    }

    swal("Success!", "Signup completed successfully.", "success");
    signupForm.reset();
  });

  // Login form submit handler
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = loginForm.querySelector("input[type='email']").value.trim();
    const password = loginForm.querySelector("input[type='password']").value.trim();

    if (email === "" || password === "") {
      swal("Oops!", "Please enter email and password.", "error");
      return;
    }

    swal("Welcome!", "Login successful.", "success");

    // Redirect after login (optional)
    // window.location.href = "dashboard.html";
  });
});
