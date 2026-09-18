// DOM Selection
const registerForm = document.getElementById("registerForm");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const formStatus = document.getElementById("formStatus");
const accountCard = document.getElementById("accountCard");
const passwordToggle = document.getElementById("passwordToggle");

// Load Saved Profile

loadSavedProfile();

// Form Submission

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    clearErrors();

    const name = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    const isValid = validateForm(
        name,
        email,
        password,
        confirmPassword
    );

    if (!isValid) {

        showFormError(
            "Please fix the errors above."
        );

        return;
    }

    createAccount(name, email);
});

// Form Validation

function validateForm(
    name,
    email,
    password,
    confirmPassword
) {

    let valid = true;

    // Name validation

    if (name === "") {

        nameError.textContent =
            "Please enter your full name.";

        fullNameInput.classList.add("input-error");

        valid = false;

    } else if (name.length < 2) {

        nameError.textContent =
            "Name must contain at least 2 characters.";

        fullNameInput.classList.add("input-error");

        valid = false;

    }

    // Email validation

    if (email === "") {

        emailError.textContent =
            "Please enter your email address.";

        emailInput.classList.add("input-error");

        valid = false;

    } else if (!isValidEmail(email)) {

        emailError.textContent =
            "Please enter a valid email address.";

        emailInput.classList.add("input-error");

        valid = false;

    }

    // Password validation

    if (password === "") {

        passwordError.textContent =
            "Please enter a password.";

        passwordInput.classList.add("input-error");

        valid = false;

    } else if (password.length < 8) {

        passwordError.textContent =
            "Password must be at least 8 characters.";

        passwordInput.classList.add("input-error");

        valid = false;

    }

    // Confirm password validation

    if (confirmPassword === "") {

        confirmPasswordError.textContent =
            "Please confirm your password.";

        confirmPasswordInput.classList.add("input-error");

        valid = false;

    } else if (password !== confirmPassword) {

        confirmPasswordError.textContent =
            "Passwords do not match.";

        confirmPasswordInput.classList.add("input-error");

        valid = false;

    }

    return valid;
}

// Email Validation

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}

// Create Account

function createAccount(name, email) {

    const user = {
        name: name,
        email: email
    };

    // Save ONLY non-sensitive information

    localStorage.setItem(
        "nexaUser",
        JSON.stringify(user)
    );

    showFormSuccess(
        `Welcome, ${name}! Your profile has been created.`
    );

    displayProfile(user);

    registerForm.reset();

    clearInputStates();

    document
        .getElementById("account")
        .scrollIntoView({
            behavior: "smooth"
        });
}

// Display Profile

function displayProfile(user) {

    const initials = getInitials(user.name);

    accountCard.innerHTML = `
        <div class="profile-result">

            <div class="profile-avatar">
                ${initials}
            </div>

            <div class="profile-details">

                <h3>${user.name}</h3>

                <p>
                    ${user.email}
                </p>

                <span class="profile-status">
                    <i class="fa-solid fa-circle"></i>
                    Profile created successfully
                </span>

            </div>

        </div>
    `;
}

// Get User Initials

function getInitials(name) {

    const words = name.split(" ");

    const firstLetter =
        words[0].charAt(0).toUpperCase();

    const lastLetter =
        words.length > 1
            ? words[words.length - 1]
                .charAt(0)
                .toUpperCase()
            : "";

    return firstLetter + lastLetter;
}

// Load Saved Profile

function loadSavedProfile() {

    const savedUser =
        localStorage.getItem("nexaUser");

    if (!savedUser) {
        return;
    }

    try {

        const user = JSON.parse(savedUser);

        displayProfile(user);

    } catch (error) {

        console.error(
            "Unable to load saved profile:",
            error
        );

        localStorage.removeItem("nexaUser");
    }
}

// Password Visibility

passwordToggle.addEventListener(
    "click",
    function () {

        const icon =
            passwordToggle.querySelector("i");

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");

        } else {

            passwordInput.type = "password";

            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");

        }

    }
);

// Clear Errors

function clearErrors() {

    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    fullNameInput.classList.remove("input-error");
    emailInput.classList.remove("input-error");
    passwordInput.classList.remove("input-error");
    confirmPasswordInput.classList.remove("input-error");

    formStatus.textContent = "";
    formStatus.className = "form-status";
}

// Clear Input States

function clearInputStates() {

    fullNameInput.classList.remove("input-error");
    emailInput.classList.remove("input-error");
    passwordInput.classList.remove("input-error");
    confirmPasswordInput.classList.remove("input-error");

}

// Success Message

function showFormSuccess(message) {

    formStatus.textContent = message;

    formStatus.className =
        "form-status success";
}

// Error Message

function showFormError(message) {

    formStatus.textContent = message;

    formStatus.className =
        "form-status error";
}

// Debugging

console.log(
    "Nexa Account UI loaded successfully."
);

console.log(
    "Saved user:",
    localStorage.getItem("nexaUser")
);