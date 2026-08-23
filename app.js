// ============================================
// SAMAJ SAATHI MATRIMONY - FRONTEND APP
// ============================================

// --------------------------------------------
// DEMO PROFILES
// --------------------------------------------

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


// --------------------------------------------
// LOAD DEMO PROFILES
// --------------------------------------------

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


// --------------------------------------------
// SCROLL
// --------------------------------------------

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth"
  });
}


// --------------------------------------------
// GENERATE USER ID
// --------------------------------------------

function generateUserId() {

  let lastNumber =
    parseInt(localStorage.getItem("samajSaathiLastUserId")) || 100000;

  lastNumber++;

  localStorage.setItem(
    "samajSaathiLastUserId",
    lastNumber
  );

  return "SS" + lastNumber;
}


// --------------------------------------------
// GENERATE USERNAME
// --------------------------------------------

function generateUsername(firstName, lastName) {

  const first =
    firstName.toLowerCase().replace(/[^a-z]/g, "");

  const last =
    lastName.toLowerCase().replace(/[^a-z]/g, "");

  const random =
    Math.floor(100 + Math.random() * 900);

  return `${first}.${last}${random}`;
}


// --------------------------------------------
// GENERATE PASSWORD
// --------------------------------------------

function generatePassword() {

  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

  let password = "";

  for (let i = 0; i < 8; i++) {
    password += chars.charAt(
      Math.floor(Math.random() * chars.length)
    );
  }

  return password;
}


// --------------------------------------------
// OPEN MODAL
// --------------------------------------------

function openModal(type) {

  const modal =
    document.getElementById("modal");

  const c =
    document.getElementById("modalContent");

  if (!modal || !c) return;


  // ------------------------------------------
  // LOGIN
  // ------------------------------------------

  if (type === "login") {

    c.innerHTML = `

      <span class="eyebrow">WELCOME BACK</span>

      <h2>Login to SamajSaathi</h2>

      <p>
        Access your profile, matches and interests.
      </p>

      <div class="form-grid">

        <div class="field full">
          <label>User ID or Username</label>

          <input
            id="loginUsername"
            type="text"
            placeholder="Enter User ID or username"
            autocomplete="username"
          >
        </div>


        <div class="field full">
          <label>Password</label>

          <input
            id="loginPassword"
            type="password"
            placeholder="Enter password"
            autocomplete="current-password"
          >
        </div>

      </div>

      <div id="loginMessage"></div>

      <div class="modal-actions">

        <button
          class="btn primary"
          type="button"
          onclick="loginUser()"
        >
          Login
        </button>

      </div>

      <p style="
        margin-top:18px;
        font-size:13px;
        text-align:center;
      ">
        Don't have an account?
        <a href="#" onclick="openModal('register');return false;">
          Create Profile
        </a>
      </p>

    `;

  }


  // ------------------------------------------
  // REGISTER
  // ------------------------------------------

  else {

    c.innerHTML = `

      <span class="eyebrow">CREATE YOUR PROFILE</span>

      <h2>Begin your journey.</h2>

      <p>
        Tell us a little about yourself.
        You can complete the rest of your profile later.
      </p>


      <div class="form-grid">


        <div class="field">
          <label>First Name *</label>

          <input
            id="firstName"
            placeholder="First name"
          >
        </div>


        <div class="field">
          <label>Last Name *</label>

          <input
            id="lastName"
            placeholder="Last name"
          >
        </div>


        <div class="field">
          <label>Date of Birth *</label>

          <input
            id="dob"
            type="date"
          >
        </div>


        <div class="field">
          <label>Gender *</label>

          <select id="gender">

            <option value="">
              Select
            </option>

            <option value="Woman">
              Woman
            </option>

            <option value="Man">
              Man
            </option>

          </select>

        </div>


        <div class="field full">

          <label>
            Community / Jati
          </label>

          <select id="community">

            <option>
              Dom
            </option>

            <option>
              Other SC Community
            </option>

          </select>

        </div>


        <div class="field">

          <label>Surname</label>

          <select id="surname">

            <option>
              Rauth
            </option>

            <option>
              Basfor
            </option>

            <option>
              Bansfor
            </option>

            <option>
              Other
            </option>

          </select>

        </div>


        <div class="field">

          <label>Kul / Clan</label>

          <select id="kul">

            <option>
              Piari Baiswar
            </option>

            <option>
              Other
            </option>

            <option>
              Not Known
            </option>

          </select>

        </div>


        <div class="field full">

          <label>
            Current City *
          </label>

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
          onclick="registerUser()"
        >
          Create Account →
        </button>

      </div>

    `;
  }


  modal.classList.add("show");
}


// --------------------------------------------
// CLOSE MODAL
// --------------------------------------------

function closeModal() {

  const modal =
    document.getElementById("modal");

  if (modal) {

    modal.classList.remove("show");

  }
}


// --------------------------------------------
// REGISTER USER
// --------------------------------------------

function registerUser() {

  const firstName =
    document.getElementById("firstName")?.value.trim();

  const lastName =
    document.getElementById("lastName")?.value.trim();

  const dob =
    document.getElementById("dob")?.value;

  const gender =
    document.getElementById("gender")?.value;

  const community =
    document.getElementById("community")?.value;

  const surname =
    document.getElementById("surname")?.value;

  const kul =
    document.getElementById("kul")?.value;

  const city =
    document.getElementById("city")?.value.trim();

  const message =
    document.getElementById("registerMessage");


  // ------------------------------------------
  // VALIDATION
  // ------------------------------------------

  if (
    !firstName ||
    !lastName ||
    !dob ||
    !gender ||
    !city
  ) {

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


  // ------------------------------------------
  // CHECK EXISTING LOGIN
  // ------------------------------------------

  const existingUser =
    localStorage.getItem("samajSaathiUser");

  if (existingUser) {

    if (message) {

      message.innerHTML = `

        <div style="
          margin-top:15px;
          padding:12px;
          border-radius:10px;
          background:#fff3f3;
          color:#b42318;
        ">

          An account already exists on this browser.
          Please use Login instead.

        </div>

      `;

    }

    return;
  }


  // ------------------------------------------
  // CREATE ACCOUNT
  // ------------------------------------------

  const userId =
    generateUserId();

  const username =
    generateUsername(
      firstName,
      lastName
    );

  const password =
    generatePassword();


  const user = {

    userId,

    username,

    password,

    firstName,

    lastName,

    dob,

    gender,

    community,

    surname,

    kul,

    city,

    createdAt:
      new Date().toISOString()

  };


  // ------------------------------------------
  // SAVE USER
  // ------------------------------------------

  localStorage.setItem(
    "samajSaathiUser",
    JSON.stringify(user)
  );


  localStorage.setItem(
    "samajSaathiProfile",
    JSON.stringify(user)
  );


  // ------------------------------------------
  // SUCCESS SCREEN
  // ------------------------------------------

  showRegistrationSuccess(user);
}


// --------------------------------------------
// REGISTRATION SUCCESS
// --------------------------------------------

function showRegistrationSuccess(user) {

  const c =
    document.getElementById("modalContent");

  if (!c) return;


  c.innerHTML = `

    <div style="
      text-align:center;
    ">

      <div style="
        font-size:48px;
        margin-bottom:10px;
      ">
        ✓
      </div>


      <span class="eyebrow">
        ACCOUNT CREATED
      </span>


      <h2>
        Welcome to SamajSaathi,
        ${user.firstName}!
      </h2>


      <p>
        Your matrimonial profile has been started successfully.
      </p>


      <div style="
        margin:20px 0;
        padding:18px;
        border-radius:14px;
        background:#f8f1f3;
        text-align:left;
      ">


        <div style="
          margin-bottom:12px;
        ">

          <small>User ID</small>

          <strong style="
            display:block;
            font-size:20px;
            margin-top:4px;
          ">
            ${user.userId}
          </strong>

        </div>


        <div style="
          margin-bottom:12px;
        ">

          <small>Username</small>

          <strong style="
            display:block;
            margin-top:4px;
          ">
            ${user.username}
          </strong>

        </div>


        <div>

          <small>Temporary Password</small>

          <strong style="
            display:block;
            margin-top:4px;
            letter-spacing:1px;
          ">
            ${user.password}
          </strong>

        </div>

      </div>


      <div style="
        padding:12px;
        border-radius:10px;
        background:#fff8e6;
        color:#7a4d00;
        font-size:13px;
        margin-bottom:18px;
      ">

        <strong>
          Please save your User ID, username and password.
        </strong>

        <br>

        You will need them to log in.

      </div>


      <div class="modal-actions">

        <button
          class="btn primary"
          type="button"
          onclick="openDashboard()"
        >
          Go to My Profile →
        </button>

      </div>


    </div>

  `;
}


// --------------------------------------------
// LOGIN USER
// --------------------------------------------

function loginUser() {

  const loginUsername =
    document.getElementById(
      "loginUsername"
    )?.value.trim();

  const loginPassword =
    document.getElementById(
      "loginPassword"
    )?.value;

  const message =
    document.getElementById(
      "loginMessage"
    );


  if (
    !loginUsername ||
    !loginPassword
  ) {

    if (message) {

      message.innerHTML = `

        <div style="
          margin-top:15px;
          padding:12px;
          border-radius:10px;
          background:#fff3f3;
          color:#b42318;
        ">

          Please enter your User ID/username
          and password.

        </div>

      `;

    }

    return;
  }


  const savedUser =
    localStorage.getItem(
      "samajSaathiUser"
    );


  if (!savedUser) {

    if (message) {

      message.innerHTML = `

        <div style="
          margin-top:15px;
          padding:12px;
          border-radius:10px;
          background:#fff3f3;
          color:#b42318;
        ">

          No SamajSaathi account was found
          on this browser.

          <br><br>

          Please create your profile first.

        </div>

      `;

    }

    return;
  }


  const user =
    JSON.parse(savedUser);


  const usernameMatches =
    loginUsername.toLowerCase() ===
      user.username.toLowerCase() ||
    loginUsername.toUpperCase() ===
      user.userId.toUpperCase();


  const passwordMatches =
    loginPassword === user.password;


  if (
    !usernameMatches ||
    !passwordMatches
  ) {

    if (message) {

      message.innerHTML = `

        <div style="
          margin-top:15px;
          padding:12px;
          border-radius:10px;
          background:#fff3f3;
          color:#b42318;
        ">

          Incorrect User ID/username or password.

        </div>

      `;

    }

    return;
  }


  // ------------------------------------------
  // LOGIN SUCCESS
  // ------------------------------------------

  localStorage.setItem(
    "samajSaathiLoggedIn",
    "true"
  );


  openDashboard();
}


// --------------------------------------------
// DASHBOARD
// --------------------------------------------

function openDashboard() {

  const savedUser =
    localStorage.getItem(
      "samajSaathiUser"
    );

  if (!savedUser) {

    openModal("register");

    return;
  }


  const user =
    JSON.parse(savedUser);


  closeModal();


  const dashboard =
    document.createElement("div");

  dashboard.id =
    "samajSaathiDashboard";


  dashboard.innerHTML = `

    <div style="
      position:fixed;
      inset:0;
      z-index:9999;
      background:#fff;
      overflow:auto;
    ">


      <div style="
        background:#6f1025;
        color:#fff;
        padding:20px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:15px;
        flex-wrap:wrap;
      ">

        <div>

          <div style="
            font-size:24px;
            font-weight:700;
          ">
            SamajSaathi
          </div>

          <small>
            My Profile
          </small>

        </div>


        <button
          onclick="logoutUser()"
          style="
            border:1px solid rgba(255,255,255,.5);
            background:transparent;
            color:#fff;
            padding:10px 18px;
            border-radius:8px;
            cursor:pointer;
          "
        >
          Logout
        </button>

      </div>


      <div style="
        max-width:1000px;
        margin:40px auto;
        padding:20px;
      ">


        <div style="
          background:#f8f1f3;
          border-radius:18px;
          padding:25px;
          margin-bottom:25px;
        ">

          <span class="eyebrow">
            WELCOME
          </span>

          <h1 style="
            margin:8px 0;
          ">
            Hello, ${user.firstName}!
          </h1>

          <p>
            Your SamajSaathi profile is ready.
          </p>

        </div>


        <div style="
          display:grid;
          grid-template-columns:
          repeat(auto-fit,minmax(220px,1fr));
          gap:15px;
        ">


          ${dashboardItem(
            "User ID",
            user.userId
          )}


          ${dashboardItem(
            "Username",
            user.username
          )}


          ${dashboardItem(
            "Name",
            `${user.firstName} ${user.lastName}`
          )}


          ${dashboardItem(
            "Gender",
            user.gender
          )}


          ${dashboardItem(
            "Community",
            user.community
          )}


          ${dashboardItem(
            "Surname",
            user.surname
          )}


          ${dashboardItem(
            "Kul / Clan",
            user.kul
          )}


          ${dashboardItem(
            "City",
            user.city
          )}

        </div>


        <div style="
          margin-top:30px;
          padding:20px;
          border-radius:14px;
          border:1px solid #eee;
        ">

          <h2>
            Find Your Matches
          </h2>

          <p>
            Your profile has been created.
            Matching features can be connected
            to the SamajSaathi backend next.
          </p>

        </div>


      </div>

    </div>

  `;


  document.body.appendChild(
    dashboard
  );
}


// --------------------------------------------
// DASHBOARD ITEM
// --------------------------------------------

function dashboardItem(label, value) {

  return `

    <div style="
      background:#fff;
      border:1px solid #eee;
      border-radius:14px;
      padding:18px;
    ">

      <small style="
        display:block;
        color:#777;
        margin-bottom:7px;
      ">
        ${label}
      </small>

      <strong>
        ${value || "Not specified"}
      </strong>

    </div>

  `;
}


// --------------------------------------------
// LOGOUT
// --------------------------------------------

function logoutUser() {

  localStorage.removeItem(
    "samajSaathiLoggedIn"
  );


  document
    .getElementById(
      "samajSaathiDashboard"
    )
    ?.remove();


  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

}


// --------------------------------------------
// CLOSE MODAL BY CLICKING OUTSIDE
// --------------------------------------------

const modal =
  document.getElementById("modal");

if (modal) {

  modal.addEventListener(
    "click",
    e => {

      if (
        e.target.id === "modal"
      ) {

        closeModal();

      }

    }
  );

}


// --------------------------------------------
// ESC KEY CLOSE
// --------------------------------------------

document.addEventListener(
  "keydown",
  e => {

    if (e.key === "Escape") {

      closeModal();

    }

  }
);
