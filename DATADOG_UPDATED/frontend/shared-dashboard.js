// Auth gate — redirect to login if not authenticated
if (!sessionStorage.getItem("loggedIn")) {
  window.location.href = "../login.html";
}

// Populate user name / avatar from session
const user = sessionStorage.getItem("user") || "admin";
document.querySelectorAll("[data-user-name]").forEach((el) => {
  el.textContent = user.charAt(0).toUpperCase() + user.slice(1);
});
document.querySelectorAll("[data-user-avatar]").forEach((el) => {
  el.textContent = user.charAt(0).toUpperCase();
});

// Render any bar charts declared via data-bars="..."
document.querySelectorAll("[data-bars]").forEach((chart) => {
  const values = (chart.dataset.bars || "42,58,64,51,73,68,62,79,55,69,75,61")
    .split(",")
    .map((value) => Number(value.trim()));
  chart.innerHTML = values
    .map((value) => `<div class="bar" style="height:${value}%"></div>`)
    .join("");
});

// Logout helper
function logout() {
  sessionStorage.removeItem("loggedIn");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("role");
  window.location.href = "../login.html";
}

// Inject a Logout button into every sidebar status-box for consistency
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".sidebar .status-box").forEach((box) => {
    if (box.querySelector(".sb-logout")) return;
    const btn = document.createElement("button");
    btn.className = "sb-logout";
    btn.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> Logout';
    btn.style.cssText =
      "margin-top:14px;width:100%;padding:8px 12px;background:rgba(239,68,68,0.18);" +
      "border:1px solid rgba(239,68,68,0.35);border-radius:8px;color:#fca5a5;" +
      "font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;" +
      "justify-content:center;gap:7px;transition:all .2s;";
    btn.onmouseover = () => {
      btn.style.background = "rgba(239,68,68,0.3)";
      btn.style.color = "#fff";
    };
    btn.onmouseout = () => {
      btn.style.background = "rgba(239,68,68,0.18)";
      btn.style.color = "#fca5a5";
    };
    btn.onclick = logout;
    box.appendChild(btn);
  });
});
