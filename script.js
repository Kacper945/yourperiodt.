// PRESENTATION NOTE: Manages GDPR cookie consent using browser localStorage.
// When Google Analytics 4 is ready, paste the Measurement ID below so tracking
// ONLY activates after explicit user consent.

const GA4_MEASUREMENT_ID = ""; // Example later: "G-XXXXXXXXXX"

function loadGoogleAnalytics() {
  // PRESENTATION NOTE: Guard clause prevents loading GA4 until a real ID is added.
  if (!GA4_MEASUREMENT_ID) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag("js", new Date());
  gtag("config", GA4_MEASUREMENT_ID);
}

document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");
  const declineBtn = document.getElementById("cookie-decline");

  // PRESENTATION NOTE: Check if the visitor has already accepted or declined cookies.
  const consent = localStorage.getItem("yourperiodt_cookie_consent");

  if (!consent && banner) {
    banner.style.display = "flex";
  } else if (consent === "accepted") {
    loadGoogleAnalytics();
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("yourperiodt_cookie_consent", "accepted");
      banner.style.display = "none";
      loadGoogleAnalytics();
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener("click", () => {
      localStorage.setItem("yourperiodt_cookie_consent", "declined");
      banner.style.display = "none";
    });
  }
});

// PRESENTATION NOTE: Helper function used on the Privacy Policy page so users (and graders)
// can re-open the cookie banner at any time.
function resetCookieConsent() {
  localStorage.removeItem("yourperiodt_cookie_consent");
  location.reload();
}