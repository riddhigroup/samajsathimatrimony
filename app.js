```javascript
// ============================================
// SAMAJ SAATHI MATRIMONY
// SUPABASE CONNECTED APP
// ============================================

// ============================================
// SUPABASE CONFIG
// ============================================

const SUPABASE_URL =
  "https://drrsborerbgzthxdazqu.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_ACdKChyHYC11rSK9_HZ0Jg_l22KO06k";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );


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
// CALCULATE AGE
// ============================================

function calculateAge(dateString) {

  if (!dateString) return null;

  const birthDate = new Date(dateString);
  const today = new Date();

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


// ============================================
// SCROLL
// ============================================

function scrollToId(id) {

  const element =
    document.getElementById(id);

  if (element) {
    element.scrollIntoView({
      behavior: "smooth"
    });
  }

}


// ============================================
// GENERATE USER ID
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


// ============================================
// GENERATE PASSWORD
// ============================================

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


// ============================================
// LOAD REAL PROFILES
// ============================================

async function loadProfiles() {

  const grid =
    document.getElementById("profiles");

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

    const sessionResult =
      await supabaseClient.auth.getSession();

    const currentUser =
      sessionResult.data?.session?.user;

    let query =
      supabaseClient
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
        .eq("is_active", true)
        .order("created_at", {
          ascending: false
        });

    // ========================================
    // CURRENT USER KO HIDE KARNA
    // ========================================

    if (currentUser?.id) {

      query =
        query.neq(
          "id",
          currentUser.id
        );

    }

    // ========================================
    // CURRENT USER KA GENDER
    // ========================================

    if (currentUser?.id) {

      const ownProfileResult =
        await supabaseClient
          .from("profiles")
          .select("gender")
          .eq(
            "id",
            currentUser.id
          )
          .maybeSingle();

      const ownGender =
        ownProfileResult.data?.gender;

      // ======================================
      // MALE → FEMALE
      // FEMALE → MALE
      // ======================================

      if (ownGender === "male") {

        query =
          query.eq(
            "gender",
            "female"
          );

      }

      if (ownGender === "female") {

        query =
          query.eq(
            "gender",
            "male"
          );

      }

    }

    const result =
      await query;

    if (result.error) {

      console.error(
        "PROFILES LOAD ERROR:",
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

          <div style="
            font-size:45px;
            margin-bottom:10px;
          ">
            💕
          </div>

          <h3>
            No matches available yet
          </h3>

          <p>
            New compatible profiles will appear here.
          </p>

        </div>
      `;

      return;
    }

    grid.innerHTML =
      profiles
        .map(
          createProfileCard
        )
        .join("");

    console.log(
      "Matches loaded:",
      profiles.length
    );

  } catch (error) {

    console.error(
      "PROFILES ERROR:",
      error
    );

    grid.innerHTML = `
      <div style="
        grid-column:1/-1;
        text-align:center;
        padding:40px;
        color:#b42318;
      ">
        Something went wrong while loading profiles.
      </div>
    `;
  }
}


// ============================================
// CREATE PROFILE CARD
// ============================================

function createProfileCard(profile) {

  const location =
    [
      profile.city,
      profile.state
    ]
      .filter(Boolean)
      .join(", ");

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

  // ========================================
  // PHOTO
  // ========================================

  if (profile.profile_photo) {

    const publicResult =
      supabaseClient
        .storage
        .from("profile-photos")
        .getPublicUrl(
          profile.profile_photo
        );

    const photoUrl =
      publicResult.data?.publicUrl;

    if (photoUrl) {

      photoHtml = `
        <div class="profile-img">

          <img
            src="${escapeHtml(photoUrl)}"
            alt="${escapeHtml(
              profile.full_name || "Profile"
            )}"
            style="
              width:100%;
              height:100%;
              object-fit:cover;
            "
          >

          <span class="profile-tag">
            ✓ Verified
          </span>

        </div>
      `;
    }
  }

  return `
    <article
      class="profile"
      data-profile-id="${escapeHtml(
        profile.id
      )}"
    >

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
            margin-top:12px;
            width:100%;
          "
          onclick="viewProfile('${escapeHtml(
            profile.id
          )}')"
        >
          View Profile
        </button>

      </div>

    </article>
  `;
}


// ============================================
// VIEW PROFILE
// ============================================

async function viewProfile(profileId) {

  if (!profileId) return;

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
          created_at
        `)
        .eq(
          "id",
          profileId
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
        font-size:55px;
      ">
        👤
      </div>
    `;

    if (p.profile_photo) {

      const photoResult =
        await supabaseClient
          .storage
          .from("profile-photos")
          .createSignedUrl(
            p.profile_photo,
            3600
          );

      if (
        !photoResult.error &&
        photoResult.data?.signedUrl
      ) {

        photoHtml = `
          <div style="
            width:160px;
            height:160px;
            margin:0 auto 20px;
            border-radius:50%;
            overflow:hidden;
          ">

            <img
              src="${escapeHtml(
                photoResult.data.signedUrl
              )}"
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
      document.createElement("div");

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
          onclick="document.getElementById('profileViewModal')?.remove()"
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
            font-size:18px;
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
              p.full_name || "Member"
            )}

            ${
              p.age
                ? ", " +
                  escapeHtml(p.age)
                : ""
            }
          </h2>

          <p>
            ${escapeHtml(
              [
                p.city,
                p.state
              ]
                .filter(Boolean)
                .join(", ")
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

      </div>
    `;

    document.body.appendChild(modal);

  } catch (error) {

    console.error(
      "VIEW PROFILE ERROR:",
      error
    );

    alert(
      "Something went wrong while opening profile."
    );
  }
}


// ============================================
// OPEN MODAL
// ============================================

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

  if (type === "login") {

    content.innerHTML = `

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
          onclick="
            openModal('register');
            return false;
          "
        >
          Create Profile
        </a>

      </p>

    `;

  } else {

    content.innerHTML = `

      <span class="eyebrow">
        CREATE YOUR PROFILE
      </span>

      <h2>
        Begin your journey.
      </h2>

      <p>
        Tell us a little about yourself.
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

        email,

        password,

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

    const data =
      result.data;

    const error =
      result.error;

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

    } else {

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

  } catch (err) {

    console.error(
      "REGISTER ERROR:",
      err
    );

    showMessage(
      message,
      "Something went wrong: " +
      err.message,
      "error"
    );
  }
}


// ============================================
// EMAIL CONFIRMATION
// ============================================

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

    <div style="
      text-align:center;
    ">

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
          <small>User ID</small>
          <strong style="
            display:block;
            margin-top:4px;
          ">
            ${escapeHtml(userId)}
          </strong>
        </div>

        <br>

        <div>
          <small>Username</small>
          <strong style="
            display:block;
            margin-top:4px;
          ">
            ${escapeHtml(username)}
          </strong>
        </div>

        <br>

        <div>
          <small>Temporary Password</small>
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

        Please save your User ID,
        Username and Password.

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


// ============================================
// REGISTRATION SUCCESS
// ============================================

function showRegistrationSuccess(
  user
) {

  const content =
    document.getElementById(
      "modalContent"
    );

  if (!content) return;

  content.innerHTML = `

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

  try {

    const result =
      await supabaseClient.auth
        .signInWithPassword({

          email,
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

  } catch (err) {

    console.error(
      "LOGIN ERROR:",
      err
    );

    showMessage(
      message,
      "Login error: " +
      err.message,
      "error"
    );
  }
}


// ============================================
// SAVE PENDING PROFILE
// ============================================

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


// ============================================
// OPEN DASHBOARD
// ============================================

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
          type="button"
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

        <!-- PROFILE PHOTO -->

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


        <!-- WELCOME -->

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


        <!-- PROFILE INFORMATION -->

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


        <!-- UPDATE PROFILE -->

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
            Update your profile information below.
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

                <option value="Rauth"
                  ${
                    profile.surname === "Rauth"
                      ? "selected"
                      : ""
                  }
                >
                  Rauth
                </option>

                <option value="Basfor"
                  ${
                    profile.surname === "Basfor"
                      ? "selected"
                      : ""
                  }
                >
                  Basfor
                </option>

                <option value="Bansfor"
                  ${
                    profile.surname === "Bansfor"
                      ? "selected"
                      : ""
                  }
                >
                  Bansfor
                </option>

                <option value="Other"
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


        <!-- ==================================
             FIND YOUR MATCHES
        =================================== -->

        <div style="
          margin-top:30px;
          padding:25px;
          border-radius:18px;
          border:1px solid #eee;
          background:#fff;
        ">

          <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            gap:15px;
            flex-wrap:wrap;
            margin-bottom:20px;
          ">

            <div>

              <span class="eyebrow">
                DISCOVER
              </span>

              <h2 style="
                margin:6px 0;
              ">
                💕 Find Your Matches
              </h2>

              <p style="
                margin:0;
                color:#666;
              ">
                Compatible profiles from the SamajSaathi community.
              </p>

            </div>

            <button
              type="button"
              class="btn primary"
              onclick="loadMatches()"
            >
              🔄 Refresh Matches
            </button>

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
              text-align:center;
              padding:30px;
              grid-column:1/-1;
            ">
              Loading matches...
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

  await loadMatches();
}


// ============================================
// LOAD MATCHES
// ============================================

async function loadMatches() {

  const grid =
    document.getElementById(
      "matchesGrid"
    );

  if (!grid) return;

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
          Please login to find matches.
        </div>
      `;

      return;
    }

    const currentUserId =
      session.user.id;

    // ========================================
    // GET CURRENT USER GENDER
    // ========================================

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
          Unable to read your profile gender.
          <br>
          ${escapeHtml(
            ownResult.error.message
          )}
        </div>
      `;

      return;
    }

    const myGender =
      ownResult.data?.gender;

    if (!myGender) {

      grid.innerHTML = `
        <div style="
          grid-column:1/-1;
          text-align:center;
          padding:30px;
        ">
          Please update your gender in your profile first.
        </div>
      `;

      return;
    }

    const oppositeGender =
      myGender === "male"
        ? "female"
        : "male";

    // ========================================
    // GET MATCHES
    // ========================================

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
            We'll show compatible profiles here
            when they become available.
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


// ============================================
// MATCH CARD
// ============================================

function createMatchCard(profile) {

  const location =
    [
      profile.city,
      profile.state
    ]
      .filter(Boolean)
      .join(", ");

  let photoHtml = `
    <div style="
      height:250px;
      background:#f3f3f3;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:70px;
    ">
      👤
    </div>
  `;

  if (profile.profile_photo) {

    const publicResult =
      supabaseClient
        .storage
        .from("profile-photos")
        .getPublicUrl(
          profile.profile_photo
        );

    const photoUrl =
      publicResult.data?.publicUrl;

    if (photoUrl) {

      photoHtml = `
        <div style="
          height:250px;
          overflow:hidden;
          background:#f3f3f3;
        ">

          <img
            src="${escapeHtml(
              photoUrl
            )}"
            alt="${escapeHtml(
              profile.full_name || "Profile"
            )}"
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

  return `
    <article style="
      border:1px solid #eee;
      border-radius:18px;
      overflow:hidden;
      background:#fff;
      box-shadow:0 4px 18px rgba(0,0,0,.06);
    ">

      ${photoHtml}

      <div style="
        padding:18px;
      ">

        <h3 style="
          margin:0 0 7px;
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

        <p style="
          margin:5px 0;
          color:#666;
        ">
          📍
          ${escapeHtml(
            location ||
            "Location not specified"
          )}
        </p>

        <p style="
          margin:5px 0;
          color:#666;
        ">
          👥
          ${escapeHtml(
            profile.community ||
            "Community not specified"
          )}
        </p>

        ${
          profile.surname
            ? `
              <p style="
                margin:5px 0;
                color:#666;
              ">
                Surname:
                ${escapeHtml(
                  profile.surname
                )}
              </p>
            `
            : ""
        }

        ${
          profile.kul
            ? `
              <p style="
                margin:5px 0;
                color:#666;
              ">
                Kul:
                ${escapeHtml(
                  profile.kul
                )}
              </p>
            `
            : ""
        }

        <div style="
          margin-top:15px;
          display:flex;
          gap:8px;
        ">

          <button
            type="button"
            class="btn primary"
            style="
              flex:1;
            "
            onclick="viewProfile('${escapeHtml(
              profile.id
            )}')"
          >
            View Profile
          </button>

          <button
            type="button"
            class="btn"
            style="
              flex:1;
            "
            onclick="alert('Send Interest will be added in Step 3 ❤️')"
          >
            ❤️ Interest
          </button>

        </div>

      </div>

    </article>
  `;
}


// ============================================
// LOAD PROFILE PHOTO
// ============================================

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
      "profilePhotoPreview"
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
      "
    >
  `;
}


// ============================================
// UPLOAD PROFILE PHOTO
// ============================================

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

  await supabaseClient
    .storage
    .from("profile-photos")
    .remove(oldFiles);

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


// ============================================
// UPDATE PROFILE
// ============================================

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

  setTimeout(
    async function () {
      await openDashboard();
    },
    700
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

  await supabaseClient
    .auth
    .signOut();

  const dashboard =
    document.getElementById(
      "samajSaathiDashboard"
    );

  if (dashboard) {
    dashboard.remove();
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
      background:${
        isError
          ? "#fff3f3"
          : "#f8f1f3"
      };
      color:${
        isError
          ? "#b42318"
          : "#6f1025"
      };
    ">

      ${escapeHtml(text)}

    </div>

  `;
}


// ============================================
// MODAL EVENTS
// ============================================

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


// ============================================
// ESC KEY
// ============================================

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


// ============================================
// INITIALIZE
// ============================================

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


// ============================================
// SESSION CHECK
// ============================================

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

  } catch(error) {

    console.error(
      "SESSION CHECK ERROR:",
      error
    );

  }

})();
```
