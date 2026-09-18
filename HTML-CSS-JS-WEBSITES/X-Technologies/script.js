/* Mobile Navigation */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("show")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });
}

/* Services Data */

const services = [
    {
        title: "Web Development",
        icon: "fa-solid fa-code",
        description:
            "Modern responsive websites and powerful web applications for businesses and individuals."
    },
    {
        title: "Mobile Development",
        icon: "fa-solid fa-mobile-screen",
        description:
            "Cross-platform mobile applications designed for smooth and engaging user experiences."
    },
    {
        title: "Game Development",
        icon: "fa-solid fa-gamepad",
        description:
            "Interactive 2D and 3D games built with modern game development technologies."
    },
    {
        title: "AI & Machine Learning",
        icon: "fa-solid fa-brain",
        description:
            "Intelligent systems and AI-powered applications designed to automate and improve processes."
    },
    {
        title: "UI/UX Design",
        icon: "fa-solid fa-pen-ruler",
        description:
            "Clean and intuitive interfaces focused on usability, accessibility and user experience."
    },
    {
        title: "Cybersecurity",
        icon: "fa-solid fa-shield-halved",
        description:
            "Security-focused development practices designed to protect applications and data."
    }
];

/* Generate Service Card */

function createServiceCard(service) {
    const article = document.createElement("article");

    article.classList.add("service-card");

    article.innerHTML = `
        <div class="service-icon">
            <i class="${service.icon}"></i>
        </div>

        <h3>${service.title}</h3>

        <p>${service.description}</p>
    `;

    return article;
}

/* Display Services */

function displayServices(containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    container.innerHTML = "";

    services.forEach((service) => {
        const card = createServiceCard(service);
        container.appendChild(card);
    });
}

displayServices("homeServices");
displayServices("servicesContainer");

/* Projects Data */

const projects = [
    {
        title: "Mini Student Manager",
        category: "web",
        icon: "fa-solid fa-graduation-cap",
        description:
            "A full-stack student management application for creating, viewing, editing and managing student records.",
        technologies: ["React", "Node.js", "MongoDB"]
    },
    {
        title: "Quiz Platform",
        category: "web",
        icon: "fa-solid fa-circle-question",
        description:
            "An interactive quiz application with questions, progress tracking and score results.",
        technologies: ["HTML", "CSS", "JavaScript"]
    },
    {
        title: "Developer Profile",
        category: "web",
        icon: "fa-solid fa-user-tie",
        description:
            "A modern developer profile interface showcasing skills, projects and professional information.",
        technologies: ["React", "CSS"]
    },
    {
        title: "Mobile User Profile",
        category: "mobile",
        icon: "fa-solid fa-mobile-screen",
        description:
            "A responsive mobile profile application built with a cross-platform development approach.",
        technologies: ["React Native", "Expo"]
    },
    {
        title: "Tic-Tac-Toe",
        category: "game",
        icon: "fa-solid fa-gamepad",
        description:
            "An interactive multiplayer game demonstrating real-time communication and game logic.",
        technologies: ["React", "Socket.IO", "Node.js"]
    },
    {
        title: "AI Assistant",
        category: "ai",
        icon: "fa-solid fa-robot",
        description:
            "A concept interface for an intelligent AI-powered digital assistant.",
        technologies: ["JavaScript", "AI", "API"]
    }
];

/* Create Project Card */

function createProjectCard(project) {
    const article = document.createElement("article");

    article.classList.add("project-card");

    article.innerHTML = `
        <div class="project-image">
            <i class="${project.icon}"></i>
        </div>

        <div class="project-content">
            <h3>${project.title}</h3>

            <p>${project.description}</p>

            <div class="project-tags">
                ${project.technologies
                    .map((technology) => `<span>${technology}</span>`)
                    .join("")}
            </div>
        </div>
    `;

    return article;
}

/* Display Projects */

function displayProjects(containerId, filter = "all") {
    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const filteredProjects =
        filter === "all"
            ? projects
            : projects.filter((project) => project.category === filter);

    filteredProjects.forEach((project) => {
        const card = createProjectCard(project);
        container.appendChild(card);
    });
}

displayProjects("homeProjects");
displayProjects("projectsContainer");

/* Project Filters */

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        displayProjects("projectsContainer", filter);
    });
});

/* Contact Form */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const subjectError = document.getElementById("subjectError");
    const messageError = document.getElementById("messageError");

    const formMessage = document.getElementById("formMessage");

    function clearErrors() {
        document.querySelectorAll(".form-group").forEach((group) => {
            group.classList.remove("error");
        });

        nameError.textContent = "";
        emailError.textContent = "";
        subjectError.textContent = "";
        messageError.textContent = "";

        formMessage.className = "form-message";
        formMessage.textContent = "";
    }

    function validateEmail(email) {
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);
    }

    function validateForm() {
        let isValid = true;

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        if (name === "") {
            nameError.textContent = "Please enter your name.";
            nameInput.parentElement.classList.add("error");
            isValid = false;
        }

        if (email === "") {
            emailError.textContent = "Please enter your email.";
            emailInput.parentElement.classList.add("error");
            isValid = false;
        } else if (!validateEmail(email)) {
            emailError.textContent = "Please enter a valid email.";
            emailInput.parentElement.classList.add("error");
            isValid = false;
        }

        if (subject === "") {
            subjectError.textContent = "Please enter a subject.";
            subjectInput.parentElement.classList.add("error");
            isValid = false;
        }

        if (message === "") {
            messageError.textContent = "Please enter your message.";
            messageInput.parentElement.classList.add("error");
            isValid = false;
        } else if (message.length < 20) {
            messageError.textContent =
                "Message must contain at least 20 characters.";

            messageInput.parentElement.classList.add("error");

            isValid = false;
        }

        return isValid;
    }

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        clearErrors();

        const isValid = validateForm();

        if (!isValid) {
            formMessage.className = "form-message error";
            formMessage.textContent =
                "Please correct the errors above.";

            return;
        }

        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim()
        };

        console.log("Contact form submitted:", formData);

        formMessage.className = "form-message success";
        formMessage.textContent =
            "✓ Your message has been submitted successfully!";

        contactForm.reset();
    });
}