const profiles = [
  {
    name: "Priya",
    age: 27,
    city: "Siliguri, West Bengal",
    community: "Dom",
    surname: "Rauth",
    kul: "Piari Baiswar",
    match: 94,
    photo: "p1"
  },
  {
    name: "Neha",
    age: 26,
    city: "Alipurduar, West Bengal",
    community: "Dom",
    surname: "Basfor",
    kul: "Not specified",
    match: 91,
    photo: "p2"
  },
  {
    name: "Anjali",
    age: 29,
    city: "Kolkata, West Bengal",
    community: "Dom",
    surname: "Bansfor",
    kul: "Piari Baiswar",
    match: 89,
    photo: "p3"
  },
  {
    name: "Kavita",
    age: 28,
    city: "Patna, Bihar",
    community: "Dom",
    surname: "Rauth",
    kul: "Other",
    match: 87,
    photo: "p4"
  }
];

const grid = document.getElementById("profiles");

if (grid) {
  grid.innerHTML = profiles.map(p => `
    <article class="profile">
      <div class="profile-img ${p.photo}">
        <span class="profile-tag">✓ Verified</span>
      </div>

      <div class="profile-body">
        <b>${p.name}, ${p.age}</b>
        <small>${p.city}</small>
        <small>${p.community} · ${p.surname} · ${p.kul}</small>
        <small class="match">${p.match}% Match</small>
      </div>
    </article>
  `).join("");
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth"
  });
}

function openModal(type) {
  const modal = document.getElementById("modal");
  const c = document.getElementById("modalContent");

  if (!modal || !c) return;

  if (type === "login") {

    c.innerHTML = `
      <span class="eyebrow">WELCOME BACK</span>

      <h2>Login to SamajSaathi</h2>

      <p>
        Access your matches, interests and conversations.
      </p>

      <div class="form-grid">

        <div class="field full">
          <label>Email or Mobile</label>
          <input
            id="loginEmail"
            type="text"
            placeholder="Enter email or mobile"
          >
        </div>

        <div class="field full">
          <label>Password</label>
          <input
            id="loginPassword"
            type="password"
            placeholder="Password"
          >
        </div>

      </div>

      <div id="loginMessage"></div>

      <div class="modal-actions">

        <button
          class="btn primary"
          type="button"
          onclick="demoLogin()"
        >
          Login
        </button>

      </div>
    `;

  } else {

    c.innerHTML = `
      <span class="eyebrow">CREATE YOUR PROFILE</span>

      <h2>Begin your journey.</h2>

      <p>
        Tell us a little about yourself.
        You can complete the rest of your profile later.
      </p>

      <div class="form-grid">

        <div class="field">
          <label>First Name</label>
          <input
            id="firstName"
            placeholder="First name"
          >
        </div>

        <div class="field">
          <label>Last Name</label>
          <input
            id="lastName"
            placeholder="Last name"
          >
        </div>

        <div class="field">
          <label>Date of Birth</label>
          <input
            id="dob"
            type="date"
          >
        </div>

        <div class="field">
          <label>Gender</label>

          <select id="gender">
            <option value="">Select</option>
            <option>Woman</option>
            <option>Man</option>
          </select>

        </div>

        <div class="field full">
          <label>Community / Jati</label>

          <select id="community">
            <option>Dom</option>
            <option>Other SC Community</option>
          </select>

        </div>

        <div class="field">
          <label>Surname</label>

          <select id="surname">
            <option>Rauth</option>
            <option>Basfor</option>
            <option>Bansfor</option>
            <option>Other</option>
          </select>

        </div>

        <div class="field">
          <label>Kul / Clan</label>

          <select id="kul">
            <option>Piari Baiswar</option>
            <option>Other</option>
            <option>Not Known</option>
          </select>

        </div>

        <div class="field full">
          <label>Current City</label>

          <input
            id="city"
            placeholder="e.g. Siliguri"
          >

        </div>

      </div>

      <div id="registerMessage"></div>

      <div class="modal-actions">

        <button
          class="btn primary"
          type="button"
          onclick="demoRegister()"
        >
          Continue →
        </button>

      </div>
    `;
  }

  modal.classList.add("show");
}

function closeModal() {
  const modal = document.getElementById("modal");

  if (modal) {
    modal.classList.remove("show");
  }
}


/* ==============================
   REGISTER
   ============================== */

function demoRegister() {

  const firstName = document.getElementById("firstName")?.value.trim();
  const lastName = document.getElementById("lastName")?.value.trim();
  const dob = document.getElementById("dob")?.value;
  const gender = document.getElementById("gender")?.value;
  const community = document.getElementById("community")?.value;
  const surname = document.getElementById("surname")?.value;
  const kul = document.getElementById("kul")?.value;
  const city = document.getElementById("city")?.value.trim();

  const message = document.getElementById("registerMessage");

  if (!firstName || !lastName || !dob || !gender || !city) {

    if (message) {
      message.innerHTML = `
        <div style="
          margin-top:15px;
          padding:12px;
          border-radius:10px;
          background:#fff3f3;
          color:#b42318;
        ">
          Please fill in all required fields.
        </div>
      `;
    }

    return;
  }

  /*
   * Temporary local registration.
   * No browser alert is used.
   */

  const profile = {
    firstName,
    lastName,
    dob,
    gender,
    community,
    surname,
    kul,
    city
  };

  localStorage.setItem(
    "samajSaathiProfile",
    JSON.stringify(profile)
  );

  if (message) {

    message.innerHTML = `
      <div style="
        margin-top:15px;
        padding:14px;
        border-radius:10px;
        background:#ecfdf3;
        color:#027a48;
      ">
        <strong>Profile started successfully.</strong><br>
        Your information has been saved on this device.
      </div>
    `;

  }

  setTimeout(() => {
    closeModal();
  }, 1800);
}


/* ==============================
   LOGIN
   ============================== */

function demoLogin() {

  const email = document.getElementById("loginEmail")?.value.trim();
  const password = document.getElementById("loginPassword")?.value;

  const message = document.getElementById("loginMessage");

  if (!email || !password) {

    if (message) {
      message.innerHTML = `
        <div style="
          margin-top:15px;
          padding:12px;
          border-radius:10px;
          background:#fff3f3;
          color:#b42318;
        ">
          Please enter your email/mobile and password.
        </div>
      `;
    }

    return;
  }

  /*
   * Temporary login.
   * No browser alert is used.
   */

  const savedProfile =
    localStorage.getItem("samajSaathiProfile");

  if (!savedProfile) {

    if (message) {
      message.innerHTML = `
        <div style="
          margin-top:15px;
          padding:12px;
          border-radius:10px;
          background:#fff3f3;
          color:#b42318;
        ">
          No profile found on this device.
          Please register first.
        </div>
      `;
    }

    return;
  }

  if (message) {

    message.innerHTML = `
      <div style="
        margin-top:15px;
        padding:14px;
        border-radius:10px;
        background:#ecfdf3;
        color:#027a48;
      ">
        <strong>Login successful.</strong><br>
        Welcome back to SamajSaathi.
      </div>
    `;

  }

  setTimeout(() => {
    closeModal();
  }, 1800);
}


/* ==============================
   CLOSE MODAL
   ============================== */

const modal = document.getElementById("modal");

if (modal) {

  modal.addEventListener("click", e => {

    if (e.target.id === "modal") {
      closeModal();
    }

  });

}
