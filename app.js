// ============================================
// SAMAJ SAATHI MATRIMONY
// SUPABASE CONNECTED APP
// ============================================

const SUPABASE_URL =
  "https://drrsborerbgzthxdazqu.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "YOUR_SUPABASE_PUBLISHABLE_KEY";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );


// ============================================
// DEMO PROFILES
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
// LOAD DEMO PROFILES
// ============================================

const grid =
  document.getElementById("profiles");

if (grid) {

  grid.innerHTML = profiles.map(p => `
    <article class="profile">

      <div class="profile-img ${p.photo}">
        <span class="profile-tag">
          ✓ Verified
        </span>
      </div>

      <div class="profile-body">

        <b>
          ${p.name}, ${p.age}
        </b>

        <small>
          ${p.city}
        </small>

        <small>
          ${p.community} · ${p.surname} · ${p.kul}
        </small>

        <small class="match">
          ${p.match}% Match
        </small>

      </div>

    </article>
  `).join("");

}


// ============================================
// SCROLL
// ============================================

function scrollToId(id) {

  document
    .getElementById(id)
    ?.scrollIntoView({
      behavior: "smooth"
    });

}


// ============================================
// GENERATE DISPLAY USER ID
// ============================================

function generateUserId() {

  const number =
    Math.floor(
      100000 +
      Math.random() * 900000
    );

  return "SS" + number;

}


// ============================================
// GENERATE USERNAME
// ============================================

function generateUsername(
  firstName,
  lastName
) {

  const first =
    firstName
      .toLowerCase()
      .replace(/[^a-z]/g, "");

  const last =
    lastName
      .toLowerCase()
      .replace(/[^a-z]/g, "");

  const random =
    Math.floor(
      100 +
      Math.random() * 900
    );

  return `${first}.${last}${random}`;

}


// ============================================
// GENERATE PASSWORD
// ============================================

function generatePassword() {

  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

  let password = "";

  for (let i = 0; i < 8; i++) {

    password += chars.charAt(
      Math.floor(
        Math.random() * chars.length
      )
    );

  }

  return password;

}


// ============================================
// OPEN MODAL
// ============================================

function openModal(type) {

  const modal =
    document.getElementById("modal");

  const c =
    document.getElementById("modalContent");

  if (!modal || !c) return;


  // ==========================================
  // LOGIN
  // ==========================================

  if (type === "login") {

    c.innerHTML = `

      <span class="eyebrow">
        WELCOME BACK
      </span>

      <h2>
        Login to SamajSaathi
      </h2>

      <p>
        Access your profile, matches and interests.
      </p>

      <div class="form-grid">

        <div class="field full">

          <label>Email</label>

          <input
            id="loginEmail"
            type="email"
            placeholder="Enter your email"
            autocomplete="email"
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

        <a
          href="#"
          onclick="openModal('register');return false;"
        >
          Create Profile
        </a>

      </p>

    `;

  }


  // ==========================================
  // REGISTER
  // ==========================================

  else {

    c.innerHTML = `

      <span class="eyebrow">
        CREATE YOUR PROFILE
      </span>

      <h2>
        Begin your journey.
      </h2>

      <p>
        Tell us a little about yourself.
        You can complete the rest later.
      </p>

      <div class="form-grid">

        <div class="field">

          <label>
            First Name *
          </label>

          <input
            id="firstName"
            placeholder="First name"
          >

        </div>

        <div class="field">

          <label>
            Last Name *
          </label>

          <input
            id="lastName"
            placeholder="Last name"
          >

        </div>

        <div class="field full">

          <label>
            Email *
          </label>

          <input
            id="email"
            type="email"
            placeholder="Email address"
            autocomplete="email"
          >

        </div>

        <div class="field">

          <label>
            Date of Birth *
          </label>

          <input
            id="dob"
            type="date"
          >

        </div>

        <div class="field">

          <label>
            Gender *
          </label>

          <select id="gender">

            <option value="">
              Select
            </option>

            <option value="female">
              Woman
            </option>

            <option value="male">
              Man
            </option>

          </select>

        </div>

        <div class="field">

          <label>
            Community / Jati
          </label>

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

          <label>
            Surname
          </label>

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

          <label>
            Kul / Clan
          </label>

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


// ============================================
// CLOSE MODAL
// ============================================

function closeModal() {

  document
    .getElementById("modal")
    ?.classList.remove("show");

}


// ============================================
// REGISTER USER
// ============================================

async function registerUser() {

  const firstName =
    document.getElementById(
      "firstName"
    )?.value.trim();

  const lastName =
    document.getElementById(
      "lastName"
    )?.value.trim();

  const email =
    document.getElementById(
      "email"
    )?.value.trim();

  const dob =
    document.getElementById(
      "dob"
    )?.value;

  const gender =
    document.getElementById(
      "gender"
    )?.value;

  const community =
    document.getElementById(
      "community"
    )?.value;

  const surname =
    document.getElementById(
      "surname"
    )?.value;

  const kul =
    document.getElementById(
      "kul"
    )?.value;

  const city =
    document.getElementById(
      "city"
    )?.value.trim();

  const message =
    document.getElementById(
      "registerMessage"
    );


  // ==========================================
  // VALIDATION
  // ==========================================

  if (
    !firstName ||
    !lastName ||
    !email ||
    !dob ||
    !gender ||
    !city
  ) {

    showMessage(
      message,
      "Please fill in all required fields.",
      "error"
    );

    return;
  }


  showMessage(
    message,
    "Creating your account...",
    "info"
  );


  // ==========================================
  // CREATE AUTH ACCOUNT
  // ==========================================

  const password =
    generatePassword();

  const fullName =
    `${firstName} ${lastName}`;

  const displayUserId =
    generateUserId();

  const username =
    generateUsername(
      firstName,
      lastName
    );


  const {
    data,
    error
  } =
    await supabaseClient.auth.signUp({

      email: email,

      password: password,

      options: {

        data: {

          first_name:
            firstName,

          last_name:
            lastName,

          full_name:
            fullName,

          username:
            username,

          display_user_id:
            displayUserId

        }

      }

    });


  if (error) {

    showMessage(
      message,
      error.message,
      "error"
    );

    return;
  }


  if (!data?.user) {

    showMessage(
      message,
      "Account could not be created.",
      "error"
    );

    return;
  }


  // ==========================================
  // CHECK SESSION
  // ==========================================

  if (!data.session) {

    showMessage(
      message,
      "Account created, but email confirmation is required before the profile can be saved. Please disable Confirm email temporarily in Supabase Authentication settings.",
      "error"
    );

    return;
  }


  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const {
    error: profileError
  } =
    await supabaseClient
      .from("profiles")
      .insert({

        id:
          data.user.id,

        full_name:
          fullName,

        gender:
          gender,

        date_of_birth:
          dob,

        city:
          city,

        community:
          community,

        surname:
          surname,

        kul:
          kul,

        is_active:
          true

      });


  if (profileError) {

    console.error(
      "PROFILE INSERT ERROR:",
      profileError
    );

    showMessage(
      message,
      "Profile could not be saved: " +
      profileError.message,
      "error"
    );

    return;
  }


  // ==========================================
  // SAVE DISPLAY INFO LOCALLY
  // ==========================================

  localStorage.setItem(
    "samajSaathiUserId",
    displayUserId
  );

  localStorage.setItem(
    "samajSaathiUsername",
    username
  );


  // ==========================================
  // SUCCESS
  // ==========================================

  showRegistrationSuccess({

    userId:
      displayUserId,

    username:
      username,

    firstName:
      firstName,

    password:
      password

  });

}


// ============================================
// REGISTRATION SUCCESS
// ============================================

function showRegistrationSuccess(user) {

  const c =
    document.getElementById(
      "modalContent"
    );

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
        ${escapeHtml(user.firstName)}!
      </h2>

      <p>
        Your matrimonial profile has been created successfully.
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

          <small>
            User ID
          </small>

          <strong style="
            display:block;
            font-size:20px;
            margin-top:4px;
          ">
            ${escapeHtml(user.userId)}
          </strong>

        </div>

        <div style="
          margin-bottom:12px;
        ">

          <small>
            Username
          </small>

          <strong style="
            display:block;
            margin-top:4px;
          ">
            ${escapeHtml(user.username)}
          </strong>

        </div>

        <div>

          <small>
            Temporary Password
          </small>

          <strong style="
            display:block;
            margin-top:4px;
            letter-spacing:1px;
          ">
            ${escapeHtml(user.password)}
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
          Save your User ID, username and password.
        </strong>

        <br>

        You will need your email and password to log in.

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


// ============================================
// LOGIN
// ============================================

async function loginUser() {

  const email =
    document.getElementById(
      "loginEmail"
    )?.value.trim();

  const password =
    document.getElementById(
      "loginPassword"
    )?.value;

  const message =
    document.getElementById(
      "loginMessage"
    );


  if (!email || !password) {

    showMessage(
      message,
      "Please enter your email and password.",
      "error"
    );

    return;
  }


  showMessage(
    message,
    "Logging in...",
    "info"
  );


  const {
    data,
    error
  } =
    await supabaseClient.auth.signInWithPassword({

      email:
        email,

      password:
        password

    });


  if (error) {

    showMessage(
      message,
      error.message,
      "error"
    );

    return;
  }


  if (!data?.user) {

    showMessage(
      message,
      "Login failed.",
      "error"
    );

    return;
  }


  await openDashboard();

}


// ============================================
// OPEN DASHBOARD
// ============================================

async function openDashboard() {

  const {
    data
  } =
    await supabaseClient.auth.getSession();


  const session =
    data?.session;


  if (!session) {

    openModal("login");

    return;
  }


  const authUser =
    session.user;


  // ==========================================
  // GET PROFILE
  // ==========================================

  const {
    data: profile,
    error
  } =
    await supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", authUser.id)
      .single();


  if (error) {

    console.error(
      "PROFILE LOAD ERROR:",
      error
    );

    alert(
      "Profile could not be loaded: " +
      error.message
    );

    return;
  }


  closeModal();


  document
    .getElementById(
      "samajSaathiDashboard"
    )
    ?.remove();


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
            Hello,
            ${escapeHtml(profile.full_name)}!
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
            "Name",
            profile.full_name
          )}

          ${dashboardItem(
            "Gender",
            profile.gender
          )}

          ${dashboardItem(
            "Date of Birth",
            profile.date_of_birth
          )}

          ${dashboardItem(
            "City",
            profile.city
          )}

          ${dashboardItem(
            "Community",
            profile.community
          )}

          ${dashboardItem(
            "Surname",
            profile.surname
          )}

          ${dashboardItem(
            "Kul / Clan",
            profile.kul
          )}

          ${dashboardItem(
            "Marital Status",
            profile.marital_status
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
            Your profile is connected to the SamajSaathi database.
            Matching features will be connected next.
          </p>

        </div>


      </div>

    </div>

  `;


  document.body.appendChild(
    dashboard
  );

}


// ============================================
// DASHBOARD ITEM
// ============================================

function dashboardItem(
  label,
  value
) {

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
        ${escapeHtml(label)}
      </small>

      <strong>
        ${escapeHtml(
          value || "Not specified"
        )}
      </strong>

    </div>

  `;

}


// ============================================
// LOGOUT
// ============================================

async function logoutUser() {

  await supabaseClient.auth.signOut();


  document
    .getElementById(
      "samajSaathiDashboard"
    )
    ?.remove();


  localStorage.removeItem(
    "samajSaathiUserId"
  );

  localStorage.removeItem(
    "samajSaathiUsername"
  );


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


// ============================================
// MESSAGE
// ============================================

function showMessage(
  element,
  text,
  type
) {

  if (!element) return;


  const isError =
    type === "error";


  element.innerHTML = `

    <div style="
      margin-top:15px;
      padding:12px;
      border-radius:10px;
      background:${isError ? "#fff3f3" : "#f8f1f3"};
      color:${isError ? "#b42318" : "#6f1025"};
    ">

      ${escapeHtml(text)}

    </div>

  `;

}


// ============================================
// ESCAPE HTML
// ============================================

function escapeHtml(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


// ============================================
// CLOSE MODAL OUTSIDE CLICK
// ============================================

const modal =
  document.getElementById("modal");

if (modal) {

  modal.addEventListener(
    "click",
    event => {

      if (
        event.target.id === "modal"
      ) {

        closeModal();

      }

    }
  );

}


// ============================================
// ESC KEY
// ============================================

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeModal();

    }

  }
);


// ============================================
// SESSION CHECK
// ============================================

(async function () {

  const {
    data
  } =
    await supabaseClient.auth.getSession();

  if (data?.session) {

    console.log(
      "SamajSaathi: User session active."
    );

  }

})();
