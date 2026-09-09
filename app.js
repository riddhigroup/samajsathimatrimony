// SAMAJSAATHI DEPLOY BUILD: 2026-09-04-chat-ui-fix-v2
// ============================================================
// SAMAJ SAATHI MATRIMONY
// SUPABASE CONNECTED APP
// COMPLETE APP.JS
// ============================================================
// FIXES:
// \u{2705} Login button
// \u{2705} Create Profile button
// \u{2705} Supabase safe initialization
// \u{2705} Global functions exposed to HTML onclick
// \u{2705} Session persistence
// \u{2705} Back button protection
// \u{2705} Find Your Matches
// \u{2705} View Profile
// \u{2705} Send Interest
// \u{2705} My Interests
// \u{2705} Received Interests
// \u{2705} Accept / Reject Interest
// \u{2705} Profile photo upload
// ============================================================


// ============================================================
// SUPABASE CONFIG
// ============================================================

const SUPABASE_URL =
  "https://drrsborerbgzthxdazqu.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_ACdKChyHYC11rSK9_HZ0Jg_l22KO06k";


// ============================================================
// SUPABASE CLIENT
// ============================================================

let supabaseClient = null;

try {

  if (
    window.supabase &&
    typeof window.supabase.createClient === "function"
  ) {

    supabaseClient =
      window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY,
        {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            storage: window.localStorage
          }
        }
      );

    console.log(
      "SamajSaathi: Supabase initialized successfully."
    );

  } else {

    console.error(
      "SamajSaathi: Supabase library was not loaded."
    );

  }

} catch (error) {

  console.error(
    "SUPABASE INITIALIZATION ERROR:",
    error
  );

}


// ============================================================
// GLOBAL STATE
// ============================================================

let samajDashboardOpening = false;
let samajLoggingOut = false;
let samajNavigatingHome = false;
let samajInitialised = false;


// ============================================================
// SUPABASE CHECK
// ============================================================

function isSupabaseReady() {

  if (supabaseClient) {
    return true;
  }

  alert(
    "SamajSaathi could not connect to the database. Please refresh the page and try again."
  );

  return false;
}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHtml(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


// ============================================================
// AGE
// ============================================================

function calculateAge(dateString) {

  if (!dateString) {
    return null;
  }

  const birthDate =
    new Date(dateString);

  if (
    Number.isNaN(
      birthDate.getTime()
    )
  ) {
    return null;
  }

  const today =
    new Date();

  let age =
    today.getFullYear() -
    birthDate.getFullYear();

  const month =
    today.getMonth() -
    birthDate.getMonth();

  if (
    month < 0 ||
    (
      month === 0 &&
      today.getDate() < birthDate.getDate()
    )
  ) {

    age--;

  }

  return age;
}


// ============================================================
// USER ID
// ============================================================

function generateUserId() {

  const number =
    Math.floor(
      100000 +
      Math.random() * 900000
    );

  return "SS" + number;
}


// ============================================================
// USERNAME
// ============================================================

function generateUsername(
  firstName,
  lastName
) {

  const first =
    String(firstName || "")
      .toLowerCase()
      .replace(/[^a-z]/g, "");

  const last =
    String(lastName || "")
      .toLowerCase()
      .replace(/[^a-z]/g, "");

  const random =
    Math.floor(
      100 +
      Math.random() * 900
    );

  return (
    first +
    "." +
    last +
    random
  );
}


// ============================================================
// PASSWORD
// ============================================================

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


// ============================================================
// MESSAGE
// ============================================================

function showMessage(
  element,
  text,
  type
) {

  if (!element) {
    return;
  }

  const isError =
    type === "error";

  element.innerHTML = `
    <div style="
      margin-top:15px;
      padding:12px;
      border-radius:10px;
      background:${isError ? "#fff3f3" : "#f8f1f3"};
      color:${isError ? "#b42318" : "#6f1025"};
      font-size:14px;
    ">
      ${escapeHtml(text)}
    </div>
  `;
}


// ============================================================
// PUBLIC PHOTO URL
// ============================================================

function getProfilePhotoUrl(
  photoPath
) {

  if (
    !photoPath ||
    !supabaseClient
  ) {
    return null;
  }

  try {

    const result =
      supabaseClient
        .storage
        .from("profile-photos")
        .getPublicUrl(
          photoPath
        );

    return (
      result.data?.publicUrl ||
      null
    );

  } catch (error) {

    console.error(
      "PHOTO URL ERROR:",
      error
    );

    return null;
  }
}


// ============================================================
// OPEN MODAL
// ============================================================

function openModal(type) {

  const modal =
    document.getElementById(
      "modal"
    );

  const content =
    document.getElementById(
      "modalContent"
    );

  if (
    !modal ||
    !content
  ) {

    console.error(
      "Modal elements not found."
    );

    return;
  }


  // ========================================================
  // LOGIN
  // ========================================================

  if (type === "login") {

    content.innerHTML = `

      <span class="eyebrow">
        WELCOME BACK
      </span>

      <h2>
        Login to SamajSaathi
      </h2>

      <p>
        Access your profile and discover suitable matches.
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
            placeholder="Enter your password"
            autocomplete="current-password"
          >

        </div>

      </div>

      <div id="loginMessage"></div>

      <div class="modal-actions">

        <button
          type="button"
          class="btn primary"
          onclick="loginUser()"
        >
          Login
        </button>

      </div>

      <p style="
        margin-top:18px;
        text-align:center;
        font-size:13px;
      ">

        Don't have an account?

        <a
          href="#"
          onclick="
            openModal('register');
            return false;
          "
        >
          Create Profile
        </a>

      </p>

    `;

  }


  // ========================================================
  // REGISTER
  // ========================================================

  else {

    content.innerHTML = `

      <span class="eyebrow">
        CREATE YOUR PROFILE
      </span>

      <h2>
        Begin your journey.
      </h2>

      <p>
        Create your SamajSaathi matrimonial profile.
      </p>

      <div class="form-grid">

        <div class="field">

          <label>
            First Name *
          </label>

          <input
            id="firstName"
            placeholder="First name"
            autocomplete="given-name"
          >

        </div>

        <div class="field">

          <label>
            Last Name *
          </label>

          <input
            id="lastName"
            placeholder="Last name"
            autocomplete="family-name"
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

        <div class="field">

          <label>
            State / Province
          </label>

          <input
            id="state"
            placeholder="e.g. West Bengal"
            autocomplete="address-level1"
          >

        </div>

        <div class="field">

          <label>
            Current City *
          </label>

          <input
            id="city"
            placeholder="e.g. Siliguri"
            autocomplete="address-level2"
          >

        </div>

        <div class="field">

          <label>
            Marital Status
          </label>

          <select id="maritalStatus">
            <option value="">Select</option>
            <option value="Never Married">Never Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
            <option value="Separated">Separated</option>
          </select>

        </div>

        <div class="field">

          <label>
            Height
          </label>

          <input
            id="height"
            placeholder="e.g. 5 ft 6 in"
          >

        </div>

        <div class="field">

          <label>
            Education
          </label>

          <input
            id="education"
            placeholder="e.g. Graduate / Post Graduate"
          >

        </div>

        <div class="field">

          <label>
            Occupation / Profession
          </label>

          <input
            id="occupation"
            placeholder="e.g. Business / Teacher / Private Job"
          >

        </div>

        <div class="field full">

          <label>
            About You
          </label>

          <textarea
            id="bio"
            rows="4"
            placeholder="Tell a little about yourself, your family, interests and what you are looking for..."
          ></textarea>

        </div>

      </div>

      <div id="registerMessage"></div>

      <div class="modal-actions">

        <button
          type="button"
          class="btn primary"
          onclick="registerUser()"
        >
          Create Account \u{2192}
        </button>

      </div>

      <p style="
        margin-top:18px;
        text-align:center;
        font-size:13px;
      ">

        Already have an account?

        <a
          href="#"
          onclick="
            openModal('login');
            return false;
          "
        >
          Login
        </a>

      </p>

    `;

  }

  modal.classList.add("show");
}


// ============================================================
// CLOSE MODAL
// ============================================================

function closeModal() {

  const modal =
    document.getElementById(
      "modal"
    );

  if (modal) {

    modal.classList.remove(
      "show"
    );

  }
}


// ============================================================
// REGISTER
// ============================================================

async function registerUser() {

  if (!isSupabaseReady()) {
    return;
  }

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

  const state =
    document.getElementById(
      "state"
    )?.value.trim();

  const maritalStatus =
    document.getElementById(
      "maritalStatus"
    )?.value;

  const height =
    document.getElementById(
      "height"
    )?.value.trim();

  const education =
    document.getElementById(
      "education"
    )?.value.trim();

  const occupation =
    document.getElementById(
      "occupation"
    )?.value.trim();

  const bio =
    document.getElementById(
      "bio"
    )?.value.trim();

  const message =
    document.getElementById(
      "registerMessage"
    );


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


  const age =
    calculateAge(dob);

  if (
    age === null ||
    age < 18
  ) {

    showMessage(
      message,
      "SamajSaathi is available only for adults aged 18 or above.",
      "error"
    );

    return;
  }


  showMessage(
    message,
    "Creating your account...",
    "info"
  );


  const password =
    generatePassword();

  const fullName =
    firstName +
    " " +
    lastName;

  const displayUserId =
    generateUserId();

  const username =
    generateUsername(
      firstName,
      lastName
    );


  try {

    const result =
      await supabaseClient.auth.signUp({

        email:
          email,

        password:
          password,

        options: {

          emailRedirectTo:
            "https://riddhigroup.github.io/samajsathimatrimony/",

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


    if (result.error) {

      showMessage(
        message,
        result.error.message,
        "error"
      );

      return;
    }


    const data =
      result.data;


    if (!data?.user) {

      showMessage(
        message,
        "Account could not be created.",
        "error"
      );

      return;
    }


    localStorage.setItem(
      "samajSaathiUserId",
      displayUserId
    );

    localStorage.setItem(
      "samajSaathiUsername",
      username
    );


    const profileData = {

      id:
        data.user.id,

      full_name:
        fullName,

      gender:
        gender,

      date_of_birth:
        dob,

      age:
        age,

      city:
        city,

      state:
        state || null,

      community:
        community,

      surname:
        surname,

      kul:
        kul,

      marital_status:
        maritalStatus || null,

      height:
        height || null,

      education:
        education || null,

      occupation:
        occupation || null,

      bio:
        bio || null,

      is_active:
        Boolean(data.session)

    };


    if (data.session) {

      const profileResult =
        await supabaseClient
          .from("profiles")
          .upsert(
            profileData,
            {
              onConflict:
                "id"
            }
          );


      if (profileResult.error) {

        showMessage(
          message,
          "Account created, but profile could not be saved: " +
          profileResult.error.message,
          "error"
        );

        return;
      }


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


      await loadProfiles();

    }

    else {

      localStorage.setItem(
        "samajSaathiPendingProfile",
        JSON.stringify(
          profileData
        )
      );

      showEmailVerificationPending({
        firstName:
          firstName,
        email:
          email,
        userId:
          displayUserId,
        username:
          username,
        password:
          password
      });

    }

  } catch (error) {

    console.error(
      "REGISTER ERROR:",
      error
    );

    showMessage(
      message,
      "Something went wrong: " +
      error.message,
      "error"
    );

  }
}


// ============================================================
// REGISTRATION SUCCESS
// ============================================================

function showRegistrationSuccess(user) {

  const content =
    document.getElementById(
      "modalContent"
    );

  if (!content) {
    return;
  }


  content.innerHTML = `

    <div style="
      text-align:center;
    ">

      <div style="
        font-size:48px;
        margin-bottom:10px;
      ">
        \u{2713}
      </div>

      <span class="eyebrow">
        ACCOUNT CREATED
      </span>

      <h2>
        Welcome to SamajSaathi,
        ${escapeHtml(
          user.firstName
        )}!
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
            ${escapeHtml(
              user.userId
            )}
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
            ${escapeHtml(
              user.username
            )}
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
            ${escapeHtml(
              user.password
            )}
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
          Please save your login details.
        </strong>

        <br>

        Login uses your email and password.

      </div>

      <div class="modal-actions">

        <button
          type="button"
          class="btn primary"
          onclick="openDashboard()"
        >
          Go to My Dashboard \u{2192}
        </button>

      </div>

    </div>

  `;
}


// ============================================================
// EMAIL CONFIRMATION
// ============================================================

function showEmailVerificationPending(user) {

  const content =
    document.getElementById(
      "modalContent"
    );

  if (!content) {
    return;
  }

  content.innerHTML = `
    <div style="text-align:center;">
      <div style="font-size:48px;margin-bottom:10px;">\u{1F4E7}</div>
      <span class="eyebrow">VERIFY YOUR EMAIL</span>
      <h2>Almost there, ${escapeHtml(user.firstName)}!</h2>
      <p>We have sent a verification link to <strong>${escapeHtml(user.email)}</strong>.</p>
      <div style="margin:20px 0;padding:18px;border-radius:14px;background:#f8f1f3;text-align:left;">
        <strong>Email verification is required.</strong><br><br>
        Open your email and click the verification link. Your SamajSaathi profile becomes active only after the email is verified.
      </div>
      <div style="padding:12px;border-radius:10px;background:#fff8e6;color:#7a4d00;font-size:13px;margin-bottom:18px;">
        Until verification, your profile will not appear in Find Matches and matrimonial features will remain locked.
      </div>
      <div style="padding:12px;border-radius:10px;background:#f6f2fb;color:#4b3b63;font-size:13px;margin-bottom:18px;text-align:left;">
        <strong>Keep these details safe</strong><br>
        User ID: ${escapeHtml(user.userId)}<br>
        Username: ${escapeHtml(user.username)}<br>
        Temporary Password: ${escapeHtml(user.password)}
      </div>
      <div class="modal-actions">
        <button type="button" class="btn primary" onclick="closeModal()">I Will Verify My Email</button>
      </div>
    </div>
  `;
}


// ============================================================
// EMAIL CONFIRMATION
// ============================================================

function contentAfterSignup(
  firstName,
  userId,
  username,
  password
) {

  const content =
    document.getElementById(
      "modalContent"
    );

  if (!content) {
    return;
  }


  content.innerHTML = `

    <div style="
      text-align:center;
    ">

      <div style="
        font-size:48px;
      ">
        \u{2713}
      </div>

      <span class="eyebrow">
        ACCOUNT CREATED
      </span>

      <h2>
        Welcome to SamajSaathi,
        ${escapeHtml(
          firstName
        )}!
      </h2>

      <p>
        Please confirm your email address,
        then login to continue.
      </p>

      <div style="
        margin:20px 0;
        padding:18px;
        border-radius:14px;
        background:#f8f1f3;
        text-align:left;
      ">

        <div>

          <small>
            User ID
          </small>

          <strong style="
            display:block;
            margin-top:4px;
          ">
            ${escapeHtml(
              userId
            )}
          </strong>

        </div>

        <br>

        <div>

          <small>
            Username
          </small>

          <strong style="
            display:block;
            margin-top:4px;
          ">
            ${escapeHtml(
              username
            )}
          </strong>

        </div>

        <br>

        <div>

          <small>
            Temporary Password
          </small>

          <strong style="
            display:block;
            margin-top:4px;
            letter-spacing:1px;
          ">
            ${escapeHtml(
              password
            )}
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

        Please save your login details.

      </div>

      <div class="modal-actions">

        <button
          type="button"
          class="btn primary"
          onclick="openModal('login')"
        >
          Login
        </button>

      </div>

    </div>

  `;
}


// ============================================================
// LOGIN
// ============================================================

async function loginUser() {

  if (!isSupabaseReady()) {
    return;
  }


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


  try {

    const result =
      await supabaseClient.auth
        .signInWithPassword({

          email:
            email,

          password:
            password

        });


    if (result.error) {

      showMessage(
        message,
        result.error.message,
        "error"
      );

      return;
    }


    const loggedInUser =
      result.data?.user;

    if (!loggedInUser) {

      showMessage(
        message,
        "Login failed.",
        "error"
      );

      return;
    }

    if (!loggedInUser.email_confirmed_at) {

      await supabaseClient.auth.signOut();

      showMessage(
        message,
        "Please verify your email address before logging in. Check your inbox for the verification link.",
        "error"
      );

      return;
    }


    await savePendingProfile();


    closeModal();


    await openDashboard();

  } catch (error) {

    console.error(
      "LOGIN ERROR:",
      error
    );

    showMessage(
      message,
      "Login error: " +
      error.message,
      "error"
    );

  }
}


// ============================================================
// SAVE PENDING PROFILE
// ============================================================

async function savePendingProfile() {

  if (!supabaseClient) {
    return;
  }


  const pending =
    localStorage.getItem(
      "samajSaathiPendingProfile"
    );

  if (!pending) {
    return;
  }


  let profileData;

  try {

    profileData =
      JSON.parse(
        pending
      );

  } catch (error) {

    localStorage.removeItem(
      "samajSaathiPendingProfile"
    );

    return;
  }


  const sessionResult =
    await supabaseClient.auth
      .getSession();


  const session =
    sessionResult.data?.session;

  if (!session) {
    return;
  }

  if (!session.user?.email_confirmed_at) {
    return;
  }


  profileData.id =
    session.user.id;

  profileData.is_active =
    true;


  const result =
    await supabaseClient
      .from("profiles")
      .upsert(
        profileData,
        {
          onConflict:
            "id"
        }
      );


  if (result.error) {

    console.error(
      "PENDING PROFILE SAVE ERROR:",
      result.error
    );

    return;
  }


  localStorage.removeItem(
    "samajSaathiPendingProfile"
  );
}


// ============================================================
// LOAD PUBLIC PROFILES
// ============================================================

async function loadProfiles() {

  const grid =
    document.getElementById(
      "profiles"
    );

  if (!grid) {
    return;
  }


  if (!supabaseClient) {

    grid.innerHTML = `
      <div style="
        grid-column:1/-1;
        text-align:center;
        padding:40px;
      ">
        <h3>
          SamajSaathi is loading...
        </h3>
        <p>
          Please refresh the page.
        </p>
      </div>
    `;

    return;
  }


  grid.innerHTML = `
    <div style="
      grid-column:1/-1;
      text-align:center;
      padding:40px;
      color:#6f1025;
    ">
      Loading profiles...
    </div>
  `;


  try {

    const result =
      await supabaseClient
        .from("profiles")
        .select(`
          id,
          full_name,
          gender,
          date_of_birth,
          age,
          city,
          state,
          community,
          surname,
          kul,
          profile_photo,
          photo_url,
          is_active,
          created_at
        `)
        .eq(
          "is_active",
          true
        )
        .order(
          "created_at",
          {
            ascending:
              false
          }
        )
        .limit(6);


    if (result.error) {

      console.error(
        "PUBLIC PROFILES ERROR:",
        result.error
      );

      grid.innerHTML = `
        <div style="
          grid-column:1/-1;
          text-align:center;
          padding:40px;
        ">

          <h3>
            Unable to load profiles
          </h3>

          <p>
            ${escapeHtml(
              result.error.message
            )}
          </p>

        </div>
      `;

      return;
    }


    const profiles = (result.data || []).filter(function(profile) {
      const derivedAge = profile.date_of_birth ? calculateAge(profile.date_of_birth) : Number(profile.age);
      return Number.isFinite(derivedAge) && derivedAge >= 18;
    });


    if (!profiles.length) {

      grid.innerHTML = `
        <div style="
          grid-column:1/-1;
          text-align:center;
          padding:40px;
        ">

          <h3>
            No profiles available yet.
          </h3>

          <p>
            New members will appear here after registration.
          </p>

        </div>
      `;

      return;
    }


    grid.innerHTML =
      profiles
        .map(
          createPublicProfileCard
        )
        .join("");


  } catch (error) {

    console.error(
      "PUBLIC PROFILE ERROR:",
      error
    );

  }
}


// ============================================================
// HOMEPAGE HERO â€” REAL COMMUNITY PROFILES
// Replaces demo names/photos such as Rahul & Ananya with active
// profiles from the public profiles list.
// ============================================================

async function loadHeroFeaturedProfiles() {
  const photoBox = document.getElementById("heroFeaturedPhoto");
  const infoBox = document.getElementById("heroFeaturedInfo");
  const secondBox = document.getElementById("heroSecondProfile");
  if (!photoBox || !infoBox || !supabaseClient) return;

  try {
    const result = await supabaseClient.from("profiles")
      .select("id,full_name,gender,date_of_birth,age,city,state,community,surname,profile_photo,photo_url,is_active,created_at")
      .eq("is_active", true).order("created_at", {ascending:false}).limit(12);
    if (result.error) { console.error("HERO PROFILES ERROR:", result.error); return; }

    const profiles = (result.data || []).filter(p => {
      const age = p.date_of_birth ? calculateAge(p.date_of_birth) : Number(p.age);
      return Number.isFinite(age) && age >= 18;
    });
    if (!profiles.length) {
      photoBox.innerHTML='<div class="ss-photo-fallback" style="display:grid">&#128100;</div><span class="verified">âœ“ Verified</span>';
      infoBox.innerHTML='<div><b>SamajSaathi Members</b><small>New profiles are joining</small></div><span class="heart">â™¡</span>';
      if (secondBox) secondBox.style.display="none";
      return;
    }

    const first=profiles[0], second=profiles[1]||null;
    const firstAge=first.date_of_birth?calculateAge(first.date_of_birth):Number(first.age);
    const secondAge=second?(second.date_of_birth?calculateAge(second.date_of_birth):Number(second.age)):null;
    const firstPhoto=getProfilePhotoUrl(first.profile_photo||first.photo_url);
    const secondPhoto=second?getProfilePhotoUrl(second.profile_photo||second.photo_url):null;
    const firstName=escapeHtml(first.full_name||"SamajSaathi Member");
    const secondName=escapeHtml(second?.full_name||"New Member");
    const firstMeta=escapeHtml([Number.isFinite(firstAge)?firstAge+" yrs":"",[first.city,first.state].filter(Boolean).join(", ")].filter(Boolean).join(" Â· ")||"Community member");
    const secondMeta=escapeHtml([Number.isFinite(secondAge)?secondAge+" yrs":"",[second?.city,second?.state].filter(Boolean).join(", ")].filter(Boolean).join(" Â· ")||"Community member");

    photoBox.innerHTML=`${firstPhoto?`<img src="${escapeHtml(firstPhoto)}" alt="${firstName}" onerror="this.style.display='none';this.nextElementSibling.style.display='grid';">`:""}<div class="ss-photo-fallback" style="display:${firstPhoto?"none":"grid"}">&#128100;</div><span class="verified">âœ“ Verified</span>`;
    infoBox.innerHTML=`<div><b>${firstName}</b><small>${firstMeta}</small></div><button type="button" class="heart" onclick="viewProfile('${escapeHtml(first.id)}')" aria-label="View profile">â™¡</button>`;

    if (!secondBox) return;
    if (!second) { secondBox.style.display="none"; return; }
    secondBox.style.display="flex";
    secondBox.innerHTML=`${secondPhoto?`<span class="ss-float-photo"><img src="${escapeHtml(secondPhoto)}" alt="${secondName}"></span>`:'<span class="mini-icon">â™¡</span>'}<div><b>${secondName}</b><small>${secondMeta}</small></div>`;
  } catch(error) { console.error("LOAD HERO PROFILES ERROR:",error); }
}

// ============================================================
// PUBLIC PROFILE CARD
// ============================================================

function createPublicProfileCard(profile) {
  const location=[profile.city,profile.state].filter(Boolean).join(", ");
  const photoUrl=getProfilePhotoUrl(profile.profile_photo||profile.photo_url);
  const age=profile.date_of_birth?calculateAge(profile.date_of_birth):Number(profile.age);
  const safeAge=Number.isFinite(age)&&age>=18?age:null;
  const name=escapeHtml(profile.full_name||"SamajSaathi Member");
  const meta=[safeAge?safeAge+" yrs":"",location].filter(Boolean).join(" Â· ");
  const community=[profile.community,profile.surname].filter(Boolean).join(" Â· ");
  return `<article class="ss-feature-card"><div class="ss-feature-photo">${photoUrl?`<img src="${escapeHtml(photoUrl)}" alt="${name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='grid';">`:""}<div class="ss-photo-fallback" style="display:${photoUrl?"none":"grid"}">&#128100;</div><span class="ss-verified">âœ“ Verified</span></div><div class="ss-feature-body"><div class="ss-feature-text"><b>${name}</b><small>${escapeHtml(meta||"Community member")}</small>${community?`<small>${escapeHtml(community)}</small>`:""}</div><button type="button" class="ss-heart" aria-label="View ${name}" onclick="viewProfile('${escapeHtml(profile.id)}')">â™¡</button></div></article>`;
}

// ============================================================
// FIND YOUR MATCHES
// ============================================================

async function loadMatches() {

  const grid =
    document.getElementById(
      "matchesGrid"
    );

  if (!grid) {
    return;
  }


  if (!supabaseClient) {
    return;
  }


  grid.innerHTML = `

    <div style="
      grid-column:1/-1;
      text-align:center;
      padding:40px;
      color:#6f1025;
    ">

      <div style="
        font-size:35px;
        margin-bottom:10px;
      ">
        \u{1F495}
      </div>

      Finding suitable profiles...

    </div>

  `;


  try {

    const sessionResult =
      await supabaseClient.auth
        .getSession();


    const session =
      sessionResult.data?.session;

    if (session && !session.user?.email_confirmed_at) {
      await supabaseClient.auth.signOut();
      openModal("login");
      const loginMessage = document.getElementById("loginMessage");
      showMessage(loginMessage, "Please verify your email address before accessing your account.", "error");
      return;
    }


    if (!session) {

      grid.innerHTML = `

        <div class="samaj-no-matches">

          <h3>
            Please login first
          </h3>

          <p>
            Login to see profiles matching your gender preference.
          </p>

          <button
            type="button"
            class="btn primary"
            onclick="openModal('login')"
          >
            Login
          </button>

        </div>

      `;

      return;
    }


    const currentUserId =
      session.user.id;


    const currentResult =
      await supabaseClient
        .from("profiles")
        .select(`
          id,
          full_name,
          gender,
          age,
          city,
          state,
          community,
          surname,
          kul,
          profile_photo,
          photo_url,
          is_active
        `)
        .eq(
          "id",
          currentUserId
        )
        .maybeSingle();


    if (currentResult.error) {

      grid.innerHTML = `
        <div class="samaj-no-matches">

          <h3>
            Unable to load your profile
          </h3>

          <p>
            ${escapeHtml(
              currentResult.error.message
            )}
          </p>

        </div>
      `;

      return;
    }


    const currentProfile =
      currentResult.data;


    if (!currentProfile) {

      grid.innerHTML = `

        <div class="samaj-no-matches">

          <h3>
            Complete your profile first
          </h3>

          <p>
            Your profile must be created before we can find matches.
          </p>

          <button
            type="button"
            class="btn primary"
            onclick="
              showDashboardSection('edit')
            "
          >
            Complete Profile
          </button>

        </div>

      `;

      return;
    }


    const gender =
      String(
        currentProfile.gender ||
        ""
      )
        .trim()
        .toLowerCase();


    if (
      gender !== "male" &&
      gender !== "female"
    ) {

      grid.innerHTML = `

        <div class="samaj-no-matches">

          <h3>
            Gender information required
          </h3>

          <p>
            Please update your gender in your profile.
          </p>

          <button
            type="button"
            class="btn primary"
            onclick="
              showDashboardSection('edit')
            "
          >
            Edit Profile
          </button>

        </div>

      `;

      return;
    }


    const oppositeGender =
      gender === "male"
        ? "female"
        : "male";


    const matchesResult =
      await supabaseClient
        .from("profiles")
        .select(`
          id,
          full_name,
          gender,
          date_of_birth,
          age,
          city,
          state,
          community,
          surname,
          kul,
          bio,
          education,
          occupation,
          height,
          marital_status,
          profile_photo,
          photo_url,
          is_active,
          created_at
        `)
        .eq(
          "is_active",
          true
        )
        .eq(
          "gender",
          oppositeGender
        )
        .neq(
          "id",
          currentUserId
        )
        .order(
          "created_at",
          {
            ascending:
              false
          }
        );


    if (matchesResult.error) {

      console.error(
        "MATCHES DATABASE ERROR:",
        matchesResult.error
      );

      grid.innerHTML = `

        <div class="samaj-no-matches">

          <div style="
            font-size:42px;
          ">
            \u{26A0}\u{FE0F}
          </div>

          <h3>
            Unable to load matches
          </h3>

          <p>
            ${escapeHtml(
              matchesResult.error.message
            )}
          </p>

          <button
            type="button"
            class="btn primary"
            onclick="loadMatches()"
          >
            Try Again
          </button>

        </div>

      `;

      return;
    }


    const matches =
      matchesResult.data || [];


    if (!matches.length) {

      grid.innerHTML = `

        <div class="samaj-no-matches">

          <div style="
            font-size:55px;
            margin-bottom:10px;
          ">
            \u{1F495}
          </div>

          <h3>
            No matches available yet
          </h3>

          <p>
            We couldn't find any active ${
              oppositeGender === "female"
                ? "women"
                : "men"
            } profiles yet.
          </p>

          <button
            type="button"
            class="btn primary"
            onclick="loadMatches()"
          >
            \u{1F504} Refresh Matches
          </button>

        </div>

      `;

      return;
    }


    // Get interest status for these profiles.
    const matchIds =
      matches.map(
        profile => profile.id
      );


    let interestRows = [];


    const interestResult =
      await supabaseClient
        .from("interests")
        .select(`
          id,
          sender_id,
          receiver_id,
          status
        `)
        .eq(
          "sender_id",
          currentUserId
        )
        .in(
          "receiver_id",
          matchIds
        );


    if (!interestResult.error) {

      interestRows =
        interestResult.data || [];

    } else {

      console.warn(
        "INTEREST STATUS LOAD WARNING:",
        interestResult.error
      );

    }


    grid.innerHTML =
      matches
        .map(
          profile =>
            createMatchCard(
              profile,
              interestRows
            )
        )
        .join("");


  } catch (error) {

    console.error(
      "FIND MATCHES ERROR:",
      error
    );

    grid.innerHTML = `

      <div class="samaj-no-matches">

        <h3>
          Something went wrong
        </h3>

        <p>
          ${escapeHtml(
            error.message ||
            "Please refresh the page and try again."
          )}
        </p>

        <button
          type="button"
          class="btn primary"
          onclick="loadMatches()"
        >
          Try Again
        </button>

      </div>

    `;

  }
}


// ============================================================
// MATCH CARD
// ============================================================

function createMatchCard(
  profile,
  interestRows = []
) {

  const location =
    [
      profile.city,
      profile.state
    ]
      .filter(Boolean)
      .join(", ");


  const photoPath =
    profile.profile_photo ||
    profile.photo_url ||
    null;


  const photoUrl =
    getProfilePhotoUrl(
      photoPath
    );


  const existingInterest =
    interestRows.find(
      row =>
        row.receiver_id ===
        profile.id
    );


  let interestButton =
    `
      <button
        type="button"
        class="samaj-interest-btn"
        onclick="
          sendInterest('${profile.id}')
        "
      >
        \u{2764}\u{FE0F} Send Interest
      </button>
    `;


  if (existingInterest) {

    if (
      existingInterest.status ===
      "pending"
    ) {

      interestButton = `
        <button
          type="button"
          class="samaj-interest-btn"
          disabled
          style="
            opacity:.7;
            cursor:not-allowed;
          "
        >
          \u{2713} Interest Sent
        </button>
      `;

    }

    else if (
      existingInterest.status ===
      "accepted"
    ) {

      interestButton = `
        <button
          type="button"
          class="samaj-interest-btn"
          disabled
          style="
            background:#e8f7ee;
            color:#18794e;
            cursor:default;
          "
        >
          \u{1F49A} Accepted
        </button>
      `;

    }

    else if (
      existingInterest.status ===
      "rejected"
    ) {

      interestButton = `
        <button
          type="button"
          class="samaj-interest-btn"
          onclick="
            sendInterest('${profile.id}', true)
          "
        >
          \u{2764}\u{FE0F} Send Again
        </button>
      `;

    }

  }


  let photoHtml = `

    <div style="
      height:280px;
      background:#f1e5e8;
      display:flex;
      align-items:center;
      justify-content:center;
      overflow:hidden;
    ">

      <span style="
        font-size:75px;
      ">
        \u{1F464}
      </span>

    </div>

  `;


  if (photoUrl) {

    photoHtml = `

      <div style="
        height:280px;
        background:#eee;
        overflow:hidden;
      ">

        <img
          class="samaj-match-photo"
          src="${escapeHtml(
            photoUrl
          )}"
          alt="${escapeHtml(
            profile.full_name ||
            "Profile"
          )}"
          loading="lazy"
          style="
            width:100%;
            height:100%;
            object-fit:cover;
            display:block;
          "
          onerror="
            this.style.display='none';
            this.parentElement.innerHTML='<div style=&quot;height:280px;display:flex;align-items:center;justify-content:center;font-size:75px;background:#f1e5e8;&quot;>\u{1F464}</div>';
          "
        >

      </div>

    `;

  }


  return `

    <article
      class="profile samaj-match-card"
      style="
        background:#fff;
        border:1px solid #ead9dd;
        border-radius:16px;
        overflow:hidden;
        box-shadow:0 8px 25px rgba(80,20,35,.08);
      "
    >

      <div style="
        position:relative;
      ">

        ${photoHtml}

        <span
          class="profile-tag"
          style="
            position:absolute;
            top:12px;
            left:12px;
            z-index:2;
          "
        >
          \u{2713} Verified
        </span>

      </div>

      <div
        class="samaj-match-info"
        style="
          padding:20px;
        "
      >

        <h3 style="
          margin:0 0 10px;
        ">

          ${escapeHtml(
            profile.full_name ||
            "Member"
          )}

          ${
            profile.age
              ? ", " +
                escapeHtml(
                  profile.age
                )
              : ""
          }

        </h3>

        <small style="
          display:block;
          margin-bottom:7px;
        ">

          \u{1F4CD}

          ${escapeHtml(
            location ||
            "Location not specified"
          )}

        </small>

        <small style="
          display:block;
          margin-bottom:7px;
        ">

          ${escapeHtml(
            profile.community ||
            "Community not specified"
          )}

          ${
            profile.surname
              ? " \u{00B7} " +
                escapeHtml(
                  profile.surname
                )
              : ""
          }

        </small>

        <small style="
          display:block;
          margin-bottom:15px;
        ">

          ${
            profile.kul
              ? "Kul: " +
                escapeHtml(
                  profile.kul
                )
              : "Kul: Not specified"
          }

        </small>

        <div
          class="samaj-match-actions"
          style="
            display:flex;
            gap:10px;
            flex-wrap:wrap;
          "
        >

          <button
            type="button"
            class="samaj-view-profile-btn"
            onclick="
              viewProfile('${profile.id}')
            "
          >
            View Profile
          </button>

          ${interestButton}

        </div>

      </div>

    </article>

  `;
}


// ============================================================
// VIEW PROFILE
// ============================================================

function getProfileAge(profile) {
  if (!profile) return null;
  const dobAge = profile.date_of_birth ? calculateAge(profile.date_of_birth) : null;
  if (Number.isFinite(dobAge)) return dobAge;
  const storedAge = Number(profile.age);
  return Number.isFinite(storedAge) ? storedAge : null;
}

function getProfileCompletion(profile) {
  const fields = [
    ['full_name', profile?.full_name],
    ['gender', profile?.gender],
    ['date_of_birth', profile?.date_of_birth],
    ['city', profile?.city],
    ['state', profile?.state],
    ['community', profile?.community],
    ['surname', profile?.surname],
    ['kul', profile?.kul],
    ['marital_status', profile?.marital_status],
    ['height', profile?.height],
    ['education', profile?.education],
    ['occupation', profile?.occupation],
    ['bio', profile?.bio],
    ['native_place', profile?.native_place],
    ['family_type', profile?.family_type],
    ['father_occupation', profile?.father_occupation],
    ['mother_occupation', profile?.mother_occupation],
    ['siblings', profile?.siblings],
    ['income', profile?.income],
    ['work_location', profile?.work_location],
    ['food_preference', profile?.food_preference],
    ['smoking', profile?.smoking],
    ['drinking', profile?.drinking],
    ['interests', profile?.interests],
    ['partner_age_min', profile?.partner_age_min],
    ['partner_age_max', profile?.partner_age_max],
    ['partner_city', profile?.partner_city],
    ['partner_education', profile?.partner_education],
    ['partner_occupation', profile?.partner_occupation],
    ['partner_marital_status', profile?.partner_marital_status],
    ['partner_community', profile?.partner_community],
    ['partner_expectations', profile?.partner_expectations]
  ];
  const filled = fields.filter(([, value]) => value !== null && value !== undefined && String(value).trim() !== '').length;
  return Math.round((filled / fields.length) * 100);
}

function profileCompletionHtml(profile) {
  const percent = getProfileCompletion(profile);
  const missing = [];
  const checks = [
    ['Education', profile?.education],
    ['Occupation', profile?.occupation],
    ['Height', profile?.height],
    ['About Me', profile?.bio],
    ['Native Place', profile?.native_place],
    ['Family Details', profile?.family_type || profile?.father_occupation || profile?.mother_occupation],
    ['Lifestyle', profile?.food_preference || profile?.smoking || profile?.drinking],
    ['Partner Preferences', profile?.partner_age_min || profile?.partner_age_max || profile?.partner_city || profile?.partner_education || profile?.partner_occupation || profile?.partner_expectations]
  ];
  checks.forEach(([label, value]) => { if (!value) missing.push(label); });
  return `
    <div style="margin:20px 0;padding:18px 20px;background:linear-gradient(135deg,#fff7f8,#f8f1f3);border:1px solid #ead8df;border-radius:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:10px;">
        <div><strong style="font-size:15px;">Profile Completion</strong><div style="font-size:12px;color:#806b73;margin-top:3px;">Complete your profile to receive better matches.</div></div>
        <strong style="font-size:20px;color:#6f1025;">${percent}%</strong>
      </div>
      <div style="height:9px;background:#eadfe3;border-radius:999px;overflow:hidden;"><div style="height:100%;width:${percent}%;background:linear-gradient(90deg,#6f1025,#7a3bd2);border-radius:999px;transition:width .3s ease;"></div></div>
      ${missing.length ? `<div style="margin-top:12px;font-size:12px;color:#765c65;"><strong>Still missing:</strong> ${missing.map(escapeHtml).join(' Â· ')}</div>` : `<div style="margin-top:12px;font-size:12px;color:#39734a;font-weight:700;">âœ“ Your profile is complete.</div>`}
    </div>`;
}

async function viewProfile(
  profileId
) {
  if (!profileId || !isSupabaseReady()) return;

  const result = await supabaseClient
    .from("profiles")
    .select(`
      id, full_name, gender, date_of_birth, age, city, state,
      community, surname, kul, bio, education, occupation, height,
      marital_status, profile_photo, photo_url, native_place,
      family_type, family_status, father_occupation, mother_occupation,
      siblings, income, work_location, food_preference, smoking,
      drinking, interests, partner_age_min, partner_age_max,
      partner_city, partner_education, partner_occupation,
      partner_marital_status, partner_community, partner_expectations
    `)
    .eq("id", profileId)
    .maybeSingle();

  if (result.error) {
    alert("Profile could not be loaded: " + result.error.message);
    return;
  }
  if (!result.data) {
    alert("Profile not found.");
    return;
  }

  const profile = result.data;
  const age = getProfileAge(profile);
  document.getElementById("samajProfileViewer")?.remove();

  const photoPath = profile.profile_photo || profile.photo_url || null;
  const photoUrl = getProfilePhotoUrl(photoPath);
  const photoHtml = photoUrl
    ? `<img src="${escapeHtml(photoUrl)}" alt="${escapeHtml(profile.full_name || "Profile")}" style="width:150px;height:150px;border-radius:50%;object-fit:cover;display:block;margin:0 auto 20px;" onerror="this.style.display='none';">`
    : `<div style="width:150px;height:150px;border-radius:50%;background:#f1e5e8;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:55px;">&#128100;</div>`;

  const section = (title, items) => `
    <div style="margin-top:22px;">
      <h3 style="margin:0 0 10px;font-size:15px;color:#6f1025;">${escapeHtml(title)}</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;">${items.join('')}</div>
    </div>`;

  const location = [profile.city, profile.state].filter(Boolean).join(", ");
  const partnerAge = [profile.partner_age_min, profile.partner_age_max].filter(v => v !== null && v !== undefined && v !== '').join('â€“');

  const modal = document.createElement("div");
  modal.id = "samajProfileViewer";
  modal.style.cssText = "position:fixed;inset:0;z-index:10001;background:rgba(20,10,15,.72);display:flex;align-items:center;justify-content:center;padding:20px;overflow:auto;";
  modal.innerHTML = `
    <div style="width:min(650px,100%);max-height:90vh;overflow:auto;background:#fff;border-radius:22px;padding:30px;position:relative;box-shadow:0 25px 80px rgba(0,0,0,.25);">
      <button type="button" onclick="document.getElementById('samajProfileViewer')?.remove()" style="position:absolute;top:15px;right:15px;width:38px;height:38px;border:0;border-radius:50%;background:#f5edef;cursor:pointer;font-size:20px;">Ã—</button>
      ${photoHtml}
      <div style="text-align:center;">
        <span class="eyebrow">SAMAJSAATHI MEMBER</span>
        <h2 style="margin:8px 0;">${escapeHtml(profile.full_name || "Member")}${age !== null ? ", " + escapeHtml(age) : ""}</h2>
        ${location ? `<div style="color:#806b73;font-size:13px;">ðŸ“ ${escapeHtml(location)}</div>` : ''}
      </div>

      ${section("Basic & Community", [
        profileViewerItem("Gender", profile.gender),
        profileViewerItem("Age", age),
        profileViewerItem("City", location),
        profileViewerItem("Native Place", profile.native_place),
        profileViewerItem("Community / Jati", profile.community),
        profileViewerItem("Surname", profile.surname),
        profileViewerItem("Kul / Clan", profile.kul),
        profileViewerItem("Marital Status", profile.marital_status)
      ])}

      ${section("Education & Career", [
        profileViewerItem("Education", profile.education),
        profileViewerItem("Occupation", profile.occupation),
        profileViewerItem("Work Location", profile.work_location),
        profileViewerItem("Income", profile.income),
        profileViewerItem("Height", profile.height)
      ])}

      ${section("Family", [
        profileViewerItem("Family Type", profile.family_type),
        profileViewerItem("Family Status", profile.family_status),
        profileViewerItem("Father's Occupation", profile.father_occupation),
        profileViewerItem("Mother's Occupation", profile.mother_occupation),
        profileViewerItem("Siblings", profile.siblings)
      ])}

      ${section("Lifestyle & Interests", [
        profileViewerItem("Food Preference", profile.food_preference),
        profileViewerItem("Smoking", profile.smoking),
        profileViewerItem("Drinking", profile.drinking),
        profileViewerItem("Interests", profile.interests)
      ])}

      ${profile.bio ? `<div style="margin-top:22px;padding:18px;background:#f8f1f3;border-radius:14px;"><strong>About Me</strong><p style="margin:8px 0 0;white-space:pre-wrap;">${escapeHtml(profile.bio)}</p></div>` : ''}

      ${section("Partner Preferences", [
        profileViewerItem("Preferred Age", partnerAge),
        profileViewerItem("Preferred Location", profile.partner_city),
        profileViewerItem("Education", profile.partner_education),
        profileViewerItem("Occupation", profile.partner_occupation),
        profileViewerItem("Marital Status", profile.partner_marital_status),
        profileViewerItem("Community", profile.partner_community)
      ])}

      ${profile.partner_expectations ? `<div style="margin-top:12px;padding:16px;background:#faf6f7;border-radius:14px;"><strong style="font-size:13px;">Partner Expectations</strong><p style="margin:7px 0 0;white-space:pre-wrap;">${escapeHtml(profile.partner_expectations)}</p></div>` : ''}

      <div style="margin-top:25px;text-align:center;">
        <button type="button" class="samaj-interest-btn" onclick="sendInterest('${profile.id}')">â™¥ Send Interest</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener("click", event => { if (event.target === modal) modal.remove(); });
}

function profileViewerItem(
  label,
  value
) {

  return `

    <div style="
      background:#fff;
      border:1px solid #eee;
      border-radius:12px;
      padding:14px;
    ">

      <small style="
        display:block;
        color:#777;
        margin-bottom:5px;
      ">

        ${escapeHtml(
          label
        )}

      </small>

      <strong>

        ${escapeHtml(
          value ||
          "Not specified"
        )}

      </strong>

    </div>

  `;
}


// ============================================================
// SEND INTEREST
// ============================================================

async function sendInterest(
  profileId,
  resend = false
) {

  if (!profileId) {
    return;
  }

  if (!isSupabaseReady()) {
    return;
  }


  const sessionResult =
    await supabaseClient.auth
      .getSession();


  const session =
    sessionResult.data?.session;


  if (!session) {

    openModal(
      "login"
    );

    return;
  }


  const senderId =
    session.user.id;


  if (
    profileId ===
    senderId
  ) {

    alert(
      "You cannot send interest to your own profile."
    );

    return;
  }


  try {

    // ========================================================
    // CHECK EXISTING INTEREST
    // ========================================================

    const existingResult =
      await supabaseClient
        .from("interests")
        .select(`
          id,
          sender_id,
          receiver_id,
          status
        `)
        .eq(
          "sender_id",
          senderId
        )
        .eq(
          "receiver_id",
          profileId
        )
        .maybeSingle();


    if (existingResult.error) {

      console.error(
        "INTEREST CHECK ERROR:",
        existingResult.error
      );

      alert(
        "Interest system error: " +
        existingResult.error.message
      );

      return;
    }


    const existing =
      existingResult.data;


    if (
      existing &&
      existing.status ===
      "pending"
    ) {

      markInterestSentUI(
        profileId
      );

      alert(
        "\u{2764}\u{FE0F} You have already sent interest to this profile."
      );

      return;
    }


    if (
      existing &&
      existing.status ===
      "accepted"
    ) {

      markInterestAcceptedUI(
        profileId
      );

      alert(
        "\u{1F49A} Your interest has already been accepted."
      );

      return;
    }


    // ========================================================
    // INSERT NEW INTEREST OR RESEND AFTER REJECTION
    // ========================================================

    let result;
    let interestId = null;


    if (
      existing &&
      existing.status ===
      "rejected"
    ) {

      result =
        await supabaseClient
          .from("interests")
          .update({

            status:
              "pending",

            updated_at:
              new Date().toISOString()

          })
          .eq(
            "id",
            existing.id
          )
          .eq(
            "sender_id",
            senderId
          )
          .eq(
            "receiver_id",
            profileId
          )
          .select("id")
          .single();


      interestId =
        result.data?.id ||
        existing.id;

    }

    else {

      result =
        await supabaseClient
          .from("interests")
          .insert({

            sender_id:
              senderId,

            receiver_id:
              profileId,

            status:
              "pending"

          })
          .select("id")
          .single();


      interestId =
        result.data?.id ||
        null;

    }


    if (result.error) {

      console.error(
        "SEND INTEREST ERROR:",
        result.error
      );

      alert(
        "Could not send interest: " +
        result.error.message
      );

      return;
    }


    // ========================================================
    // IMMEDIATELY UPDATE SENDER UI
    // ========================================================

    markInterestSentUI(
      profileId
    );


    // ========================================================
    // CREATE RECEIVER NOTIFICATION
    // IMPORTANT:
    // Notification failure must NOT make the interest fail.
    // ========================================================

    await createInterestNotification(
      senderId,
      profileId,
      interestId
    );


    // ========================================================
    // REFRESH SENDER INTERESTS / MATCHES
    // ========================================================

    const viewer =
      document.getElementById(
        "samajProfileViewer"
      );


    if (viewer) {
      viewer.remove();
    }


    await loadMatches();


    const interestsSection =
      document.getElementById(
        "dashboardSection-interests"
      );


    if (
      interestsSection &&
      !interestsSection.classList.contains(
        "samaj-section-hidden"
      )
    ) {

      await loadMyInterests();

    }


    alert(
      "\u{2764}\u{FE0F} Interest sent successfully!"
    );


    return true;


  } catch (error) {

    console.error(
      "SEND INTEREST ERROR:",
      error
    );

    alert(
      "Something went wrong: " +
      error.message
    );

    return false;
  }
}


// ============================================================
// SENDER UI HELPERS
// ============================================================

function markInterestSentUI(
  profileId
) {

  if (!profileId) {
    return;
  }


  // Match cards
  document
    .querySelectorAll(
      ".samaj-match-card"
    )
    .forEach(
      function(card) {

        const buttons =
          card.querySelectorAll(
            "button"
          );


        buttons.forEach(
          function(button) {

            const onclick =
              button.getAttribute(
                "onclick"
              ) || "";


            if (
              onclick.includes(
                "sendInterest('" +
                profileId +
                "'"
              )
            ) {

              button.disabled =
                true;

              button.innerHTML =
                "\u{2713} Interest Sent";

              button.style.opacity =
                ".7";

              button.style.cursor =
                "not-allowed";

            }

          }
        );

      }
    );


  // Profile viewer button
  const viewer =
    document.getElementById(
      "samajProfileViewer"
    );


  if (viewer) {

    viewer
      .querySelectorAll(
        "button"
      )
      .forEach(
        function(button) {

          const onclick =
            button.getAttribute(
              "onclick"
            ) || "";


          if (
            onclick.includes(
              "sendInterest('" +
              profileId +
              "'"
            )
          ) {

            button.disabled =
              true;

            button.innerHTML =
              "\u{2713} Interest Sent";

            button.style.opacity =
              ".7";

          }

        }
      );

  }

}


function markInterestAcceptedUI(
  profileId
) {

  document
    .querySelectorAll(
      ".samaj-match-card"
    )
    .forEach(
      function(card) {

        const buttons =
          card.querySelectorAll(
            "button"
          );


        buttons.forEach(
          function(button) {

            const onclick =
              button.getAttribute(
                "onclick"
              ) || "";


            if (
              onclick.includes(
                "sendInterest('" +
                profileId +
                "'"
              )
            ) {

              button.disabled =
                true;

              button.innerHTML =
                "\u{1F49A} Accepted";

            }

          }
        );

      }
    );
}


// ============================================================
// CREATE INTEREST NOTIFICATION
// ============================================================

async function createInterestNotification(
  senderId,
  receiverId,
  interestId
) {

  if (
    !supabaseClient ||
    !senderId ||
    !receiverId
  ) {
    return false;
  }


  try {

    let senderName =
      "A SamajSaathi member";


    const senderResult =
      await supabaseClient
        .from("profiles")
        .select("full_name")
        .eq(
          "id",
          senderId
        )
        .maybeSingle();


    if (
      !senderResult.error &&
      senderResult.data?.full_name
    ) {

      senderName =
        senderResult.data.full_name;

    }


    const notificationResult =
      await supabaseClient
        .from("notifications")
        .insert({

          user_id:
            receiverId,

          sender_id:
            senderId,

          interest_id:
            interestId || null,

          type:
            "interest",

          title:
            "New Interest \u{2764}\u{FE0F}",

          message:
            senderName +
            " has sent you an interest.",

          is_read:
            false

        });


    if (
      notificationResult.error
    ) {

      console.warn(
        "NOTIFICATION INSERT WARNING:",
        notificationResult.error
      );

      return false;
    }


    return true;


  } catch (error) {

    console.warn(
      "NOTIFICATION ERROR:",
      error
    );

    return false;
  }
}


// ============================================================
// CREATE RESPONSE NOTIFICATION
// ============================================================

async function createInterestResponseNotification(
  receiverId,
  senderId,
  interestId,
  status
) {

  if (
    !supabaseClient ||
    !receiverId ||
    !senderId
  ) {
    return false;
  }


  try {

    const receiverResult =
      await supabaseClient
        .from("profiles")
        .select("full_name")
        .eq(
          "id",
          receiverId
        )
        .maybeSingle();


    const receiverName =
      receiverResult.data?.full_name ||
      "The member";


    const accepted =
      status ===
      "accepted";


    const notificationResult =
      await supabaseClient
        .from("notifications")
        .insert({

          user_id:
            senderId,

          sender_id:
            receiverId,

          interest_id:
            interestId || null,

          type:
            accepted
              ? "interest_accepted"
              : "interest_rejected",

          title:
            accepted
              ? "Interest Accepted \u{1F49A}"
              : "Interest Update",

          message:
            accepted
              ? receiverName +
                " has accepted your interest."
              : receiverName +
                " has declined your interest.",

          is_read:
            false

        });


    if (
      notificationResult.error
    ) {

      console.warn(
        "RESPONSE NOTIFICATION WARNING:",
        notificationResult.error
      );

      return false;
    }


    return true;


  } catch (error) {

    console.warn(
      "RESPONSE NOTIFICATION ERROR:",
      error
    );

    return false;
  }
}


// ============================================================
// LOAD NOTIFICATIONS
// ============================================================

async function loadNotifications() {

  const container =
    document.getElementById(
      "notificationsContainer"
    );


  if (!supabaseClient) {
    return;
  }


  const sessionResult =
    await supabaseClient.auth
      .getSession();


  const session =
    sessionResult.data?.session;


  if (!session) {
    return;
  }


  if (container) {

    container.innerHTML = `
      <div style="
        text-align:center;
        padding:30px;
      ">
        Loading notifications...
      </div>
    `;

  }


  try {

    const result =
      await supabaseClient
        .from("notifications")
        .select(`
          id,
          user_id,
          sender_id,
          interest_id,
          type,
          title,
          message,
          is_read,
          created_at
        `)
        .eq(
          "user_id",
          session.user.id
        )
        .order(
          "created_at",
          {
            ascending:
              false
          }
        );


    if (result.error) {

      console.error(
        "NOTIFICATIONS LOAD ERROR:",
        result.error
      );


      if (container) {

        container.innerHTML = `
          <div class="samaj-coming-soon">

            <h3>
              Unable to load notifications
            </h3>

            <p>
              ${escapeHtml(
                result.error.message
              )}
            </p>

          </div>
        `;

      }

      return;
    }


    const notifications =
      result.data || [];


    updateNotificationBadge(
      notifications
    );


    if (!container) {
      return;
    }


    if (!notifications.length) {

      container.innerHTML = `
        <div class="samaj-coming-soon">

          <div class="samaj-coming-soon-icon">
            \u{1F514}
          </div>

          <h3>
            No new notifications
          </h3>

          <p>
            Important SamajSaathi updates will appear here.
          </p>

        </div>
      `;

      return;
    }


    container.innerHTML =
      notifications
        .map(
          function(notification) {

            const unreadStyle =
              notification.is_read
                ? "background:#fff;"
                : "background:#fff8e6;";


            return `

              <article
                style="
                  ${unreadStyle}
                  border:1px solid #ead9dd;
                  border-radius:16px;
                  padding:18px;
                  margin-bottom:12px;
                "
              >

                <div style="
                  display:flex;
                  gap:12px;
                  align-items:flex-start;
                ">

                  <div style="
                    width:44px;
                    height:44px;
                    border-radius:50%;
                    background:#f8f1f3;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    flex-shrink:0;
                    font-size:22px;
                  ">
                    \u{1F514}
                  </div>

                  <div style="
                    flex:1;
                  ">

                    <strong>
                      ${escapeHtml(
                        notification.title ||
                        "Notification"
                      )}
                    </strong>

                    <p style="
                      margin:6px 0;
                    ">
                      ${escapeHtml(
                        notification.message ||
                        ""
                      )}
                    </p>

                    <small style="
                      opacity:.65;
                    ">
                      ${escapeHtml(
                        formatNotificationDate(
                          notification.created_at
                        )
                      )}
                    </small>

                  </div>

                  ${
                    !notification.is_read
                      ? `
                        <span style="
                          width:9px;
                          height:9px;
                          border-radius:50%;
                          background:#6f1025;
                          flex-shrink:0;
                          margin-top:7px;
                        "></span>
                      `
                      : ""
                  }

                </div>

              </article>

            `;

          }
        )
        .join("");


  } catch (error) {

    console.error(
      "NOTIFICATIONS ERROR:",
      error
    );

  }

}


// ============================================================
// NOTIFICATION HELPERS
// ============================================================

function formatNotificationDate(
  value
) {

  if (!value) {
    return "";
  }


  const date =
    new Date(value);


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }


  return date.toLocaleString(
    "en-IN",
    {
      day:
        "numeric",

      month:
        "short",

      year:
        "numeric",

      hour:
        "numeric",

      minute:
        "2-digit"
    }
  );

}


function updateNotificationBadge(
  notifications
) {

  const unread =
    (notifications || [])
      .filter(
        item =>
          !item.is_read
      )
      .length;


  const badgeIds = [
    "notificationBadge",
    "notificationCount"
  ];


  badgeIds.forEach(
    function(id) {

      const badge =
        document.getElementById(
          id
        );


      if (!badge) {
        return;
      }


      if (unread > 0) {

        badge.textContent =
          unread > 99
            ? "99+"
            : String(unread);

        badge.style.display =
          "inline-flex";

      } else {

        badge.textContent =
          "";

        badge.style.display =
          "none";

      }

    }
  );

}


async function markNotificationsRead() {

  if (!supabaseClient) {
    return;
  }


  const sessionResult =
    await supabaseClient.auth
      .getSession();


  const session =
    sessionResult.data?.session;


  if (!session) {
    return;
  }


  const result =
    await supabaseClient
      .from("notifications")
      .update({
        is_read:
          true
      })
      .eq(
        "user_id",
        session.user.id
      )
      .eq(
        "is_read",
        false
      );


  if (result.error) {

    console.warn(
      "MARK NOTIFICATIONS READ:",
      result.error
    );

    return;
  }


  await loadNotifications();
}


// ============================================================
// LOAD MY INTERESTS
// ============================================================

// ============================================================
// LOAD MY INTERESTS
// ============================================================

async function loadMyInterests() {

  const container =
    document.getElementById(
      "myInterestsContainer"
    );

  if (!container) {
    return;
  }


  if (!supabaseClient) {
    return;
  }


  const sessionResult =
    await supabaseClient.auth
      .getSession();


  const session =
    sessionResult.data?.session;


  if (!session) {

    container.innerHTML = `
      <div class="samaj-coming-soon">
        <h3>
          Please login first
        </h3>
      </div>
    `;

    return;
  }


  container.innerHTML = `
    <div style="
      text-align:center;
      padding:35px;
    ">
      Loading your interests...
    </div>
  `;


  try {

    const result =
      await supabaseClient
        .from("interests")
        .select(`
          id,
          receiver_id,
          status,
          created_at,
          updated_at
        `)
        .eq(
          "sender_id",
          session.user.id
        )
        .order(
          "created_at",
          {
            ascending:
              false
          }
        );


    if (result.error) {

      container.innerHTML = `
        <div class="samaj-coming-soon">

          <h3>
            Unable to load interests
          </h3>

          <p>
            ${escapeHtml(
              result.error.message
            )}
          </p>

        </div>
      `;

      return;
    }


    const interests =
      result.data || [];


    if (!interests.length) {

      container.innerHTML = `
        <div class="samaj-coming-soon">

          <div class="samaj-coming-soon-icon">
            \u{2764}\u{FE0F}
          </div>

          <h3>
            No interests yet
          </h3>

          <p>
            Profiles you show interest in will appear here.
          </p>

          <button
            type="button"
            class="btn primary"
            onclick="
              showDashboardSection('matches')
            "
          >
            Find Matches
          </button>

        </div>
      `;

      return;
    }


    const profileIds =
      interests.map(
        item =>
          item.receiver_id
      );


    const profilesResult =
      await supabaseClient
        .from("profiles")
        .select(`
          id,
          full_name,
          date_of_birth,
          age,
          city,
          state,
          profile_photo,
          photo_url
        `)
        .in(
          "id",
          profileIds
        );


    const profiles =
      profilesResult.data || [];


    const profileMap =
      new Map(
        profiles.map(
          profile => [
            profile.id,
            profile
          ]
        )
      );


    container.innerHTML =
      interests
        .map(
          interest => {

            const profile =
              profileMap.get(
                interest.receiver_id
              );


            if (!profile) {
              return "";
            }


            const photo =
              getProfilePhotoUrl(
                profile.profile_photo ||
                profile.photo_url
              );


            let statusHtml =
              `
                <span style="
                  display:inline-block;
                  padding:6px 10px;
                  border-radius:20px;
                  background:#fff4d6;
                  color:#7a4d00;
                  font-size:12px;
                ">
                  \u{23F3} Pending
                </span>
              `;


            if (
              interest.status ===
              "accepted"
            ) {

              statusHtml =
                `
                  <span style="
                    display:inline-block;
                    padding:6px 10px;
                    border-radius:20px;
                    background:#e7f7ed;
                    color:#18794e;
                    font-size:12px;
                  ">
                    \u{1F49A} Accepted
                  </span>
                `;

            }


            if (
              interest.status ===
              "rejected"
            ) {

              statusHtml =
                `
                  <span style="
                    display:inline-block;
                    padding:6px 10px;
                    border-radius:20px;
                    background:#fff0f0;
                    color:#b42318;
                    font-size:12px;
                  ">
                    \u{274C} Rejected
                  </span>
                `;

            }


            return `

              <article style="
                background:#fff;
                border:1px solid #ead9dd;
                border-radius:16px;
                padding:18px;
                display:flex;
                gap:15px;
                align-items:center;
                margin-bottom:12px;
              ">

                <div style="
                  width:75px;
                  height:75px;
                  border-radius:50%;
                  overflow:hidden;
                  background:#f1e5e8;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  flex-shrink:0;
                ">

                  ${
                    photo
                      ? `
                        <img
                          src="${escapeHtml(photo)}"
                          style="
                            width:100%;
                            height:100%;
                            object-fit:cover;
                          "
                        >
                      `
                      : `
                        <span style="
                          font-size:30px;
                        ">
                          \u{1F464}
                        </span>
                      `
                  }

                </div>

                <div style="
                  flex:1;
                ">

                  <h3 style="
                    margin:0 0 6px;
                  ">

                    ${escapeHtml(
                      profile.full_name ||
                      "Member"
                    )}

                    ${
                      profile.age
                        ? ", " +
                          escapeHtml(
                            profile.age
                          )
                        : ""
                    }

                  </h3>

                  <small style="
                    display:block;
                    margin-bottom:8px;
                  ">

                    \u{1F4CD}

                    ${escapeHtml(
                      [
                        profile.city,
                        profile.state
                      ]
                        .filter(Boolean)
                        .join(", ") ||
                      "Location not specified"
                    )}

                  </small>

                  ${statusHtml}

                </div>

                <button
                  type="button"
                  class="samaj-view-profile-btn"
                  onclick="
                    viewProfile('${profile.id}')
                  "
                >
                  View
                </button>

              </article>

            `;

          }
        )
        .join("");


  } catch (error) {

    console.error(
      "MY INTERESTS ERROR:",
      error
    );

    container.innerHTML = `
      <div class="samaj-coming-soon">

        <h3>
          Something went wrong
        </h3>

        <p>
          ${escapeHtml(
            error.message
          )}
        </p>

      </div>
    `;

  }
}


// ============================================================
// LOAD RECEIVED INTERESTS
// ============================================================

async function loadReceivedInterests() {

  const container =
    document.getElementById(
      "receivedInterestsContainer"
    );

  if (!container) {
    return;
  }


  if (!supabaseClient) {
    return;
  }


  const sessionResult =
    await supabaseClient.auth
      .getSession();


  const session =
    sessionResult.data?.session;


  if (!session) {
    return;
  }


  container.innerHTML = `
    <div style="
      text-align:center;
      padding:35px;
    ">
      Loading received interests...
    </div>
  `;


  try {

    const result =
      await supabaseClient
        .from("interests")
        .select(`
          id,
          sender_id,
          status,
          created_at,
          updated_at
        `)
        .eq(
          "receiver_id",
          session.user.id
        )
        .order(
          "created_at",
          {
            ascending:
              false
          }
        );


    if (result.error) {

      container.innerHTML = `
        <div class="samaj-coming-soon">

          <h3>
            Unable to load received interests
          </h3>

          <p>
            ${escapeHtml(
              result.error.message
            )}
          </p>

        </div>
      `;

      return;
    }


    const interests =
      result.data || [];


    if (!interests.length) {

      container.innerHTML = `
        <div class="samaj-coming-soon">

          <div class="samaj-coming-soon-icon">
            \u{1F48C}
          </div>

          <h3>
            No interests received yet
          </h3>

          <p>
            When someone sends you an interest, it will appear here.
          </p>

        </div>
      `;

      return;
    }


    const profileIds =
      interests.map(
        item =>
          item.sender_id
      );


    const profilesResult =
      await supabaseClient
        .from("profiles")
        .select(`
          id,
          full_name,
          age,
          city,
          state,
          community,
          surname,
          kul,
          profile_photo,
          photo_url
        `)
        .in(
          "id",
          profileIds
        );


    const profiles =
      profilesResult.data || [];


    const profileMap =
      new Map(
        profiles.map(
          profile => [
            profile.id,
            profile
          ]
        )
      );


    container.innerHTML =
      interests
        .map(
          interest => {

            const profile =
              profileMap.get(
                interest.sender_id
              );


            if (!profile) {
              return "";
            }


            const photo =
              getProfilePhotoUrl(
                profile.profile_photo ||
                profile.photo_url
              );


            let statusHtml =
              `
                <span style="
                  display:inline-block;
                  padding:6px 10px;
                  border-radius:20px;
                  background:#fff4d6;
                  color:#7a4d00;
                  font-size:12px;
                ">
                  \u{23F3} Pending
                </span>
              `;


            if (
              interest.status ===
              "accepted"
            ) {

              statusHtml =
                `
                  <span style="
                    display:inline-block;
                    padding:6px 10px;
                    border-radius:20px;
                    background:#e7f7ed;
                    color:#18794e;
                    font-size:12px;
                  ">
                    \u{1F49A} Accepted
                  </span>
                `;

            }


            if (
              interest.status ===
              "rejected"
            ) {

              statusHtml =
                `
                  <span style="
                    display:inline-block;
                    padding:6px 10px;
                    border-radius:20px;
                    background:#fff0f0;
                    color:#b42318;
                    font-size:12px;
                  ">
                    \u{274C} Rejected
                  </span>
                `;

            }


            const actionButtons =
              interest.status ===
              "pending"
                ? `
                  <div style="
                    display:flex;
                    gap:8px;
                    flex-wrap:wrap;
                    margin-top:12px;
                  ">

                    <button
                      type="button"
                      class="btn primary"
                      onclick="
                        respondToInterest(
                          '${interest.id}',
                          'accepted'
                        )
                      "
                    >
                      \u{1F49A} Accept
                    </button>

                    <button
                      type="button"
                      class="btn ghost"
                      onclick="
                        respondToInterest(
                          '${interest.id}',
                          'rejected'
                        )
                      "
                    >
                      \u{274C} Reject
                    </button>

                    <button
                      type="button"
                      class="samaj-view-profile-btn"
                      onclick="
                        viewProfile(
                          '${profile.id}'
                        )
                      "
                    >
                      View Profile
                    </button>

                  </div>
                `
                : `
                  <div style="
                    margin-top:12px;
                  ">

                    <button
                      type="button"
                      class="samaj-view-profile-btn"
                      onclick="
                        viewProfile(
                          '${profile.id}'
                        )
                      "
                    >
                      View Profile
                    </button>

                  </div>
                `;


            return `

              <article style="
                background:#fff;
                border:1px solid #ead9dd;
                border-radius:16px;
                padding:18px;
                margin-bottom:12px;
              ">

                <div style="
                  display:flex;
                  gap:15px;
                  align-items:center;
                ">

                  <div style="
                    width:75px;
                    height:75px;
                    border-radius:50%;
                    overflow:hidden;
                    background:#f1e5e8;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    flex-shrink:0;
                  ">

                    ${
                      photo
                        ? `
                          <img
                            src="${escapeHtml(photo)}"
                            style="
                              width:100%;
                              height:100%;
                              object-fit:cover;
                            "
                          >
                        `
                        : `
                          <span style="
                            font-size:30px;
                          ">
                            \u{1F464}
                          </span>
                        `
                    }

                  </div>

                  <div style="
                    flex:1;
                  ">

                    <h3 style="
                      margin:0 0 6px;
                    ">

                      ${escapeHtml(
                        profile.full_name ||
                        "Member"
                      )}

                      ${
                        profile.age
                          ? ", " +
                            escapeHtml(
                              profile.age
                            )
                          : ""
                      }

                    </h3>

                    <small style="
                      display:block;
                      margin-bottom:6px;
                    ">

                      \u{1F4CD}

                      ${escapeHtml(
                        [
                          profile.city,
                          profile.state
                        ]
                          .filter(Boolean)
                          .join(", ") ||
                        "Location not specified"
                      )}

                    </small>

                    <small style="
                      display:block;
                      margin-bottom:8px;
                    ">

                      ${escapeHtml(
                        profile.community ||
                        ""
                      )}

                      ${
                        profile.surname
                          ? " \u{00B7} " +
                            escapeHtml(
                              profile.surname
                            )
                          : ""
                      }

                    </small>

                    ${statusHtml}

                  </div>

                </div>

                ${actionButtons}

              </article>

            `;

          }
        )
        .join("");


  } catch (error) {

    console.error(
      "RECEIVED INTEREST ERROR:",
      error
    );

    container.innerHTML = `
      <div class="samaj-coming-soon">

        <h3>
          Something went wrong
        </h3>

        <p>
          ${escapeHtml(
            error.message
          )}
        </p>

      </div>
    `;

  }
}


// ============================================================
// ACCEPT / REJECT INTEREST
// ============================================================

async function respondToInterest(
  interestId,
  status
) {

  if (!interestId) {
    return;
  }


  if (
    status !== "accepted" &&
    status !== "rejected"
  ) {
    return;
  }


  if (!isSupabaseReady()) {
    return;
  }


  const sessionResult =
    await supabaseClient.auth
      .getSession();


  const session =
    sessionResult.data?.session;


  if (!session) {

    openModal(
      "login"
    );

    return;
  }


  try {

    // Get the interest first so we know the sender.
    const interestResult =
      await supabaseClient
        .from("interests")
        .select(`
          id,
          sender_id,
          receiver_id,
          status
        `)
        .eq(
          "id",
          interestId
        )
        .eq(
          "receiver_id",
          session.user.id
        )
        .maybeSingle();


    if (interestResult.error) {

      alert(
        "Could not load interest: " +
        interestResult.error.message
      );

      return;
    }


    const interest =
      interestResult.data;


    if (!interest) {

      alert(
        "Interest not found."
      );

      return;
    }


    const result =
      await supabaseClient
        .from("interests")
        .update({

          status:
            status,

          updated_at:
            new Date().toISOString()

        })
        .eq(
          "id",
          interestId
        )
        .eq(
          "receiver_id",
          session.user.id
        );


    if (result.error) {

      alert(
        "Could not update interest: " +
        result.error.message
      );

      return;
    }


    // Notify the original sender.
    await createInterestResponseNotification(
      session.user.id,
      interest.sender_id,
      interestId,
      status
    );


    await loadReceivedInterests();

    await loadMyInterests();

    await loadMatches();

    await loadNotifications();

    if (status === "accepted") {
      await updateHomepageUserUI();
      await loadHomepageMatches();
    }


    alert(
      status === "accepted"
        ? "\u{1F49A} Interest accepted!"
        : "Interest rejected."
    );


  } catch (error) {

    console.error(
      "RESPOND INTEREST ERROR:",
      error
    );

    alert(
      "Something went wrong: " +
      error.message
    );

  }
}


// ============================================================
// OPEN FIND MATCHES
// ============================================================

// ============================================================
// OPEN FIND MATCHES
// ============================================================

async function openFindMatches() {

  if (!isSupabaseReady()) {
    return;
  }


  const sessionResult =
    await supabaseClient.auth
      .getSession();


  const session =
    sessionResult.data?.session;


  if (!session) {

    openModal(
      "login"
    );

    return;
  }


  await openDashboard();


  setTimeout(
    function() {

      showDashboardSection(
        "matches"
      );

    },
    300
  );

}



// ============================================================
// PREMIUM DASHBOARD MENU STYLES
// ============================================================

function ensureSamajSaathiPremiumStyles() {

  if (document.getElementById("samajSaathiPremiumStyles")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "samajSaathiPremiumStyles";

  style.textContent = `
    .samaj-dashboard-menu {
      display:grid !important;
      grid-template-columns:repeat(auto-fit,minmax(155px,1fr)) !important;
      gap:12px !important;
      margin:0 0 28px !important;
    }

    .samaj-dashboard-menu-btn {
      appearance:none !important;
      -webkit-appearance:none !important;
      width:100% !important;
      min-height:94px !important;
      padding:16px 12px !important;
      border:1px solid rgba(124,58,237,.14) !important;
      border-radius:18px !important;
      background:linear-gradient(145deg,#ffffff,#fbf7ff) !important;
      color:#24152f !important;
      box-shadow:0 7px 22px rgba(76,29,149,.08) !important;
      cursor:pointer !important;
      display:flex !important;
      flex-direction:column !important;
      align-items:center !important;
      justify-content:center !important;
      gap:6px !important;
      text-align:center !important;
      font-family:inherit !important;
      transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease,background .2s ease !important;
    }

    .samaj-dashboard-menu-btn:hover {
      transform:translateY(-3px) !important;
      border-color:rgba(124,58,237,.35) !important;
      box-shadow:0 13px 30px rgba(76,29,149,.14) !important;
      background:linear-gradient(145deg,#ffffff,#f6efff) !important;
    }

    .samaj-dashboard-menu-btn:active {
      transform:translateY(-1px) !important;
    }

    .samaj-dashboard-menu-btn.active {
      border-color:#7c3aed !important;
      background:linear-gradient(145deg,#7c3aed,#5b21b6) !important;
      color:#ffffff !important;
      box-shadow:0 12px 30px rgba(91,33,182,.28) !important;
    }

    .samaj-menu-icon {
      width:38px !important;
      height:38px !important;
      border-radius:12px !important;
      display:flex !important;
      align-items:center !important;
      justify-content:center !important;
      font-size:21px !important;
      line-height:1 !important;
      background:rgba(124,58,237,.09) !important;
    }

    .samaj-dashboard-menu-btn.active .samaj-menu-icon {
      background:rgba(255,255,255,.18) !important;
    }

    .samaj-menu-title {
      display:block !important;
      font-size:13px !important;
      font-weight:800 !important;
      line-height:1.2 !important;
      letter-spacing:-.1px !important;
    }

    .samaj-menu-description {
      display:block !important;
      font-size:10px !important;
      line-height:1.2 !important;
      opacity:.66 !important;
      font-weight:600 !important;
    }

    .samaj-dashboard-menu-btn.active .samaj-menu-description {
      opacity:.88 !important;
    }

    @media (max-width:700px) {
      .samaj-dashboard-menu {
        grid-template-columns:repeat(2,minmax(0,1fr)) !important;
        gap:10px !important;
      }
      .samaj-dashboard-menu-btn {
        min-height:88px !important;
        border-radius:16px !important;
        padding:12px 8px !important;
      }
      .samaj-menu-title { font-size:12px !important; }
      .samaj-menu-description { font-size:9px !important; }
    }
  `;

  document.head.appendChild(style);
}


// ============================================================
// DASHBOARD NAVIGATION
// ============================================================

function showDashboardSection(
  section
) {

  const sections = [
    "profile",
    "edit",
    "matches",
    "interests",
    "received",
    "notifications",
    "account"
  ];


  sections.forEach(
    function(name) {

      const element =
        document.getElementById(
          "dashboardSection-" +
          name
        );


      if (!element) {
        return;
      }


      if (
        name === section
      ) {

        element.classList.remove(
          "samaj-section-hidden"
        );

        element.style.display =
          "block";

      }

      else {

        element.classList.add(
          "samaj-section-hidden"
        );

        element.style.display =
          "none";

      }

    }
  );


  const buttons =
    document.querySelectorAll(
      ".samaj-dashboard-menu-btn"
    );


  buttons.forEach(
    function(button) {

      if (
        button.dataset.section ===
        section
      ) {

        button.classList.add(
          "active"
        );

      }

      else {

        button.classList.remove(
          "active"
        );

      }

    }
  );


  if (
    section === "matches"
  ) {

    setTimeout(
      function() {

        loadMatches();

      },
      50
    );

  }


  if (
    section === "interests"
  ) {

    setTimeout(
      function() {

        loadMyInterests();

      },
      50
    );

  }


  if (
    section === "received"
  ) {

    setTimeout(
      function() {

        loadReceivedInterests();

      },
      50
    );

  }


  if (
    section === "notifications"
  ) {

    setTimeout(
      function() {

        loadNotifications();

      },
      50
    );

  }


  const target =
    document.getElementById(
      "dashboardSection-" +
      section
    );


  if (target) {

    setTimeout(
      function() {

        target.scrollIntoView({
          behavior:
            "smooth",
          block:
            "start"
        });

      },
      80
    );

  }

}


// ============================================================
// OPEN DASHBOARD
// ============================================================

async function openDashboard() {

  ensureSamajSaathiPremiumStyles();

  if (
    samajDashboardOpening
  ) {
    return;
  }


  if (!isSupabaseReady()) {
    return;
  }


  samajDashboardOpening =
    true;


  try {

    const sessionResult =
      await supabaseClient.auth
        .getSession();


    const session =
      sessionResult.data?.session;


    if (!session) {

      openModal(
        "login"
      );

      return;
    }


    await savePendingProfile();


    const userId =
      session.user.id;


    const profileResult =
      await supabaseClient
        .from("profiles")
        .select("*")
        .eq(
          "id",
          userId
        )
        .maybeSingle();


    if (profileResult.error) {

      console.error(
        "PROFILE LOAD ERROR:",
        profileResult.error
      );

      alert(
        "Profile could not be loaded: " +
        profileResult.error.message
      );

      return;
    }


    if (!profileResult.data) {

      alert(
        "Your account exists, but your profile has not been created yet."
      );

      return;
    }


    const profile =
      profileResult.data;


    closeModal();


    const oldDashboard =
      document.getElementById(
        "samajSaathiDashboard"
      );


    if (oldDashboard) {
      oldDashboard.remove();
    }


    const dashboard =
      document.createElement(
        "div"
      );


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

        <header
          class="samaj-dashboard-header"
          style="
            background:#6f1025;
            color:#fff;
            padding:18px 24px;
            display:flex;
            justify-content:space-between;
            align-items:center;
            gap:15px;
            flex-wrap:wrap;
          "
        >

          <div>

            <div
              class="samaj-dashboard-brand-name"
              style="
                font-size:24px;
                font-weight:700;
              "
            >
              SamajSaathi
            </div>

            <small
              class="samaj-dashboard-brand-sub"
            >
              SC Matrimony \u{2022} Your journey starts here
            </small>

          </div>

          <div style="
            display:flex;
            align-items:center;
            gap:10px;
            flex-wrap:wrap;
          ">

            <button
              type="button"
              onclick="goHomeFromDashboard()"
              style="
                border:1px solid rgba(255,255,255,.55);
                background:rgba(255,255,255,.18);
                color:#fff;
                padding:10px 16px;
                border-radius:10px;
                cursor:pointer;
                font-weight:700;
                box-shadow:0 6px 18px rgba(0,0,0,.10);
              "
            >
              \u{1F3E0} Home
            </button>

            <button
              type="button"
              onclick="showDashboardSection('matches')"
              style="
                border:1px solid rgba(255,255,255,.55);
                background:rgba(255,255,255,.18);
                color:#fff;
                padding:10px 16px;
                border-radius:10px;
                cursor:pointer;
                font-weight:700;
                box-shadow:0 6px 18px rgba(0,0,0,.10);
              "
            >
              \u{1F495} Find Matches
            </button>

            <button
              type="button"
              onclick="logoutUser()"
              style="
                border:1px solid rgba(255,255,255,.55);
                background:rgba(255,255,255,.08);
                color:#fff;
                padding:10px 16px;
                border-radius:10px;
                cursor:pointer;
                font-weight:700;
              "
            >
              \u{1F6AA} Logout
            </button>

          </div>

        </header>


        <div style="
          max-width:1100px;
          margin:0 auto;
          padding:25px 20px 60px;
        ">


          <div
            class="samaj-dashboard-welcome"
            style="
              background:#f8f1f3;
              border-radius:18px;
              padding:25px;
              margin-bottom:20px;
            "
          >

            <span class="eyebrow">
              WELCOME
            </span>

            <h1 style="
              margin:8px 0;
            ">

              Hello,
              ${escapeHtml(
                profile.full_name
              )}!

            </h1>

            <p style="
              margin-bottom:0;
            ">
              Your SamajSaathi profile is ready.
              Discover suitable members below.
            </p>

          </div>


          <nav
            class="samaj-dashboard-menu"
            style="
              display:grid;
              grid-template-columns:
              repeat(auto-fit,minmax(145px,1fr));
              gap:10px;
              margin-bottom:25px;
            "
          >

            <button
              type="button"
              class="
                samaj-dashboard-menu-btn
                active
              "
              data-section="profile"
              onclick="
                showDashboardSection('profile')
              "
            >

              <span class="samaj-menu-icon">
                \u{1F464}
              </span>

              <span class="samaj-menu-title">
                My Profile
              </span>

              <span class="samaj-menu-description">
                View your profile
              </span>

            </button>


            <button
              type="button"
              class="samaj-dashboard-menu-btn"
              data-section="edit"
              onclick="
                showDashboardSection('edit')
              "
            >

              <span class="samaj-menu-icon">
                \u{270F}\u{FE0F}
              </span>

              <span class="samaj-menu-title">
                Edit Profile
              </span>

              <span class="samaj-menu-description">
                Update details
              </span>

            </button>


            <button
              type="button"
              class="samaj-dashboard-menu-btn"
              data-section="matches"
              onclick="
                showDashboardSection('matches')
              "
            >

              <span class="samaj-menu-icon">
                \u{1F495}
              </span>

              <span class="samaj-menu-title">
                Find Your Matches
              </span>

              <span class="samaj-menu-description">
                Discover members
              </span>

            </button>


            <button
              type="button"
              class="samaj-dashboard-menu-btn"
              data-section="interests"
              onclick="
                showDashboardSection('interests')
              "
            >

              <span class="samaj-menu-icon">
                \u{2764}\u{FE0F}
              </span>

              <span class="samaj-menu-title">
                My Interests
              </span>

              <span class="samaj-menu-description">
                Interests you sent
              </span>

            </button>


            <button
              type="button"
              class="samaj-dashboard-menu-btn"
              data-section="received"
              onclick="
                showDashboardSection('received')
              "
            >

              <span class="samaj-menu-icon">
                \u{1F48C}
              </span>

              <span class="samaj-menu-title">
                Received
              </span>

              <span class="samaj-menu-description">
                Interests received
              </span>

            </button>


            <button
              type="button"
              class="samaj-dashboard-menu-btn"
              data-section="notifications"
              onclick="
                showDashboardSection('notifications')
              "
            >

              <span class="samaj-menu-icon">
                \u{1F514}
              </span>

              <span class="samaj-menu-title">
                Notifications
              </span>

              <span class="samaj-menu-description">
                Updates
              </span>

            </button>


            <button
              type="button"
              class="samaj-dashboard-menu-btn"
              data-section="account"
              onclick="
                showDashboardSection('account')
              "
            >

              <span class="samaj-menu-icon">
                \u{2699}\u{FE0F}
              </span>

              <span class="samaj-menu-title">
                Account
              </span>

              <span class="samaj-menu-description">
                Account settings
              </span>

            </button>

          </nav>


          <!-- =================================================
               PROFILE
               ================================================= -->

          <section
            id="dashboardSection-profile"
            class="
              samaj-dashboard-section
            "
          >

            <div
              class="samaj-dashboard-section-header"
            >

              <span class="eyebrow">
                MY PROFILE
              </span>

              <h2>
                Your Profile
              </h2>

            </div>


            <div style="
              background:#f8f1f3;
              border-radius:18px;
              padding:25px;
              margin-bottom:20px;
              text-align:center;
            ">

              <span class="eyebrow">
                PROFILE PHOTO
              </span>

              <div
                id="dashboardProfilePhoto"
                style="
                  margin:20px auto;
                  width:150px;
                  height:150px;
                  border-radius:50%;
                  overflow:hidden;
                  background:#eee;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                "
              >

                <span style="
                  font-size:55px;
                  color:#aaa;
                ">
                  \u{1F464}
                </span>

              </div>

              <input
                id="profilePhotoInput"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                style="
                  display:block;
                  margin:15px auto;
                  max-width:100%;
                "
              >

              <button
                type="button"
                class="btn primary"
                onclick="
                  uploadProfilePhoto()
                "
              >
                \u{1F4F7} Upload / Change Photo
              </button>

              <div
                id="photoMessage"
                style="
                  margin-top:10px;
                "
              ></div>

            </div>


            <div
              class="samaj-profile-details-grid"
              style="
                display:grid;
                grid-template-columns:
                repeat(auto-fit,minmax(210px,1fr));
                gap:12px;
              "
            >

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
                "Age",
                profile.age
              )}

              ${dashboardItem(
                "City",
                [
                  profile.city,
                  profile.state
                ]
                  .filter(Boolean)
                  .join(", ")
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

              ${dashboardItem(
                "Education",
                profile.education
              )}

              ${dashboardItem(
                "Occupation",
                profile.occupation
              )}

              ${dashboardItem(
                "Height",
                profile.height
              )}

              ${dashboardItem(
                "Native Place",
                profile.native_place
              )}

            </div>

            ${profileCompletionHtml(profile)}


            <div style="
              margin-top:25px;
              text-align:center;
            ">

              <button
                type="button"
                class="btn primary"
                onclick="
                  showDashboardSection('matches')
                "
              >
                \u{1F495} Find Your Matches
              </button>

            </div>

          </section>


          <!-- =================================================
               EDIT PROFILE
               ================================================= -->

          <section
            id="dashboardSection-edit"
            class="samaj-dashboard-section samaj-section-hidden"
            style="display:none;"
          >
            <span class="eyebrow">PROFILE SETTINGS</span>
            <h2>âœŽ Edit Profile</h2>
            <p style="color:#806b73;margin-top:-5px;">Keep your matrimonial profile complete and up to date. Fields are grouped so members can understand you better.</p>

            ${profileCompletionHtml(profile)}

            <div style="margin:22px 0 10px;"><h3 style="margin:0;color:#6f1025;">1. Basic & Community</h3><p style="font-size:12px;color:#806b73;">Your core identity and community information.</p></div>
            <div class="form-grid">
              <div class="field full"><label>Full Name *</label><input id="editFullName" value="${escapeHtml(profile.full_name || "")}"></div>
              <div class="field"><label>Gender</label><select id="editGender"><option value="">Select</option><option value="female" ${profile.gender === "female" ? "selected" : ""}>Woman</option><option value="male" ${profile.gender === "male" ? "selected" : ""}>Man</option></select></div>
              <div class="field"><label>Date of Birth</label><input id="editDob" type="date" value="${escapeHtml(profile.date_of_birth || "")}"><small style="color:#806b73;">Age is calculated automatically from DOB.</small></div>
              <div class="field"><label>Community / Jati</label><select id="editCommunity"><option value="Dom" ${profile.community === "Dom" ? "selected" : ""}>Dom</option><option value="Other SC Community" ${profile.community === "Other SC Community" ? "selected" : ""}>Other SC Community</option><option value="" ${!profile.community ? "selected" : ""}>Not specified</option></select></div>
              <div class="field"><label>Surname</label><select id="editSurname"><option value="Rauth" ${profile.surname === "Rauth" ? "selected" : ""}>Rauth</option><option value="Basfor" ${profile.surname === "Basfor" ? "selected" : ""}>Basfor</option><option value="Bansfor" ${profile.surname === "Bansfor" ? "selected" : ""}>Bansfor</option><option value="Other" ${profile.surname === "Other" ? "selected" : ""}>Other</option></select></div>
              <div class="field"><label>Kul / Clan</label><select id="editKul"><option value="Piari Baiswar" ${profile.kul === "Piari Baiswar" ? "selected" : ""}>Piari Baiswar</option><option value="Other" ${profile.kul === "Other" ? "selected" : ""}>Other</option><option value="Not Known" ${profile.kul === "Not Known" ? "selected" : ""}>Not Known</option></select></div>
              <div class="field"><label>State / Province</label><input id="editState" value="${escapeHtml(profile.state || "")}" placeholder="e.g. West Bengal"></div>
              <div class="field"><label>Current City *</label><input id="editCity" value="${escapeHtml(profile.city || "")}" placeholder="e.g. Siliguri"></div>
              <div class="field"><label>Native Place</label><input id="editNativePlace" value="${escapeHtml(profile.native_place || "")}" placeholder="Village / town / district"></div>
              <div class="field"><label>Marital Status</label><select id="editMaritalStatus"><option value="">Select</option><option value="Never Married" ${profile.marital_status === "Never Married" ? "selected" : ""}>Never Married</option><option value="Divorced" ${profile.marital_status === "Divorced" ? "selected" : ""}>Divorced</option><option value="Widowed" ${profile.marital_status === "Widowed" ? "selected" : ""}>Widowed</option><option value="Separated" ${profile.marital_status === "Separated" ? "selected" : ""}>Separated</option></select></div>
            </div>

            <div style="margin:28px 0 10px;"><h3 style="margin:0;color:#6f1025;">2. Education & Career</h3></div>
            <div class="form-grid">
              <div class="field"><label>Education</label><input id="editEducation" value="${escapeHtml(profile.education || "")}" placeholder="e.g. Graduate / Post Graduate"></div>
              <div class="field"><label>Occupation / Profession</label><input id="editOccupation" value="${escapeHtml(profile.occupation || "")}" placeholder="e.g. Teacher / Business / Private Job"></div>
              <div class="field"><label>Work Location</label><input id="editWorkLocation" value="${escapeHtml(profile.work_location || "")}" placeholder="City / area"></div>
              <div class="field"><label>Income Range <span style="font-weight:400;">(optional)</span></label><input id="editIncome" value="${escapeHtml(profile.income || "")}" placeholder="e.g. â‚¹2â€“5 lakh/year"></div>
              <div class="field"><label>Height</label><input id="editHeight" value="${escapeHtml(profile.height || "")}" placeholder="e.g. 5 ft 6 in"></div>
            </div>

            <div style="margin:28px 0 10px;"><h3 style="margin:0;color:#6f1025;">3. Family Details</h3></div>
            <div class="form-grid">
              <div class="field"><label>Family Type</label><select id="editFamilyType"><option value="">Select</option><option value="Nuclear" ${profile.family_type === "Nuclear" ? "selected" : ""}>Nuclear</option><option value="Joint" ${profile.family_type === "Joint" ? "selected" : ""}>Joint</option><option value="Extended" ${profile.family_type === "Extended" ? "selected" : ""}>Extended</option></select></div>
              <div class="field"><label>Family Status</label><input id="editFamilyStatus" value="${escapeHtml(profile.family_status || "")}" placeholder="e.g. Middle class"></div>
              <div class="field"><label>Father's Occupation</label><input id="editFatherOccupation" value="${escapeHtml(profile.father_occupation || "")}"></div>
              <div class="field"><label>Mother's Occupation</label><input id="editMotherOccupation" value="${escapeHtml(profile.mother_occupation || "")}"></div>
              <div class="field"><label>Siblings</label><input id="editSiblings" value="${escapeHtml(profile.siblings || "")}" placeholder="e.g. 1 brother, 1 sister"></div>
            </div>

            <div style="margin:28px 0 10px;"><h3 style="margin:0;color:#6f1025;">4. Lifestyle & Interests</h3></div>
            <div class="form-grid">
              <div class="field"><label>Food Preference</label><select id="editFoodPreference"><option value="">Select</option><option value="Vegetarian" ${profile.food_preference === "Vegetarian" ? "selected" : ""}>Vegetarian</option><option value="Non-Vegetarian" ${profile.food_preference === "Non-Vegetarian" ? "selected" : ""}>Non-Vegetarian</option><option value="Eggetarian" ${profile.food_preference === "Eggetarian" ? "selected" : ""}>Eggetarian</option><option value="Other" ${profile.food_preference === "Other" ? "selected" : ""}>Other</option></select></div>
              <div class="field"><label>Smoking</label><select id="editSmoking"><option value="">Select</option><option value="No" ${profile.smoking === "No" ? "selected" : ""}>No</option><option value="Occasionally" ${profile.smoking === "Occasionally" ? "selected" : ""}>Occasionally</option><option value="Yes" ${profile.smoking === "Yes" ? "selected" : ""}>Yes</option></select></div>
              <div class="field"><label>Drinking</label><select id="editDrinking"><option value="">Select</option><option value="No" ${profile.drinking === "No" ? "selected" : ""}>No</option><option value="Occasionally" ${profile.drinking === "Occasionally" ? "selected" : ""}>Occasionally</option><option value="Yes" ${profile.drinking === "Yes" ? "selected" : ""}>Yes</option></select></div>
              <div class="field full"><label>Interests / Hobbies</label><input id="editInterests" value="${escapeHtml(profile.interests || "")}" placeholder="e.g. Music, football, travel, reading"></div>
              <div class="field full"><label>About Me</label><textarea id="editBio" rows="5" placeholder="Tell a little about yourself, your family, interests and what you are looking for...">${escapeHtml(profile.bio || "")}</textarea></div>
            </div>

            <div style="margin:28px 0 10px;"><h3 style="margin:0;color:#6f1025;">5. Partner Preferences</h3><p style="font-size:12px;color:#806b73;">These preferences will help SamajSaathi improve match suggestions.</p></div>
            <div class="form-grid">
              <div class="field"><label>Preferred Age â€” From</label><input id="editPartnerAgeMin" type="number" min="18" max="100" value="${escapeHtml(profile.partner_age_min ?? "")}" placeholder="e.g. 24"></div>
              <div class="field"><label>Preferred Age â€” To</label><input id="editPartnerAgeMax" type="number" min="18" max="100" value="${escapeHtml(profile.partner_age_max ?? "")}" placeholder="e.g. 32"></div>
              <div class="field"><label>Preferred City / Location</label><input id="editPartnerCity" value="${escapeHtml(profile.partner_city || "")}" placeholder="e.g. Jaigaon / Alipurduar / Siliguri"></div>
              <div class="field"><label>Preferred Education</label><input id="editPartnerEducation" value="${escapeHtml(profile.partner_education || "")}" placeholder="e.g. Graduate"></div>
              <div class="field"><label>Preferred Occupation</label><input id="editPartnerOccupation" value="${escapeHtml(profile.partner_occupation || "")}" placeholder="Any / Teacher / Business etc."></div>
              <div class="field"><label>Preferred Marital Status</label><input id="editPartnerMaritalStatus" value="${escapeHtml(profile.partner_marital_status || "")}" placeholder="e.g. Never Married"></div>
              <div class="field"><label>Preferred Community</label><input id="editPartnerCommunity" value="${escapeHtml(profile.partner_community || "")}" placeholder="e.g. Dom / SC / Any"></div>
              <div class="field full"><label>Partner Expectations</label><textarea id="editPartnerExpectations" rows="4" placeholder="What qualities or expectations matter to you?">${escapeHtml(profile.partner_expectations || "")}</textarea></div>
            </div>

            <div id="updateProfileMessage" style="margin-top:15px;"></div>
            <div class="modal-actions"><button type="button" class="btn primary" onclick="updateProfile()">ðŸ’¾ Save Profile Changes</button></div>
          </section>

          <!-- =================================================
               MATCHES
               ================================================= -->

          <section
            id="dashboardSection-matches"
            class="
              samaj-dashboard-section
              samaj-section-hidden
            "
            style="
              display:none;
            "
          >

            <div
              class="samaj-dashboard-section-header"
              style="
                margin-bottom:20px;
              "
            >

              <span class="eyebrow">
                DISCOVER
              </span>

              <h2>
                \u{1F495} Find Your Matches
              </h2>

              <p>
                Suitable members from the SamajSaathi community.
              </p>

            </div>


            <div
              id="matchesGrid"
              style="
                display:grid;
                grid-template-columns:
                repeat(auto-fit,minmax(250px,1fr));
                gap:18px;
              "
            >

              <div style="
                grid-column:1/-1;
                text-align:center;
                padding:35px;
              ">

                Finding suitable profiles...

              </div>

            </div>

          </section>


          <!-- =================================================
               MY INTERESTS
               ================================================= -->

          <section
            id="dashboardSection-interests"
            class="
              samaj-dashboard-section
              samaj-section-hidden
            "
            style="
              display:none;
            "
          >

            <span class="eyebrow">
              CONNECTIONS
            </span>

            <h2>
              \u{2764}\u{FE0F} My Interests
            </h2>

            <div
              id="myInterestsContainer"
            >

              <div class="samaj-coming-soon">

                <div class="samaj-coming-soon-icon">
                  \u{2764}\u{FE0F}
                </div>

                <h3>
                  My Interests
                </h3>

                <p>
                  Profiles you have shown interest in will appear here.
                </p>

              </div>

            </div>

          </section>


          <!-- =================================================
               RECEIVED INTERESTS
               ================================================= -->

          <section
            id="dashboardSection-received"
            class="
              samaj-dashboard-section
              samaj-section-hidden
            "
            style="
              display:none;
            "
          >

            <span class="eyebrow">
              CONNECTIONS
            </span>

            <h2>
              \u{1F48C} Received Interests
            </h2>

            <div
              id="receivedInterestsContainer"
            >

              <div class="samaj-coming-soon">

                <div class="samaj-coming-soon-icon">
                  \u{1F48C}
                </div>

                <h3>
                  Received Interests
                </h3>

                <p>
                  Interests sent by other members will appear here.
                </p>

              </div>

            </div>

          </section>


          <!-- =================================================
               NOTIFICATIONS
               ================================================= -->

          <section
            id="dashboardSection-notifications"
            class="
              samaj-dashboard-section
              samaj-section-hidden
            "
            style="
              display:none;
            "
          >

            <span class="eyebrow">
              UPDATES
            </span>

            <h2>
              \u{1F514} Notifications
            </h2>

            <div
              id="notificationsContainer"
            >

              <div class="samaj-coming-soon">

                <div class="samaj-coming-soon-icon">
                  \u{1F514}
                </div>

                <h3>
                  Loading notifications...
                </h3>

                <p>
                  Your latest SamajSaathi updates will appear here.
                </p>

              </div>

            </div>

            <div style="
              margin-top:15px;
              text-align:right;
            ">

              <button
                type="button"
                class="btn"
                onclick="markNotificationsRead()"
              >
                \u{2713} Mark All as Read
              </button>

            </div>

          </section>


          <!-- =================================================
               ACCOUNT
               ================================================= -->

          <section
            id="dashboardSection-account"
            class="
              samaj-dashboard-section
              samaj-section-hidden
            "
            style="
              display:none;
            "
          >

            <span class="eyebrow">
              ACCOUNT
            </span>

            <h2>
              \u{2699}\u{FE0F} Account
            </h2>


            <div
              class="samaj-profile-details-grid"
              style="
                display:grid;
                grid-template-columns:
                repeat(auto-fit,minmax(210px,1fr));
                gap:12px;
              "
            >

              ${dashboardItem(
                "Email",
                session.user.email
              )}

              ${dashboardItem(
                "User ID",
                localStorage.getItem(
                  "samajSaathiUserId"
                )
              )}

              ${dashboardItem(
                "Username",
                localStorage.getItem(
                  "samajSaathiUsername"
                )
              )}

              ${dashboardItem(
                "Account Status",
                "Active"
              )}

            </div>


            <div style="
              margin-top:20px;
              padding:18px;
              background:#fff8e6;
              border-radius:12px;
              color:#7a4d00;
            ">

              <strong>
                \u{1F510} Account Security
              </strong>

              <p style="
                margin-bottom:0;
              ">
                Never share your password with anyone.
              </p>

            </div>


            <div style="
              margin-top:20px;
            ">

              <button
                type="button"
                class="btn primary"
                onclick="
                  logoutUser()
                "
              >
                \u{1F6AA} Logout
              </button>

            </div>

          </section>


        </div>

      </div>

    `;


    document.body.appendChild(
      dashboard
    );


    await loadProfilePhoto(
      profile.profile_photo
    );


    showDashboardSection(
      "matches"
    );


  } catch (error) {

    console.error(
      "OPEN DASHBOARD ERROR:",
      error
    );

  } finally {

    samajDashboardOpening =
      false;

  }

}


// ============================================================
// DASHBOARD ITEM
// ============================================================

function dashboardItem(
  label,
  value
) {

  return `

    <div
      class="samaj-profile-detail"
      style="
        background:#fff;
        border:1px solid #eee;
        border-radius:14px;
        padding:18px;
      "
    >

      <small style="
        display:block;
        color:#777;
        margin-bottom:7px;
      ">

        ${escapeHtml(
          label
        )}

      </small>

      <strong>

        ${escapeHtml(
          value ||
          "Not specified"
        )}

      </strong>

    </div>

  `;
}


// ============================================================
// LOAD OWN PROFILE PHOTO
// ============================================================

async function loadProfilePhoto(
  photoPath
) {

  if (
    !photoPath ||
    !supabaseClient
  ) {
    return;
  }


  const result =
    await supabaseClient
      .storage
      .from("profile-photos")
      .createSignedUrl(
        photoPath,
        3600
      );


  if (
    result.error ||
    !result.data?.signedUrl
  ) {

    console.error(
      "PHOTO PREVIEW ERROR:",
      result.error
    );

    return;
  }


  const preview =
    document.getElementById(
      "dashboardProfilePhoto"
    );


  if (!preview) {
    return;
  }


  preview.innerHTML = `

    <img
      src="${escapeHtml(
        result.data.signedUrl
      )}"
      alt="Profile Photo"
      style="
        width:100%;
        height:100%;
        object-fit:cover;
        display:block;
      "
    >

  `;
}


// ============================================================
// UPLOAD PROFILE PHOTO
// ============================================================

async function uploadProfilePhoto() {

  if (!isSupabaseReady()) {
    return;
  }


  const input =
    document.getElementById(
      "profilePhotoInput"
    );

  const message =
    document.getElementById(
      "photoMessage"
    );


  if (
    !input ||
    !input.files ||
    !input.files.length
  ) {

    showMessage(
      message,
      "Please choose a photo first.",
      "error"
    );

    return;
  }


  const file =
    input.files[0];


  if (
    file.size >
    5 * 1024 * 1024
  ) {

    showMessage(
      message,
      "Photo must be smaller than 5 MB.",
      "error"
    );

    return;
  }


  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
  ];


  if (
    !allowedTypes.includes(
      file.type
    )
  ) {

    showMessage(
      message,
      "Please select JPG, PNG or WEBP.",
      "error"
    );

    return;
  }


  const sessionResult =
    await supabaseClient.auth
      .getSession();


  const session =
    sessionResult.data?.session;


  if (!session) {

    showMessage(
      message,
      "Please login first.",
      "error"
    );

    return;
  }


  const userId =
    session.user.id;


  const extension =
    file.name
      .split(".")
      .pop()
      .toLowerCase();


  const filePath =
    userId +
    "/profile." +
    extension;


  showMessage(
    message,
    "Uploading photo...",
    "info"
  );


  const oldFiles = [

    userId +
    "/profile.jpg",

    userId +
    "/profile.jpeg",

    userId +
    "/profile.png",

    userId +
    "/profile.webp"

  ];


  const removeResult =
    await supabaseClient
      .storage
      .from("profile-photos")
      .remove(
        oldFiles
      );


  if (removeResult.error) {

    console.warn(
      "OLD PHOTO REMOVE WARNING:",
      removeResult.error
    );

  }


  const uploadResult =
    await supabaseClient
      .storage
      .from("profile-photos")
      .upload(
        filePath,
        file,
        {
          upsert:
            true,
          contentType:
            file.type
        }
      );


  if (uploadResult.error) {

    console.error(
      "PHOTO UPLOAD ERROR:",
      uploadResult.error
    );

    showMessage(
      message,
      "Photo upload failed: " +
      uploadResult.error.message,
      "error"
    );

    return;
  }


  const profileResult =
    await supabaseClient
      .from("profiles")
      .update({

        profile_photo:
          filePath

      })
      .eq(
        "id",
        userId
      );


  if (profileResult.error) {

    console.error(
      "PROFILE PHOTO UPDATE ERROR:",
      profileResult.error
    );

    showMessage(
      message,
      "Photo uploaded, but profile could not be updated: " +
      profileResult.error.message,
      "error"
    );

    return;
  }


  await loadProfilePhoto(
    filePath
  );


  showMessage(
    message,
    "Profile photo uploaded successfully!",
    "info"
  );


  input.value = "";


  await loadProfiles();


  await loadMatches();

}


// ============================================================
// UPDATE PROFILE
// ============================================================

async function updateProfile() {

  if (!isSupabaseReady()) {
    return;
  }


  const message =
    document.getElementById(
      "updateProfileMessage"
    );


  const sessionResult =
    await supabaseClient.auth
      .getSession();


  const session =
    sessionResult.data?.session;


  if (!session) {

    showMessage(
      message,
      "Please login first.",
      "error"
    );

    return;
  }


  const userId =
    session.user.id;


  const fullName =
    document.getElementById(
      "editFullName"
    )?.value.trim();


  const gender =
    document.getElementById(
      "editGender"
    )?.value;


  const dob =
    document.getElementById(
      "editDob"
    )?.value;


  const community =
    document.getElementById(
      "editCommunity"
    )?.value;


  const surname =
    document.getElementById(
      "editSurname"
    )?.value;


  const kul =
    document.getElementById(
      "editKul"
    )?.value;


  const city =
    document.getElementById(
      "editCity"
    )?.value.trim();

  const state =
    document.getElementById(
      "editState"
    )?.value.trim();

  const maritalStatus =
    document.getElementById(
      "editMaritalStatus"
    )?.value || null;

  const height =
    document.getElementById(
      "editHeight"
    )?.value.trim() || null;

  const education =
    document.getElementById(
      "editEducation"
    )?.value.trim() || null;

  const occupation =
    document.getElementById(
      "editOccupation"
    )?.value.trim() || null;

  const bio =
    document.getElementById(
      "editBio"
    )?.value.trim() || null;

  const nativePlace = document.getElementById("editNativePlace")?.value.trim() || null;
  const workLocation = document.getElementById("editWorkLocation")?.value.trim() || null;
  const income = document.getElementById("editIncome")?.value.trim() || null;
  const familyType = document.getElementById("editFamilyType")?.value || null;
  const familyStatus = document.getElementById("editFamilyStatus")?.value.trim() || null;
  const fatherOccupation = document.getElementById("editFatherOccupation")?.value.trim() || null;
  const motherOccupation = document.getElementById("editMotherOccupation")?.value.trim() || null;
  const siblings = document.getElementById("editSiblings")?.value.trim() || null;
  const foodPreference = document.getElementById("editFoodPreference")?.value || null;
  const smoking = document.getElementById("editSmoking")?.value || null;
  const drinking = document.getElementById("editDrinking")?.value || null;
  const interests = document.getElementById("editInterests")?.value.trim() || null;
  const partnerAgeMinRaw = document.getElementById("editPartnerAgeMin")?.value;
  const partnerAgeMaxRaw = document.getElementById("editPartnerAgeMax")?.value;
  const partnerAgeMin = partnerAgeMinRaw ? Number(partnerAgeMinRaw) : null;
  const partnerAgeMax = partnerAgeMaxRaw ? Number(partnerAgeMaxRaw) : null;
  const partnerCity = document.getElementById("editPartnerCity")?.value.trim() || null;
  const partnerEducation = document.getElementById("editPartnerEducation")?.value.trim() || null;
  const partnerOccupation = document.getElementById("editPartnerOccupation")?.value.trim() || null;
  const partnerMaritalStatus = document.getElementById("editPartnerMaritalStatus")?.value.trim() || null;
  const partnerCommunity = document.getElementById("editPartnerCommunity")?.value.trim() || null;
  const partnerExpectations = document.getElementById("editPartnerExpectations")?.value.trim() || null;


  if (
    !fullName ||
    !city
  ) {

    showMessage(
      message,
      "Name and city are required.",
      "error"
    );

    return;
  }


  if (
    dob &&
    calculateAge(dob) < 18
  ) {

    showMessage(
      message,
      "Profile owner must be 18 or above.",
      "error"
    );

    return;
  }

  if ((partnerAgeMin !== null && (partnerAgeMin < 18 || partnerAgeMin > 100)) ||
      (partnerAgeMax !== null && (partnerAgeMax < 18 || partnerAgeMax > 100)) ||
      (partnerAgeMin !== null && partnerAgeMax !== null && partnerAgeMin > partnerAgeMax)) {
    showMessage(message, "Please enter a valid preferred age range (18â€“100).", "error");
    return;
  }


  showMessage(
    message,
    "Saving changes...",
    "info"
  );


  const result =
    await supabaseClient
      .from("profiles")
      .update({

        full_name:
          fullName,

        gender:
          gender,

        date_of_birth:
          dob ||
          null,

        age:
          calculateAge(dob),

        community:
          community,

        surname:
          surname,

        kul:
          kul,

        city:
          city,

        state:
          state || null,

        marital_status:
          maritalStatus,

        height:
          height,

        education:
          education,

        occupation:
          occupation,

        bio:
          bio,

        native_place: nativePlace,
        work_location: workLocation,
        income: income,
        family_type: familyType,
        family_status: familyStatus,
        father_occupation: fatherOccupation,
        mother_occupation: motherOccupation,
        siblings: siblings,
        food_preference: foodPreference,
        smoking: smoking,
        drinking: drinking,
        interests: interests,
        partner_age_min: partnerAgeMin,
        partner_age_max: partnerAgeMax,
        partner_city: partnerCity,
        partner_education: partnerEducation,
        partner_occupation: partnerOccupation,
        partner_marital_status: partnerMaritalStatus,
        partner_community: partnerCommunity,
        partner_expectations: partnerExpectations

      })
      .eq(
        "id",
        userId
      );


  if (result.error) {

    console.error(
      "PROFILE UPDATE ERROR:",
      result.error
    );

    showMessage(
      message,
      "Profile update failed: " +
      result.error.message,
      "error"
    );

    return;
  }


  showMessage(
    message,
    "Profile updated successfully!",
    "info"
  );


  await loadProfiles();


  setTimeout(
    async function() {

      await openDashboard();

    },
    600
  );

}


// ============================================================
// LOGGED-IN USER UI ON PUBLIC HOMEPAGE
// ============================================================

function isPublicHomeRoute() {
  const hash = String(window.location.hash || "").toLowerCase();
  return hash === "#home" || hash === "#" || hash === "";
}

async function updateHomepageUserUI() {

  if (!supabaseClient) {
    return;
  }

  try {

    const sessionResult = await supabaseClient.auth.getSession();
    const session = sessionResult.data?.session;
    const oldChip = document.getElementById("samajHomepageUserChip");

    if (!session) {
      if (oldChip) oldChip.remove();
      return;
    }

    const userId = session.user.id;

    const profileResult = await supabaseClient
      .from("profiles")
      .select("id, full_name, profile_photo, photo_url")
      .eq("id", userId)
      .maybeSingle();

    if (profileResult.error) {
      console.error("HOMEPAGE PROFILE UI ERROR:", profileResult.error);
      return;
    }

    const profile = profileResult.data || {};
    const name = profile.full_name || "My Profile";
    const photoUrl = getProfilePhotoUrl(profile.profile_photo);

    if (oldChip) oldChip.remove();

    const chip = document.createElement("div");
    chip.id = "samajHomepageUserChip";
    chip.innerHTML = `
      <button type="button" onclick="openDashboard()" aria-label="Open My Dashboard" style="
        display:flex;
        align-items:center;
        gap:10px;
        border:1px solid rgba(111,16,37,.12);
        background:rgba(255,255,255,.97);
        color:#24151a;
        padding:6px 12px 6px 7px;
        border-radius:999px;
        cursor:pointer;
        box-shadow:0 8px 28px rgba(52,19,30,.14);
        font-family:inherit;
        transition:transform .2s ease, box-shadow .2s ease;
      "
      onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 12px 32px rgba(52,19,30,.20)'"
      onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 8px 28px rgba(52,19,30,.14)'">
        <span style="
          width:40px;
          height:40px;
          border-radius:50%;
          overflow:hidden;
          display:flex;
          align-items:center;
          justify-content:center;
          background:linear-gradient(135deg,#f7e9ee,#ead0da);
          flex:none;
          border:2px solid #fff;
          box-shadow:0 2px 8px rgba(0,0,0,.12);
        ">
          ${photoUrl
            ? `<img src="${escapeHtml(photoUrl)}" alt="Profile photo" style="width:100%;height:100%;object-fit:cover;">`
            : `<span style="font-size:20px;">&#128100;</span>`}
        </span>
        <span style="display:flex;flex-direction:column;align-items:flex-start;line-height:1.15;max-width:150px;">
          <strong style="font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px;">${escapeHtml(name)}</strong>
          <small style="font-size:11px;color:#7b626a;margin-top:3px;">My Profile \u{25BE}</small>
        </span>
      </button>
    `;

    // Prefer an existing navigation action area.
    const target =
      document.querySelector(".actions") ||
      document.querySelector(".nav-actions") ||
      document.querySelector(".navbar-actions") ||
      document.querySelector(".header-actions") ||
      document.querySelector("header nav") ||
      document.querySelector("nav");

    if (target) {
      target.appendChild(chip);
      chip.style.position = "relative";
      chip.style.zIndex = "20";
    } else {
      chip.style.position = "fixed";
      chip.style.top = "14px";
      chip.style.right = "20px";
      chip.style.zIndex = "9990";
      document.body.appendChild(chip);
    }

  } catch (error) {
    console.error("UPDATE HOMEPAGE USER UI ERROR:", error);
  }
}

async function hideLoggedOutHomepageButtons() {
  if (!isPublicHomeRoute() || !supabaseClient) return;

  let session = null;
  try {
    const result = await supabaseClient.auth.getSession();
    session = result.data?.session || null;
  } catch (e) {
    console.error("HOMEPAGE AUTH UI ERROR:", e);
    return;
  }

  document.querySelectorAll("a, button").forEach(function(el) {
    if (el.id === "samajHomepageUserChip" || el.closest("#samajHomepageUserChip")) return;

    const text = String(el.textContent || "").trim().toLowerCase();
    if (text !== "login" && text !== "create profile" && text !== "create account") return;

    if (session) {
      el.dataset.samajLoggedInHidden = "true";
      el.style.display = "none";
    } else if (el.dataset.samajLoggedInHidden === "true") {
      delete el.dataset.samajLoggedInHidden;
      el.style.removeProperty("display");
    }
  });
}


// ============================================================
// HOMEPAGE MATCHES
// An accepted interest becomes a confirmed SamajSaathi match.
// ============================================================

async function loadHomepageMatches() {

  if (!supabaseClient) return;

  const old = document.getElementById("samajHomepageMatches");
  if (old) old.remove();

  const sessionResult = await supabaseClient.auth.getSession();
  const session = sessionResult.data?.session;
  if (!session || !isPublicHomeRoute()) return;

  try {
    // Any accepted interest involving the logged-in user is a confirmed match.
    const result = await supabaseClient
      .from("interests")
      .select("id, sender_id, receiver_id, status, updated_at")
      .eq("status", "accepted")
      .or(
        "sender_id.eq." + session.user.id +
        ",receiver_id.eq." + session.user.id
      )
      .order("updated_at", { ascending: false });

    if (result.error) {
      console.error("HOMEPAGE MATCHES ERROR:", result.error);
      return;
    }

    const rows = result.data || [];
    const otherIds = [...new Set(
      rows.map(row =>
        row.sender_id === session.user.id
          ? row.receiver_id
          : row.sender_id
      ).filter(Boolean)
    )];

    let profiles = [];

    if (otherIds.length) {
      const profileResult = await supabaseClient
        .from("profiles")
        .select(`
          id,
          full_name,
            age,
          city,
          state,
          profile_photo,
          photo_url,
          gender,
          surname
        `)
        .in("id", otherIds)
        .eq("is_active", true);

      if (profileResult.error) {
        console.error("HOMEPAGE MATCH PROFILE ERROR:", profileResult.error);
        return;
      }

      profiles = profileResult.data || [];
    }

    const profileMap = new Map(
      profiles.map(profile => [profile.id, profile])
    );

    const matches = rows
      .map(row => {
        const otherId =
          row.sender_id === session.user.id
            ? row.receiver_id
            : row.sender_id;

        return {
          interest: row,
          profile: profileMap.get(otherId)
        };
      })
      .filter(item => item.profile);

    const section = document.createElement("section");
    section.id = "samajHomepageMatches";
    section.style.cssText = `
      max-width:1180px;
      margin:28px auto 36px;
      padding:0 20px;
    `;

    const cards = matches.length
      ? matches.slice(0, 6).map(item => {
          const profile = item.profile;
          const photo = getProfilePhotoUrl(
            profile.profile_photo || profile.photo_url
          );
          const name =
            profile.full_name ||
            profile.first_name ||
            "SamajSaathi Member";

          const location = [
            profile.city,
            profile.state
          ].filter(Boolean).join(", ");

          return `
            <article style="
              background:#fff;
              border:1px solid rgba(111,16,37,.10);
              border-radius:20px;
              padding:14px;
              box-shadow:0 10px 28px rgba(52,19,30,.08);
              display:flex;
              align-items:center;
              gap:13px;
              min-width:0;
            ">
              <div style="
                width:64px;
                height:64px;
                border-radius:50%;
                overflow:hidden;
                flex:none;
                display:flex;
                align-items:center;
                justify-content:center;
                background:linear-gradient(135deg,#f7e9ee,#ead0da);
                border:2px solid #fff;
                box-shadow:0 3px 12px rgba(0,0,0,.10);
              ">
                ${
                  photo
                    ? `<img src="${escapeHtml(photo)}" alt="Profile photo" style="width:100%;height:100%;object-fit:cover;">`
                    : `<span style="font-size:28px;">&#128100;</span>`
                }
              </div>

              <div style="flex:1;min-width:0;">
                <div style="
                  font-weight:800;
                  font-size:15px;
                  color:#24151a;
                  white-space:nowrap;
                  overflow:hidden;
                  text-overflow:ellipsis;
                ">
                  ${escapeHtml(name)}
                </div>

                <div style="
                  margin-top:4px;
                  color:#7b626a;
                  font-size:12px;
                  white-space:nowrap;
                  overflow:hidden;
                  text-overflow:ellipsis;
                ">
                  ${escapeHtml(location || "Location not specified")}
                </div>

                <div style="
                  display:inline-flex;
                  margin-top:7px;
                  padding:4px 9px;
                  border-radius:999px;
                  background:#e9f8ef;
                  color:#18794e;
                  font-size:11px;
                  font-weight:800;
                ">
                  &#128155; Matched
                </div>
              </div>

              <button
                type="button"
                onclick="viewProfile('${profile.id}')"
                style="
                  border:0;
                  background:linear-gradient(135deg,#7c3aed,#5b21b6);
                  color:#fff;
                  border-radius:10px;
                  padding:9px 12px;
                  font-weight:800;
                  cursor:pointer;
                  white-space:nowrap;
                "
              >
                View
              </button>
            </article>
          `;
        }).join("")
      : `
        <div style="
          background:linear-gradient(135deg,#fff,#fbf6f8);
          border:1px solid rgba(111,16,37,.10);
          border-radius:20px;
          padding:24px;
          text-align:center;
          box-shadow:0 8px 24px rgba(52,19,30,.06);
        ">
          <div style="font-size:32px;margin-bottom:8px;">&#128149;</div>
          <h3 style="margin:0 0 6px;color:#24151a;">
            Your Matches Will Appear Here
          </h3>
          <p style="margin:0;color:#7b626a;font-size:13px;">
            When someone accepts your interest, the two of you become a confirmed match and it will appear here.
          </p>
          <button
            type="button"
            onclick="openFindMatches()"
            style="
              margin-top:14px;
              border:0;
              background:linear-gradient(135deg,#7c3aed,#5b21b6);
              color:#fff;
              border-radius:12px;
              padding:10px 16px;
              font-weight:800;
              cursor:pointer;
            "
          >
            Find Matches
          </button>
        </div>
      `;

    section.innerHTML = `
      <div style="
        display:flex;
        align-items:end;
        justify-content:space-between;
        gap:15px;
        margin-bottom:14px;
      ">
        <div>
          <div style="
            font-size:12px;
            color:#7c3aed;
            font-weight:900;
            letter-spacing:.08em;
            text-transform:uppercase;
          ">
            SamajSaathi
          </div>
          <h2 style="
            margin:3px 0 0;
            color:#24151a;
            font-size:25px;
          ">
            &#128155; Your Matches
          </h2>
          <p style="
            margin:5px 0 0;
            color:#7b626a;
            font-size:13px;
          ">
            People where interest has been accepted.
          </p>
        </div>

        ${
          matches.length
            ? `<button type="button" onclick="openFindMatches()" style="
                border:1px solid rgba(124,58,237,.22);
                background:#fff;
                color:#5b21b6;
                border-radius:10px;
                padding:9px 13px;
                font-weight:800;
                cursor:pointer;
              ">View All</button>`
            : ""
        }
      </div>

      <div style="
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(270px,1fr));
        gap:13px;
      ">
        ${cards}
      </div>
    `;

    const footer =
      document.querySelector("footer");

    if (footer && footer.parentNode) {
      footer.parentNode.insertBefore(section, footer);
    } else {
      const main =
        document.querySelector("main") ||
        document.body;
      main.appendChild(section);
    }

  } catch (error) {
    console.error("LOAD HOMEPAGE MATCHES ERROR:", error);
  }
}

function refreshHomepageLoggedInUI() {
  if (!isPublicHomeRoute()) return;

  updateHomepageUserUI();
  loadHomepageMatches();
}

// ============================================================
// GO TO HOME PAGE FROM DASHBOARD
// Keeps the user logged in.
// ============================================================

async function goHomeFromDashboard() {

  if (samajNavigatingHome) {
    return;
  }

  samajNavigatingHome = true;

  try {

    const dashboard = document.getElementById("samajSaathiDashboard");
    if (dashboard) {
      dashboard.remove();
    }

    const viewer = document.getElementById("samajProfileViewer");
    if (viewer) {
      viewer.remove();
    }

    if (window.location.hash !== "#home") {
      window.location.hash = "home";
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    await loadProfiles();
    await updateHomepageUserUI();
    await loadHomepageMatches();

  } catch (error) {

    console.error("GO HOME ERROR:", error);

    const dashboard = document.getElementById("samajSaathiDashboard");
    if (dashboard) {
      dashboard.remove();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

  } finally {

    setTimeout(function() {
      samajNavigatingHome = false;
    }, 800);

  }

}


// ============================================================
// LOGOUT
// ============================================================

async function logoutUser() {

  if (samajLoggingOut) {
    return;
  }


  if (!isSupabaseReady()) {
    return;
  }


  samajLoggingOut =
    true;


  try {

    const result =
      await supabaseClient
        .auth
        .signOut();


    if (result.error) {

      console.error(
        "SUPABASE LOGOUT ERROR:",
        result.error
      );

    }

  } catch (error) {

    console.error(
      "LOGOUT ERROR:",
      error
    );

  }


  const dashboard =
    document.getElementById(
      "samajSaathiDashboard"
    );


  if (dashboard) {
    dashboard.remove();
  }


  const viewer =
    document.getElementById(
      "samajProfileViewer"
    );


  if (viewer) {
    viewer.remove();
  }


  localStorage.removeItem(
    "samajSaathiUserId"
  );

  localStorage.removeItem(
    "samajSaathiUsername"
  );

  localStorage.removeItem(
    "samajSaathiPendingProfile"
  );


  window.scrollTo({

    top:
      0,

    behavior:
      "smooth"

  });


  await loadProfiles();


  samajLoggingOut =
    false;

}


// ============================================================
// RESTORE LOGIN SESSION
// ============================================================

async function restoreLoginSession() {

  if (
    samajLoggingOut ||
    samajNavigatingHome ||
    isPublicHomeRoute() ||
    !supabaseClient
  ) {
    return;
  }


  try {

    const result =
      await supabaseClient.auth
        .getSession();


    if (result.error) {

      console.error(
        "RESTORE SESSION ERROR:",
        result.error
      );

      return;
    }


    const session =
      result.data?.session;

    if (session && !session.user?.email_confirmed_at) {
      await supabaseClient.auth.signOut();
      return;
    }


    if (!session) {

      console.log(
        "SamajSaathi: No active session."
      );

      return;
    }


    console.log(
      "SamajSaathi: Active session restored."
    );


    await savePendingProfile();


    if (isPublicHomeRoute()) {
      await updateHomepageUserUI();
      await loadHomepageMatches();
      hideLoggedOutHomepageButtons();
      return;
    }


    const existingDashboard =
      document.getElementById(
        "samajSaathiDashboard"
      );


    if (!existingDashboard) {

      await openDashboard();

    }

  } catch (error) {

    console.error(
      "SESSION RESTORE ERROR:",
      error
    );

  }

}


// ============================================================
// AUTH STATE LISTENER
// ============================================================

function setupAuthListener() {

  if (!supabaseClient) {
    return;
  }


  supabaseClient.auth.onAuthStateChange(
    async function(
      event,
      session
    ) {

      console.log(
        "SamajSaathi Auth Event:",
        event
      );


      if (
        event ===
        "SIGNED_OUT"
      ) {

        if (!samajLoggingOut) {

          const dashboard =
            document.getElementById(
              "samajSaathiDashboard"
            );

          if (dashboard) {
            dashboard.remove();
          }

        }

        return;
      }


      if (
        event === "SIGNED_IN" ||
        event === "TOKEN_REFRESHED" ||
        event === "USER_UPDATED"
      ) {

        if (samajNavigatingHome) {
          return;
        }

        if (!session) {
          return;
        }

        if (!session.user?.email_confirmed_at) {
          return;
        }


        const existingDashboard =
          document.getElementById(
            "samajSaathiDashboard"
          );


        if (
          !existingDashboard &&
          !samajDashboardOpening &&
          !samajLoggingOut
        ) {

          setTimeout(
            function() {

              if (isPublicHomeRoute()) {
                updateHomepageUserUI();
                loadHomepageMatches();
                hideLoggedOutHomepageButtons();
                return;
              }

              restoreLoginSession();

            },
            100
          );

        }

      }

    }
  );

}


// ============================================================
// HASH / BROWSER NAVIGATION PROTECTION
// ============================================================

function setupNavigationProtection() {

  window.addEventListener(
    "hashchange",
    function() {

      console.log(
        "SamajSaathi: Hash changed. Session remains active."
      );


      if (samajLoggingOut || samajNavigatingHome) {
        return;
      }

      // When the browser Back button returns to Home, remove the
      // dashboard overlay and refresh the logged-in homepage UI.
      if (isPublicHomeRoute()) {
        const dashboard = document.getElementById("samajSaathiDashboard");
        if (dashboard) dashboard.remove();

        const viewer = document.getElementById("samajProfileViewer");
        if (viewer) viewer.remove();

        closeModal();
        setTimeout(function() {
          updateHomepageUserUI();
          loadHomepageMatches();
          loadProfiles();
          loadHeroFeaturedProfiles();
          hideLoggedOutHomepageButtons();
        }, 0);
        return;
      }


      const dashboard =
        document.getElementById(
          "samajSaathiDashboard"
        );


      if (dashboard) {
        return;
      }


      setTimeout(
        function() {

          restoreLoginSession();

        },
        100
      );

    }
  );


  window.addEventListener(
    "popstate",
    function() {

      console.log(
        "SamajSaathi: Browser navigation detected."
      );


      if (samajLoggingOut || isPublicHomeRoute()) {
        return;
      }


      setTimeout(
        function() {

          restoreLoginSession();

        },
        100
      );

    }
  );

}


// ============================================================
// PAGE VISIBILITY
// ============================================================

function setupVisibilityProtection() {

  document.addEventListener(
    "visibilitychange",
    function() {

      if (
        document.visibilityState !==
        "visible"
      ) {
        return;
      }


      if (samajLoggingOut || isPublicHomeRoute()) {
        return;
      }


      setTimeout(
        function() {

          restoreLoginSession();

        },
        150
      );

    }
  );

}


// ============================================================
// SCROLL
// ============================================================

function scrollToId(id) {

  const element =
    document.getElementById(
      id
    );


  if (element) {

    element.scrollIntoView({
      behavior:
        "smooth"
    });

  }

}


// ============================================================
// MODAL EVENTS
// ============================================================

function setupModalEvents() {

  const modal =
    document.getElementById(
      "modal"
    );


  if (!modal) {
    return;
  }


  modal.addEventListener(
    "click",
    function(event) {

      if (
        event.target ===
        modal
      ) {

        closeModal();

      }

    }
  );

}


// ============================================================
// KEYBOARD
// ============================================================

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key ===
      "Escape"
    ) {

      closeModal();


      const viewer =
        document.getElementById(
          "samajProfileViewer"
        );


      if (viewer) {
        viewer.remove();
      }

    }

  }
);


// ============================================================
// EXPOSE FUNCTIONS TO HTML
// ============================================================
// IMPORTANT FIX
// ============================================================

window.openModal =
  openModal;

window.closeModal =
  closeModal;

window.loginUser =
  loginUser;

window.registerUser =
  registerUser;

window.openDashboard =
  openDashboard;

window.goHomeFromDashboard =
  goHomeFromDashboard;

window.updateHomepageUserUI =
  updateHomepageUserUI;

window.logoutUser =
  logoutUser;

window.openFindMatches =
  openFindMatches;

window.loadMatches =
  loadMatches;

window.loadProfiles =
  loadProfiles;

window.viewProfile =
  viewProfile;

window.sendInterest =
  sendInterest;

window.respondToInterest =
  respondToInterest;

window.loadMyInterests =
  loadMyInterests;

window.loadReceivedInterests =
  loadReceivedInterests;

window.loadNotifications =
  loadNotifications;

window.markNotificationsRead =
  markNotificationsRead;

window.showDashboardSection =
  showDashboardSection;

window.updateProfile =
  updateProfile;

window.uploadProfilePhoto =
  uploadProfilePhoto;

window.scrollToId =
  scrollToId;


// ============================================================
// INITIALIZE
// ============================================================

document.addEventListener(
  "DOMContentLoaded",
  async function() {

    if (samajInitialised) {
      return;
    }


    samajInitialised =
      true;


    console.log(
      "SamajSaathi app loading..."
    );


    if (!supabaseClient) {

      console.error(
        "SamajSaathi: Supabase is unavailable."
      );

      return;
    }


    setupAuthListener();


    setupNavigationProtection();


    setupVisibilityProtection();


    setupModalEvents();


    await loadProfiles();
    await loadHeroFeaturedProfiles();

    if (isPublicHomeRoute()) {
      await updateHomepageUserUI();
      await loadHomepageMatches();
      hideLoggedOutHomepageButtons();
    }


    await restoreLoginSession();


    await updateHomepageUserUI();
    hideLoggedOutHomepageButtons();


    await loadNotifications();

    setTimeout(function() {
      updateHomepageUserUI();
      hideLoggedOutHomepageButtons();
    }, 500);


    console.log(
      "SamajSaathi app loaded successfully."
    );

  }
);


// ============================================================
// EARLY SESSION CHECK
// ============================================================

(async function() {

  try {

    if (!supabaseClient) {
      return;
    }


    const result =
      await supabaseClient
        .auth
        .getSession();


    if (
      result.data?.session
    ) {

      console.log(
        "SamajSaathi: User session active and persisted."
      );

    }

    else {

      console.log(
        "SamajSaathi: No saved session found."
      );

    }

  } catch (error) {

    console.error(
      "SESSION CHECK ERROR:",
      error
    );

  }

})();


// ============================================================
// FINAL READY CHECK
// ============================================================

console.log(
  "SamajSaathi app.js loaded."
);



/* ============================================================
   SAMAJSAATHI V2 â€” MATCH + FAMILY INTRODUCTION FLOW
   Chat intentionally disabled. Mutual matches can request a
   SamajSaathi family introduction after payment.
   ============================================================ */

const SS_FAMILY_INTRO_AMOUNT = 29900; // â‚¹299 in paise

function ssPair(a, b) {
  return String(a) < String(b)
    ? { user1_id: a, user2_id: b }
    : { user1_id: b, user2_id: a };
}

async function ssSession() {
  if (!supabaseClient) return null;
  const r = await supabaseClient.auth.getSession();
  return r.data?.session || null;
}

async function ssConfirmed(a, b) {
  if (!a || !b || a === b || !supabaseClient) return false;

  const pair = ssPair(a, b);
  const r = await supabaseClient
    .from('matches')
    .select('id')
    .eq('user1_id', pair.user1_id)
    .eq('user2_id', pair.user2_id)
    .maybeSingle();

  if (r.error) {
    console.error('CONFIRMED MATCH CHECK:', r.error);
    return false;
  }

  if (r.data) return true;
  return await ssCreateConfirmedMatch(a, b);
}

async function ssCreateConfirmedMatch(a, b) {
  if (!supabaseClient || !a || !b || a === b) return false;

  try {
    const ab = await supabaseClient
      .from('interests')
      .select('id')
      .eq('sender_id', a)
      .eq('receiver_id', b)
      .eq('status', 'accepted')
      .maybeSingle();

    if (ab.error) throw ab.error;

    const ba = await supabaseClient
      .from('interests')
      .select('id')
      .eq('sender_id', b)
      .eq('receiver_id', a)
      .eq('status', 'accepted')
      .maybeSingle();

    if (ba.error) throw ba.error;
    if (!ab.data || !ba.data) return false;

    const pair = ssPair(a, b);
    const existing = await supabaseClient
      .from('matches')
      .select('id')
      .eq('user1_id', pair.user1_id)
      .eq('user2_id', pair.user2_id)
      .maybeSingle();

    if (existing.error && existing.error.code !== 'PGRST116') throw existing.error;
    if (existing.data) return true;

    const inserted = await supabaseClient
      .from('matches')
      .insert({
        user1_id: pair.user1_id,
        user2_id: pair.user2_id,
        match_score: 100
      });

    if (inserted.error) {
      if (inserted.error.code === '23505') return true;
      throw inserted.error;
    }

    return true;
  } catch (e) {
    console.error('CREATE CONFIRMED MATCH:', e);
    return false;
  }
}

async function ssGetFamilyRequest(otherUserId) {
  const session = await ssSession();
  if (!session || !otherUserId || !supabaseClient) return null;

  const r = await supabaseClient
    .from('family_contact_requests')
    .select('id,status,amount_paise,razorpay_order_id,created_at,paid_at,admin_notes')
    .eq('requester_id', session.user.id)
    .eq('receiver_id', otherUserId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (r.error) {
    console.warn('FAMILY REQUEST LOOKUP:', r.error);
    return null;
  }
  return r.data || null;
}

function ssFamilyStatusText(status) {
  const map = {
    payment_pending: 'Payment pending',
    paid: 'Payment received',
    admin_review: 'Under SamajSaathi review',
    approved: 'Family introduction approved',
    rejected: 'Request rejected',
    refunded: 'Payment refunded'
  };
  return map[status] || 'Request pending';
}

async function ssStartFamilyIntroduction(otherUserId) {
  if (!otherUserId) return;

  const session = await ssSession();
  if (!session) {
    openModal('login');
    return;
  }

  const confirmed = await ssConfirmed(session.user.id, otherUserId);
  if (!confirmed) {
    alert('Family introduction is available only after both people accept each other.');
    return;
  }

  const existing = await ssGetFamilyRequest(otherUserId);
  if (existing && ['paid', 'admin_review', 'approved'].includes(existing.status)) {
    alert('Your family introduction request is already ' + ssFamilyStatusText(existing.status).toLowerCase() + '.');
    return;
  }

  if (!window.Razorpay) {
    alert('Payment checkout is not loaded yet. Please refresh the page and try again.');
    return;
  }

  const btn = document.getElementById('ssFamilyIntroBtn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Preparing payment...';
  }

  try {
    const orderResult = await supabaseClient.functions.invoke('create-family-contact-order', {
      body: { receiver_id: otherUserId }
    });

    if (orderResult.error) throw orderResult.error;
    const data = orderResult.data || {};
    if (!data.order_id || !data.request_id || !data.key_id) {
      throw new Error(data.error || 'Payment order could not be created.');
    }

    const pr = await supabaseClient
      .from('profiles')
      .select('full_name')
      .eq('id', otherUserId)
      .maybeSingle();

    const receiverName = pr.data?.full_name || 'SamajSaathi Member';

    const options = {
      key: data.key_id,
      amount: data.amount_paise || SS_FAMILY_INTRO_AMOUNT,
      currency: 'INR',
      name: 'SamajSaathi',
      description: 'Family Introduction Request',
      order_id: data.order_id,
      prefill: {
        name: (window.currentProfileData?.full_name || session.user.email || 'SamajSaathi Member'),
        email: session.user.email || ''
      },
      notes: {
        request_id: data.request_id,
        member: receiverName
      },
      theme: { color: '#7a102b' },
      handler: async function(response) {
        try {
          const verifyResult = await supabaseClient.functions.invoke('verify-family-contact-payment', {
            body: {
              request_id: data.request_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            }
          });

          if (verifyResult.error) throw verifyResult.error;
          const verified = verifyResult.data || {};
          if (!verified.success) throw new Error(verified.error || 'Payment verification failed.');

          alert('Payment successful. Your family introduction request has been sent to SamajSaathi for review.');
          await ssRefreshFamilyIntroductionUI(otherUserId);
        } catch (e) {
          console.error('PAYMENT VERIFICATION:', e);
          alert('Payment was received by the gateway, but verification is still pending. Please contact SamajSaathi support with your payment ID: ' + (response.razorpay_payment_id || 'N/A'));
          await ssRefreshFamilyIntroductionUI(otherUserId);
        }
      },
      modal: {
        ondismiss: async function() {
          await ssRefreshFamilyIntroductionUI(otherUserId);
        }
      }
    };

    const checkout = new Razorpay(options);
    checkout.on('payment.failed', function(response) {
      console.error('RAZORPAY PAYMENT FAILED:', response?.error || response);
      alert('Payment failed or was cancelled. No family contact details were shared.');
    });
    checkout.open();
  } catch (e) {
    console.error('FAMILY INTRO PAYMENT:', e);
    alert('Unable to start payment: ' + (e.message || e));
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Request Family Introduction â€” â‚¹299';
    }
  }
}

async function ssRefreshFamilyIntroductionUI(otherUserId) {
  const statusEl = document.getElementById('ssFamilyIntroStatus');
  const btn = document.getElementById('ssFamilyIntroBtn');
  const request = await ssGetFamilyRequest(otherUserId);

  if (request && statusEl) {
    statusEl.textContent = ssFamilyStatusText(request.status);
  }

  if (request && ['paid', 'admin_review', 'approved'].includes(request.status)) {
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Request Submitted';
    }
  }
}

async function ssViewProfile(profileId) {
  if (!profileId || !isSupabaseReady()) return;

  try {
    const r = await supabaseClient
      .from('profiles')
      .select(`
        id, full_name, gender, date_of_birth, age, city, state,
        community, surname, kul, bio, education, occupation, height,
        marital_status, profile_photo, photo_url,
        native_place, family_type, family_status, father_occupation,
        mother_occupation, siblings, income, work_location,
        food_preference, smoking, drinking, interests,
        partner_age_min, partner_age_max, partner_city,
        partner_education, partner_occupation, partner_marital_status,
        partner_community, partner_expectations
      `)
      .eq('id', profileId)
      .maybeSingle();

    if (r.error) throw r.error;
    if (!r.data) {
      alert('Profile not found.');
      return;
    }

    const p = r.data;
    const name = p.full_name || 'SamajSaathi Member';
    const location = [p.city, p.state].filter(Boolean).join(', ');
    const photo = getProfilePhotoUrl(p.profile_photo || p.photo_url);
    const session = await ssSession();
    const isOwn = session?.user?.id === profileId;
    const isMatch = session && !isOwn ? await ssConfirmed(session.user.id, profileId) : false;
    const request = session && isMatch && !isOwn ? await ssGetFamilyRequest(profileId) : null;

    document.getElementById('samajProfileViewer')?.remove();

    const viewer = document.createElement('div');
    viewer.id = 'samajProfileViewer';
    viewer.style.cssText = 'position:fixed;inset:0;z-index:10001;background:rgba(20,10,15,.72);display:flex;align-items:center;justify-content:center;padding:20px;overflow:auto;';

    const photoHtml = photo
      ? `<img src="${escapeHtml(photo)}" alt="${escapeHtml(name)}" style="width:150px;height:150px;border-radius:50%;object-fit:cover;display:block;margin:0 auto 20px;" onerror="this.style.display='none';">`
      : `<div style="width:150px;height:150px;border-radius:50%;background:#f1e5e8;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:55px;">\u{1F464}</div>`;

    const item = (label, value) => `
      <div style="background:#faf7f8;border:1px solid #eee0e4;border-radius:12px;padding:12px;">
        <small style="display:block;color:#8a747b;font-size:11px;">${escapeHtml(label)}</small>
        <strong style="display:block;margin-top:4px;color:#24151a;font-size:13px;">${escapeHtml(value || 'Not specified')}</strong>
      </div>`;

    let actionHtml = '';
    if (!isOwn) {
      if (isMatch) {
        const status = request ? ssFamilyStatusText(request.status) : '';
        const submitted = request && ['paid', 'admin_review', 'approved'].includes(request.status);
        actionHtml = `
          <div style="width:100%;text-align:center;">
            <div style="background:#f7f0f2;border-radius:12px;padding:12px;margin-bottom:12px;color:#6f1025;font-size:13px;">
              <strong>Mutual Match confirmed</strong><br>
              <span id="ssFamilyIntroStatus">${escapeHtml(status || 'You can request a family introduction.')}</span>
            </div>
            <button type="button" id="ssFamilyIntroBtn"
              ${submitted ? 'disabled' : ''}
              style="border:0;background:#6f1025;color:#fff;border-radius:10px;padding:12px 18px;font-weight:800;cursor:${submitted ? 'not-allowed' : 'pointer'};opacity:${submitted ? '.65' : '1'};">
              ${submitted ? 'Request Submitted' : 'Request Family Introduction â€” â‚¹299'}
            </button>
            <div style="font-size:11px;color:#88747b;margin-top:8px;">SamajSaathi reviews the request before any family contact details are shared.</div>
          </div>`;
      } else {
        actionHtml = `
          <button type="button" id="ssProfileInterestBtn"
            style="border:0;background:#6f1025;color:#fff;border-radius:10px;padding:11px 18px;font-weight:800;cursor:pointer;">
            \u{2764}\u{FE0F} Send Interest
          </button>`;
      }
    }

    const familyRows = [
      ['Native Place', p.native_place], ['Family Type', p.family_type],
      ['Family Status', p.family_status], ['Father', p.father_occupation],
      ['Mother', p.mother_occupation], ['Siblings', p.siblings],
      ['Income', p.income], ['Work Location', p.work_location]
    ].filter(x => x[1]);

    const lifestyleRows = [
      ['Food', p.food_preference], ['Smoking', p.smoking],
      ['Drinking', p.drinking], ['Interests', p.interests]
    ].filter(x => x[1]);

    const partnerRows = [
      ['Age', p.partner_age_min || p.partner_age_max ? `${p.partner_age_min || ''} - ${p.partner_age_max || ''}` : ''],
      ['City', p.partner_city], ['Education', p.partner_education],
      ['Occupation', p.partner_occupation], ['Marital Status', p.partner_marital_status],
      ['Community', p.partner_community], ['Expectations', p.partner_expectations]
    ].filter(x => x[1]);

    const grid = rows => rows.map(x => item(x[0], x[1])).join('');

    viewer.innerHTML = `
      <div style="width:min(700px,100%);max-height:90vh;overflow:auto;background:#fff;border-radius:22px;padding:30px;position:relative;box-shadow:0 25px 80px rgba(0,0,0,.25);">
        <button type="button" id="ssProfileClose" style="position:absolute;top:15px;right:15px;width:38px;height:38px;border:0;border-radius:50%;background:#f5edef;cursor:pointer;font-size:20px;">Ã—</button>
        ${photoHtml}
        <div style="text-align:center;">
          <span class="eyebrow">SAMAJSAATHI MEMBER</span>
          <h2 style="margin:8px 0;">${escapeHtml(name)}${p.age ? ', ' + escapeHtml(p.age) : ''}</h2>
          <p style="margin:0 0 20px;color:#7b626a;">${escapeHtml(location || 'Location not specified')}</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;">
          ${item('Community', p.community)}${item('Surname', p.surname)}${item('Kul', p.kul)}
          ${item('Education', p.education)}${item('Occupation', p.occupation)}${item('Height', p.height)}${item('Marital Status', p.marital_status)}
        </div>
        <div style="margin-top:15px;background:#faf7f8;border-radius:12px;padding:15px;">
          <strong style="display:block;margin-bottom:6px;">About</strong>
          <div style="color:#5f4d54;font-size:13px;line-height:1.6;">${escapeHtml(p.bio || 'No bio added yet.')}</div>
        </div>
        ${familyRows.length ? `<div style="margin-top:15px;"><strong>Family</strong><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin-top:8px;">${grid(familyRows)}</div></div>` : ''}
        ${lifestyleRows.length ? `<div style="margin-top:15px;"><strong>Lifestyle & Interests</strong><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin-top:8px;">${grid(lifestyleRows)}</div></div>` : ''}
        ${partnerRows.length ? `<div style="margin-top:15px;"><strong>Partner Preferences</strong><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin-top:8px;">${grid(partnerRows)}</div></div>` : ''}
        <div id="ssProfileActions" style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:20px;">${actionHtml}</div>
      </div>`;

    document.body.appendChild(viewer);
    document.getElementById('ssProfileClose').onclick = () => viewer.remove();

    document.getElementById('ssProfileInterestBtn')?.addEventListener('click', async () => {
      const ok = await sendInterest(profileId);
      if (ok !== false) viewer.remove();
    });

    document.getElementById('ssFamilyIntroBtn')?.addEventListener('click', () => ssStartFamilyIntroduction(profileId));
    viewer.addEventListener('click', e => { if (e.target === viewer) viewer.remove(); });
  } catch (e) {
    console.error('VIEW PROFILE ERROR:', e);
    alert('Unable to open profile: ' + (e.message || e));
  }
}

async function ssLoadHomepageMatches() {
  if (!supabaseClient || !isPublicHomeRoute()) return;

  document.getElementById('samajHomepageMatches')?.remove();
  const session = await ssSession();
  if (!session) return;

  try {
    const mr = await supabaseClient
      .from('matches')
      .select('id,user1_id,user2_id,created_at')
      .or('user1_id.eq.' + session.user.id + ',user2_id.eq.' + session.user.id)
      .order('created_at', { ascending: false });

    if (mr.error) throw mr.error;

    const ids = (mr.data || []).map(row => row.user1_id === session.user.id ? row.user2_id : row.user1_id);
    let profiles = [];
    if (ids.length) {
      const pr = await supabaseClient
        .from('profiles')
        .select('id,full_name,age,city,state,profile_photo,photo_url,surname')
        .in('id', ids)
        .eq('is_active', true);
      if (pr.error) throw pr.error;
      profiles = pr.data || [];
    }

    const map = new Map(profiles.map(p => [p.id, p]));
    const cards = (mr.data || []).map(row => {
      const id = row.user1_id === session.user.id ? row.user2_id : row.user1_id;
      const p = map.get(id);
      if (!p) return '';
      const name = p.full_name || 'SamajSaathi Member';
      const location = [p.city, p.state].filter(Boolean).join(', ');
      const photo = getProfilePhotoUrl(p.profile_photo || p.photo_url);
      return `<article style="background:#fff;border:1px solid rgba(111,16,37,.10);border-radius:20px;padding:14px;box-shadow:0 10px 28px rgba(52,19,30,.08);">
        <div style="display:flex;align-items:center;gap:12px;"><div style="width:64px;height:64px;border-radius:50%;overflow:hidden;flex:none;background:#f2e7ff;display:flex;align-items:center;justify-content:center;">
          ${photo ? `<img src="${escapeHtml(photo)}" alt="${escapeHtml(name)}" style="width:100%;height:100%;object-fit:cover;">` : '<span style="font-size:28px;">\u{1F464}</span>'}
        </div><div style="flex:1;min-width:0;"><div style="font-weight:800;color:#24151a;">${escapeHtml(name)}</div><div style="font-size:12px;color:#7b626a;margin-top:4px;">${escapeHtml(location || 'Location not specified')}</div><div style="display:inline-block;margin-top:7px;padding:4px 9px;border-radius:999px;background:#e9f8ef;color:#18794e;font-size:11px;font-weight:800;">\u{2764}\u{FE0F} Matched</div></div></div>
        <div style="display:flex;gap:8px;margin-top:13px;"><button type="button" onclick="viewProfile('${escapeHtml(id)}')" style="flex:1;border:1px solid #7a102b;background:#fff;color:#6f1025;border-radius:10px;padding:9px 10px;font-weight:800;cursor:pointer;">View Profile</button><button type="button" onclick="viewProfile('${escapeHtml(id)}')" style="flex:1;border:0;background:#6f1025;color:#fff;border-radius:10px;padding:9px 10px;font-weight:800;cursor:pointer;">Family Introduction</button></div>
      </article>`;
    }).filter(Boolean).join('');

    const section = document.createElement('section');
    section.id = 'samajHomepageMatches';
    section.style.cssText = 'max-width:1180px;margin:28px auto 36px;padding:0 20px;';
    section.innerHTML = `<div style="margin-bottom:14px;"><div style="font-size:12px;color:#6f1025;font-weight:900;letter-spacing:.08em;text-transform:uppercase;">SamajSaathi</div><h2 style="margin:3px 0;color:#24151a;font-size:25px;">\u{2764}\u{FE0F} Your Matches</h2><p style="margin:5px 0;color:#7b626a;font-size:13px;">Mutual matches can request a family introduction through SamajSaathi.</p></div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:13px;">${cards || `<div style="grid-column:1/-1;background:#fff;border:1px solid rgba(111,16,37,.10);border-radius:20px;padding:25px;text-align:center;"><div style="font-size:36px;">\u{1F49A}</div><h3 style="margin:8px 0 6px;color:#24151a;">No confirmed matches yet</h3><p style="margin:0;color:#7b626a;font-size:13px;">A match appears only after both people accept each other's interest.</p></div>`}</div>`;

    const footer = document.querySelector('footer');
    if (footer?.parentNode) footer.parentNode.insertBefore(section, footer);
    else (document.querySelector('main') || document.body).appendChild(section);
  } catch (e) {
    console.error('HOMEPAGE MATCHES:', e);
  }
}

window.viewProfile = ssViewProfile;
window.loadHomepageMatches = ssLoadHomepageMatches;
window.ensureConfirmedMatch = ssCreateConfirmedMatch;
window.requestFamilyIntroduction = ssStartFamilyIntroduction;

console.log('SamajSaathi V2: chat disabled; family introduction flow enabled.');
