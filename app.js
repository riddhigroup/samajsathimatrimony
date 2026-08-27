// ============================================================
// SAMAJ SAATHI MATRIMONY
// SUPABASE CONNECTED APP
// COMPLETE APP.JS
// FIND YOUR MATCHES - UPDATED
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

  if (!dateString) return null;

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

  for (let i = 0; i < 8; i++) {

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


// ============================================================
// PUBLIC PHOTO URL
// ============================================================

function getProfilePhotoUrl(
  photoPath
) {

  if (!photoPath) {
    return null;
  }

  try {

    const result =
      supabaseClient
        .storage
        .from("profile-photos")
        .getPublicUrl(photoPath);

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
    document.getElementById("modal");

  const content =
    document.getElementById("modalContent");

  if (!modal || !content) {

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
          type="button"
          class="btn primary"
          onclick="registerUser()"
        >
          Create Account →
        </button>

      </div>

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
// REGISTER
// ============================================================

async function registerUser() {

  const firstName =
    document.getElementById("firstName")
      ?.value.trim();

  const lastName =
    document.getElementById("lastName")
      ?.value.trim();

  const email =
    document.getElementById("email")
      ?.value.trim();

  const dob =
    document.getElementById("dob")
      ?.value;

  const gender =
    document.getElementById("gender")
      ?.value;

  const community =
    document.getElementById("community")
      ?.value;

  const surname =
    document.getElementById("surname")
      ?.value;

  const kul =
    document.getElementById("kul")
      ?.value;

  const city =
    document.getElementById("city")
      ?.value.trim();

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


  showMessage(
    message,
    "Creating your account...",
    "info"
  );


  const password =
    generatePassword();

  const fullName =
    firstName + " " + lastName;

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
        calculateAge(dob),

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


    // ======================================================
    // SESSION AVAILABLE
    // ======================================================

    if (data.session) {

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


    // ======================================================
    // EMAIL CONFIRMATION REQUIRED
    // ======================================================

    else {

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

  if (!content) return;


  content.innerHTML = `

    <div style="text-align:center;">

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

        <div style="margin-bottom:12px;">

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


        <div style="margin-bottom:12px;">

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
          Go to My Dashboard →
        </button>

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

  if (!content) return;


  content.innerHTML = `

    <div style="text-align:center;">

      <div style="
        font-size:48px;
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
            margin-top:4px;
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
            margin-top:4px;
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

  const email =
    document.getElementById("loginEmail")
      ?.value.trim();

  const password =
    document.getElementById("loginPassword")
      ?.value;

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

  const pending =
    localStorage.getItem(
      "samajSaathiPendingProfile"
    );

  if (!pending) return;


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

  if (!session) return;


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
// LOAD PUBLIC PROFILES
// ============================================================

async function loadProfiles() {

  const grid =
    document.getElementById(
      "profiles"
    );

  if (!grid) return;


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
        .eq("is_active", true)
        .order(
          "created_at",
          {
            ascending:false
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


    const profiles =
      result.data || [];


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
// PUBLIC PROFILE CARD
// ============================================================

function createPublicProfileCard(profile) {

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
    getProfilePhotoUrl(photoPath);


  let photoHtml = `

    <div class="profile-img">

      <span style="
        font-size:55px;
        display:flex;
        align-items:center;
        justify-content:center;
        height:100%;
      ">
        👤
      </span>

      <span class="profile-tag">
        ✓ Verified
      </span>

    </div>

  `;


  if (photoUrl) {

    photoHtml = `

      <div class="profile-img has-real-photo">

        <img
          src="${escapeHtml(photoUrl)}"
          alt="${escapeHtml(
            profile.full_name || "Profile"
          )}"
          loading="lazy"
          style="
            width:100%;
            height:100%;
            object-fit:cover;
            display:block;
          "
        >

        <span class="profile-tag">
          ✓ Verified
        </span>

      </div>

    `;

  }


  return `

    <article class="profile">

      ${photoHtml}

      <div class="profile-body">

        <b>
          ${escapeHtml(
            profile.full_name || "Member"
          )}

          ${
            profile.age
              ? ", " +
                escapeHtml(profile.age)
              : ""
          }

        </b>


        <small>
          ${escapeHtml(
            location ||
            "Location not specified"
          )}
        </small>


        <small>

          ${escapeHtml(
            profile.community || ""
          )}

          ${
            profile.surname
              ? " · " +
                escapeHtml(
                  profile.surname
                )
              : ""
          }

          ${
            profile.kul
              ? " · " +
                escapeHtml(
                  profile.kul
                )
              : ""
          }

        </small>


        <small class="match">
          SamajSaathi Member
        </small>

      </div>

    </article>

  `;
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

    console.warn(
      "matchesGrid not found."
    );

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
        💕
      </div>

      Finding suitable profiles...

    </div>

  `;


  try {

    // ========================================================
    // SESSION
    // ========================================================

    const sessionResult =
      await supabaseClient.auth
        .getSession();


    const session =
      sessionResult.data?.session;


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


    // ========================================================
    // GET CURRENT USER
    // ========================================================

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

      console.error(
        "CURRENT PROFILE ERROR:",
        currentResult.error
      );

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


    // ========================================================
    // NORMALIZE GENDER
    // ========================================================

    const gender =
      String(
        currentProfile.gender || ""
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


    // ========================================================
    // OPPOSITE GENDER
    // ========================================================

    const oppositeGender =
      gender === "male"
        ? "female"
        : "male";


    console.log(
      "Finding matches:",
      {
        currentUserId,
        gender,
        oppositeGender
      }
    );


    // ========================================================
    // GET MATCHES
    // ========================================================

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
            ascending:false
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
            ⚠️
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


    console.log(
      "Matches found:",
      matches.length
    );


    // ========================================================
    // NO MATCHES
    // ========================================================

    if (!matches.length) {

      grid.innerHTML = `

        <div class="samaj-no-matches">

          <div style="
            font-size:55px;
            margin-bottom:10px;
          ">
            💕
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

          <p style="
            font-size:13px;
            color:#777;
          ">
            New members will appear here automatically after they create their profiles.
          </p>

          <button
            type="button"
            class="btn primary"
            onclick="loadMatches()"
          >
            🔄 Refresh Matches
          </button>

        </div>

      `;

      return;
    }


    // ========================================================
    // SHOW MATCHES
    // ========================================================

    grid.innerHTML =
      matches
        .map(
          createMatchCard
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

function createMatchCard(profile) {

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
        👤
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
          src="${escapeHtml(photoUrl)}"
          alt="${escapeHtml(
            profile.full_name || "Profile"
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
            this.parentElement.innerHTML='<div style=&quot;height:280px;display:flex;align-items:center;justify-content:center;font-size:75px;background:#f1e5e8;&quot;>👤</div>';
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
          ✓ Verified
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

          📍

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
              ? " · " +
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
              viewProfile('${escapeHtml(profile.id)}')
            "
          >
            View Profile
          </button>


          <button
            type="button"
            class="samaj-interest-btn"
            onclick="
              sendInterest('${escapeHtml(profile.id)}')
            "
          >
            ❤️ Send Interest
          </button>

        </div>

      </div>

    </article>

  `;
}


// ============================================================
// VIEW PROFILE
// ============================================================

async function viewProfile(profileId) {

  if (!profileId) return;


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
        bio,
        education,
        occupation,
        height,
        marital_status,
        profile_photo,
        photo_url
      `)
      .eq(
        "id",
        profileId
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
      "Profile not found."
    );

    return;
  }


  const profile =
    result.data;


  const oldViewer =
    document.getElementById(
      "samajProfileViewer"
    );


  if (oldViewer) {
    oldViewer.remove();
  }


  const photoPath =
    profile.profile_photo ||
    profile.photo_url ||
    null;


  const photoUrl =
    getProfilePhotoUrl(
      photoPath
    );


  let photoHtml = `

    <div style="
      width:150px;
      height:150px;
      border-radius:50%;
      background:#f1e5e8;
      display:flex;
      align-items:center;
      justify-content:center;
      margin:0 auto 20px;
      font-size:55px;
    ">
      👤
    </div>

  `;


  if (photoUrl) {

    photoHtml = `

      <img
        src="${escapeHtml(photoUrl)}"
        alt="${escapeHtml(
          profile.full_name || "Profile"
        )}"
        style="
          width:150px;
          height:150px;
          border-radius:50%;
          object-fit:cover;
          display:block;
          margin:0 auto 20px;
        "
      >

    `;

  }


  const modal =
    document.createElement(
      "div"
    );


  modal.id =
    "samajProfileViewer";


  modal.style.cssText = `

    position:fixed;
    inset:0;
    z-index:10001;
    background:rgba(20,10,15,.72);
    display:flex;
    align-items:center;
    justify-content:center;
    padding:20px;
    overflow:auto;

  `;


  modal.innerHTML = `

    <div style="
      width:min(650px,100%);
      max-height:90vh;
      overflow:auto;
      background:#fff;
      border-radius:22px;
      padding:30px;
      position:relative;
      box-shadow:0 25px 80px rgba(0,0,0,.25);
    ">

      <button
        type="button"
        onclick="
          document
            .getElementById('samajProfileViewer')
            ?.remove()
        "
        style="
          position:absolute;
          top:15px;
          right:15px;
          width:38px;
          height:38px;
          border:0;
          border-radius:50%;
          background:#f5edef;
          cursor:pointer;
          font-size:20px;
        "
      >
        ×
      </button>


      ${photoHtml}


      <div style="
        text-align:center;
      ">

        <span class="eyebrow">
          SAMAJSAATHI MEMBER
        </span>


        <h2 style="
          margin:8px 0;
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

        </h2>

      </div>


      <div style="
        display:grid;
        grid-template-columns:
        repeat(auto-fit,minmax(180px,1fr));
        gap:12px;
        margin-top:25px;
      ">

        ${profileViewerItem(
          "Gender",
          profile.gender
        )}

        ${profileViewerItem(
          "Age",
          profile.age
        )}

        ${profileViewerItem(
          "City",
          [
            profile.city,
            profile.state
          ]
            .filter(Boolean)
            .join(", ")
        )}

        ${profileViewerItem(
          "Community",
          profile.community
        )}

        ${profileViewerItem(
          "Surname",
          profile.surname
        )}

        ${profileViewerItem(
          "Kul / Clan",
          profile.kul
        )}

        ${profileViewerItem(
          "Education",
          profile.education
        )}

        ${profileViewerItem(
          "Occupation",
          profile.occupation
        )}

        ${profileViewerItem(
          "Height",
          profile.height
        )}

        ${profileViewerItem(
          "Marital Status",
          profile.marital_status
        )}

      </div>


      ${
        profile.bio
          ? `

            <div style="
              margin-top:20px;
              padding:18px;
              background:#f8f1f3;
              border-radius:14px;
            ">

              <strong>
                About
              </strong>

              <p>
                ${escapeHtml(
                  profile.bio
                )}
              </p>

            </div>

          `
          : ""
      }


      <div style="
        margin-top:25px;
        text-align:center;
      ">

        <button
          type="button"
          class="samaj-interest-btn"
          onclick="
            sendInterest('${escapeHtml(profile.id)}')
          "
        >
          ❤️ Send Interest
        </button>

      </div>

    </div>

  `;


  document.body.appendChild(
    modal
  );


  modal.addEventListener(
    "click",
    function(event) {

      if (
        event.target === modal
      ) {
        modal.remove();
      }

    }
  );

}


// ============================================================
// PROFILE VIEW ITEM
// ============================================================

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
// SEND INTEREST
// STAGE 3
// ============================================================

async function sendInterest(
  profileId
) {

  if (!profileId) return;


  const sessionResult =
    await supabaseClient.auth
      .getSession();


  const session =
    sessionResult.data?.session;


  if (!session) {

    openModal("login");

    return;
  }


  if (
    profileId ===
    session.user.id
  ) {

    alert(
      "You cannot send interest to your own profile."
    );

    return;
  }


  alert(
    "❤️ Interest system will be connected in Stage 3."
  );
}


// ============================================================
// OPEN FIND MATCHES
// ============================================================

async function openFindMatches() {

  const sessionResult =
    await supabaseClient.auth
      .getSession();


  const session =
    sessionResult.data?.session;


  if (!session) {

    openModal("login");

    return;
  }


  await openDashboard();


  setTimeout(
    function() {

      showDashboardSection(
        "matches"
      );

      loadMatches();

    },
    300
  );

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


      if (name === section) {

        element.classList.remove(
          "samaj-section-hidden"
        );

        element.style.display =
          "block";

      } else {

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

      } else {

        button.classList.remove(
          "active"
        );

      }

    }
  );


  // ========================================================
  // IMPORTANT:
  // LOAD MATCHES EVERY TIME MATCHES IS OPENED
  // ========================================================

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


  const target =
    document.getElementById(
      "dashboardSection-" +
      section
    );


  if (target) {

    setTimeout(
      function() {

        target.scrollIntoView({
          behavior:"smooth",
          block:"start"
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


  // ========================================================
  // GET CURRENT PROFILE
  // ========================================================

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


  // ========================================================
  // REMOVE OLD DASHBOARD
  // ========================================================

  const oldDashboard =
    document.getElementById(
      "samajSaathiDashboard"
    );


  if (oldDashboard) {

    oldDashboard.remove();

  }


  // ========================================================
  // DASHBOARD
  // ========================================================

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
           DASHBOARD HEADER
           ================================================== -->

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
            SC Matrimony • Your journey starts here
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
            onclick="
              showDashboardSection('matches')
            "
            style="
              border:1px solid rgba(255,255,255,.5);
              background:rgba(255,255,255,.12);
              color:#fff;
              padding:10px 16px;
              border-radius:8px;
              cursor:pointer;
            "
          >
            💕 Find Matches
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

      </header>


      <!-- ==================================================
           DASHBOARD CONTAINER
           ================================================== -->

      <div style="
        max-width:1100px;
        margin:0 auto;
        padding:25px 20px 60px;
      ">


        <!-- =================================================
             WELCOME
             ================================================= -->

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


        <!-- =================================================
             DASHBOARD MENU
             ================================================= -->

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
              👤
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
              ✏️
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
              💕
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
              ❤️
            </span>

            <span class="samaj-menu-title">
              My Interests
            </span>

            <span class="samaj-menu-description">
              Coming soon
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
              💌
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
              🔔
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
              ⚙️
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


          <!-- PHOTO -->

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
              type="button"
              class="btn primary"
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


          <!-- PROFILE DETAILS -->

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

          </div>


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
              💕 Find Your Matches
            </button>

          </div>

        </section>


        <!-- =================================================
             EDIT PROFILE
             ================================================= -->

        <section
          id="dashboardSection-edit"
          class="
            samaj-dashboard-section
            samaj-section-hidden
          "
          style="
            display:none;
          "
        >

          <span class="eyebrow">
            PROFILE SETTINGS
          </span>

          <h2>
            ✏️ Edit Profile
          </h2>


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
              type="button"
              class="btn primary"
              onclick="updateProfile()"
            >
              💾 Save Profile Changes
            </button>

          </div>

        </section>


        <!-- =================================================
             FIND YOUR MATCHES
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
              💕 Find Your Matches
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

              Click Find Your Matches to load profiles.

            </div>

          </div>

        </section>


        <!-- =================================================
             INTERESTS
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
            ❤️ My Interests
          </h2>

          <div class="samaj-coming-soon">

            <div class="samaj-coming-soon-icon">
              ❤️
            </div>

            <h3>
              Interests
            </h3>

            <p>
              Profiles you have shown interest in will appear here.
            </p>

            <small>
              Interest system will be connected in Stage 3.
            </small>

          </div>

        </section>


        <!-- =================================================
             RECEIVED
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
            💌 Received Interests
          </h2>

          <div class="samaj-coming-soon">

            <div class="samaj-coming-soon-icon">
              💌
            </div>

            <h3>
              No interest system yet
            </h3>

            <p>
              Received interests will appear here.
            </p>

            <small>
              This feature will be connected in Stage 4.
            </small>

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
            🔔 Notifications
          </h2>

          <div class="samaj-coming-soon">

            <div class="samaj-coming-soon-icon">
              🔔
            </div>

            <h3>
              No new notifications
            </h3>

            <p>
              Important SamajSaathi updates will appear here.
            </p>

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
            ⚙️ Account
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
              🔐 Account Security
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
              onclick="logoutUser()"
            >
              🚪 Logout
            </button>

          </div>

        </section>


      </div>

    </div>

  `;


  document.body.appendChild(
    dashboard
  );


  // ========================================================
  // LOAD OWN PHOTO
  // ========================================================

  await loadProfilePhoto(
    profile.profile_photo
  );


  // ========================================================
  // IMPORTANT:
  // LOAD MATCHES AND OPEN MATCHES
  // ========================================================

  await loadMatches();


  /*
   * THIS IS THE MAIN FIX.
   *
   * OLD CODE:
   * showDashboardSection("profile");
   *
   * NEW:
   * showDashboardSection("matches");
   *
   * So after login the user immediately sees
   * Find Your Matches.
   */

  showDashboardSection(
    "matches"
  );

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
// LOAD OWN PROFILE PHOTO
// ============================================================

async function loadProfilePhoto(
  photoPath
) {

  if (!photoPath) return;


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


  if (!preview) return;


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
  // REMOVE OLD PHOTO
  // ========================================================

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
  // SAVE PATH
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


  // Refresh public profile cards
  await loadProfiles();


  // Refresh matches
  await loadMatches();

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
          calculateAge(dob),

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
    600
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


  window.scrollTo({

    top:0,

    behavior:"smooth"

  });


  await loadProfiles();

}


// ============================================================
// SCROLL
// ============================================================

function scrollToId(id) {

  const element =
    document.getElementById(id);


  if (element) {

    element.scrollIntoView({
      behavior:"smooth"
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


  if (!modal) return;


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
// INITIALIZE
// ============================================================

document.addEventListener(
  "DOMContentLoaded",
  async function() {

    console.log(
      "SamajSaathi app loading..."
    );


    await loadProfiles();


    setupModalEvents();


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
      await supabaseClient
        .auth
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
