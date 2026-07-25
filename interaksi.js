// ======================
// CONFIG
// ======================

function getApiBaseUrl() {
    if (window.EduRankConfig && typeof window.EduRankConfig.getApiBaseUrl === 'function') {
        return window.EduRankConfig.getApiBaseUrl();
    }

    return (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:3000'
        : '';
}

function getApiUrl(path) {
    if (window.EduRankConfig && typeof window.EduRankConfig.getApiUrl === 'function') {
        return window.EduRankConfig.getApiUrl(path);
    }

    const base = getApiBaseUrl();
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return base ? `${base}${normalizedPath}` : normalizedPath;
}

// ======================
// PINDAH HALAMAN
// ======================

function showLogin(){

    document
    .getElementById("loginPage")
    .classList.add("hidden");

    document
    .getElementById("loginSection")
    .classList.remove("hidden");

    window.scrollTo(0,0);
}

function showDaftar(){

    document
    .getElementById("loginSection")
    .classList.add("hidden");

    document
    .getElementById("loginPage")
    .classList.remove("hidden");

    window.scrollTo(0,0);
}

// ======================
// VALIDASI DAFTAR
// ======================

function mulaiTes(){

    let nama =
    document.getElementById("nama").value;

    let email =
    document.getElementById("email").value;

    let password =
    document.getElementById("registerPassword").value;

    let confirmPassword =
    document.getElementById("confirmPassword").value;

    let agree =
    document.getElementById("agree").checked;

    let valid = true;

    resetWarning();

    // VALIDASI NAMA

    if(nama.trim() === ""){

        showWarning(
            "namaWarning",
            "Nama wajib diisi"
        );

        valid = false;
    }

    // VALIDASI EMAIL

    if(
        !email.includes("@") ||
        !email.includes(".")
    ){

        showWarning(
            "emailWarning",
            "Email tidak valid"
        );

        valid = false;
    }

    // VALIDASI PASSWORD

    if(password.length < 6){

        showWarning(
            "passwordWarning",
            "Password minimal 6 karakter"
        );

        valid = false;
    }

    // VALIDASI KONFIRMASI

    if(password !== confirmPassword){

        showWarning(
            "confirmWarning",
            "Konfirmasi password tidak cocok"
        );

        valid = false;
    }

    // CHECKBOX

    if(!agree){

        showCustomAlert(
            "Setujui syarat & ketentuan terlebih dahulu", "error"
        );

        valid = false;
    }

    // JIKA VALID

    if(valid){

        // SIMPAN DATA USER

        localStorage.setItem(
            "name",
            nama
        );

        localStorage.setItem(
            "username",
            nama.toLowerCase().replace(/\s/g,"")
        );

        localStorage.setItem(
            "email",
            email
        );

        // DEFAULT PROFILE

        if(!localStorage.getItem("bio")){

            localStorage.setItem(
                "bio",
                ""
            );
        }

        if(!localStorage.getItem("country")){

            localStorage.setItem(
                "country",
                ""
            );
        }

        if(!localStorage.getItem("rank")){

            localStorage.setItem(
                "rank",
                ""
            );
        }

        document
        .getElementById("loginPage")
        .classList.add("hidden");

        document
        .getElementById("quizPage")
        .classList.remove("hidden");

        window.scrollTo(0,0);
    }
}

// ======================
// LOGIN
// ======================

function login(){

    let email =
    document.getElementById("emailLogin").value;

    let password =
    document.getElementById("passwordLogin").value;

    let valid = true;

    document
    .getElementById("emailLoginWarning")
    .style.display = "none";

    document
    .getElementById("passwordLoginWarning")
    .style.display = "none";

    if(email === ""){

        showWarning(
            "emailLoginWarning",
            "Email wajib diisi"
        );

        valid = false;
    }

    if(password === ""){

        showWarning(
            "passwordLoginWarning",
            "Password wajib diisi"
        );

        valid = false;
    }

    if(valid){

        document
        .getElementById("loginSection")
        .classList.add("hidden");

        document
        .getElementById("quizPage")
        .classList.remove("hidden");

        window.scrollTo(0,0);
        showCustomAlert("Login berhasil. Selamat datang kembali!", "success");
    }
}

// ======================
// WARNING
// ======================

function showWarning(id, text){

    let el =
    document.getElementById(id);

    el.innerHTML = text;

    el.style.display = "block";
}

function resetWarning(){

    let warnings =
    document.querySelectorAll(".warning");

    warnings.forEach(function(w){

        w.style.display = "none";
    });
}

// ======================
// MASUK HOME
// ======================

function masukHalamanUtama(){

    let q1 =
    document.querySelector(
        'input[name="q1"]:checked'
    );

    let q2 =
    document.querySelector(
        'input[name="q2"]:checked'
    );

    let q3 =
    document.querySelector(
        'input[name="q3"]:checked'
    );

    if(!q1 || !q2 || !q3){

        showCustomAlert(
            "Jawab semua pertanyaan terlebih dahulu", "error"
        );

        return;
    }

    document
    .getElementById("quizPage")
    .classList.add("hidden");

    document
    .getElementById("homePage")
    .classList.remove("hidden");

    loadProfile();

    window.scrollTo(0,0);
}

// ======================
// LOAD PROFILE
// ======================

function loadProfile() {
    const profile = getCurrentProfileState();
    const name = profile.name || "Guest User";
    const username = profile.username || "guest";
    const bio = profile.bio || "";
    const country = profile.country || "";
    const rank = localStorage.getItem("rank") || "Bronze";
    const avatar = profile.avatar;

    // navbar
    const navName = document.getElementById("navProfileName");
    const navRank = document.getElementById("navProfileRank");

    if(navName) navName.innerText = name;
    if(navRank) navRank.innerText = rank;

    const heroProfileName = document.getElementById("heroProfileName");
    const heroProfileMatches = document.getElementById("heroProfileMatches");
    const heroProfileWinrate = document.getElementById("heroProfileWinrate");
    const totalMatches = Number(profile.matches) || 0;
    const totalWins = Number(profile.wins) || 0;
    const winrate = totalMatches ? Math.round((totalWins / totalMatches) * 100) : 0;

    if(heroProfileName) heroProfileName.innerText = name;
    if(heroProfileMatches) heroProfileMatches.innerText = totalMatches.toLocaleString();
    if(heroProfileWinrate) heroProfileWinrate.innerText = `${winrate}%`;

    // profile
    const pName = document.getElementById("profileName");
    const pUser = document.getElementById("profileUsername");
    const pBio = document.getElementById("profileBio");

    if(pName) pName.innerText = name;
    if(pUser) pUser.innerText = "@" + username;
    if(pBio) pBio.innerText = bio;

    // avatar
    if(avatar){

        const navImg =
        document.getElementById("navProfileImg");

        const previewImg =
        document.getElementById("previewImg");

        if(navImg) navImg.src = avatar;
        if(previewImg) previewImg.src = avatar;
    }

    updateRankBadges();
}

// ======================
// EDIT PROFILE
// ======================

function saveProfile(){

    let bio =
    document.getElementById(
        "inputBio"
    ).value;

    let country =
    document.getElementById(
        "inputCountry"
    ).value;

    let rank =
    document.getElementById(
        "inputRank"
    ).value;

    localStorage.setItem(
        "bio",
        bio || "Bio belum diisi"
    );

    localStorage.setItem(
        "country",
        country || "Belum diisi"
    );

    localStorage.setItem(
        "rank",
        rank || "Beginner Rank"
    );

    loadProfile();

    showCustomAlert("Profile berhasil disimpan", "success");
}

// ======================
// PREVIEW AVATAR
// ======================

document
.getElementById("avatarInput")
?.addEventListener(
    "change",
    function(){

        if(this.files && this.files[0]){

            let reader =
            new FileReader();

            reader.onload =
            function(e){

                let img =
                e.target.result;

                document
                .getElementById(
                    "previewImg"
                ).src = img;

                document
                .getElementById(
                    "navProfileImg"
                ).src = img;

                localStorage.setItem(
                    "avatar",
                    img
                );
            };

            reader.readAsDataURL(
                this.files[0]
            );
        }
    }
);

// ======================
// SHOW PASSWORD
// ======================

function toggleRegisterPassword(){

    togglePassword(
        "registerPassword",
        "eyeRegister"
    );
}

function toggleConfirmPassword(){

    togglePassword(
        "confirmPassword",
        "eyeConfirm"
    );
}

function toggleLoginPassword(){

    togglePassword(
        "passwordLogin",
        "eyeLogin"
    );
}

function togglePassword(inputId, eyeId){

    let input =
    document.getElementById(inputId);

    let eye =
    document.getElementById(eyeId);

    if(input.type === "password"){

        input.type = "text";

        eye.classList.remove("fa-eye");

        eye.classList.add("fa-eye-slash");

    } else {

        input.type = "password";

        eye.classList.remove("fa-eye-slash");

        eye.classList.add("fa-eye");
    }
}

// ======================
// PASSWORD STRENGTH
// ======================

let passwordInput =
document.getElementById(
    "registerPassword"
);

if(passwordInput){

    passwordInput.addEventListener(
        "input",
        function(){

            let value =
            passwordInput.value;

            let strength =
            document.getElementById(
                "strengthBar"
            );

            if(value.length < 4){

                strength.style.width = "25%";
                strength.style.background = "#ef4444";

            }

            else if(value.length < 7){

                strength.style.width = "50%";
                strength.style.background = "#f59e0b";

            }

            else if(value.length < 10){

                strength.style.width = "75%";
                strength.style.background = "#3b82f6";

            }

            else{

                strength.style.width = "100%";
                strength.style.background = "#22c55e";
            }
        }
    );
}

// ======================
// NAVBAR ACTIVE
// ======================

let navLinks =
document.querySelectorAll(
    ".nav-menu a"
);

navLinks.forEach(function(link){

    link.addEventListener(
        "click",
        function(){

            navLinks.forEach(function(l){

                l.classList.remove(
                    "active-link"
                );
            });

            link.classList.add(
                "active-link"
            );
        }
    );
});

// ======================
// NAVIGATION
// ======================

function showHome(){
    const home = document.getElementById("homeContent");
    const settings = document.getElementById("settingsSection");

    if(home) home.classList.remove("hidden");
    if(settings) settings.classList.add("hidden");

    // Reset tampilan materi jika sedang terbuka
    const materiBase = document.getElementById("materi");
    const smaMateri = document.getElementById("smaMateri");
    const kelasPage = document.getElementById("kelasPage");

    if(materiBase) materiBase.classList.remove("hidden");
    if(smaMateri) smaMateri.classList.add("hidden");
    if(kelasPage) kelasPage.classList.add("hidden");

    window.scrollTo(0,0);
}

function showSettingsPage(){
    const home = document.getElementById("homeContent");
    const settings = document.getElementById("settingsSection");

    if(home) home.classList.add("hidden");
    if(settings) settings.classList.remove("hidden");

    loadProfile();
    window.scrollTo(0,0);
}

function goToMateri() {
    showHome();
    setTimeout(() => {
        const el = document.getElementById("materi");
        if(el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

function showSMA() {
    document.getElementById("smaMateri").classList.remove("hidden");
    document.getElementById("materi").classList.add("hidden");
    window.scrollTo(0, document.getElementById("smaMateri").offsetTop - 100);
}

function showKelas(mapel) {
    document.getElementById("kelasPage").classList.remove("hidden");
    document.getElementById("smaMateri").classList.add("hidden");
    document.getElementById("kelasTitle").innerText = "Materi " + mapel;
    window.scrollTo(0, document.getElementById("kelasPage").offsetTop - 100);
}

function openMateriKosong() {
    showCustomAlert("Materi untuk kelas ini sedang dalam tahap penyusunan 📚", "info");
}

function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-pane");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// ======================
// COMING SOON
// ======================

function showComingSoon(){

    showCustomAlert(
        "Fitur masih coming soon 🚀", "info"
    );
}

// ======================
// LOAD AWAL
// ======================

window.onload = function(){

    loadProfile();
};// ===============================
// E D U R A N K   J S
// CLEAN MODERN INTERACTION
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    loadProfile();
    initNavbar();
    initAvatarPreview();
    initFeedbackForm();
    initSmoothReveal();

});

// ===============================
// PAGE TRANSITION
// ===============================

function switchPage(hideId, showId){

    const hidePage =
    document.getElementById(hideId);

    const showPage =
    document.getElementById(showId);

    if(!hidePage || !showPage) return;

    hidePage.classList.add("fade-out");

    setTimeout(() => {

        hidePage.classList.add("hidden");

        showPage.classList.remove("hidden");

        showPage.classList.add("fade-in");

        setTimeout(() => {

            showPage.classList.remove("fade-in");

        }, 400);

    }, 250);

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}

// ===============================
// NAVBAR ACTIVE
// ===============================

function initNavbar(){

    const navLinks =
    document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.forEach(item => {

                item.classList.remove("active-link");

            });

            link.classList.add("active-link");

        });

    });

}

// ===============================
// SHOW SMA PAGE
// ===============================

function showSMA(){

    const materi =
    document.getElementById("materi");

    const sma =
    document.getElementById("smaMateri");

    if(!materi || !sma) return;

    materi.classList.add("hidden");

    sma.classList.remove("hidden");

    sma.classList.add("fade-in");

    window.scrollTo({
        top:sma.offsetTop - 80,
        behavior:"smooth"
    });

}

// ===============================
// SHOW KELAS
// ===============================

function showKelas(mapel){

    const sma =
    document.getElementById("smaMateri");

    const kelas =
    document.getElementById("kelasPage");

    const title =
    document.getElementById("kelasTitle");

    if(!sma || !kelas) return;

    sma.classList.add("hidden");

    kelas.classList.remove("hidden");

    kelas.classList.add("fade-in");

    if(title){

        title.innerText =
        "Materi " + mapel;

    }

    window.scrollTo({
        top:kelas.offsetTop - 80,
        behavior:"smooth"
    });

}

// ===============================
// OPEN EMPTY MATERIAL
// ===============================

function openMateriKosong(){

    createToast(
        "Materi masih dalam tahap pengembangan 📚"
    );

}

// ===============================
// COMING SOON
// ===============================

function showComingSoon(){

    createToast(
        "Fitur Coming Soon 🚀"
    );

}

// ===============================
// SETTINGS PAGE
// ===============================

function showSettingsPage(){

    const home =
    document.getElementById("homeContent");

    const settings =
    document.getElementById("settingsSection");

    if(home){

        home.classList.add("hidden");

    }

    if(settings){

        settings.classList.remove("hidden");

        settings.classList.add("fade-in");

    }

    loadProfile();

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

// ===============================
// BACK TO HOME
// ===============================

function showHome(){

    const home =
    document.getElementById("homeContent");

    const settings =
    document.getElementById("settingsSection");

    if(home){

        home.classList.remove("hidden");

    }

    if(settings){

        settings.classList.add("hidden");

    }

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

// ===============================
// GO TO MATERI
// ===============================

function goToMateri(){

    const materi =
    document.getElementById("materi");

    if(materi){

        materi.scrollIntoView({
            behavior:"smooth"
        });

    }

}

// ===============================
// TAB SYSTEM
// ===============================

function openTab(event, tabId){

    const tabs =
    document.querySelectorAll(".tab-pane");

    const buttons =
    document.querySelectorAll(".tab-btn");

    tabs.forEach(tab => {

        tab.classList.remove("active");

    });

    buttons.forEach(btn => {

        btn.classList.remove("active");

    });

    document
    .getElementById(tabId)
    .classList.add("active");

    event.currentTarget
    .classList.add("active");

}

// ===============================
// FEEDBACK FORM
// ===============================

function initFeedbackForm(){

    const form =
    document.querySelector(".feedback-form");

    if(!form) return;

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const inputs =
        form.querySelectorAll("input, textarea");

        let valid = true;

        inputs.forEach(input => {

            if(input.value.trim() === ""){

                input.style.borderColor =
                "#ef4444";

                valid = false;

            } else {

                input.style.borderColor =
                "#e2e8f0";

            }

        });

        if(!valid){

            createToast(
                "Lengkapi semua form terlebih dahulu"
            );

            return;
        }

        createToast(
            "Feedback berhasil dikirim 🎉"
        );

        form.reset();

    });

}

// ===============================
// TOAST NOTIFICATION
// ===============================

function createToast(message){

    const toast =
    document.createElement("div");

    toast.className =
    "toast-notification";

    toast.innerText =
    message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3000);

}

// ===============================
// SAVE PROFILE
// ===============================

function saveProfile(){

    const name =
    document.getElementById("editNama");

    const email =
    document.getElementById("editEmail");

    if(name){

        localStorage.setItem(
            "name",
            name.value
        );

    }

    if(email){

        localStorage.setItem(
            "email",
            email.value
        );

    }

    loadProfile();

    createToast(
        "Profile berhasil disimpan ✅"
    );

}

// ===============================
// AVATAR PREVIEW
// ===============================

function initAvatarPreview(){

    const avatarInput =
    document.getElementById("avatarInput");

    if(!avatarInput) return;

    avatarInput.addEventListener(
        "change",
        function(){

            if(this.files && this.files[0]){

                const reader =
                new FileReader();

                reader.onload =
                function(e){

                    const img =
                    e.target.result;

                    localStorage.setItem(
                        "avatar",
                        img
                    );

                    loadProfile();

                };

                reader.readAsDataURL(
                    this.files[0]
                );

            }

        }
    );

}

// ===============================
// SMOOTH REVEAL
// ===============================

function initSmoothReveal(){

    const items =
    document.querySelectorAll(
        ".subject-card, .ranked-card, .rank-card, .section-title h2, .section-title p, .hero-left h1, .hero-left p, .feedback-info, .feedback-form"
    );

    const observer =
    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add("show-reveal");

            }

        });

    },{
        threshold:0.2
    });

    items.forEach(item => {

        item.classList.add("reveal");

        observer.observe(item);

    });

}

// ===============================
// OPEN SMA PAGE
// ===============================

function openSMA(){

    const materi =
    document.getElementById("materi");

    const smaPage =
    document.getElementById("smaPage");

    if(materi){

        materi.classList.add("hidden");

    }

    if(smaPage){

        smaPage.classList.remove("hidden");

        smaPage.classList.add("fade-in");

    }

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

// ===============================
// BACK TO MATERI
// ===============================

function backToMateri(){

    const materi =
    document.getElementById("materi");

    const smaPage =
    document.getElementById("smaPage");

    if(materi){

        materi.classList.remove("hidden");

    }

    if(smaPage){

        smaPage.classList.add("hidden");

    }

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

// ===============================
// ALERT FITUR
// ===============================

function fiturPengembangan(){

    showCustomAlert(
        "Fitur masih dalam pengembangan 🚀", "info"
    );

}

// ===============================
// UI IMPROVEMENTS
// ===============================

function toggleDarkMode() {
    const body = document.body;
    const icon = document.getElementById("darkModeIcon");
    const nextTheme = body.classList.contains("light") ? "dark" : "light";
    body.classList.toggle("light", nextTheme === "light");
    body.classList.toggle("dark", nextTheme === "dark");

    if(nextTheme === "dark") {
        if(icon) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        }
        localStorage.setItem("theme", "dark");
    } else {
        if(icon) {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
        localStorage.setItem("theme", "light");
    }
    updateThemeToggleLabels();
}

function loadTheme() {
    const theme = localStorage.getItem("theme") || "dark";
    document.body.classList.toggle("light", theme === "light");
    document.body.classList.toggle("dark", theme !== "light");
    const icon = document.getElementById("darkModeIcon");
    if(icon && theme !== "light") {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else if(icon) {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
    updateThemeToggleLabels();
}


function updateThemeToggleLabels() {
    const theme = document.body.classList.contains("light") ? "light" : "dark";
    document.querySelectorAll("#darkModeBtn, .theme-toggle-btn").forEach((btn) => {
        btn.classList.add("theme-toggle-btn");
        btn.setAttribute("aria-label", theme === "light" ? "Aktifkan dark mode" : "Aktifkan light mode");
        btn.setAttribute("title", theme === "light" ? "Light Mode" : "Dark Mode");
        let icon = btn.querySelector("i");
        if(!icon) {
            icon = document.createElement("i");
            btn.prepend(icon);
        }
        icon.className = theme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun";
        let label = btn.querySelector(".theme-toggle-label");
        if(!label) {
            label = document.createElement("span");
            label.className = "theme-toggle-label";
            btn.appendChild(label);
        }
        label.innerText = theme === "light" ? "Light" : "Dark";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadTheme();
    initActiveNavbar();
    initScrollReveal();
    initPageTransitions();
    showPendingRankEvent();
});

function toggleMobileMenu() {
    const menu = document.getElementById("navMenu");
    const hamburgerBtn = document.getElementById("hamburgerBtn");

    if(menu) {
        menu.classList.toggle("show");

        if(hamburgerBtn) {
            const icon = hamburgerBtn.querySelector("i");
            hamburgerBtn.setAttribute("aria-expanded", menu.classList.contains("show") ? "true" : "false");
            if(menu.classList.contains("show")){
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }
    }
}

function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    if(dropdown) {
        dropdown.classList.toggle("show");
    }
}

// Close dropdowns when clicking outside
window.addEventListener("click", function(e) {
    if (!e.target.closest('.dropdown-container')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
        });
    }
});

// Search input mockup logic
const searchInput = document.getElementById("searchInput");
if(searchInput) {
    searchInput.addEventListener("input", function() {
        const dropdown = document.getElementById("searchDropdown");
        if(this.value.length > 0) {
            dropdown.classList.add("show");
        } else {
            dropdown.classList.remove("show");
        }
    });
}

// ===============================
// GAME MODAL & RANK SYSTEM
// ===============================

let currentGameMode = '';
let selectedComputerSubject = '';

const GAME_SUBJECT_OPTIONS = [
    { key:"matematika", label:"Matematika", icon:"fa-calculator", color:"#2563eb" },
    { key:"fisika", label:"Fisika", icon:"fa-magnet", color:"#8b5cf6" },
    { key:"bahasainggris", label:"Bahasa Inggris", icon:"fa-language", color:"#ec4899" },
    { key:"informatika", label:"Informatika", icon:"fa-laptop-code", color:"#14b8a6" },
    { key:"campuran", label:"Campuran", icon:"fa-shuffle", color:"#f59e0b" }
];

const GRADE_OPTIONS = [
    { key:"sd", label:"SD", status:"coming" },
    { key:"smp", label:"SMP", status:"coming" },
    { key:"sma", label:"SMA", status:"ready" }
];

function openGameModal(mode) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    currentGameMode = mode;
    let modal = document.getElementById("gameModalOverlay");
    if(!modal) {
        modal = document.createElement("div");
        modal.id = "gameModalOverlay";
        modal.className = "modal-overlay";
        modal.innerHTML = `
            <div class="game-modal">
                <div class="modal-header">
                    <h3 id="modalTitle">Pilih Mode</h3>
                    <button class="modal-close" onclick="closeGameModal()"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="modal-options" id="modalOptions"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    const title = document.getElementById("modalTitle");
    const optionsContainer = document.getElementById("modalOptions");

    if(!title || !optionsContainer) return;

    optionsContainer.innerHTML = '';

    if(mode === 'custom') {
        title.innerText = "Custom Mode";
        optionsContainer.innerHTML = `
            <div class="custom-mode-grid">
                <button class="custom-mode-card" onclick="renderComputerMode()">
                    <span class="custom-mode-icon"><i class="fa-solid fa-robot"></i></span>
                    <h4>Lawan Computer</h4>
                    <p>Opponent robot modern dengan akurasi dan tempo jawaban sesuai difficulty.</p>
                </button>
                <button class="custom-mode-card" onclick="renderFriendMode()">
                    <span class="custom-mode-icon"><i class="fa-solid fa-user-group"></i></span>
                    <h4>Lawan Teman</h4>
                    <p>Create room, join room, dan copy room code untuk lobby privat.</p>
                </button>
                <button class="custom-mode-card" onclick="renderTournamentMode()">
                    <span class="custom-mode-icon"><i class="fa-solid fa-trophy"></i></span>
                    <h4>Turnamen</h4>
                    <p>Daftar event esports belajar dengan hadiah, countdown, dan slot pemain.</p>
                </button>
            </div>
        `;
        modal.classList.add("show");
        return;
    }

    if(mode === 'ranked' || mode === 'classic') {
        title.innerText = mode === 'ranked' ? "Pilih Jenjang Ranked" : "Pilih Jenjang Classic";
        optionsContainer.innerHTML = `
            <div class="grade-grid">
                ${GRADE_OPTIONS.map(item => `
                    <button class="grade-card ${item.status === "coming" ? "is-coming" : ""}" onclick="${item.status === "ready" ? `renderSubjectPicker('${mode}', '${item.key}')` : `showCustomAlert('Jenjang ${item.label} masih coming soon.', 'info')`}">
                        <span class="custom-mode-icon"><i class="fa-solid ${item.key === "sma" ? "fa-school" : "fa-book-open"}"></i></span>
                        <h4>${item.label}</h4>
                        <p>${item.status === "ready" ? "Pilih mapel dan langsung masuk battle." : "Opsi sudah tersedia, konten akan dibuka berikutnya."}</p>
                        ${item.status === "coming" ? `<span class="soon-badge inline-soon">Coming Soon</span>` : ""}
                    </button>
                `).join("")}
            </div>
        `;
        modal.classList.add("show");
        return;
    }

    modal.classList.add("show");
}

function renderSubjectPicker(mode, grade, backTarget) {
    const title = document.getElementById("modalTitle");
    const optionsContainer = document.getElementById("modalOptions");
    if(!title || !optionsContainer) return;

    const modeLabel = mode === "ranked" ? "Ranked" : mode === "classic" ? "Classic" : "Custom";
    title.innerText = `Pilih Mapel ${modeLabel}`;
    optionsContainer.innerHTML = `
        <div class="room-code-pill">
            <span><i class="fa-solid fa-layer-group"></i> Jenjang: <strong>${grade.toUpperCase()}</strong></span>
            <span>${modeLabel}</span>
        </div>
        <div class="subject-choice-grid">
            ${GAME_SUBJECT_OPTIONS.map(item => `
                <button class="modal-option-btn" onclick="${mode === "ai" ? `renderComputerDifficulty('${item.key}')` : `startGradeGame('${mode}', '${grade}', '${item.key}')`}">
                    <i class="fa-solid ${item.icon}" style="color:${item.color};"></i> ${item.label}
                </button>
            `).join("")}
        </div>
        <button class="secondary-btn" onclick="${backTarget === "custom" ? "renderComputerMode()" : `openGameModal('${mode}')`}">Kembali</button>
    `;
}

function startGradeGame(mode, grade, subject) {
    localStorage.setItem("selectedGrade", grade);
    localStorage.setItem("selectedSubject", subject);
    startGame(mode, subject);
}

function initActiveNavbar() {
    const links = document.querySelectorAll(".nav-link");
    if(!links.length) return;

    const normalize = (path) => path.split("/").pop() || "index.html";
    const currentPage = normalize(window.location.pathname);
    const currentHash = window.location.hash;

    links.forEach(link => link.classList.remove("active-link"));

    let activeLink = null;
    links.forEach(link => {
        const href = link.getAttribute("href") || "";
        const url = new URL(href, window.location.href);
        const linkPage = normalize(url.pathname);
        const samePage = linkPage === currentPage || (currentPage === "" && linkPage === "index.html");

        if(currentPage === "index.html" && href.includes("#") && currentHash && url.hash === currentHash) {
            activeLink = link;
        } else if(currentPage === "index.html" && !currentHash && (href === "#home" || href.includes("index.html#home"))) {
            activeLink = link;
        } else if(currentPage !== "index.html" && samePage && !href.includes("#")) {
            activeLink = link;
        }
    });

    if(!activeLink) {
        activeLink = Array.from(links).find(link => {
            const href = link.getAttribute("href") || "";
            return currentPage === "leaderboard.html" ? href.includes("leaderboard.html")
                : currentPage === "profile.html" ? href.includes("profile.html")
                : currentPage === "feedback.html" ? href.includes("feedback.html")
                : href.includes("index.html#home") || href === "#home";
        });
    }

    if(activeLink) activeLink.classList.add("active-link");

    const sectionLinks = Array.from(links).filter(link => {
        const href = link.getAttribute("href") || "";
        return href.includes("#") && (currentPage === "index.html" || currentPage === "");
    });

    if(sectionLinks.length && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            const visible = entries
                .filter(entry => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if(!visible) return;
            const id = `#${visible.target.id}`;
            const current = sectionLinks.find(link => (new URL(link.href, window.location.href)).hash === id);
            if(current) {
                links.forEach(link => link.classList.remove("active-link"));
                current.classList.add("active-link");
            }
        }, { rootMargin:"-35% 0px -55% 0px", threshold:[0.12,0.35,0.6] });

        document.querySelectorAll("section[id]").forEach(section => observer.observe(section));
    }
}

function renderComputerMode() {
    const title = document.getElementById("modalTitle");
    const optionsContainer = document.getElementById("modalOptions");
    if(!title || !optionsContainer) return;

    title.innerText = "Lawan Computer";
    optionsContainer.innerHTML = `
        <div class="room-code-pill">
            <span><i class="fa-solid fa-robot"></i> Opponent: <strong>Computer</strong></span>
            <span>Pilih mapel dulu</span>
        </div>
        <div class="subject-choice-grid">
            ${GAME_SUBJECT_OPTIONS.map(item => `
                <button class="modal-option-btn" onclick="renderComputerDifficulty('${item.key}')">
                    <i class="fa-solid ${item.icon}" style="color:${item.color};"></i> ${item.label}
                </button>
            `).join("")}
        </div>
        <button class="secondary-btn" onclick="openGameModal('custom')">Kembali</button>
    `;
}

function renderComputerDifficulty(subject) {
    const title = document.getElementById("modalTitle");
    const optionsContainer = document.getElementById("modalOptions");
    if(!title || !optionsContainer) return;

    selectedComputerSubject = subject;
    const subjectLabel = GAME_SUBJECT_OPTIONS.find(item => item.key === subject)?.label || "Mapel";
    const difficulties = [
        { key:"easy", label:"Easy", desc:"Respon santai, akurasi rendah, cocok untuk pemanasan.", speed:"Lambat", accuracy:"45%" },
        { key:"normal", label:"Normal", desc:"Tempo stabil dengan akurasi menengah.", speed:"Normal", accuracy:"65%" },
        { key:"hard", label:"Hard", desc:"Jawaban lebih cepat dan akurat untuk latihan serius.", speed:"Cepat", accuracy:"82%" }
    ];

    title.innerText = "Pilih Difficulty";
    optionsContainer.innerHTML = `
        <div class="room-code-pill">
            <span><i class="fa-solid fa-book"></i> Mapel: <strong>${subjectLabel}</strong></span>
            <span>Computer</span>
        </div>
        <div class="difficulty-grid">
            ${difficulties.map(item => `
                <button class="difficulty-card" onclick="startComputerBattle('${item.key}')">
                    <h4>${item.label}</h4>
                    <p>${item.desc}</p>
                    <div class="tournament-meta">
                        <span><i class="fa-solid fa-gauge-high"></i> ${item.speed}</span>
                        <span><i class="fa-solid fa-bullseye"></i> ${item.accuracy}</span>
                    </div>
                </button>
            `).join("")}
        </div>
        <button class="secondary-btn" onclick="renderComputerMode()">Kembali</button>
    `;
}

function startComputerBattle(difficulty) {
    localStorage.setItem("opponentName", "Computer");
    localStorage.setItem("opponentImg", "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=edurank-computer");
    localStorage.setItem("aiDifficulty", difficulty);
    localStorage.setItem("selectedSubject", selectedComputerSubject || "matematika");
    localStorage.setItem("gameMode", "ai");
    localStorage.setItem("gameParam", selectedComputerSubject || "matematika");
    navigateWithTransition("battle-ai.html");
}

function renderFriendMode() {
    const title = document.getElementById("modalTitle");
    const optionsContainer = document.getElementById("modalOptions");
    if(!title || !optionsContainer) return;

    const code = localStorage.getItem("roomCode") || generateRoomCode();
    localStorage.setItem("roomCode", code);
    title.innerText = "Setting Lawan Teman";
    optionsContainer.innerHTML = `
        <div class="custom-settings-form">
            <label>
                <span>Waktu Bermain</span>
                <input class="room-input" id="friendTimeInput" type="number" min="1" max="10" value="5" />
            </label>
            <label>
                <span>Jumlah Soal</span>
                <input class="room-input" id="friendQuestionInput" type="number" min="1" max="10" value="5" />
            </label>
            <label>
                <span>Jenjang</span>
                <select class="room-input" id="friendGradeInput" onchange="handleFriendGradeChange()">
                    <option value="sd">SD - Coming Soon</option>
                    <option value="smp">SMP - Coming Soon</option>
                    <option value="sma" selected>SMA</option>
                </select>
            </label>
            <label>
                <span>Kelas</span>
                <select class="room-input" id="friendClassInput">
                    <option value="10">Kelas 10 SMA</option>
                    <option value="11">Kelas 11 SMA</option>
                    <option value="12">Kelas 12 SMA</option>
                </select>
            </label>
        </div>
        <div class="room-card">
            <h4><i class="fa-solid fa-plus"></i> Create Room</h4>
            <p>Buat lobby privat dan bagikan kode ke teman.</p>
            <div class="room-code-pill">
                <span>Room Code: <strong id="roomCodeText">${code}</strong></span>
                <button class="secondary-btn" style="padding:8px 12px;" onclick="copyRoomCode()">Copy</button>
            </div>
            <button class="primary-btn" style="width:100%; margin-top:14px;" onclick="createFriendRoom()">Buat Room</button>
        </div>
        <div class="room-card">
            <h4><i class="fa-solid fa-right-to-bracket"></i> Join Room</h4>
            <p>Masukkan username teman atau code room.</p>
            <input class="room-input" id="joinRoomInput" placeholder="Contoh: ER-7429 atau @username" />
            <div class="room-actions">
                <button class="primary-btn" onclick="joinFriendRoom()">Join Room</button>
                <button class="secondary-btn" onclick="showCustomAlert('Invite dikirim ke teman. Tunggu teman masuk lobby.', 'success')">Invite</button>
            </div>
        </div>
        <button class="secondary-btn" onclick="openGameModal('custom')">Kembali</button>
    `;
}

function handleFriendGradeChange() {
    const grade = document.getElementById("friendGradeInput")?.value || "sma";
    const classInput = document.getElementById("friendClassInput");
    if(!classInput) return;

    if(grade !== "sma") {
        showCustomAlert(`Jenjang ${grade.toUpperCase()} masih coming soon. Untuk sekarang room diarahkan ke SMA.`, "info");
        classInput.innerHTML = `
            <option value="coming-soon">Coming Soon</option>
        `;
        return;
    }

    classInput.innerHTML = `
        <option value="10">Kelas 10 SMA</option>
        <option value="11">Kelas 11 SMA</option>
        <option value="12">Kelas 12 SMA</option>
    `;
}

function getFriendRoomSettings() {
    const time = clampNumber(document.getElementById("friendTimeInput")?.value, 1, 10, 5);
    const questions = clampNumber(document.getElementById("friendQuestionInput")?.value, 1, 10, 5);
    const grade = document.getElementById("friendGradeInput")?.value || "sma";
    const classLevel = document.getElementById("friendClassInput")?.value || "10";
    return { time, questions, grade, classLevel };
}

function clampNumber(value, min, max, fallback) {
    const parsed = parseInt(value, 10);
    if(Number.isNaN(parsed)) return fallback;
    return Math.max(min, Math.min(max, parsed));
}

function createFriendRoom() {
    const settings = getFriendRoomSettings();
    if(settings.grade !== "sma") {
        showCustomAlert("SD dan SMP masih coming soon. Pilih SMA untuk membuat room sekarang.", "info");
        return;
    }

    const code = localStorage.getItem("roomCode") || generateRoomCode();
    localStorage.setItem("roomCode", code);
    localStorage.setItem("friendRoomSettings", JSON.stringify(settings));
    localStorage.setItem("selectedSubject", "campuran");
    localStorage.setItem("gameMode", "friend");
    localStorage.setItem("gameParam", code);

    showCustomAlert(`Room ${code} dibuat: ${settings.time} menit, ${settings.questions} soal, kelas ${settings.classLevel} SMA.`, "success");
    setTimeout(() => startGame("friend", code), 250);
}

function generateRoomCode() {
    return "ER-" + Math.floor(1000 + Math.random() * 9000);
}

function copyRoomCode() {
    const code = document.getElementById("roomCodeText")?.innerText || localStorage.getItem("roomCode") || "";
    if(navigator.clipboard && code) {
        navigator.clipboard.writeText(code)
            .then(() => showCustomAlert("Room code berhasil disalin.", "success"))
            .catch(() => showCustomAlert(`Room code kamu: ${code}`, "info"));
    } else {
        showCustomAlert(`Room code kamu: ${code}`, "info");
    }
}

function joinFriendRoom() {
    const value = document.getElementById("joinRoomInput")?.value.trim();
    if(!value) {
        showCustomAlert("Masukkan username atau room code terlebih dahulu.", "error");
        return;
    }
    const settings = getFriendRoomSettings();
    if(settings.grade !== "sma") {
        showCustomAlert("SD dan SMP masih coming soon. Pilih SMA untuk bermain sekarang.", "info");
        return;
    }

    localStorage.setItem("roomCode", value);
    localStorage.setItem("friendRoomSettings", JSON.stringify(settings));
    localStorage.setItem("selectedSubject", "campuran");
    localStorage.setItem("gameMode", "friend");
    localStorage.setItem("gameParam", value);
    localStorage.setItem("opponentName", value.startsWith("@") ? value : "Friend Room");
    localStorage.setItem("opponentImg", "https://i.pravatar.cc/100?img=32");
    showCustomConfirm(`Masuk ke lobby ${value}?`, () => startGame("friend", value));
}

function renderTournamentMode() {
    const title = document.getElementById("modalTitle");
    const optionsContainer = document.getElementById("modalOptions");
    if(!title || !optionsContainer) return;

    title.innerText = "Turnamen Custom";
    optionsContainer.innerHTML = `
        <div class="tournament-builder">
            <div class="custom-settings-form tournament-form">
                <label class="form-wide">
                    <span>Judul Turnamen</span>
                    <input class="room-input" id="tournamentTitleInput" placeholder="Contoh: SMA Science Clash" />
                </label>
                <label>
                    <span>Waktu per Match</span>
                    <input class="room-input" id="tournamentTimeInput" type="number" min="1" max="10" value="5" />
                </label>
                <label>
                    <span>Jumlah Soal per Match</span>
                    <input class="room-input" id="tournamentQuestionInput" type="number" min="1" max="10" value="5" />
                </label>
                <label class="form-wide">
                    <span>Jadwal Turnamen</span>
                    <input class="room-input" id="tournamentScheduleInput" type="datetime-local" />
                </label>
                <label class="form-wide">
                    <span>Slot Peserta</span>
                    <select class="room-input" id="tournamentSlotInput">
                        <option value="8">8 peserta</option>
                        <option value="16" selected>16 peserta</option>
                        <option value="32">32 peserta</option>
                    </select>
                </label>
            </div>

            <div class="multi-select-group">
                <span>Mapel</span>
                <div class="chip-grid">
                    ${GAME_SUBJECT_OPTIONS.map(item => `
                        <label class="setting-chip">
                            <input type="checkbox" name="tournamentSubject" value="${item.key}" ${item.key === "matematika" ? "checked" : ""} />
                            <i class="fa-solid ${item.icon}"></i>
                            ${item.label}
                        </label>
                    `).join("")}
                </div>
            </div>

            <div class="multi-select-group">
                <span>Kelas</span>
                <div class="chip-grid">
                    <label class="setting-chip is-muted"><input type="checkbox" name="tournamentClass" value="1-sd" /> 1 SD <small>Coming Soon</small></label>
                    <label class="setting-chip is-muted"><input type="checkbox" name="tournamentClass" value="7-smp" /> 7 SMP <small>Coming Soon</small></label>
                    <label class="setting-chip"><input type="checkbox" name="tournamentClass" value="10-sma" checked /> 10 SMA</label>
                    <label class="setting-chip"><input type="checkbox" name="tournamentClass" value="11-sma" /> 11 SMA</label>
                    <label class="setting-chip"><input type="checkbox" name="tournamentClass" value="12-sma" /> 12 SMA</label>
                </div>
            </div>

            <div class="custom-settings-form tournament-form">
                <label>
                    <span>Format</span>
                    <select class="room-input" id="tournamentFormatInput">
                        <option value="single">Single elimination</option>
                        <option value="round-robin">Round robin mini</option>
                    </select>
                </label>
                <label>
                    <span>Mode Reward</span>
                    <select class="room-input" id="tournamentRewardInput">
                        <option value="achievement">Achievement + badge</option>
                        <option value="elo">Achievement + bonus ELO</option>
                    </select>
                </label>
            </div>

            <div class="achievement-preview">
                <i class="fa-solid fa-award"></i>
                <div>
                    <strong>Reward Juara</strong>
                    <span>Achievement Tournament Champion, trophy badge, dan riwayat kemenangan tersimpan setelah turnamen dimenangkan.</span>
                </div>
            </div>

            <div class="room-actions">
                <button class="primary-btn" onclick="createTournament()">Buat Turnamen</button>
                <button class="secondary-btn" onclick="simulateTournamentWin()">Simulasi Menang</button>
            </div>
        </div>
        <button class="secondary-btn" onclick="openGameModal('custom')">Kembali</button>
    `;
}

function createTournament() {
    const title = document.getElementById("tournamentTitleInput")?.value.trim();
    const subjects = Array.from(document.querySelectorAll("input[name='tournamentSubject']:checked")).map(item => item.value);
    const classes = Array.from(document.querySelectorAll("input[name='tournamentClass']:checked")).map(item => item.value);
    const time = clampNumber(document.getElementById("tournamentTimeInput")?.value, 1, 10, 5);
    const questions = clampNumber(document.getElementById("tournamentQuestionInput")?.value, 1, 10, 5);
    const schedule = document.getElementById("tournamentScheduleInput")?.value || "";
    const slots = document.getElementById("tournamentSlotInput")?.value || "16";
    const format = document.getElementById("tournamentFormatInput")?.value || "single";
    const reward = document.getElementById("tournamentRewardInput")?.value || "achievement";

    if(!title) {
        showCustomAlert("Judul turnamen wajib diisi.", "error");
        return;
    }

    if(!subjects.length || !classes.length) {
        showCustomAlert("Pilih minimal satu mapel dan satu kelas.", "error");
        return;
    }

    if(!classes.some(item => item.includes("sma"))) {
        showCustomAlert("SD dan SMP masih coming soon. Pilih minimal satu kelas SMA.", "info");
        return;
    }

    const tournament = { title, subjects, classes, time, questions, schedule, slots, format, reward, status:"created" };
    localStorage.setItem("customTournament", JSON.stringify(tournament));
    showCustomAlert(`Turnamen ${title} berhasil dibuat. Reward achievement aktif untuk pemenang.`, "success");
}

function simulateTournamentWin() {
    const tournament = JSON.parse(localStorage.getItem("customTournament") || "{}");
    const title = tournament.title || "Custom Tournament";
    const achievements = JSON.parse(localStorage.getItem("achievements") || "[]");
    const achievement = {
        id:`tournament-${Date.now()}`,
        title:"Tournament Champion",
        desc:`Menang turnamen ${title}`,
        reward:"Trophy badge + Champion profile title",
        earnedAt:new Date().toISOString()
    };

    achievements.push(achievement);
    localStorage.setItem("achievements", JSON.stringify(achievements));
    localStorage.setItem("latestAchievement", JSON.stringify(achievement));
    showCustomAlert(`Achievement unlocked: ${achievement.title}. Reward Trophy Badge sudah ditambahkan.`, "success");
}

function closeGameModal() {
    const modal = document.getElementById("gameModalOverlay");
    if(modal) modal.classList.remove("show");
}

function startGame(mode, param) {
    localStorage.setItem("gameMode", mode);
    localStorage.setItem("gameParam", param);
    navigateWithTransition("battle.html");
}

const SUBJECTS = [
    { key:"matematika", label:"Matematika", icon:"fa-calculator", seed:420 },
    { key:"fisika", label:"Fisika", icon:"fa-magnet", seed:228 },
    { key:"bahasainggris", label:"Bahasa Inggris", icon:"fa-language", seed:170 },
    { key:"informatika", label:"Informatika", icon:"fa-laptop-code", seed:760 }
];

let serverProfileCache = null;

const RANK_TIERS = [
    { name:"Bronze", min:1, max:100, class:"rank-bronze", icon:"fa-medal", reward:"Bronze avatar frame", desc:"Tahap awal untuk membangun ritme latihan dan konsistensi dasar." },
    { name:"Silver", min:101, max:300, class:"rank-silver", icon:"fa-medal", reward:"Silver study badge", desc:"Pemahaman mulai stabil dan kamu sudah punya fondasi kompetitif." },
    { name:"Gold", min:301, max:600, class:"rank-gold", icon:"fa-medal", reward:"Gold profile shine", desc:"Performa kuat, akurasi bagus, dan siap masuk match yang lebih ketat." },
    { name:"Epic", min:601, max:1000, class:"rank-epic", icon:"fa-star", reward:"Epic neon banner", desc:"Kamu mulai bermain seperti challenger: cepat, presisi, dan konsisten." },
    { name:"Heroic", min:1001, max:1350, class:"rank-heroic", icon:"fa-shield-halved", reward:"Heroic lobby effect", desc:"Rank elite untuk pemain yang bisa menjaga winrate di tekanan tinggi." },
    { name:"Master", min:1351, max:1650, class:"rank-master", icon:"fa-crown", reward:"Master crown badge", desc:"Pemahaman mapel sangat kuat dan keputusan menjawab makin matang." },
    { name:"Grandmaster", min:1651, max:2000, class:"rank-grandmaster", icon:"fa-chess-king", reward:"Grandmaster animated badge", desc:"Level papan atas dengan penguasaan cepat lintas konsep." },
    { name:"Profesor", min:2001, max:Infinity, class:"rank-profesor", icon:"fa-graduation-cap", reward:"Profesor signature title", desc:"Puncak kompetitif. Kamu berada di zona penguasaan tertinggi." }
];

function getRankFromELO(elo) {
    const value = Math.max(1, parseInt(elo || 1));
    return RANK_TIERS.find(tier => value >= tier.min && value <= tier.max) || RANK_TIERS[RANK_TIERS.length - 1];
}

function getRankProgress(elo) {
    const value = Math.max(1, parseInt(elo || 1));
    const rankData = getRankFromELO(value);
    const nextTier = RANK_TIERS[RANK_TIERS.indexOf(rankData) + 1];
    if(!nextTier) {
        return { percent:100, needed:0, next:"Max Rank", prev:rankData.min, rankData };
    }
    const range = rankData.max - rankData.min + 1;
    const percent = Math.max(4, Math.min(100, ((value - rankData.min + 1) / range) * 100));
    return { percent, needed:nextTier.min - value, next:nextTier.name, prev:rankData.min, rankData };
}

function getSubjectELO(subjectKey) {
    const subject = SUBJECTS.find(item => item.key === subjectKey) || SUBJECTS[0];
    const serverValue = serverProfileCache && Number.isFinite(Number(serverProfileCache[`elo_${subject.key}`]))
        ? Number(serverProfileCache[`elo_${subject.key}`])
        : null;
    if(serverValue !== null) return serverValue;
    return parseInt(localStorage.getItem(`elo_${subject.key}`) || subject.seed);
}

function setSubjectELO(subjectKey, elo) {
    localStorage.setItem(`elo_${subjectKey}`, Math.max(1, parseInt(elo || 1)));
}

function getTotalSubjectELO() {
    return SUBJECTS.reduce((total, subject) => total + getSubjectELO(subject.key), 0);
}

function getCurrentProfileState() {
    const profile = serverProfileCache || {};
    return {
        name: profile.name || localStorage.getItem("name") || "",
        username: profile.username || localStorage.getItem("username") || "",
        bio: profile.bio || localStorage.getItem("bio") || "",
        country: profile.country || localStorage.getItem("country") || "",
        province: profile.province || localStorage.getItem("province") || "-",
        city: profile.city || localStorage.getItem("city") || "-",
        school: profile.school || localStorage.getItem("school") || "-",
        class_level: profile.class_level || localStorage.getItem("class_level") || "-",
        avatar: profile.avatar || localStorage.getItem("avatar") || "https://i.pravatar.cc/100?img=12",
        exp: Number.isFinite(Number(profile.exp)) ? Number(profile.exp) : 0,
        matches: Number.isFinite(Number(profile.matches)) ? Number(profile.matches) : 0,
        wins: Number.isFinite(Number(profile.wins)) ? Number(profile.wins) : 0,
        elo_matematika: Number.isFinite(Number(profile.elo_matematika)) ? Number(profile.elo_matematika) : 0,
        elo_fisika: Number.isFinite(Number(profile.elo_fisika)) ? Number(profile.elo_fisika) : 0,
        elo_bahasainggris: Number.isFinite(Number(profile.elo_bahasainggris)) ? Number(profile.elo_bahasainggris) : 0,
        elo_informatika: Number.isFinite(Number(profile.elo_informatika)) ? Number(profile.elo_informatika) : 0
    };
}

function getPrimarySubjectKey() {
    return localStorage.getItem("activeRankSubject") || "matematika";
}

function setPrimarySubjectKey(subjectKey) {
    localStorage.setItem("activeRankSubject", subjectKey);
}

function updateRankBadges(subjectKey = getPrimarySubjectKey()) {
    const subject = SUBJECTS.find(item => item.key === subjectKey) || SUBJECTS[0];
    setPrimarySubjectKey(subject.key);
    const profile = getCurrentProfileState();
    let elo = Number.isFinite(Number(profile[`elo_${subject.key}`])) ? Number(profile[`elo_${subject.key}`]) : getSubjectELO(subject.key);
    let rankData = getRankFromELO(elo);
    let progressData = getRankProgress(elo);

    // update profile rank display
    localStorage.setItem("rank", rankData.name);

    const heroRankBadge = document.getElementById("heroRankBadge");
    if(heroRankBadge) {
        heroRankBadge.innerHTML = `<i class="fa-solid ${rankData.icon}"></i> ${rankData.name} (${elo} ELO)`;
        heroRankBadge.className = `tier-badge ${rankData.class}`;
        heroRankBadge.setAttribute("role", "button");
        heroRankBadge.setAttribute("tabindex", "0");
        heroRankBadge.onclick = () => showRankInfoModal(subject.key);
        heroRankBadge.onkeydown = (event) => {
            if(event.key === "Enter" || event.key === " ") showRankInfoModal(subject.key);
        };
        heroRankBadge.classList.remove("rank-pulse");
        void heroRankBadge.offsetWidth;
        heroRankBadge.classList.add("rank-pulse");
    }

    const heroRankTitle = document.getElementById("heroRankTitle");
    if(heroRankTitle) heroRankTitle.innerText = `${subject.label} Rank`;

    const heroRankElo = document.getElementById("heroRankElo");
    if(heroRankElo) heroRankElo.innerText = `${elo.toLocaleString()} ELO`;

    const heroRankProgress = document.getElementById("heroRankProgress");
    if(heroRankProgress) {
        heroRankProgress.style.width = `${progressData.percent}%`;
        heroRankProgress.classList.remove("rank-progress-animate");
        void heroRankProgress.offsetWidth;
        heroRankProgress.classList.add("rank-progress-animate");
    }

    const heroRankNext = document.getElementById("heroRankNext");
    if(heroRankNext) {
        heroRankNext.innerText = progressData.next === "Max Rank" ? "Max Rank Reached" : `${progressData.needed} ELO to ${progressData.next}`;
    }

    const subjectTabs = document.getElementById("subjectRankTabs");
    if(subjectTabs) {
        subjectTabs.innerHTML = SUBJECTS.map(item => {
            const itemElo = getSubjectELO(item.key);
            const itemRank = getRankFromELO(itemElo);
            return `
                <button class="subject-rank-tab ${item.key === subject.key ? 'active' : ''}" onclick="updateRankBadges('${item.key}')">
                    <i class="fa-solid ${item.icon}"></i>
                    <span>${item.label}</span>
                    <strong>${itemRank.name}</strong>
                </button>
            `;
        }).join("");
    }
}

async function fetchAndCacheProfile() {
    const token = localStorage.getItem("edurank_token");
    if(!token) return null;
    try {
        const res = await fetch(getApiUrl('/api/profile'), {
            headers: { "Authorization": "Bearer " + token }
        });
        if(!res.ok) return null;
        const data = await res.json();
        serverProfileCache = data;
        return data;
    } catch (error) {
        console.error("Failed to fetch profile from backend:", error);
        return null;
    }
}

function showRankInfoModal(subjectKey = getPrimarySubjectKey()) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const subject = SUBJECTS.find(item => item.key === subjectKey) || SUBJECTS[0];
    const elo = getSubjectELO(subject.key);
    const rankData = getRankFromELO(elo);
    const progressData = getRankProgress(elo);
    const overlay = createCustomAlertOverlay();
    overlay.innerHTML = `
        <div class="custom-alert-box rank-info-modal">
            <div class="rank-info-badge ${rankData.class}">
                <i class="fa-solid ${rankData.icon}"></i>
            </div>
            <h3>${subject.label} - ${rankData.name}</h3>
            <p>${rankData.desc}</p>
            <div class="rank-info-stats">
                <div><span>Total ELO</span><strong>${elo.toLocaleString()}</strong></div>
                <div><span>Next Rank</span><strong>${progressData.next}</strong></div>
            </div>
            <div class="rank-info-progress">
                <div class="rank-info-progress-fill" style="width:${progressData.percent}%"></div>
            </div>
            <div class="rank-info-reward">
                <i class="fa-solid fa-gift"></i>
                <span>${rankData.reward}</span>
            </div>
            <div class="custom-alert-actions">
                <button class="primary-btn" style="width:100%" onclick="closeCustomAlert()">Tutup</button>
            </div>
        </div>
    `;
    void overlay.offsetWidth;
    overlay.classList.add("show");
}

// Call on load
document.addEventListener("DOMContentLoaded", () => {
    updateRankBadges();
});

function initScrollReveal() {
    const targets = document.querySelectorAll("section, .rank-card, .subject-card, .ranked-card, .feedback-info, .feedback-form, .leaderboard-item, .profile-card, .profile-hero, .rank-subject-card");
    targets.forEach(target => target.classList.add("reveal-on-scroll"));
    if(!("IntersectionObserver" in window)) {
        targets.forEach(target => target.classList.add("is-visible"));
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold:0.12 });
    targets.forEach(target => observer.observe(target));
}

function initPageTransitions() {
    document.body.classList.add("page-ready");
    document.querySelectorAll("a[href]").forEach(link => {
        const href = link.getAttribute("href");
        if(!href || href.startsWith("#") || href.startsWith("javascript:") || link.target === "_blank") return;
        link.addEventListener("click", (event) => {
            const url = new URL(href, window.location.href);
            if(url.origin !== window.location.origin || url.pathname === window.location.pathname && url.hash) return;
            event.preventDefault();
            document.body.classList.add("page-leaving");
            setTimeout(() => {
                window.location.href = href;
            }, 180);
        });
    });
}

function navigateWithTransition(url) {
    if(!url) return;
    document.body.classList.add("page-leaving");
    setTimeout(() => {
        window.location.href = url;
    }, 160);
}

function showPendingRankEvent() {
    const rawEvent = localStorage.getItem("rankEvent");
    if(!rawEvent) return;
    localStorage.removeItem("rankEvent");
    try {
        const event = JSON.parse(rawEvent);
        const subject = SUBJECTS.find(item => item.key === event.subject);
        setTimeout(() => {
            showCustomAlert(`Rank ${subject ? subject.label : "mapel"} berubah dari ${event.from} ke ${event.to}.`, "success");
        }, 450);
    } catch(e) {
        localStorage.removeItem("rankEvent");
    }
}

// ===============================
// CUSTOM GLOBAL MODAL (ALERT & CONFIRM)
// ===============================

function createCustomAlertOverlay() {
    let overlay = document.getElementById("customAlertOverlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "customAlertOverlay";
        overlay.className = "custom-alert-overlay";
        document.body.appendChild(overlay);
    }
    return overlay;
}

function showCustomAlert(msg, type="info") {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const overlay = createCustomAlertOverlay();
    let iconClass = "fa-solid fa-circle-info";
    let iconColor = "var(--primary)";

    if(type === "error") {
        iconClass = "fa-solid fa-triangle-exclamation";
        iconColor = "#ef4444";
    } else if(type === "success") {
        iconClass = "fa-regular fa-circle-check";
        iconColor = "var(--success)";
    }

    overlay.innerHTML = `
        <div class="custom-alert-box">
            <div class="custom-alert-icon" style="color: ${iconColor};"><i class="${iconClass}"></i></div>
            <div class="custom-alert-msg">${msg}</div>
            <div class="custom-alert-actions">
                <button class="primary-btn" style="width:100%" onclick="closeCustomAlert()">OK</button>
            </div>
        </div>
    `;

    // Force reflow
    void overlay.offsetWidth;
    overlay.classList.add("show");
}

function showCustomConfirm(msg, onConfirmCallback) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const overlay = createCustomAlertOverlay();

    // Assign global callback so the button can trigger it
    window._customConfirmCallback = () => {
        closeCustomAlert();
        if(onConfirmCallback) onConfirmCallback();
    };

    overlay.innerHTML = `
        <div class="custom-alert-box">
            <div class="custom-alert-icon" style="color: var(--warning);"><i class="fa-solid fa-circle-question"></i></div>
            <div class="custom-alert-msg">${msg}</div>
            <div class="custom-alert-actions">
                <button class="secondary-btn" style="flex:1;" onclick="closeCustomAlert()">Batal</button>
                <button class="primary-btn" style="flex:1; background:#ef4444;" onclick="window._customConfirmCallback()">Yakin</button>
            </div>
        </div>
    `;

    void overlay.offsetWidth;
    overlay.classList.add("show");
}

function closeCustomAlert() {
    const overlay = document.getElementById("customAlertOverlay");
    if(overlay) {
        overlay.classList.remove("show");
    }
}


// =========================
// DARK MODE SYSTEM
// =========================

// LOAD THEME
const savedTheme =
localStorage.getItem("theme");

if(savedTheme){

    document.body.classList.remove(
        "light",
        "dark"
    );

    document.body.classList.add(savedTheme);

}

// DEFAULT THEME
else{

    document.body.classList.add("dark");

}

// TOGGLE THEME
function toggleDarkMode(){

    const darkModeIcon =
    document.getElementById("darkModeIcon");

    // JIKA DARK
    if(document.body.classList.contains("dark")){

        document.body.classList.remove("dark");

        document.body.classList.add("light");

        localStorage.setItem(
            "theme",
            "light"
        );

        // ICON
        if(darkModeIcon){

            darkModeIcon.classList.remove(
                "fa-moon"
            );

            darkModeIcon.classList.add(
                "fa-sun"
            );

        }

    }

    // JIKA LIGHT
    else{

        document.body.classList.remove("light");

        document.body.classList.add("dark");

        localStorage.setItem(
            "theme",
            "dark"
        );

        // ICON
        if(darkModeIcon){

            darkModeIcon.classList.remove(
                "fa-sun"
            );

            darkModeIcon.classList.add(
                "fa-moon"
            );

        }

    }

}

// =========================
// UPDATE ICON SAAT LOAD
// =========================

window.addEventListener("DOMContentLoaded", () => {

    const darkModeIcon =
    document.getElementById("darkModeIcon");

    if(document.body.classList.contains("light")){

        darkModeIcon.classList.remove(
            "fa-moon"
        );

        darkModeIcon.classList.add(
            "fa-sun"
        );

    }

    else{

        darkModeIcon.classList.remove(
            "fa-sun"
        );

        darkModeIcon.classList.add(
            "fa-moon"
        );

    }

});

// =========================
// DROPDOWN MENU
// =========================

function toggleDropdown(id){

    const dropdown =
    document.getElementById(id);

    if(!dropdown) return;
    dropdown.classList.toggle("show");

}

// =========================
// CLOSE DROPDOWN OUTSIDE
// =========================

window.addEventListener("click", (e) => {

    // DROPDOWN
    document
    .querySelectorAll(".dropdown-menu")
    .forEach(menu => {

        // NOTIF
        if(
            !menu.parentElement.contains(e.target)
        ){
            menu.classList.remove("show");
        }

    });

    // MOBILE MENU
    const navMenu =
    document.getElementById("navMenu");

    const hamburgerBtn =
    document.getElementById("hamburgerBtn");

    if(
        navMenu &&
        hamburgerBtn &&
        !navMenu.contains(e.target) &&
        !hamburgerBtn.contains(e.target)
    ){

        navMenu.classList.remove("show");
        const icon = hamburgerBtn.querySelector("i");
        hamburgerBtn.setAttribute("aria-expanded", "false");
        if(icon){
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    }

});

document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");

    if(hamburgerBtn){
        hamburgerBtn.setAttribute("aria-expanded", "false");
        hamburgerBtn.setAttribute("aria-label", "Buka menu navigasi");
    }

    if(navMenu && hamburgerBtn){
        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("show");
                hamburgerBtn.setAttribute("aria-expanded", "false");
                const icon = hamburgerBtn.querySelector("i");
                if(icon){
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }
});

// =========================
// AUTH GATE
// =========================

document.addEventListener("DOMContentLoaded", () => {
    initAuthGate();
    initFriendsSection();
    syncProfileWithServer();
    checkBanStatus();
});

document.addEventListener("click", (event) => {
    const tabButton = event.target.closest("[data-auth-tab]");
    if (tabButton) {
        switchAuthMode(tabButton.dataset.authTab);
        return;
    }

    const switchButton = event.target.closest("[data-auth-switch]");
    if (switchButton) {
        switchAuthMode(switchButton.dataset.authSwitch);
        return;
    }

    const passwordButton = event.target.closest("[data-password-toggle]");
    if (passwordButton) {
        toggleAuthPassword(passwordButton);
        return;
    }
});

function initAuthGate(){
    const authGate = document.getElementById("authGate");
    if(!authGate) return;

    const learningQuiz = document.getElementById("learningQuiz");
    const params = new URLSearchParams(window.location.search);
    const shouldOpenMain = params.get("view") === "main";

    if(shouldOpenMain){
        unlockEduRank(false);
        setTimeout(scrollToRequestedSection, 80);
        return;
    }

    document.body.classList.add("auth-locked");
    document.body.classList.remove("quiz-locked");
    authGate.classList.remove("hidden");
    if(learningQuiz) learningQuiz.classList.add("hidden");

    document.querySelectorAll("[data-auth-tab]").forEach(button => {
        button.addEventListener("click", () => switchAuthMode(button.dataset.authTab));
    });

    document.querySelectorAll("[data-auth-switch]").forEach(button => {
        button.addEventListener("click", () => switchAuthMode(button.dataset.authSwitch));
    });

    document.querySelectorAll("[data-password-toggle]").forEach(button => {
        button.addEventListener("click", () => toggleAuthPassword(button));
    });

    document.querySelectorAll("[data-google-auth]").forEach(button => {
        button.addEventListener("click", handleGoogleAuth);
    });

    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    if(registerForm){
        registerForm.addEventListener("submit", handleRegisterSubmit);
    }

    if(loginForm){
        loginForm.addEventListener("submit", handleLoginSubmit);
    }

    initCameraUploads();
    initLearningStyleQuiz();

    syncAuthThemeIcon();
}

function initCameraUploads(){
    setupCameraInput("studentPhotoInput", "studentPhotoPreview", "studentPhotoData");
    setupCameraInput("studentCardPhotoInput", "studentCardPhotoPreview", "studentCardPhotoData");
}

function setupCameraInput(inputId, previewId, storageKey){
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    if(!input || !preview || input.dataset.ready === "true") return;

    input.dataset.ready = "true";
    input.addEventListener("change", () => {
        const file = input.files && input.files[0];
        if(!file) return;

        if(!file.type.startsWith("image/")){
            showCustomAlert("File harus berupa gambar.", "error");
            input.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            try {
                localStorage.setItem(storageKey, result);
            } catch(error) {
                try {
                    localStorage.setItem(`${storageKey}Ready`, "true");
                } catch(innerError) {
                    // Preview still confirms the capture even if browser storage is full.
                }
            }
            preview.innerHTML = `
                <img src="${result}" alt="Preview foto terunggah" />
                <strong>Foto siap diverifikasi</strong>
                <small>Ketuk untuk ambil ulang jika fotonya belum jelas.</small>
            `;
            input.closest(".auth-field")?.classList.remove("is-invalid");
        };
        reader.readAsDataURL(file);
    });
}

function switchAuthMode(mode){
    const isLogin = mode === "login";
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const registerTab = document.getElementById("registerTab");
    const loginTab = document.getElementById("loginTab");
    const authTitle = document.getElementById("authTitle");

    if(registerForm) registerForm.classList.toggle("hidden", isLogin);
    if(loginForm) loginForm.classList.toggle("hidden", !isLogin);
    if(registerTab) registerTab.classList.toggle("active", !isLogin);
    if(loginTab) loginTab.classList.toggle("active", isLogin);
    if(authTitle) authTitle.innerText = isLogin ? "Login Akun" : "Daftar Akun";

    clearAuthWarnings();
}

function handleRegisterSubmit(event){
    event.preventDefault();
    clearAuthWarnings();

    const name = getAuthValue("authFullName");
    const birthDate = getAuthValue("authBirthDate");
    const email = getAuthValue("authRegisterEmail");
    const password = getAuthValue("authRegisterPassword");
    const confirm = getAuthValue("authRegisterConfirm");
    const studentPhoto = document.getElementById("studentPhotoInput")?.files?.[0];
    const studentCardPhoto = document.getElementById("studentCardPhotoInput")?.files?.[0];
    const studentPhotoBase64 = localStorage.getItem("studentPhotoData");
    const studentCardPhotoBase64 = localStorage.getItem("studentCardPhotoData");
    let valid = true;

    if(!isValidFullName(name)){
        setAuthWarning("authFullName", "authFullNameWarning", "Nama lengkap minimal dua kata dan hanya berisi huruf, spasi, apostrof, atau tanda hubung.");
        valid = false;
    }

    if(!isValidBirthDate(birthDate)){
        setAuthWarning("authBirthDate", "authBirthDateWarning", "Tanggal lahir tidak valid. Usia minimal 6 tahun.");
        valid = false;
    }

    if(!isValidEmail(email)){
        setAuthWarning("authRegisterEmail", "authRegisterEmailWarning", "Email tidak valid. Gunakan format seperti nama@email.com.");
        valid = false;
    }

    if(!studentPhoto && !studentPhotoBase64){
        setAuthWarning("studentPhotoInput", "studentPhotoWarning", "Foto pelajar wajib diambil atau diunggah lewat kamera.");
        valid = false;
    }

    if(!studentCardPhoto && !studentCardPhotoBase64){
        setAuthWarning("studentCardPhotoInput", "studentCardPhotoWarning", "Foto wajah bersama kartu pelajar wajib diambil untuk verifikasi.");
        valid = false;
    }

    if(!isStrongPassword(password)){
        setAuthWarning("authRegisterPassword", "authRegisterPasswordWarning", "Password minimal 8 karakter, memakai huruf dan angka.");
        valid = false;
    }

    if(confirm !== password){
        setAuthWarning("authRegisterConfirm", "authRegisterConfirmWarning", "Konfirmasi password harus sama dengan password.");
        valid = false;
    }

    if(!valid){
        showCustomAlert("Periksa kembali data daftar yang belum valid.", "error");
        return;
    }

    fetch(getApiUrl('/api/register'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            email,
            password,
            birthDate,
            studentPhoto: studentPhotoBase64,
            studentCardPhoto: studentCardPhotoBase64
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            showCustomAlert(data.error, "error");
            return;
        }

        localStorage.setItem("edurank_token", data.token);
        saveAuthUser({
            name,
            email,
            birthDate,
            hasStudentPhoto: true,
            hasStudentCardPhoto: true,
            provider: "email"
        });
        localStorage.removeItem("studentPhotoData");
        localStorage.removeItem("studentCardPhotoData");
        startLearningStyleQuiz();
    })
    .catch(() => {
        showCustomAlert("Gagal terhubung ke server.", "error");
    });
}

function handleLoginSubmit(event){
    event.preventDefault();
    clearAuthWarnings();

    const email = getAuthValue("authLoginEmail");
    const password = getAuthValue("authLoginPassword");
    let valid = true;

    if(!isValidEmail(email)){
        setAuthWarning("authLoginEmail", "authLoginEmailWarning", "Email tidak valid atau masih kosong.");
        valid = false;
    }

    if(password.length < 8){
        setAuthWarning("authLoginPassword", "authLoginPasswordWarning", "Password minimal 8 karakter.");
        valid = false;
    }

    if(!valid){
        showCustomAlert("Periksa kembali data login yang belum valid.", "error");
        return;
    }

    fetch(getApiUrl('/api/login'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            showCustomAlert(data.error, "error");
            return;
        }

        localStorage.setItem("edurank_token", data.token);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("edurankLoggedIn", "true");
        startLearningStyleQuiz();
    })
    .catch(() => {
        showCustomAlert("Gagal terhubung ke server.", "error");
    });
}

function handleGoogleAuth(){
    showCustomAlert("Login Google belum tersedia. Gunakan email dan password untuk masuk.", "info");
}

function saveAuthUser(user){
    localStorage.setItem("name", user.name);
    localStorage.setItem("username", "-");
    localStorage.setItem("email", user.email);
    localStorage.setItem("birthDate", user.birthDate || "");
    localStorage.setItem("authProvider", user.provider);
    localStorage.setItem("studentPhotoVerified", user.hasStudentPhoto ? "pending-review" : "provider-skip");
    localStorage.setItem("studentCardVerified", user.hasStudentCardPhoto ? "pending-review" : "provider-skip");
    localStorage.setItem("edurankLoggedIn", "true");
    localStorage.setItem("province", "-");
    localStorage.setItem("city", "-");
    localStorage.setItem("school", "-");
    localStorage.setItem("class_level", "-");

    if(!localStorage.getItem("bio")) localStorage.setItem("bio", "");
    if(!localStorage.getItem("country")) localStorage.setItem("country", "");
    if(!localStorage.getItem("rank")) localStorage.setItem("rank", "");
}

function unlockEduRank(showMessage){
    const authGate = document.getElementById("authGate");
    const learningQuiz = document.getElementById("learningQuiz");
    document.body.classList.remove("auth-locked");
    document.body.classList.remove("quiz-locked");
    if(authGate) authGate.classList.add("hidden");
    if(learningQuiz) learningQuiz.classList.add("hidden");
    loadProfile();
    updateRankBadges();
    window.scrollTo({ top:0, behavior:"smooth" });

    if(showMessage){
        setTimeout(() => {
            showCustomAlert("Berhasil masuk. Selamat belajar di EduRank!", "success");
        }, 180);
    }
}

function initLearningStyleQuiz(){
    const form = document.getElementById("vakForm");
    const resetBtn = document.getElementById("vakResetBtn");
    const continueBtn = document.getElementById("vakContinueBtn");
    if(!form || form.dataset.ready === "true") return;

    form.dataset.ready = "true";
    form.addEventListener("submit", handleLearningStyleSubmit);

    if(resetBtn){
        resetBtn.addEventListener("click", () => {
            form.reset();
            const result = document.getElementById("vakResult");
            if(result){
                result.classList.add("hidden");
                result.innerHTML = "";
            }
            if(continueBtn) continueBtn.classList.add("hidden");
            document.querySelectorAll(".vak-question").forEach(question => {
                question.classList.remove("is-missing");
            });
        });
    }

    if(continueBtn){
        continueBtn.addEventListener("click", () => unlockEduRank(true));
    }
}

function initFriendsSection(){
    const form = document.getElementById("friendsForm");
    const input = document.getElementById("friendUsernameInput");
    if(!form || form.dataset.ready === "true") return;

    form.dataset.ready = "true";
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        await addFriendByUsername(input ? input.value : "");
        if(input) input.value = "";
    });
}

function startLearningStyleQuiz(){
    const authGate = document.getElementById("authGate");
    const learningQuiz = document.getElementById("learningQuiz");

    if(authGate) authGate.classList.add("hidden");
    if(learningQuiz) learningQuiz.classList.remove("hidden");

    document.body.classList.remove("auth-locked");
    document.body.classList.add("quiz-locked");
    syncAuthThemeIcon();

    window.scrollTo({ top:0, behavior:"smooth" });
    setTimeout(() => {
        showCustomAlert("Login berhasil. Jawab tes gaya belajar dulu sebelum masuk web.", "success");
    }, 160);
}

function handleLearningStyleSubmit(event){
    event.preventDefault();

    const form = event.currentTarget;
    const continueBtn = document.getElementById("vakContinueBtn");
    const answers = ["q1", "q2", "q3", "q4", "q5"].map(name => {
        return form.querySelector(`input[name="${name}"]:checked`);
    });

    document.querySelectorAll(".vak-question").forEach(question => {
        const questionName = question.dataset.question;
        const hasAnswer = form.querySelector(`input[name="${questionName}"]:checked`);
        question.classList.toggle("is-missing", !hasAnswer);
    });

    if(answers.some(answer => !answer)){
        showCustomAlert("Jawab semua pertanyaan tes gaya belajar terlebih dahulu.", "error");
        return;
    }

    const scores = {
        visual:0,
        kinesthetic:0,
        readwrite:0
    };

    answers.forEach(answer => {
        scores[answer.value] += 1;
    });

    const winner = getLearningStyleWinner(scores);
    const result = document.getElementById("vakResult");

    localStorage.setItem("learningStyle", winner.key);
    localStorage.setItem("learningStyleLabel", winner.label);
    localStorage.setItem("learningStyleScores", JSON.stringify(scores));

    if(result){
        result.innerHTML = `
            <h3><i class="${winner.icon}"></i> Gaya belajar kamu: ${winner.label}</h3>
            <p>${winner.description}</p>
            <div class="vak-score-row">
                <span>Visual: ${scores.visual}</span>
                <span>Kinestetik: ${scores.kinesthetic}</span>
                <span>Read/Write: ${scores.readwrite}</span>
            </div>
        `;
        result.classList.remove("hidden");
    }

    if(continueBtn) continueBtn.classList.remove("hidden");
    if(result) result.scrollIntoView({ behavior:"smooth", block:"center" });
}

function getLearningStyleWinner(scores){
    const styles = {
        visual:{
            key:"visual",
            label:"Visual",
            icon:"fa-regular fa-image",
            description:"Kamu cenderung cepat menangkap informasi lewat gambar, warna, diagram, peta konsep, dan struktur visual."
        },
        kinesthetic:{
            key:"kinesthetic",
            label:"Kinestetik",
            icon:"fa-solid fa-hand-pointer",
            description:"Kamu cenderung belajar paling kuat saat langsung mencoba, bergerak, membuat sesuatu, atau mempraktikkan konsep."
        },
        readwrite:{
            key:"readwrite",
            label:"Read/Write",
            icon:"fa-solid fa-pen-nib",
            description:"Kamu cenderung nyaman belajar lewat catatan terstruktur, daftar langkah, definisi, tabel, dan rangkuman tertulis."
        }
    };

    const order = ["visual", "kinesthetic", "readwrite"];
    const key = order.reduce((top, current) => {
        return scores[current] > scores[top] ? current : top;
    }, "visual");

    return styles[key];
}

function toggleAuthPassword(button){
    const input = document.getElementById(button.dataset.passwordToggle);
    const icon = button.querySelector("i");
    if(!input || !icon) return;

    const showPassword = input.type === "password";
    input.type = showPassword ? "text" : "password";
    icon.classList.toggle("fa-eye", showPassword);
    icon.classList.toggle("fa-eye-slash", !showPassword);
    button.setAttribute("aria-label", showPassword ? "Sembunyikan password" : "Tampilkan password");
}

function setAuthWarning(inputId, warningId, message){
    const input = document.getElementById(inputId);
    const warning = document.getElementById(warningId);
    const field = input ? input.closest(".auth-field") : null;

    if(field) field.classList.add("is-invalid");
    if(warning) warning.innerText = message;
}

function clearAuthWarnings(){
    document.querySelectorAll(".auth-field").forEach(field => field.classList.remove("is-invalid"));
    document.querySelectorAll(".auth-warning").forEach(warning => warning.innerText = "");
}

function getAuthValue(id){
    return document.getElementById(id)?.value.trim() || "";
}

function isValidFullName(value){
    if(value.length < 5) return false;
    if(!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(value)) return false;
    return value.split(/\s+/).filter(Boolean).length >= 2;
}

function isValidBirthDate(value){
    if(!value) return false;
    const date = new Date(value + "T00:00:00");
    if(Number.isNaN(date.getTime())) return false;
    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 6, today.getMonth(), today.getDate());
    const maxAgeDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
    return date <= minAgeDate && date >= maxAgeDate;
}

function isValidEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function isStrongPassword(value){
    return value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value);
}

function syncAuthThemeIcon(){
    const authIcon = document.getElementById("authThemeIcon");
    const quizIcon = document.getElementById("quizThemeIcon");

    const isLight = document.body.classList.contains("light");
    [authIcon, quizIcon].forEach(icon => {
        if(!icon) return;
        icon.classList.toggle("fa-sun", isLight);
        icon.classList.toggle("fa-moon", !isLight);
    });
}

const originalToggleDarkMode = toggleDarkMode;
toggleDarkMode = function(){
    originalToggleDarkMode();
    syncAuthThemeIcon();
};

function scrollToRequestedSection(){
    const targetId = window.location.hash ? window.location.hash.slice(1) : "";
    if(!targetId) return;

    const target = document.getElementById(targetId);
    if(target){
        target.scrollIntoView({ behavior:"smooth", block:"start" });
    }
}

// =========================
// SYNC PROFILE & BAN CHECK
// =========================

async function syncProfileWithServer() {
    const token = localStorage.getItem("edurank_token");
    if (!token) return;
    try {
        const res = await fetch(getApiUrl('/api/profile'), {
            headers: { "Authorization": "Bearer " + token }
        });
        if (res.ok) {
            const data = await res.json();
            serverProfileCache = data;
            localStorage.setItem("name", data.name || "Guest User");
            localStorage.setItem("username", data.username || "-");
            localStorage.setItem("bio", data.bio || "");
            localStorage.setItem("country", data.country || "");
            localStorage.setItem("province", data.province || "-");
            localStorage.setItem("city", data.city || "-");
            localStorage.setItem("school", data.school || "-");
            localStorage.setItem("class_level", data.class_level || "-");
            if (data.avatar) localStorage.setItem("avatar", data.avatar);
            loadProfile();
            if (document.getElementById("friendsList")) {
                refreshFriendsList();
            }
        }
    } catch(e) {
        console.error("Failed to sync profile:", e);
    }
}

async function refreshFriendsList() {
    const list = document.getElementById("friendsList");
    const summary = document.getElementById("friendsSummary");
    if (!list || !summary) return;

    const token = localStorage.getItem("edurank_token");
    if (!token) {
        list.innerHTML = "";
        summary.innerText = "Login dulu untuk mengelola teman.";
        return;
    }

    try {
        const res = await fetch(getApiUrl('/api/friends'), {
            headers: { "Authorization": "Bearer " + token }
        });
        const friends = res.ok ? await res.json() : [];
        if (!Array.isArray(friends) || friends.length === 0) {
            list.innerHTML = "";
            summary.innerText = "Belum ada teman yang ditambahkan.";
            return;
        }

        summary.innerText = `${friends.length} teman tersimpan di Railway.`;
        list.innerHTML = friends.map(friend => {
            const elo = Number(friend.total_elo) || 0;
            const match = Number(friend.matches) || 0;
            const winrate = match ? Math.round(((Number(friend.wins) || 0) / match) * 100) : 0;
            const avatar = friend.avatar || "https://i.pravatar.cc/100?img=12";
            return `
                <article class="friend-card">
                    <div class="friend-card-top">
                        <div style="display:flex; gap:12px; align-items:center;">
                            <img src="${avatar}" alt="${friend.name || friend.username || 'Friend'}" style="width:52px; height:52px; border-radius:16px; object-fit:cover;" />
                            <div>
                                <strong>${friend.name || friend.username || 'Teman'}</strong>
                                <span style="color:var(--text-light); font-size:0.85rem;">@${friend.username || '-'}</span>
                            </div>
                        </div>
                        <button class="secondary-btn" type="button" onclick="removeFriend(${Number(friend.friend_user_id || friend.friend_id)})">Hapus</button>
                    </div>
                    <div class="friend-card-meta">
                        <span>ELO ${elo.toLocaleString()}</span>
                        <span>Match ${match.toLocaleString()}</span>
                        <span>Winrate ${winrate}%</span>
                    </div>
                    <div class="friend-card-meta">
                        <span>${friend.city || '-'}</span>
                        <span>${friend.school || '-'}</span>
                        <span>${friend.class_level || '-'}</span>
                    </div>
                </article>
            `;
        }).join("");
    } catch (error) {
        console.error("Failed to load friends:", error);
        summary.innerText = "Gagal memuat teman dari server.";
    }
}

async function addFriendByUsername(username) {
    const token = localStorage.getItem("edurank_token");
    if (!token) {
        showCustomAlert("Login dulu untuk menambah teman.", "error");
        return;
    }

    const trimmed = String(username || '').trim().replace(/^@/, '');
    if (!trimmed) {
        showCustomAlert("Masukkan username teman.", "error");
        return;
    }

    const res = await fetch(getApiUrl('/api/friends'), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ username: trimmed })
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        showCustomAlert(data.error || "Gagal menambahkan teman.", "error");
        return;
    }

    showCustomAlert(data.message || "Teman berhasil ditambahkan.", "success");
    refreshFriendsList();
}

async function removeFriend(friendId) {
    const token = localStorage.getItem("edurank_token");
    if (!token) return;

    const res = await fetch(getApiUrl(`/api/friends/${friendId}`), {
        method: "DELETE",
        headers: { "Authorization": "Bearer " + token }
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        showCustomAlert(data.error || "Gagal menghapus teman.", "error");
        return;
    }

    showCustomAlert(data.message || "Teman dihapus.", "success");
    refreshFriendsList();
}

async function checkBanStatus() {
    const token = localStorage.getItem("edurank_token");
    if (!token) return;
    try {
        const res = await fetch(getApiUrl('/api/profile'), {
            headers: { "Authorization": "Bearer " + token }
        });
        if (res.status === 403) {
            const data = await res.json();
            if (data.error && data.error.includes("diban")) {
                showBanScreen();
            }
        }
    } catch(e) {
        console.error("Failed to check ban status:", e);
    }
}

function showBanScreen() {
    let overlay = document.getElementById("banOverlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "banOverlay";
        overlay.style = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(15, 23, 42, 0.98);
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 999999;
            font-family: 'Poppins', sans-serif;
            text-align: center;
            padding: 20px;
        `;
        overlay.innerHTML = `
            <div style="background: rgba(220, 38, 38, 0.1); border: 2px dashed #dc2626; border-radius: 24px; padding: 40px; max-width: 500px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <i class="fa-solid fa-ban" style="font-size: 5rem; color: #dc2626; margin-bottom: 20px; animation: pulse 2s infinite;"></i>
                <h1 style="font-size: 2rem; font-weight: 700; color: #ef4444; margin-bottom: 15px;">AKUN ANDA TELAH DIBAN</h1>
                <p style="font-size: 1rem; color: #94a3b8; line-height: 1.6; margin-bottom: 25px;">
                    Akses Anda ke platform EduRank telah ditangguhkan karena melanggar ketentuan layanan kami. Jika Anda merasa ini adalah kesalahan, silakan hubungi tim dukungan kami.
                </p>
                <button onclick="localStorage.clear(); location.reload();" style="background: #dc2626; color: white; border: none; padding: 12px 30px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 14px rgba(220, 38, 38, 0.4);">
                    Keluar / Kembali ke Beranda
                </button>
            </div>
            <style>
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
            </style>
        `;
        document.body.appendChild(overlay);
    }
    document.body.classList.add("auth-locked");
}
