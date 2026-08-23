// ============================================
// SAMAJ SAATHI MATRIMONY - FRONTEND APP
// ============================================

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


// ============================================
// PROFILE CARDS
// ============================================

const grid = document.getElementById("profiles");

if (grid) {
  grid.innerHTML = profiles.map(profile => `
    <article class="profile">

      <div class="profile-img ${profile.photo}">
        <span class="profile-tag">✓ Verified</span>
      </div>

      <div class="profile-body">

        <b>${profile.name}, ${profile.age}</b>

        <small>${profile.city}</small>

        <small>
          ${profile.community}
          · ${profile.surname}
          · ${profile.kul}
        </small>

        <small class="match">
          ${profile.match}% Match
        </small>

      </div>

    </article>
  `).join("");
}


// ============================================
// SCROLL
// ============================================

function scrollToId(id) {

  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({
      behavior: "smooth"
    });
  }

}


// ============================================
// OPEN MODAL
// ============================================

function openModal(type) {

  const modal = document.getElementById("modal");
  const content = document.getElementById("modalContent");

  if (!modal || !content) return;


  // ========================================
  // LOGIN
  // ========================================

  if (type === "login") {

    content.innerHTML = `

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


      <div
        id="loginMessage"
        style="
          margin-top:15px;
          display:none;
          padding:12px;
          border-radius:8px;
          background:#f4f4f4;
        "
      ></div>


      <div class="modal-actions">

        <button
          class="btn primary"
          onclick="loginUser()"
        >
          Login
        </button>

      </div>

    `;

  }


  // ========================================
  // CREATE PROFILE
  // ========================================

  else {

    content.innerHTML = `

      <span class="eyebrow">
        CREATE YOUR PROFILE
      </span>

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
            type="text"
            placeholder="First name"
          >

        </div>


        <div class="field">

          <label>Last Name</label>

          <input
            id="lastName"
            type="text"
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

          <label>Community / Jati</label>

          <select id="community">

            <option value="Dom">
              Dom
            </option>

            <option value="Other SC Community">
              Other SC Community
            </option>

          </select>

        </div>


        <div class="field">

          <label>Surname</label>

          <select id="surname">

            <option value="Rauth">
              Rauth
            </option>

            <option value="Basfor">
              Basfor
            </option>

            <option value="Bansfor">
              Bansfor
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>


        <div class="field">

          <label>Kul / Clan</label>

          <select id="kul">

            <option value="Piari Baiswar">
              Piari Baiswar
            </option>

            <option value="Other">
              Other
            </option>

            <option value="Not Known">
              Not Known
            </option>

          </select>

        </div>


        <div class="field full">

          <label>Current City</label>

          <input
            id="city"
            type="text"
            placeholder="e.g. Siliguri"
          >

        </div>


        <div class="field">

          <label>Mobile Number</label>

          <input
            id="mobile"
            type="tel"
            placeholder="10 digit mobile number"
            maxlength="10"
          >

        </div>


        <div class="field">

          <label>Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email address"
          >

        </div>


        <div class="field full">

          <label>Password</label>

          <input
            id="password"
            type="password"
            placeholder="Create password"
          >

        </div>

      </div>


      <div
        id="registerMessage"
        style="
          display:none;
          margin-top:15px;
          padding:14px;
          border-radius:8px;
          background:#eef8ee;
          color:#245b24;
        "
      ></div>


      <div class="modal-actions">

        <button
          class="btn primary"
          onclick="registerUser()"
        >
          Create Profile →
        </button>

      </div>

    `;

  }


  modal.classList.add("show");

}


// ============================================
// CLOSE MODAL
// ============================================

function closeModal() {

  const modal = document.getElementById("modal");

  if (modal) {
    modal.classList.remove("show");
  }

}


// ============================================
// REGISTER USER
// ============================================

function registerUser() {

  const firstName =
    document.getElementById("firstName").value.trim();

  const lastName =
    document.getElementById("lastName").value.trim();

  const dob =
    document.getElementById("dob").value;

  const gender =
    document.getElementById("gender").value;

  const community =
    document.getElementById("community").value;

  const surname =
    document.getElementById("surname").value;

  const kul =
    document.getElementById("kul").value;

  const city =
    document.getElementById("city").value.trim();

  const mobile =
    document.getElementById("mobile").value.trim();

  const email =
    document.getElementById("email").value.trim();

  const password =
    document.getElementById("password").value;


  // ========================================
  // VALIDATION
  // ========================================

  if (!firstName) {
    showRegisterError("Please enter your first name.");
    return;
  }

  if (!lastName) {
    showRegisterError("Please enter your last name.");
    return;
  }

  if (!dob) {
    showRegisterError("Please select your date of birth.");
    return;
  }

  if (!gender) {
    showRegisterError("Please select your gender.");
    return;
  }

  if (!city) {
    showRegisterError("Please enter your current city.");
    return;
  }

  if (!mobile || !/^[0-9]{10}$/.test(mobile)) {
    showRegisterError(
      "Please enter a valid 10 digit mobile number."
    );
    return;
  }

  if (!email || !email.includes("@")) {
    showRegisterError(
      "Please enter a valid email address."
    );
    return;
  }

  if (!password || password.length < 6) {
    showRegisterError(
      "Password must contain at least 6 characters."
    );
    return;
  }


  // ========================================
  // CREATE PROFILE OBJECT
  // ========================================

  const user = {

    id:
      "SS" +
      Date.now(),

    firstName,
    lastName,

    fullName:
      firstName + " " + lastName,

    dob,

    gender,

    community,

    surname,

    kul,

    city,

    mobile,

    email,

    password,

    profileCreated:
      new Date().toISOString(),

    verified:
      false

  };


  // ========================================
  // SAVE PROFILE LOCALLY
  // ========================================

  localStorage.setItem(
    "samajSaathiUser",
    JSON.stringify(user)
  );


  localStorage.setItem(
    "samajSaathiLoggedIn",
    "true"
  );


  // ========================================
  // SUCCESS SCREEN
  // ========================================

  const message =
    document.getElementById("registerMessage");

  message.style.display = "block";

  message.innerHTML = `

    <strong>
      ✓ Profile Created Successfully!
    </strong>

    <br><br>

    Welcome,
    <strong>${firstName} ${lastName}</strong>.

    <br>

    Your SamajSaathi profile ID is:

    <strong>${user.id}</strong>

  `;


  // Change button

  const buttons =
    document.querySelectorAll(".modal-actions button");

  if (buttons.length > 0) {

    buttons[0].innerText =
      "Continue to My Profile →";

    buttons[0].onclick =
      function () {

        showMyProfile();

      };

  }

}


// ============================================
// REGISTER ERROR
// ============================================

function showRegisterError(message) {

  const box =
    document.getElementById("registerMessage");

  if (!box) return;

  box.style.display = "block";

  box.style.background =
    "#fff1f1";

  box.style.color =
    "#9b1c1c";

  box.innerHTML =
    "⚠ " + message;

}


// ============================================
// LOGIN
// ============================================

function loginUser() {

  const email =
    document.getElementById("loginEmail")
      .value
      .trim();

  const password =
    document.getElementById("loginPassword")
      .value;


  const savedUser =
    localStorage.getItem("samajSaathiUser");


  if (!savedUser) {

    showLoginMessage(
      "No account found on this browser. Please create your profile first."
    );

    return;

  }


  const user =
    JSON.parse(savedUser);


  if (
    (email === user.email ||
     email === user.mobile)
    &&
    password === user.password
  ) {

    localStorage.setItem(
      "samajSaathiLoggedIn",
      "true"
    );

    showMyProfile();

  }

  else {

    showLoginMessage(
      "Incorrect email/mobile or password."
    );

  }

}


// ============================================
// LOGIN MESSAGE
// ============================================

function showLoginMessage(message) {

  const box =
    document.getElementById("loginMessage");

  if (!box) return;

  box.style.display =
    "block";

  box.style.background =
    "#fff1f1";

  box.style.color =
    "#9b1c1c";

  box.innerHTML =
    "⚠ " + message;

}


// ============================================
// MY PROFILE
// ============================================

function showMyProfile() {

  const savedUser =
    localStorage.getItem("samajSaathiUser");

  if (!savedUser) {

    openModal("register");

    return;

  }


  const user =
    JSON.parse(savedUser);


  const content =
    document.getElementById("modalContent");


  content.innerHTML = `

    <span class="eyebrow">
      MY PROFILE
    </span>

    <h2>
      ${user.fullName}
    </h2>

    <p>
      Profile ID:
      <strong>${user.id}</strong>
    </p>


    <div class="form-grid">

      <div class="field">

        <label>Date of Birth</label>

        <input
          value="${user.dob}"
          disabled
        >

      </div>


      <div class="field">

        <label>Gender</label>

        <input
          value="${user.gender}"
          disabled
        >

      </div>


      <div class="field">

        <label>Community</label>

        <input
          value="${user.community}"
          disabled
        >

      </div>


      <div class="field">

        <label>Surname</label>

        <input
          value="${user.surname}"
          disabled
        >

      </div>


      <div class="field">

        <label>Kul / Clan</label>

        <input
          value="${user.kul}"
          disabled
        >

      </div>


      <div class="field">

        <label>City</label>

        <input
          value="${user.city}"
          disabled
        >

      </div>


      <div class="field full">

        <label>Email</label>

        <input
          value="${user.email}"
          disabled
        >

      </div>


      <div class="field full">

        <label>Mobile</label>

        <input
          value="${user.mobile}"
          disabled
        >

      </div>

    </div>


    <div
      style="
        margin-top:20px;
        padding:15px;
        border-radius:10px;
        background:#f5f5f5;
      "
    >

      <strong>
        Profile Status
      </strong>

      <br><br>

      ✓ Profile created

      <br>

      ⏳ Verification pending

    </div>


    <div class="modal-actions">

      <button
        class="btn primary"
        onclick="closeModal()"
      >
        Done
      </button>

    </div>

  `;

}


// ============================================
// MODAL BACKDROP
// ============================================

const modal =
  document.getElementById("modal");

if (modal) {

  modal.addEventListener(
    "click",
    function(event) {

      if (
        event.target.id === "modal"
      ) {

        closeModal();

      }

    }
  );

}


// ============================================
// GLOBAL FUNCTIONS
// ============================================

window.openModal =
  openModal;

window.closeModal =
  closeModal;

window.scrollToId =
  scrollToId;

window.registerUser =
  registerUser;

window.loginUser =
  loginUser;

window.showMyProfile =
  showMyProfile;
