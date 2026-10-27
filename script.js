document.addEventListener("DOMContentLoaded", () => {

    // 1. MOBILE HAMBURGER MENU
    const toggle = document.querySelector(".toggle");
    const navLinks = document.querySelector(".nav-links");

    if (toggle && navLinks) {
        toggle.addEventListener("click", () => {
            navLinks.classList.toggle("show");
            toggle.classList.toggle("active");
        });
    }


    // 2. TRAINER BOOKING FORM - WHATSAPP
    const bookingForm = document.querySelector("#bookingForm");

    if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!bookingForm.reportValidity()) return;

            const name = document.querySelector("#fullname").value.trim();
            const phone = document.querySelector("#phone").value.trim();
            const trainer = document.querySelector("#trainer").value;
            const program = document.querySelector("#program").value;
            const date = document.querySelector("#date").value;
            const time = document.querySelector("#time").value;
            const message = document.querySelector("#message").value.trim();

            // Replace with your WhatsApp number
            const whatsappNumber = "919876543210";

            const text =
                `*NEW TRAINER BOOKING*\n\n` 

            const url =
                "https://wa.me/" + whatsappNumber +
                "?text=" + encodeURIComponent(text);

            window.open(url, "_blank");
        });
    }


    // 3. CONTACT FORM - EMAIL
    const contactForm = document.querySelector("#contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            const name = document.querySelector("#contactName").value.trim();
            const email = document.querySelector("#contactEmail").value.trim();
            const phone = document.querySelector("#contactPhone").value.trim();
            const message = document.querySelector("#contactMessage").value.trim();

            // Replace with your email address
            const receiverEmail = "warriorsgym@gmail.com";

            const subject = "New Contact Enquiry";

            const body =
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                `Phone: ${phone}\n\n` +
                `Message: ${message}`;

            const url =
                `mailto:${receiverEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.location.href = url;
        });
    }

});
