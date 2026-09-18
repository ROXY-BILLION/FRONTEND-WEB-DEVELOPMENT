// DOM Selection

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

const servicesGrid = document.getElementById("servicesGrid");

const faqItems = document.querySelectorAll(".faq-item");

const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const formStatus = document.getElementById("formStatus");

// Services Data

const services = [
    {
        icon: "fa-solid fa-code",
        title: "Web Development",
        description:
            "Modern, responsive websites and web applications built for your business."
    },

    {
        icon: "fa-solid fa-palette",
        title: "UI/UX Design",
        description:
            "Clean and intuitive interfaces designed to give your users a better experience."
    },

    {
        icon: "fa-solid fa-chart-line",
        title: "Digital Strategy",
        description:
            "Practical digital strategies that help your business attract and retain customers."
    },

    {
        icon: "fa-solid fa-robot",
        title: "Automation",
        description:
            "Automate repetitive tasks and improve your team's productivity with technology."
    }
];

// Mobile Menu

menuButton.addEventListener("click", toggleMenu);

function toggleMenu() {
    navLinks.classList.toggle("active");

    const icon = menuButton.querySelector("i");

    if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
}

// Close mobile menu when a link is clicked

const navigationItems = navLinks.querySelectorAll("a");

navigationItems.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");

        const icon = menuButton.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    });
});

// Generate Services

function displayServices() {
    servicesGrid.innerHTML = "";

    services.forEach(function (service) {

        const card = document.createElement("article");

        card.classList.add("service-card");

        card.innerHTML = `
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>

            <h3>${service.title}</h3>

            <p>${service.description}</p>
        `;

        servicesGrid.appendChild(card);
    });
}

displayServices();

// FAQ Accordion

faqItems.forEach(function (item) {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function () {

        const isActive = item.classList.contains("active");

        faqItems.forEach(function (faq) {
            faq.classList.remove("active");
        });

        if (!isActive) {
            item.classList.add("active");
        }

    });

});

// Contact Form

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    clearErrors();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    const isValid = validateForm(name, email, message);

    if (!isValid) {
        formStatus.textContent = "Please fix the errors above.";
        formStatus.className = "form-status error";
        return;
    }

    showSuccessMessage(name);

    contactForm.reset();
});

// Form Validation

function validateForm(name, email, message) {

    let valid = true;

    if (name === "") {
        nameError.textContent = "Please enter your name.";
        nameInput.classList.add("error");

        valid = false;
    }

    if (email === "") {
        emailError.textContent = "Please enter your email.";
        emailInput.classList.add("error");

        valid = false;
    } else if (!isValidEmail(email)) {
        emailError.textContent = "Please enter a valid email.";
        emailInput.classList.add("error");

        valid = false;
    }

    if (message === "") {
        messageError.textContent = "Please enter your message.";
        messageInput.classList.add("error");

        valid = false;
    }

    return valid;
}

// Email Validation

function isValidEmail(email) {

    return email.includes("@") && email.includes(".");
}

// Clear Form Errors

function clearErrors() {

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    nameInput.classList.remove("error");
    emailInput.classList.remove("error");
    messageInput.classList.remove("error");

    formStatus.textContent = "";
    formStatus.className = "form-status";
}

// Success Message

function showSuccessMessage(name) {

    formStatus.textContent =
        `Thank you, ${name}! Your message has been sent successfully.`;

    formStatus.className = "form-status success";
}

// Debugging

console.log("NexaTech website loaded successfully.");

console.log("Services:", services);

console.log("FAQ items:", faqItems.length);