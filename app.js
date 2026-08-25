// ============================================================
// SAMAJ SAATHI MATRIMONY
// COMPLETE SUPABASE APP.JS
// ============================================================
//
// FEATURES
// 1. Supabase Auth Login
// 2. Create Profile
// 3. Save Profile
// 4. Email Confirmation Support
// 5. Dashboard
// 6. Profile Photo Upload
// 7. Profile Photo Preview
// 8. Find Your Matches
// 9. Male -> Female
// 10. Female -> Male
// 11. Hide Own Profile
// 12. Active Profiles Only
// 13. View Profile
// 14. Logout
//
// ============================================================


// ============================================================
// SUPABASE CONFIG
// ============================================================

const SUPABASE_URL =
  "https://drrsborerbgzthxdazqu.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_ACdKChyHYC11rSK9_HZ0Jg_l22KO06k";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );


// ============================================================
// GLOBAL HELPERS
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
      today.getDate() <
      birthDate.getDate()
    )
  ) {
    age--;
  }

  return age;
}


// ============================================================
// SCROLL
// ============================================================

function scrollToId(id) {

  const element =
    document.getElementById(id);

  if (!element) {
    return;
  }

  element.scrollIntoView({
    behavior: "smooth"
  });

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
    String(firstName)
      .toLowerCase()
      .replace(/[^a-z]/g, "");

  const last =
    String(lastName)
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

      background:
        ${
          isError
            ? "#fff3f3"
            : "#f8f1f3"
        };

      color:
        ${
          isError
            ? "#b42318"
            : "#6f1025"
        };
    ">

      ${escapeHtml(text)}

    </div>

  `;

}


// ============================================================
// OPEN LOGIN / REGISTER MODAL
// ============================================================

function openModal(type) {

  const modal =
    document.getElementById("modal");

  const content =
    document.getElementById(
      "modalContent"
    );

  if (!modal || !content) {

    console.error(
      "Modal elements not found."
    );

    return;

  }


  // ==========================================================
  // LOGIN
  // ==========================================================

  if (type === "login") {

    content.innerHTML = `

      <span class="eyebrow">
        WELCOME BACK
      </span>

      <h2>
        Login to SamajSaathi
      </h2>

      <p>
        Access your profile and find compatible matches.
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
          class="btn primary"
          type="button"
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


  // ==========================================================
  // REGISTER
  // ==========================================================

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

      <p style="
        margin-top:15px;
        font-size:12px;
        color:#777;
        text-align:center;
      ">

        By creating an account you agree to use
        SamajSaathi respectfully.

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
    document.getElementById("modal");

  if (modal) {

    modal.classList.remove("show");

  }

}


// ============================================================
// REGISTER USER
// ============================================================

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
      "Please fill all required fields.",
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
      "SamajSaathi is available for adults aged 18 or above.",
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

    // ========================================================
    // CREATE AUTH ACCOUNT
    // ========================================================

    const authResult =
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


    if (authResult.error) {

      showMessage(
        message,
        authResult.error.message,
        "error"
      );

      return;

    }


    if (!authResult.data?.user) {

      showMessage(
        message,
        "Account could not be created.",
        "error"
      );

      return;

    }


    const profileData = {

      id:
        authResult.data.user.id,

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

      community:
        community,

      surname:
        surname,

      kul:
        kul,

      is_active:
        true

    };


    localStorage.setItem(
      "samajSaathiUserId",
      displayUserId
    );

    localStorage.setItem(
      "samajSaathiUsername",
      username
    );


    // ========================================================
    // SESSION EXISTS
    // ========================================================

    if (authResult.data.session) {

      const profileResult =
        await supabaseClient
          .from("profiles")
          .upsert(
            profileData,
            {
              onConflict: "id"
            }
          );


      if (profileResult.error) {

        console.error(
          "PROFILE SAVE ERROR:",
          profileResult.error
        );

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

      return;

    }


    // ========================================================
    // EMAIL CONFIRMATION ENABLED
    // ========================================================

    localStorage.setItem(
      "samajSaathiPendingProfile",
      JSON.stringify(profileData)
    );


    contentAfterSignup(

      firstName,

      displayUserId,

      username,

      password

    );


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
// EMAIL CONFIRMATION SCREEN
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
        font-size:50px;
      ">
        ✓
      </div>

      <span class="eyebrow">
        ACCOUNT CREATED
      </span>

      <h2>
        Welcome to SamajSaathi,
        ${escapeHtml(firstName)}!
      </h2>

      <p>
        Your account has been created.
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
            margin-top:5px;
          ">
            ${escapeHtml(userId)}
          </strong>

        </div>

        <br>

        <div>

          <small>
            Username
          </small>

          <strong style="
            display:block;
            margin-top:5px;
          ">
            ${escapeHtml(username)}
          </strong>

        </div>

        <br>

        <div>

          <small>
            Temporary Password
          </small>

          <strong style="
            display:block;
            margin-top:5px;
          ">
            ${escapeHtml(password)}
          </strong>

        </div>

      </div>

      <div style="
        padding:12px;
        border-radius:10px;
        background:#fff8e6;
        color:#7a4d00;
        font-size:13px;
      ">

        Please save your login details.

        <br><br>

        If email confirmation is enabled,
        confirm your email before logging in.

      </div>

      <div class="modal-actions">

        <button
          class="btn primary"
          type="button"
          onclick="openModal('login')"
        >
          Login
        </button>

      </div>

    </div>

  `;

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
        font-size:50px;
      ">
        ✓
      </div>

      <span class="eyebrow">
        PROFILE CREATED
      </span>

      <h2>
        Welcome to SamajSaathi,
        ${escapeHtml(user.firstName)}!
      </h2>

      <p>
        Your matrimonial profile is ready.
      </p>

      <div style="
        margin:20px 0;
        padding:18px;
        border-radius:14px;
        background:#f8f1f3;
        text-align:left;
      ">

        <div style="
          margin-bottom:14px;
        ">

          <small>
            User ID
          </small>

          <strong style="
            display:block;
            font-size:20px;
          ">
            ${escapeHtml(user.userId)}
          </strong>

        </div>

        <div style="
          margin-bottom:14px;
        ">

          <small>
            Username
          </small>

          <strong style="
            display:block;
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
      ">

        Save these details somewhere safe.

        <br>

        You will login using your email and password.

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


// ============================================================
// LOGIN
// ============================================================

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


    if (!result.data?.user) {

      showMessage(
        message,
        "Login failed.",
        "error"
      );

      return;

    }


    await savePendingProfile();


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
      JSON.parse(pending);

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


  profileData.id =
    session.user.id;


  const result =
    await supabaseClient
      .from("profiles")
      .upsert(
        profileData,
        {
          onConflict: "id"
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
// LOAD PUBLIC / DISCOVER PROFILES
// ============================================================

async function loadProfiles() {

  const grid =
    document.getElementById(
      "profiles"
    );

  if (!grid) {
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

    const sessionResult =
      await supabaseClient.auth
        .getSession();

    const session =
      sessionResult.data?.session;


    // ========================================================
    // NOT LOGGED IN
    // ========================================================

    if (!session) {

      grid.innerHTML = `

        <div style="
          grid-column:1/-1;
          text-align:center;
          padding:45px 20px;
        ">

          <div style="
            font-size:45px;
          ">
            💕
          </div>

          <h3>
            Login to discover matches
          </h3>

          <p>
            Create your profile or login to see
            compatible members.
          </p>

          <button
            class="btn primary"
            type="button"
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


    // ========================================================
    // GET CURRENT USER PROFILE
    // ========================================================

    const ownResult =
      await supabaseClient
        .from("profiles")
        .select(`
          id,
          gender
        `)
        .eq(
          "id",
          currentUserId
        )
        .maybeSingle();


    if (ownResult.error) {

      console.error(
        "OWN PROFILE ERROR:",
        ownResult.error
      );

      grid.innerHTML = `

        <div style="
          grid-column:1/-1;
          text-align:center;
          padding:40px;
          color:#b42318;
        ">

          <h3>
            Unable to load your profile
          </h3>

          <p>
            ${escapeHtml(
              ownResult.error.message
            )}
          </p>

        </div>

      `;

      return;

    }


    if (!ownResult.data) {

      grid.innerHTML = `

        <div style="
          grid-column:1/-1;
          text-align:center;
          padding:40px;
        ">

          <h3>
            Complete your profile first
          </h3>

          <p>
            Your profile needs to be created before
            matches can be shown.
          </p>

          <button
            class="btn primary"
            type="button"
            onclick="openDashboard()"
          >
            Open My Profile
          </button>

        </div>

      `;

      return;

    }


    const myGender =
      String(
        ownResult.data.gender || ""
      ).toLowerCase();


    if (
      myGender !== "male" &&
      myGender !== "female"
    ) {

      grid.innerHTML = `

        <div style="
          grid-column:1/-1;
          text-align:center;
          padding:40px;
        ">

          <h3>
            Gender information required
          </h3>

          <p>
            Please update your gender in your profile.
          </p>

        </div>

      `;

      return;

    }


    // ========================================================
    // OPPOSITE GENDER
    // ========================================================

    const oppositeGender =
      myGender === "male"
        ? "female"
        : "male";


    // ========================================================
    // FIND MATCHES
    // ========================================================

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
            ascending: false
          }
        );


    if (result.error) {

      console.error(
        "MATCH LOAD ERROR:",
        result.error
      );

      grid.innerHTML = `

        <div style="
          grid-column:1/-1;
          text-align:center;
          padding:40px;
          color:#b42318;
        ">

          <h3>
            Unable to load matches
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


    const profiles =
      result.data || [];


    if (!profiles.length) {

      grid.innerHTML = `

        <div style="
          grid-column:1/-1;
          text-align:center;
          padding:45px 20px;
        ">

          <div style="
            font-size:50px;
          ">
            💕
          </div>

          <h3>
            No matches available yet
          </h3>

          <p>
            Compatible ${
              oppositeGender === "female"
                ? "women"
                : "men"
            }
            will appear here when profiles are available.
          </p>

        </div>

      `;

      return;

    }


    grid.innerHTML =
      profiles
        .map(
          createMatchCard
        )
        .join("");


  } catch (error) {

    console.error(
      "LOAD PROFILES ERROR:",
      error
    );

    grid.innerHTML = `

      <div style="
        grid-column:1/-1;
        text-align:center;
        padding:40px;
        color:#b42318;
      ">

        Something went wrong while loading matches.

      </div>

    `;

  }

}


// ============================================================
// MATCH CARD
// ============================================================

async function getSignedPhotoUrl(
  photoPath
) {

  if (!photoPath) {
    return null;
  }


  try {

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

      return null;

    }


    return result.data.signedUrl;


  } catch (error) {

    console.error(
      "SIGNED PHOTO ERROR:",
      error
    );

    return null;

  }

}


// ============================================================
// CREATE MATCH CARD
// ============================================================

function createMatchCard(profile) {

  const location =
    [
      profile.city,
      profile.state
    ]
      .filter(Boolean)
      .join(", ");


  const photoId =
    "match-photo-" +
    profile.id;


  setTimeout(
    function () {

      loadMatchCardPhoto(
        profile.id,
        profile.profile_photo,
        photoId
      );

    },
    0
  );


  return `

    <article
      class="profile"
      style="
        overflow:hidden;
      "
    >

      <div
        id="${escapeHtml(photoId)}"
        style="
          width:100%;
          height:250px;
          background:#f3f3f3;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:65px;
        "
      >
        👤
      </div>


      <div class="profile-body">

        <b style="
          font-size:18px;
          display:block;
          margin-bottom:7px;
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

        </b>


        <small>

          📍

          ${escapeHtml(
            location ||
            "Location not specified"
          )}

        </small>


        <small>

          ${escapeHtml(
            profile.community ||
            "Community not specified"
          )}

          ${
            profile.surname
              ? " · " +
                escapeHtml(
                  profile.surname
                )
              : ""
          }

        </small>


        ${
          profile.kul
            ? `
              <small>
                Kul: ${escapeHtml(
                  profile.kul
                )}
              </small>
            `
            : ""
        }


        <small class="match">

          SamajSaathi Member

        </small>


        <button
          type="button"
          class="btn primary"
          style="
            width:100%;
            margin-top:14px;
          "
          onclick="viewProfile('${escapeHtml(
            profile.id
          )}')"
        >

          View Profile

        </button>


        <!-- SEND INTEREST WILL COME IN STEP 3 -->

      </div>

    </article>

  `;

}


// ============================================================
// LOAD PHOTO INTO MATCH CARD
// ============================================================

async function loadMatchCardPhoto(
  profileId,
  photoPath,
  containerId
) {

  if (!photoPath) {
    return;
  }


  const container =
    document.getElementById(
      containerId
    );


  if (!container) {
    return;
  }


  const url =
    await getSignedPhotoUrl(
      photoPath
    );


  if (!url) {
    return;
  }


  container.innerHTML = `

    <img
      src="${escapeHtml(url)}"
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
// VIEW PROFILE
// ============================================================

async function viewProfile(
  profileId
) {

  if (!profileId) {
    return;
  }


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
          marital_status,
          is_active
        `)
        .eq(
          "id",
          profileId
        )
        .eq(
          "is_active",
          true
        )
        .maybeSingle();


    if (result.error) {

      alert(
        "Unable to open profile: " +
        result.error.message
      );

      return;

    }


    if (!result.data) {

      alert(
        "Profile not found."
      );

      return;

    }


    const p =
      result.data;


    const location =
      [
        p.city,
        p.state
      ]
        .filter(Boolean)
        .join(", ");


    let photoHtml = `

      <div style="
        width:160px;
        height:160px;
        margin:0 auto 20px;
        border-radius:50%;
        background:#f3f3f3;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:60px;
      ">

        👤

      </div>

    `;


    if (p.profile_photo) {

      const url =
        await getSignedPhotoUrl(
          p.profile_photo
        );


      if (url) {

        photoHtml = `

          <div style="
            width:160px;
            height:160px;
            margin:0 auto 20px;
            border-radius:50%;
            overflow:hidden;
            background:#f3f3f3;
          ">

            <img
              src="${escapeHtml(url)}"
              alt="Profile Photo"
              style="
                width:100%;
                height:100%;
                object-fit:cover;
              "
            >

          </div>

        `;

      }

    }


    const oldModal =
      document.getElementById(
        "profileViewModal"
      );


    if (oldModal) {
      oldModal.remove();
    }


    const modal =
      document.createElement(
        "div"
      );


    modal.id =
      "profileViewModal";


    modal.style.cssText = `

      position:fixed;
      inset:0;
      z-index:10001;
      background:rgba(0,0,0,.55);
      display:flex;
      align-items:center;
      justify-content:center;
      padding:20px;
      overflow:auto;

    `;


    modal.innerHTML = `

      <div style="
        background:#fff;
        width:min(520px,100%);
        max-height:90vh;
        overflow:auto;
        border-radius:20px;
        padding:28px;
        position:relative;
      ">


        <button
          type="button"
          onclick="
            document
              .getElementById('profileViewModal')
              ?.remove()
          "
          style="
            position:absolute;
            right:15px;
            top:15px;
            border:0;
            background:#f3f3f3;
            width:36px;
            height:36px;
            border-radius:50%;
            cursor:pointer;
            font-size:20px;
          "
        >

          ×

        </button>


        <div style="
          text-align:center;
        ">

          ${photoHtml}


          <span class="eyebrow">
            SAMJ SAATHI PROFILE
          </span>


          <h2 style="
            margin:8px 0;
          ">

            ${escapeHtml(
              p.full_name ||
              "Member"
            )}

            ${
              p.age
                ? ", " +
                  escapeHtml(
                    p.age
                  )
                : ""
            }

          </h2>


          <p>

            📍

            ${escapeHtml(
              location ||
              "Location not specified"
            )}

          </p>

        </div>


        <div style="
          display:grid;
          grid-template-columns:
          repeat(auto-fit,minmax(180px,1fr));
          gap:12px;
          margin-top:20px;
        ">


          ${dashboardItem(
            "Gender",
            p.gender
          )}


          ${dashboardItem(
            "Age",
            p.age
          )}


          ${dashboardItem(
            "Community",
            p.community
          )}


          ${dashboardItem(
            "Surname",
            p.surname
          )}


          ${dashboardItem(
            "Kul / Clan",
            p.kul
          )}


          ${dashboardItem(
            "City",
            p.city
          )}


          ${dashboardItem(
            "Marital Status",
            p.marital_status
          )}

        </div>


        <div style="
          margin-top:22px;
          padding:14px;
          border-radius:12px;
          background:#f8f1f3;
          text-align:center;
          font-size:13px;
          color:#6f1025;
        ">

          ❤️ Interest feature will be available next.

        </div>


      </div>

    `;


    document.body.appendChild(
      modal
    );


  } catch (error) {

    console.error(
      "VIEW PROFILE ERROR:",
      error
    );

    alert(
      "Something went wrong while opening the profile."
    );

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

    <div style="
      background:#fff;
      border:1px solid #eee;
      border-radius:14px;
      padding:16px;
    ">

      <small style="
        display:block;
        color:#777;
        margin-bottom:6px;
      ">

        ${escapeHtml(label)}

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
// OPEN DASHBOARD
// ============================================================

async function openDashboard() {

  const sessionResult =
    await supabaseClient.auth
      .getSession();

  const session =
    sessionResult.data?.session;


  if (!session) {

    openModal("login");

    return;

  }


  await savePendingProfile();


  const userId =
    session.user.id;


  const result =
    await supabaseClient
      .from("profiles")
      .select("*")
      .eq(
        "id",
        userId
      )
      .maybeSingle();


  if (result.error) {

    alert(
      "Profile could not be loaded: " +
      result.error.message
    );

    return;

  }


  if (!result.data) {

    alert(
      "Your account exists, but your profile has not been created yet."
    );

    return;

  }


  const profile =
    result.data;


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


      <!-- ==================================================
           HEADER
      =================================================== -->

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
            My Profile & Matches
          </small>

        </div>


        <div style="
          display:flex;
          gap:10px;
          flex-wrap:wrap;
        ">


          <button
            type="button"
            onclick="showMatchesInDashboard()"
            style="
              border:1px solid rgba(255,255,255,.5);
              background:#fff;
              color:#6f1025;
              padding:10px 16px;
              border-radius:8px;
              cursor:pointer;
              font-weight:600;
            "
          >

            ❤️ Find Your Matches

          </button>


          <button
            type="button"
            onclick="logoutUser()"
            style="
              border:1px solid rgba(255,255,255,.5);
              background:transparent;
              color:#fff;
              padding:10px 16px;
              border-radius:8px;
              cursor:pointer;
            "
          >

            Logout

          </button>

        </div>

      </div>


      <div style="
        max-width:1100px;
        margin:30px auto;
        padding:20px;
      ">


        <!-- ==================================================
             PROFILE PHOTO
        =================================================== -->

        <div style="
          background:#f8f1f3;
          border-radius:18px;
          padding:25px;
          margin-bottom:25px;
          text-align:center;
        ">

          <span class="eyebrow">
            PROFILE PHOTO
          </span>


          <div
            id="profilePhotoPreview"
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
              👤
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
            class="btn primary"
            type="button"
            onclick="uploadProfilePhoto()"
          >

            📷 Upload / Change Photo

          </button>


          <div
            id="photoMessage"
            style="
              margin-top:10px;
            "
          ></div>

        </div>


        <!-- ==================================================
             WELCOME
        =================================================== -->

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
            ${escapeHtml(
              profile.full_name
            )}!

          </h1>

          <p>
            Your SamajSaathi profile is ready.
          </p>

        </div>


        <!-- ==================================================
             PROFILE DETAILS
        =================================================== -->

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
            "Age",
            profile.age
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


        <!-- ==================================================
             UPDATE PROFILE
        =================================================== -->

        <div style="
          margin-top:30px;
          padding:25px;
          border-radius:14px;
          border:1px solid #eee;
        ">

          <h2>
            ✏️ Update Profile
          </h2>

          <p>
            Update your profile information.
          </p>


          <div class="form-grid">


            <div class="field full">

              <label>
                Full Name
              </label>

              <input
                id="editFullName"
                value="${escapeHtml(
                  profile.full_name || ""
                )}"
              >

            </div>


            <div class="field">

              <label>
                Gender
              </label>

              <select id="editGender">

                <option
                  value="female"
                  ${
                    profile.gender === "female"
                      ? "selected"
                      : ""
                  }
                >
                  Woman
                </option>

                <option
                  value="male"
                  ${
                    profile.gender === "male"
                      ? "selected"
                      : ""
                  }
                >
                  Man
                </option>

              </select>

            </div>


            <div class="field">

              <label>
                Date of Birth
              </label>

              <input
                id="editDob"
                type="date"
                value="${escapeHtml(
                  profile.date_of_birth || ""
                )}"
              >

            </div>


            <div class="field">

              <label>
                Community / Jati
              </label>

              <select id="editCommunity">

                <option
                  value="Dom"
                  ${
                    profile.community === "Dom"
                      ? "selected"
                      : ""
                  }
                >
                  Dom
                </option>

                <option
                  value="Other SC Community"
                  ${
                    profile.community ===
                    "Other SC Community"
                      ? "selected"
                      : ""
                  }
                >
                  Other SC Community
                </option>

              </select>

            </div>


            <div class="field">

              <label>
                Surname
              </label>

              <select id="editSurname">

                <option
                  value="Rauth"
                  ${
                    profile.surname === "Rauth"
                      ? "selected"
                      : ""
                  }
                >
                  Rauth
                </option>

                <option
                  value="Basfor"
                  ${
                    profile.surname === "Basfor"
                      ? "selected"
                      : ""
                  }
                >
                  Basfor
                </option>

                <option
                  value="Bansfor"
                  ${
                    profile.surname === "Bansfor"
                      ? "selected"
                      : ""
                  }
                >
                  Bansfor
                </option>

                <option
                  value="Other"
                  ${
                    profile.surname === "Other"
                      ? "selected"
                      : ""
                  }
                >
                  Other
                </option>

              </select>

            </div>


            <div class="field">

              <label>
                Kul / Clan
              </label>

              <select id="editKul">

                <option
                  value="Piari Baiswar"
                  ${
                    profile.kul ===
                    "Piari Baiswar"
                      ? "selected"
                      : ""
                  }
                >
                  Piari Baiswar
                </option>

                <option
                  value="Other"
                  ${
                    profile.kul === "Other"
                      ? "selected"
                      : ""
                  }
                >
                  Other
                </option>

                <option
                  value="Not Known"
                  ${
                    profile.kul === "Not Known"
                      ? "selected"
                      : ""
                  }
                >
                  Not Known
                </option>

              </select>

            </div>


            <div class="field full">

              <label>
                Current City
              </label>

              <input
                id="editCity"
                value="${escapeHtml(
                  profile.city || ""
                )}"
              >

            </div>

          </div>


          <div
            id="updateProfileMessage"
            style="
              margin-top:15px;
            "
          ></div>


          <div class="modal-actions">

            <button
              class="btn primary"
              type="button"
              onclick="updateProfile()"
            >

              💾 Save Profile Changes

            </button>

          </div>

        </div>


        <!-- ==================================================
             FIND MATCHES
        =================================================== -->

        <div
          id="dashboardMatches"
          style="
            margin-top:30px;
            padding:25px;
            border-radius:18px;
            border:1px solid #eee;
          "
        >

          <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            gap:15px;
            flex-wrap:wrap;
            margin-bottom:15px;
          ">

            <div>

              <span class="eyebrow">
                DISCOVER
              </span>

              <h2 style="
                margin:5px 0;
              ">

                Find Your Matches

              </h2>

              <p style="
                margin:0;
                color:#666;
              ">

                Compatible profiles from the SamajSaathi database.

              </p>

            </div>


            <button
              class="btn primary"
              type="button"
              onclick="loadDashboardMatches()"
            >

              🔍 Find Matches

            </button>

          </div>


          <div
            id="matchesGrid"
            style="
              display:grid;
              grid-template-columns:
              repeat(auto-fit,minmax(240px,1fr));
              gap:18px;
            "
          >

            <div style="
              grid-column:1/-1;
              text-align:center;
              padding:30px;
              color:#777;
            ">

              Click
              <strong>
                Find Matches
              </strong>
              to discover compatible profiles.

            </div>

          </div>

        </div>


      </div>

    </div>

  `;


  document.body.appendChild(
    dashboard
  );


  await loadProfilePhoto(
    profile.profile_photo
  );

}


// ============================================================
// SHOW MATCHES IN DASHBOARD
// ============================================================

async function showMatchesInDashboard() {

  const dashboard =
    document.getElementById(
      "samajSaathiDashboard"
    );

  if (!dashboard) {

    await openDashboard();

    return;

  }


  const matchesSection =
    document.getElementById(
      "dashboardMatches"
    );


  if (matchesSection) {

    matchesSection.scrollIntoView({
      behavior:"smooth"
    });

  }


  await loadDashboardMatches();

}


// ============================================================
// LOAD DASHBOARD MATCHES
// ============================================================

async function loadDashboardMatches() {

  const grid =
    document.getElementById(
      "matchesGrid"
    );


  if (!grid) {
    return;
  }


  grid.innerHTML = `

    <div style="
      grid-column:1/-1;
      text-align:center;
      padding:35px;
      color:#6f1025;
    ">

      🔍 Finding compatible profiles...

    </div>

  `;


  try {

    const sessionResult =
      await supabaseClient.auth
        .getSession();

    const session =
      sessionResult.data?.session;


    if (!session) {

      grid.innerHTML = `

        <div style="
          grid-column:1/-1;
          text-align:center;
          padding:30px;
        ">

          Please login first.

        </div>

      `;

      return;

    }


    const currentUserId =
      session.user.id;


    const ownResult =
      await supabaseClient
        .from("profiles")
        .select("gender")
        .eq(
          "id",
          currentUserId
        )
        .maybeSingle();


    if (ownResult.error) {

      grid.innerHTML = `

        <div style="
          grid-column:1/-1;
          text-align:center;
          padding:30px;
          color:#b42318;
        ">

          Unable to read your profile.

          <br><br>

          ${escapeHtml(
            ownResult.error.message
          )}

        </div>

      `;

      return;

    }


    const myGender =
      String(
        ownResult.data?.gender || ""
      ).toLowerCase();


    if (
      myGender !== "male" &&
      myGender !== "female"
    ) {

      grid.innerHTML = `

        <div style="
          grid-column:1/-1;
          text-align:center;
          padding:30px;
        ">

          Please update your gender first.

        </div>

      `;

      return;

    }


    const oppositeGender =
      myGender === "male"
        ? "female"
        : "male";


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
            ascending:false
          }
        );


    if (result.error) {

      console.error(
        "MATCHES ERROR:",
        result.error
      );

      grid.innerHTML = `

        <div style="
          grid-column:1/-1;
          text-align:center;
          padding:30px;
          color:#b42318;
        ">

          <h3>
            Could not load matches
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


    const matches =
      result.data || [];


    if (!matches.length) {

      grid.innerHTML = `

        <div style="
          grid-column:1/-1;
          text-align:center;
          padding:35px;
        ">

          <div style="
            font-size:48px;
          ">
            💕
          </div>

          <h3>
            No matches available yet
          </h3>

          <p>
            No active ${
              oppositeGender === "female"
                ? "female"
                : "male"
            }
            profiles are available yet.
          </p>

        </div>

      `;

      return;

    }


    grid.innerHTML =
      matches
        .map(
          createMatchCard
        )
        .join("");


  } catch (error) {

    console.error(
      "LOAD MATCHES ERROR:",
      error
    );

    grid.innerHTML = `

      <div style="
        grid-column:1/-1;
        text-align:center;
        padding:30px;
        color:#b42318;
      ">

        Something went wrong while finding matches.

      </div>

    `;

  }

}


// ============================================================
// LOAD OWN PROFILE PHOTO
// ============================================================

async function loadProfilePhoto(
  photoPath
) {

  if (!photoPath) {
    return;
  }


  const preview =
    document.getElementById(
      "profilePhotoPreview"
    );


  if (!preview) {
    return;
  }


  const url =
    await getSignedPhotoUrl(
      photoPath
    );


  if (!url) {
    return;
  }


  preview.innerHTML = `

    <img
      src="${escapeHtml(url)}"
      alt="Profile Photo"
      style="
        width:100%;
        height:100%;
        object-fit:cover;
      "
    >

  `;

}


// ============================================================
// UPLOAD PROFILE PHOTO
// ============================================================

async function uploadProfilePhoto() {

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


  // ========================================================
  // REMOVE OLD FILES
  // ========================================================

  const oldFiles = [

    userId + "/profile.jpg",

    userId + "/profile.jpeg",

    userId + "/profile.png",

    userId + "/profile.webp"

  ];


  const removeResult =
    await supabaseClient
      .storage
      .from("profile-photos")
      .remove(oldFiles);


  if (removeResult.error) {

    console.warn(
      "OLD PHOTO REMOVE WARNING:",
      removeResult.error
    );

  }


  // ========================================================
  // UPLOAD
  // ========================================================

  const uploadResult =
    await supabaseClient
      .storage
      .from("profile-photos")
      .upload(
        filePath,
        file,
        {
          upsert:true,
          contentType:file.type
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


  // ========================================================
  // SAVE PHOTO PATH
  // ========================================================

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
      "Photo uploaded but profile could not be updated: " +
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


  const matchesGrid =
    document.getElementById(
      "matchesGrid"
    );


  if (matchesGrid) {
    await loadDashboardMatches();
  }

}


// ============================================================
// UPDATE PROFILE
// ============================================================

async function updateProfile() {

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


  if (!fullName || !city) {

    showMessage(
      message,
      "Name and city are required.",
      "error"
    );

    return;

  }


  const age =
    calculateAge(dob);


  if (
    age !== null &&
    age < 18
  ) {

    showMessage(
      message,
      "Profile owner must be 18 or above.",
      "error"
    );

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
          dob || null,

        age:
          age,

        community:
          community,

        surname:
          surname,

        kul:
          kul,

        city:
          city

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
    700
  );

}


// ============================================================
// LOGOUT
// ============================================================

async function logoutUser() {

  try {

    await supabaseClient
      .auth
      .signOut();

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


  const profileModal =
    document.getElementById(
      "profileViewModal"
    );


  if (profileModal) {
    profileModal.remove();
  }


  localStorage.removeItem(
    "samajSaathiUserId"
  );

  localStorage.removeItem(
    "samajSaathiUsername"
  );


  await loadProfiles();


  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

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
        event.target === modal
      ) {

        closeModal();

      }

    }
  );

}


// ============================================================
// ESC KEY
// ============================================================

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "Escape"
    ) {

      closeModal();


      const profileModal =
        document.getElementById(
          "profileViewModal"
        );


      if (profileModal) {
        profileModal.remove();
      }

    }

  }
);


// ============================================================
// INITIALIZE APP
// ============================================================

document.addEventListener(
  "DOMContentLoaded",
  async function() {

    console.log(
      "SamajSaathi app loading..."
    );


    setupModalEvents();


    await loadProfiles();


    console.log(
      "SamajSaathi app loaded successfully."
    );

  }
);


// ============================================================
// SESSION CHECK
// ============================================================

(async function() {

  try {

    const result =
      await supabaseClient.auth
        .getSession();


    if (
      result.data?.session
    ) {

      console.log(
        "SamajSaathi: User session active."
      );

    }

  } catch (error) {

    console.error(
      "SESSION CHECK ERROR:",
      error
    );

  }

})();
