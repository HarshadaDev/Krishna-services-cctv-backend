// ===== GET A QUOTE POPUP + WHATSAPP =====

document.addEventListener("DOMContentLoaded", function () {

    // Popup elements
    const quoteBtn = document.getElementById("quoteBtn");
    const quotePopup = document.getElementById("quotePopup");
    const closeQuote = document.getElementById("closeQuote");

    // Open popup
    quoteBtn.addEventListener("click", function () {
        quotePopup.style.display = "flex";
    });

    // Close popup
    closeQuote.addEventListener("click", function () {
        quotePopup.style.display = "none";
    });

    // Close popup by clicking outside
    quotePopup.addEventListener("click", function (event) {
        if (event.target === quotePopup) {
            quotePopup.style.display = "none";
        }
    });


    // ===== QUOTE FORM =====

    const quoteForm = document.getElementById("quoteForm");

    quoteForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = quoteForm.querySelector('input[type="text"]').value;
        const phone = quoteForm.querySelector('input[type="tel"]').value;
        const service = quoteForm.querySelector("select").value;
        const requirement = quoteForm.querySelector("textarea").value;

        const whatsappNumber = "919359524733";

        const message =
            "Hello Bhagwati Services CCTV,\n\n" +
            "New CCTV Enquiry\n\n" +
            "Name: " + name + "\n" +
            "Phone: " + phone + "\n" +
            "Service: " + service + "\n" +
            "Requirement: " + requirement;

        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);

        window.open(whatsappURL, "_blank");

    });

});
// ===== CONTACT FORM - SPRING BOOT BACKEND =====

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const enquiryData = {
            name: document.getElementById("contactName").value,
            phone: document.getElementById("contactPhone").value,
            email: document.getElementById("contactEmail").value,
            service: document.getElementById("contactService").value,
            message: document.getElementById("contactMessage").value
        };

        fetch("http://localhost:8080/api/enquiries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(enquiryData)
        })

        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to submit enquiry");
            }

            return response.json();
        })

        .then(data => {
            alert("Enquiry submitted successfully! We will contact you soon.");

            contactForm.reset();

            console.log("Saved enquiry:", data);
        })

        .catch(error => {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        });

    });
}