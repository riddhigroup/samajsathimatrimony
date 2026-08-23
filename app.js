// ============================================
// SAMAJ SAATHI MATRIMONY
// SUPABASE CONNECTED FRONTEND APP
// ============================================


// ============================================
// SUPABASE CONFIG
// ============================================

const SUPABASE_URL =
  "https://drrsborerbgzthxdazqu.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_ACdKChyHYC11rSK9_HZ0Jg_l22KO06k";


// Supabase client
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

  grid.innerHTML =
    profiles.map(p => `

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
// GENERATE USER ID
// ============================================

function generateUserId() {

  const random =
    Math.floor(
      100000 +
      Math.random() * 900000
    );

  return "SS" + random;

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
// GENERATE TEMPORARY PASSWORD
// ============================================

function generatePassword() {

  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

  let password = "";

  for (
    let i = 0;
    i < 8;
    i++
  ) {

    password +=
      chars.charAt(
        Math.floor(
          Math.random() *
          chars.length
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

          <label>
            Email
          </label>

          <input
            id="loginEmail"
            type="email"
            placeholder="Enter your email"
            autocomplete="email"
          >

        </div>


        <div class="field full">

          <label>
            Password
          </label>

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
        You can complete the rest of your profile later.
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


        <div class="field">

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

            <option value="Woman">
              Woman
            </option>

            <option value="Man">
              Man
            </option>

          </select>

        </div>


        <div class="field">

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

          <label>
            Surname
          </label>

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

          <label>
            Kul / Clan
          </label>

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


// ============================================
// CLOSE MODAL
// ============================================

function closeModal() {

  const modal =
    document.getElementById("modal");

  if (modal) {

    modal.classList.remove("show");

  }

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


  // ==========================================
  // TEMPORARY PASSWORD
  // ==========================================

  const password =
    generatePassword();


  // ==========================================
  // CREATE SUPABASE AUTH USER
  // ==========================================

  if (message) {

    message.innerHTML = `
      <div style="
        margin-top:15px;
        padding:12px;
        border-radius:10px;
        background:#f8f1f3;
        color:#6f1025;
      ">
        Creating your account...
      </div>
    `;

  }


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
            lastName

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


  if (!data.user) {

    showMessage(
      message,
      "Account could not be created.",
      "error"
    );

    return;

  }


  // ==========================================
  // GENERATE PROFILE INFORMATION
  // ==========================================

  const userId =
    generateUserId();

  const username =
    generateUsername(
      firstName,
      lastName
    );


  // ==========================================
  // SAVE PROFILE TO SUPABASE
  // ==========================================

  const {
    error: profileError
  } =
    await supabaseClient
      .from("profiles")
      .insert({

        id:
          data.user.id,

        user_id:
          userId,

        username:
          username,

        first_name:
          firstName,

        last_name:
          lastName,

        dob:
          dob,

        gender:
          gender,

        community:
          community,

        surname:
          surname,

        kul:
          kul,

        city:
          city,

        email:
          email

      });


  if (profileError) {

    console.error(
      "Profile error:",
      profileError
    );


    showMessage(
      message,
      "Account created, but profile could not be saved. Please check your profiles table columns.",
      "error"
    );

    return;

  }


  // ==========================================
  // SAVE ONLY NON-SENSITIVE SESSION INFO
  // ==========================================

  localStorage.setItem(
    "samajSaathiUserId",
    userId
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
      userId,

    username:
      username,

    firstName:
      firstName,

    email:
      email,

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
          Please save your User ID, username and password.
        </strong>

        <br>

        Your password is also used for Supabase login.

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
// LOGIN USER
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


  if (
    !email ||
    !password
  ) {

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


  if (!data.user) {

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
// DASHBOARD
// ============================================

async function openDashboard() {

  const {
    data: sessionData
  } =
    await supabaseClient.auth.getSession();


  const session =
    sessionData?.session;


  if (!session) {

    openModal("login");

    return;

  }


  const authUser =
    session.user;


  // ==========================================
  // GET PROFILE FROM DATABASE
  // ==========================================

  const {
    data: user,
    error
  } =
    await supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", authUser.id)
      .single();


  if (error) {

    console.error(
      "Dashboard profile error:",
      error
    );

    alert(
      "Your account is logged in, but your profile could not be loaded."
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
            ${escapeHtml(user.first_name)}!
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
            user.user_id
          )}


          ${dashboardItem(
            "Username",
            user.username
          )}


          ${dashboardItem(
            "Name",
            `${user.first_name || ""} ${user.last_name || ""}`
          )}


          ${dashboardItem(
            "Email",
            user.email
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
            Your profile is connected to SamajSaathi.
            Matching features can now be connected
            to your database.
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
// MESSAGE HELPER
// ============================================

function showMessage(
  element,
  text,
  type
) {

  if (!element) return;


  let background =
    "#f8f1f3";

  let color =
    "#6f1025";


  if (type === "error") {

    background =
      "#fff3f3";

    color =
      "#b42318";

  }


  element.innerHTML = `

    <div style="
      margin-top:15px;
      padding:12px;
      border-radius:10px;
      background:${background};
      color:${color};
    ">

      ${escapeHtml(text)}

    </div>

  `;

}


// ============================================
// ESCAPE HTML
// ============================================

function escapeHtml(value) {

  return String(
    value ?? ""
  )
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
    e => {

      if (
        e.target.id === "modal"
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
  e => {

    if (e.key === "Escape") {

      closeModal();

    }

  }
);


// ============================================
// CHECK EXISTING SESSION
// ============================================

(async function checkExistingSession() {

  const {
    data
  } =
    await supabaseClient.auth.getSession();


  if (data?.session) {

    console.log(
      "SamajSaathi: Supabase session active."
    );

  }

})();
