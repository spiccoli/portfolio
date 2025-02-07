"use strict";

// Utility: toggles the "active" class on an element
function toggleActive(elem) {
  elem.classList.toggle("active");
}

// Function to show a toast notification
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  // Hide the toast after 2 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// Function to copy the email address to the clipboard
function copyEmail() {
  const email = "piccolisantiagonicolas@gmail.com";
  navigator.clipboard.writeText(email)
    .then(() => {
      showToast("Copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy email:", err);
      showToast("Failed to copy email.");
    });
}

// === SIDEBAR TOGGLE ===
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => {
  toggleActive(sidebar);
});

// === PORTFOLIO FILTERING ===
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

// Show/hide the select dropdown
select.addEventListener("click", () => {
  toggleActive(select);
});

// The main filter function
function filterProjects(category) {
  // Show/hide project items based on their data-category
  filterItems.forEach((item) => {
    if (category === "all" || item.dataset.category === category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Handle clicks in the select dropdown
selectItems.forEach((item) => {
  item.addEventListener("click", () => {
    selectValue.innerText = item.innerText;
    toggleActive(select); // close the dropdown

    const selectedValue = item.innerText.toLowerCase();
    filterProjects(selectedValue);
  });
});

// Handle clicks on the large-screen filter buttons
let lastActiveBtn = filterBtns[0]; // default "All"

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update the active button
    lastActiveBtn.classList.remove("active");
    btn.classList.add("active");
    lastActiveBtn = btn;

    // Filter the projects
    const category = btn.innerText.toLowerCase();
    selectValue.innerText = btn.innerText; // sync the select text
    filterProjects(category);
  });
});

// === PAGE NAVIGATION ===
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const clickedPage = link.textContent.trim().toLowerCase();

    // Toggle pages
    pages.forEach((page) => {
      page.classList.toggle("active", page.dataset.page === clickedPage);
    });

    // Toggle active class on nav links
    navLinks.forEach((nav) => nav.classList.remove("active"));
    link.classList.add("active");

    // Scroll to top
    window.scrollTo(0, 0);
  });
});
