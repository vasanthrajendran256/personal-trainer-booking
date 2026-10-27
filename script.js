
document.addEventListener("click", function () {

    // 1. MOBILE HAMBURGER MENU
    const toggle = document.querySelector(".toggle");
    const navLinks = document.querySelector(".nav-links");

    if (toggle && navLinks) {

        toggle.addEventListener("click", function () {
            navLinks.classList.toggle("show");
            toggle.classList.toggle("active");
        });
    }
  
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

            const url =
                "https://wa.me/" + whatsappNumber +
                "?text=" + encodeURIComponent(text);

            window.open(url, "_blank", "noopener,noreferrer");
        });
    }

    const contactForm = document.querySelector("#contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            const name = document.querySelector("#contactName").value.trim();
            const email = document.querySelector("#contactEmail").value.trim();
            const phone = document.querySelector("#contactPhone").value.trim();
            const message = document.querySelector("#contactMessage").value.trim();


            const url =
                "https://mail.google.com/mail/u/0/#inbox" + whatsappNumber +
                "?text=" + encodeURIComponent(text);

            window.open(url, "_blank", "noopener,noreferrer");
        });
    }

});
