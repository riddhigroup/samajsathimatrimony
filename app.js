// ============================================================
// SAMAJ SAATHI MATRIMONY
// COMPLETE APP.JS
// SUPABASE CONNECTED
// ============================================================

const SUPABASE_URL =
  "https://drrsborerbgzthxdazqu.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_ACdKChyHYC11rSK9_HZ0Jg_l22KO06k";


// ============================================================
// SUPABASE
// ============================================================

let supabaseClient = null;

try {
  if (
    window.supabase &&
    typeof window.supabase.createClient === "function"
  ) {
    supabaseClient = window.supabase.createClient(
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

    console.log("SamajSaathi: Supabase connected.");
  } else {
    console.error("Supabase library not loaded.");
  }
} catch (error) {
  console.error("Supabase initialization error:", error);
}


// ============================================================
// GLOBAL STATE
// ============================================================

let currentUser = null;
let currentProfile = null;
let allProfiles = [];
let currentViewedProfile = null;


// ============================================================
// SUPABASE CHECK
// ============================================================

function isSupabaseReady() {
  if (supabaseClient) return true;

  alert(
    "SamajSaathi could not connect to the database. Please refresh the page."
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
  if (!dateString) return null;

  const birthDate = new Date(dateString);

  if (Number.isNaN(birthDate.getTime())) {
    return null;
  }

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


// ============================================================
// USER ID
// ============================================================

function generateUserId() {
  return (
    "SS" +
    Math.floor(
      100000 +
      Math.random() * 900000
    )
  );
}


// ============================================================
// USERNAME
// ============================================================

function generateUsername(firstName, lastName) {
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

  return `${first}.${last}${random}`;
}


// ============================================================
// PASSWORD
// ============================================================

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


// ============================================================
// MESSAGE
// ============================================================

function showMessage(element, text, type = "info") {
  if (!element) return;

  const error = type === "error";

  element.innerHTML = `
    <div style="
      margin-top:15px;
      padding:12px;
      border-radius:10px;
      background:${error ? "#fff3f3" : "#f8f1f3"};
      color:${error ? "#b42318" : "#6f1025"};
      font-size:14px;
    ">
      ${escapeHtml(text)}
    </div>
  `;
}


// ============================================================
// PHOTO URL
// ============================================================

function getProfilePhotoUrl(photoPath) {
  if (!photoPath || !supabaseClient) {
    return null;
  }

  try {
    const result =
      supabaseClient
        .storage
        .from("profile-photos")
        .getPublicUrl(photoPath);

    return result.data?.publicUrl || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}


// ============================================================
// SESSION
// ============================================================

async function getCurrentUser() {
  if (!supabaseClient) return null;

  try {
    const {
      data,
      error
    } = await supabaseClient.auth.getUser();

    if (error) {
      console.warn("getUser:", error.message);
      return null;
    }

    currentUser = data?.user || null;

    return currentUser;
  } catch (error) {
    console.error(error);
    return null;
  }
}


// ============================================================
// LOAD CURRENT PROFILE
// ============================================================

async function loadCurrentProfile() {
  if (!supabaseClient) return null;

  const user = await getCurrentUser();

  if (!user) {
    currentProfile = null;
    return null;
  }

  const {
    data,
    error
  } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error(
      "CURRENT PROFILE ERROR:",
      error
    );

    return null;
  }

  currentProfile = data || null;

  return currentProfile;
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
        Access your profile and discover suitable matches.
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

        <div class="field full">
          <label>Email *</label>
          <input
            id="email"
            type="email"
            placeholder="Email address"
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
            <option value="">Select</option>
            <option value="female">Woman</option>
            <option value="male">Man</option>
          </select>
        </div>

        <div class="field">
          <label>Community / Jati</label>

          <select id="community">
            <option value="Dom">Dom</option>
            <option value="Other SC Community">
              Other SC Community
            </option>
          </select>
        </div>

        <div class="field">
          <label>Surname</label>

          <select id="surname">
            <option value="Rauth">Rauth</option>
            <option value="Basfor">Basfor</option>
            <option value="Bansfor">Bansfor</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="field">
          <label>Kul / Clan</label>

          <select id="kul">
            <option value="Piari Baiswar">
              Piari Baiswar
            </option>
            <option value="Other">Other</option>
            <option value="Not Known">
              Not Known
            </option>
          </select>
        </div>

        <div class="field full">
          <label>Current City *</label>

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
    document.getElementById("modal");

  if (modal) {
    modal.classList.remove("show");
  }
}


// ============================================================
// REGISTER
// ============================================================

async function registerUser() {
  if (!isSupabaseReady()) return;

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
    `${firstName} ${lastName}`;

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
            first_name: firstName,
            last_name: lastName,
            full_name: fullName,
            username,
            display_user_id: displayUserId
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


    const user =
      result.data?.user;

    if (!user) {
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
      id: user.id,
      full_name: fullName,
      gender,
      date_of_birth: dob,
      age,
      city,
      community,
      surname,
      kul,
      is_active: true
    };


    if (result.data?.session) {

      const {
        error
      } = await supabaseClient
        .from("profiles")
        .upsert(
          profileData,
          {
            onConflict: "id"
          }
        );


      if (error) {
        showMessage(
          message,
          "Account created, but profile could not be saved: " +
          error.message,
          "error"
        );

        return;
      }


      currentUser = user;
      currentProfile = profileData;


      showRegistrationSuccess({
        userId: displayUserId,
        username,
        firstName,
        password
      });

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

    <div style="text-align:center">

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

        <div style="margin-bottom:12px">
          <small>User ID</small>

          <strong style="
            display:block;
            font-size:20px;
            margin-top:4px;
          ">
            ${escapeHtml(user.userId)}
          </strong>
        </div>

        <div style="margin-bottom:12px">
          <small>Username</small>

          <strong style="
            display:block;
            margin-top:4px;
          ">
            ${escapeHtml(user.username)}
          </strong>
        </div>

        <div>
          <small>Temporary Password</small>

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
// CONTENT AFTER SIGNUP
// ============================================================

function contentAfterSignup(
  firstName,
  userId,
  username,
  password
) {
  showRegistrationSuccess({
    firstName,
    userId,
    username,
    password
  });
}


// ============================================================
// LOGIN
// ============================================================

async function loginUser() {
  if (!isSupabaseReady()) return;

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

    const {
      data,
      error
    } =
      await supabaseClient.auth
        .signInWithPassword({
          email,
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


    currentUser =
      data?.user || null;


    await loadCurrentProfile();


    closeModal();


    await openDashboard();

  } catch (error) {

    console.error(
      "LOGIN ERROR:",
      error
    );

    showMessage(
      message,
      "Login failed: " +
      error.message,
      "error"
    );
  }
}


// ============================================================
// LOGOUT
// ============================================================

async function logoutUser() {
  if (!supabaseClient) return;

  try {
    await supabaseClient.auth.signOut();

    currentUser = null;
    currentProfile = null;

    localStorage.removeItem(
      "samajSaathiUserId"
    );

    localStorage.removeItem(
      "samajSaathiUsername"
    );

    window.location.hash = "home";

    window.location.reload();

  } catch (error) {
    console.error(
      "LOGOUT ERROR:",
      error
    );
  }
}


// ============================================================
// OPEN DASHBOARD
// ============================================================

async function openDashboard() {

  const user =
    await getCurrentUser();

  if (!user) {
    openModal("login");
    return;
  }


  await loadCurrentProfile();

  closeModal();


  const dashboard =
    document.getElementById(
      "dashboard"
    );

  if (dashboard) {
    dashboard.style.display = "block";
  }


  await loadProfiles();

  await refreshInterestUI();

  await loadNotifications();

  window.location.hash =
    "dashboard";
}


// ============================================================
// LOAD PROFILES
// ============================================================

async function loadProfiles() {
  if (!isSupabaseReady()) return [];

  const user =
    await getCurrentUser();

  if (!user) return [];


  const {
    data,
    error
  } =
    await supabaseClient
      .from("profiles")
      .select("*")
      .eq("is_active", true)
      .neq("id", user.id)
      .order(
        "created_at",
        {
          ascending: false
        }
      );


  if (error) {
    console.error(
      "LOAD PROFILES ERROR:",
      error
    );

    return [];
  }


  allProfiles =
    data || [];


  renderProfiles(
    allProfiles
  );


  return allProfiles;
}


// ============================================================
// RENDER PROFILES
// ============================================================

async function renderProfiles(
  profiles
) {
  const containers = [
    document.getElementById("profilesGrid"),
    document.getElementById("matchesGrid"),
    document.getElementById("profiles")
  ].filter(Boolean);


  if (!containers.length) {
    return;
  }


  const user =
    await getCurrentUser();


  let sentIds = [];


  if (user) {
    sentIds =
      await getSentInterestReceiverIds(
        user.id
      );
  }


  const html =
    profiles
      .map(profile => {

        const sent =
          sentIds.includes(
            profile.id
          );


        const photo =
          getProfilePhotoUrl(
            profile.profile_photo
          );


        return `

          <div
            class="profile-card"
            data-profile-id="${escapeHtml(profile.id)}"
          >

            <div class="profile-img">

              ${
                photo
                  ? `
                    <img
                      src="${escapeHtml(photo)}"
                      alt="${escapeHtml(profile.full_name)}"
                      style="
                        width:100%;
                        height:100%;
                        object-fit:cover;
                      "
                    >
                  `
                  : `
                    <div style="
                      width:100%;
                      height:100%;
                      display:flex;
                      align-items:center;
                      justify-content:center;
                      font-size:45px;
                    ">
                      👤
                    </div>
                  `
              }

            </div>


            <div class="profile-card-content">

              <h3>
                ${escapeHtml(
                  profile.full_name
                )}
              </h3>

              <p>
                ${
                  profile.age
                    ? escapeHtml(profile.age) + " years"
                    : ""
                }
                ${
                  profile.city
                    ? " • " +
                      escapeHtml(profile.city)
                    : ""
                }
              </p>

              <p>
                ${
                  profile.community
                    ? escapeHtml(profile.community)
                    : ""
                }
                ${
                  profile.surname
                    ? " • " +
                      escapeHtml(profile.surname)
                    : ""
                }
              </p>


              <div style="
                display:flex;
                gap:8px;
                flex-wrap:wrap;
                margin-top:12px;
              ">

                <button
                  type="button"
                  class="btn"
                  onclick="viewProfile('${escapeHtml(profile.id)}')"
                >
                  View Profile
                </button>

                ${
                  sent
                    ? `
                      <button
                        type="button"
                        class="btn"
                        disabled
                        style="
                          opacity:.7;
                          cursor:default;
                        "
                      >
                        ❤️ Interest Sent
                      </button>
                    `
                    : `
                      <button
                        type="button"
                        class="btn primary"
                        onclick="sendInterest('${escapeHtml(profile.id)}')"
                      >
                        ❤️ Send Interest
                      </button>
                    `
                }

              </div>

            </div>

          </div>
        `;
      })
      .join("");


  containers.forEach(
    container => {
      container.innerHTML =
        html ||
        `
          <div style="
            padding:30px;
            text-align:center;
          ">
            No suitable profiles found.
          </div>
        `;
    }
  );
}


// ============================================================
// GET SENT INTEREST IDS
// ============================================================

async function getSentInterestReceiverIds(
  senderId
) {
  if (!supabaseClient || !senderId) {
    return [];
  }


  const {
    data,
    error
  } =
    await supabaseClient
      .from("interests")
      .select("receiver_id")
      .eq(
        "sender_id",
        senderId
      )
      .in(
        "status",
        [
          "pending",
          "accepted"
        ]
      );


  if (error) {
    console.error(
      "SENT INTEREST ERROR:",
      error
    );

    return [];
  }


  return (
    data || []
  ).map(
    row => row.receiver_id
  );
}


// ============================================================
// SEND INTEREST
// ============================================================

async function sendInterest(
  receiverId
) {
  if (!isSupabaseReady()) {
    return false;
  }


  const user =
    await getCurrentUser();


  if (!user) {
    openModal("login");
    return false;
  }


  if (!receiverId) {
    alert(
      "Receiver profile not found."
    );

    return false;
  }


  if (receiverId === user.id) {
    alert(
      "You cannot send interest to yourself."
    );

    return false;
  }


  const buttons =
    document.querySelectorAll(
      `[onclick*="sendInterest('${receiverId}')"]`
    );


  buttons.forEach(
    button => {
      button.disabled = true;
      button.dataset.oldText =
        button.innerHTML;

      button.innerHTML =
        "Sending...";
    }
  );


  try {

    // --------------------------------------------------------
    // CHECK EXISTING INTEREST
    // --------------------------------------------------------

    const {
      data: existing,
      error: existingError
    } =
      await supabaseClient
        .from("interests")
        .select("*")
        .eq(
          "sender_id",
          user.id
        )
        .eq(
          "receiver_id",
          receiverId
        )
        .maybeSingle();


    if (existingError) {
      console.error(
        "CHECK INTEREST ERROR:",
        existingError
      );
    }


    // --------------------------------------------------------
    // ALREADY SENT
    // --------------------------------------------------------

    if (
      existing &&
      (
        existing.status === "pending" ||
        existing.status === "accepted"
      )
    ) {

      markInterestSent(
        receiverId
      );

      alert(
        existing.status === "accepted"
          ? "Interest already accepted."
          : "Interest already sent."
      );

      return true;
    }


    // --------------------------------------------------------
    // INSERT / RESTORE INTEREST
    // --------------------------------------------------------

    let interestData;


    if (existing) {

      const {
        data,
        error
      } =
        await supabaseClient
          .from("interests")
          .update({
            status: "pending",
            updated_at:
              new Date().toISOString()
          })
          .eq(
            "id",
            existing.id
          )
          .select()
          .single();


      if (error) {
        throw error;
      }

      interestData = data;

    } else {

      const {
        data,
        error
      } =
        await supabaseClient
          .from("interests")
          .insert({
            sender_id: user.id,
            receiver_id: receiverId,
            status: "pending"
          })
          .select()
          .single();


      if (error) {
        throw error;
      }

      interestData = data;
    }


    // --------------------------------------------------------
    // UPDATE SENDER UI
    // --------------------------------------------------------

    markInterestSent(
      receiverId
    );


    // --------------------------------------------------------
    // CREATE RECEIVER NOTIFICATION
    // --------------------------------------------------------

    await createInterestNotification(
      user.id,
      receiverId,
      interestData?.id
    );


    // --------------------------------------------------------
    // REFRESH EVERYTHING
    // --------------------------------------------------------

    await refreshInterestUI();

    await loadNotifications();


    alert(
      "❤️ Interest sent successfully!"
    );


    return true;

  } catch (error) {

    console.error(
      "SEND INTEREST ERROR:",
      error
    );


    let message =
      error?.message ||
      "Unable to send interest.";


    if (
      message
        .toLowerCase()
        .includes("permission")
    ) {
      message +=
        "\n\nPlease check the Supabase RLS policies for the interests table.";
    }


    alert(message);


    buttons.forEach(
      button => {
        button.disabled = false;

        if (button.dataset.oldText) {
          button.innerHTML =
            button.dataset.oldText;
        }
      }
    );


    return false;
  }
}


// ============================================================
// MARK INTEREST SENT
// ============================================================

function markInterestSent(
  receiverId
) {

  const selectors = [
    `[data-profile-id="${receiverId}"]`
  ];


  selectors.forEach(
    selector => {

      document
        .querySelectorAll(selector)
        .forEach(card => {

          const buttons =
            card.querySelectorAll(
              "button"
            );


          buttons.forEach(
            button => {

              const text =
                button.textContent
                  .toLowerCase();


              if (
                text.includes("send interest") ||
                text.includes("interest sent")
              ) {

                button.disabled = true;

                button.innerHTML =
                  "❤️ Interest Sent";

                button.classList.remove(
                  "primary"
                );

                button.style.opacity =
                  ".7";

              }

            }
          );

        });
    });


  // Generic fallback for onclick buttons

  document
    .querySelectorAll(
      `[onclick*="sendInterest('${receiverId}')"]`
    )
    .forEach(button => {

      button.disabled = true;

      button.innerHTML =
        "❤️ Interest Sent";

      button.style.opacity =
        ".7";
    });
}


// ============================================================
// CREATE NOTIFICATION
// ============================================================

async function createInterestNotification(
  senderId,
  receiverId,
  interestId
) {
  if (!supabaseClient) {
    return false;
  }


  try {

    // First try common notification structure

    const {
      error
    } =
      await supabaseClient
        .from("notifications")
        .insert({
          user_id: receiverId,
          sender_id: senderId,
          interest_id: interestId || null,
          type: "interest",
          title: "New Interest ❤️",
          message:
            "Someone has sent you an interest.",
          is_read: false
        });


    if (error) {

      console.warn(
        "Notification insert failed:",
        error.message
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
// VIEW PROFILE
// ============================================================

async function viewProfile(
  profileId
) {
  if (!isSupabaseReady()) return;


  const {
    data,
    error
  } =
    await supabaseClient
      .from("profiles")
      .select("*")
      .eq(
        "id",
        profileId
      )
      .maybeSingle();


  if (error) {
    console.error(
      "VIEW PROFILE ERROR:",
      error
    );

    alert(
      "Unable to load profile."
    );

    return;
  }


  if (!data) {
    alert(
      "Profile not found."
    );

    return;
  }


  currentViewedProfile =
    data;


  const photo =
    getProfilePhotoUrl(
      data.profile_photo
    );


  const user =
    await getCurrentUser();


  let alreadySent = false;


  if (user) {

    const {
      data: interest
    } =
      await supabaseClient
        .from("interests")
        .select("id,status")
        .eq(
          "sender_id",
          user.id
        )
        .eq(
          "receiver_id",
          profileId
        )
        .maybeSingle();


    alreadySent =
      !!interest &&
      (
        interest.status === "pending" ||
        interest.status === "accepted"
      );
  }


  const modal =
    document.getElementById(
      "modal"
    );

  const content =
    document.getElementById(
      "modalContent"
    );


  if (!modal || !content) {
    return;
  }


  content.innerHTML = `

    <div style="text-align:center">

      ${
        photo
          ? `
            <img
              src="${escapeHtml(photo)}"
              alt="${escapeHtml(data.full_name)}"
              style="
                width:150px;
                height:150px;
                border-radius:50%;
                object-fit:cover;
                margin-bottom:15px;
              "
            >
          `
          : `
            <div style="
              width:150px;
              height:150px;
              border-radius:50%;
              margin:0 auto 15px;
              display:flex;
              align-items:center;
              justify-content:center;
              background:#f5eef1;
              font-size:55px;
            ">
              👤
            </div>
          `
      }


      <span class="eyebrow">
        SAMAJSAATHI PROFILE
      </span>

      <h2>
        ${escapeHtml(data.full_name)}
      </h2>

      <p>
        ${
          data.age
            ? escapeHtml(data.age) + " years"
            : ""
        }
        ${
          data.city
            ? " • " + escapeHtml(data.city)
            : ""
        }
      </p>

      <div style="
        text-align:left;
        margin-top:20px;
        line-height:1.8;
      ">

        <p>
          <strong>Community:</strong>
          ${escapeHtml(data.community)}
        </p>

        <p>
          <strong>Surname:</strong>
          ${escapeHtml(data.surname)}
        </p>

        <p>
          <strong>Kul / Clan:</strong>
          ${escapeHtml(data.kul)}
        </p>

        ${
          data.education
            ? `
              <p>
                <strong>Education:</strong>
                ${escapeHtml(data.education)}
              </p>
            `
            : ""
        }

        ${
          data.occupation
            ? `
              <p>
                <strong>Occupation:</strong>
                ${escapeHtml(data.occupation)}
              </p>
            `
            : ""
        }

      </div>


      <div class="modal-actions">

        ${
          alreadySent
            ? `
              <button
                type="button"
                class="btn"
                disabled
                style="opacity:.7"
              >
                ❤️ Interest Sent
              </button>
            `
            : `
              <button
                type="button"
                class="btn primary"
                onclick="
                  sendInterest('${escapeHtml(profileId)}');
                "
              >
                ❤️ Send Interest
              </button>
            `
        }

      </div>

    </div>
  `;


  modal.classList.add(
    "show"
  );
}


// ============================================================
// REFRESH INTEREST UI
// ============================================================

async function refreshInterestUI() {

  const user =
    await getCurrentUser();

  if (!user) return;


  const sentIds =
    await getSentInterestReceiverIds(
      user.id
    );


  // Update all profile buttons

  sentIds.forEach(
    receiverId => {
      markInterestSent(
        receiverId
      );
    }
  );


  // Reload received interests

  await loadReceivedInterests();
}


// ============================================================
// RECEIVED INTERESTS
// ============================================================

async function loadReceivedInterests() {
  if (!supabaseClient) return [];


  const user =
    await getCurrentUser();

  if (!user) return [];


  const {
    data,
    error
  } =
    await supabaseClient
      .from("interests")
      .select(`
        id,
        sender_id,
        receiver_id,
        status,
        created_at,
        updated_at
      `)
      .eq(
        "receiver_id",
        user.id
      )
      .order(
        "created_at",
        {
          ascending: false
        }
      );


  if (error) {

    console.error(
      "RECEIVED INTEREST ERROR:",
      error
    );

    return [];
  }


  const interests =
    data || [];


  const senderIds =
    interests.map(
      item => item.sender_id
    );


  let profiles = [];


  if (senderIds.length) {

    const result =
      await supabaseClient
        .from("profiles")
        .select("*")
        .in(
          "id",
          senderIds
        );


    if (!result.error) {
      profiles =
        result.data || [];
    }
  }


  const profileMap =
    new Map(
      profiles.map(
        profile => [
          profile.id,
          profile
        ]
      )
    );


  const enriched =
    interests.map(
      interest => ({
        ...interest,
        sender:
          profileMap.get(
            interest.sender_id
          ) || null
      })
    );


  renderReceivedInterests(
    enriched
  );


  return enriched;
}


// ============================================================
// RENDER RECEIVED INTERESTS
// ============================================================

function renderReceivedInterests(
  interests
) {

  const containers = [
    document.getElementById(
      "receivedInterests"
    ),
    document.getElementById(
      "receivedInterestList"
    ),
    document.getElementById(
      "interestsReceived"
    )
  ].filter(Boolean);


  if (!containers.length) {
    return;
  }


  const html =
    interests
      .map(item => {

        const profile =
          item.sender;


        if (!profile) {
          return "";
        }


        const photo =
          getProfilePhotoUrl(
            profile.profile_photo
          );


        const status =
          item.status || "pending";


        let actions = "";


        if (
          status === "pending"
        ) {

          actions = `

            <div style="
              display:flex;
              gap:8px;
              flex-wrap:wrap;
              margin-top:12px;
            ">

              <button
                type="button"
                class="btn primary"
                onclick="acceptInterest('${escapeHtml(item.id)}')"
              >
                ✓ Accept
              </button>

              <button
                type="button"
                class="btn"
                onclick="rejectInterest('${escapeHtml(item.id)}')"
              >
                ✕ Reject
              </button>

              <button
                type="button"
                class="btn"
                onclick="viewProfile('${escapeHtml(profile.id)}')"
              >
                View Profile
              </button>

            </div>
          `;

        } else if (
          status === "accepted"
        ) {

          actions = `
            <div style="
              margin-top:12px;
              font-weight:600;
            ">
              ✅ Interest Accepted
            </div>
          `;

        } else if (
          status === "rejected"
        ) {

          actions = `
            <div style="
              margin-top:12px;
              opacity:.7;
            ">
              Interest Rejected
            </div>
          `;
        }


        return `

          <div
            class="interest-card"
            data-interest-id="${escapeHtml(item.id)}"
            style="
              padding:16px;
              margin-bottom:12px;
              border-radius:14px;
              border:1px solid #eee;
            "
          >

            <div style="
              display:flex;
              gap:14px;
              align-items:center;
            ">

              ${
                photo
                  ? `
                    <img
                      src="${escapeHtml(photo)}"
                      alt="${escapeHtml(profile.full_name)}"
                      style="
                        width:70px;
                        height:70px;
                        object-fit:cover;
                        border-radius:50%;
                      "
                    >
                  `
                  : `
                    <div style="
                      width:70px;
                      height:70px;
                      border-radius:50%;
                      display:flex;
                      align-items:center;
                      justify-content:center;
                      background:#f5eef1;
                      font-size:28px;
                    ">
                      👤
                    </div>
                  `
              }

              <div>

                <strong>
                  ${escapeHtml(profile.full_name)}
                </strong>

                <div>
                  ${
                    profile.age
                      ? escapeHtml(profile.age) +
                        " years"
                      : ""
                  }
                  ${
                    profile.city
                      ? " • " +
                        escapeHtml(profile.city)
                      : ""
                  }
                </div>

                <small>
                  Status:
                  ${escapeHtml(status)}
                </small>

              </div>

            </div>

            ${actions}

          </div>
        `;
      })
      .join("");


  containers.forEach(
    container => {
      container.innerHTML =
        html ||
        `
          <div style="
            padding:25px;
            text-align:center;
          ">
            No interests received yet.
          </div>
        `;
    }
  );
}


// ============================================================
// MY SENT INTERESTS
// ============================================================

async function loadMyInterests() {
  if (!supabaseClient) return [];


  const user =
    await getCurrentUser();

  if (!user) return [];


  const {
    data,
    error
  } =
    await supabaseClient
      .from("interests")
      .select("*")
      .eq(
        "sender_id",
        user.id
      )
      .order(
        "created_at",
        {
          ascending: false
        }
      );


  if (error) {

    console.error(
      "MY INTERESTS ERROR:",
      error
    );

    return [];
  }


  const interests =
    data || [];


  const receiverIds =
    interests.map(
      row => row.receiver_id
    );


  let profiles = [];


  if (receiverIds.length) {

    const result =
      await supabaseClient
        .from("profiles")
        .select("*")
        .in(
          "id",
          receiverIds
        );


    if (!result.error) {
      profiles =
        result.data || [];
    }
  }


  const map =
    new Map(
      profiles.map(
        profile => [
          profile.id,
          profile
        ]
      )
    );


  const enriched =
    interests.map(
      interest => ({
        ...interest,
        receiver:
          map.get(
            interest.receiver_id
          ) || null
      })
    );


  renderMyInterests(
    enriched
  );


  return enriched;
}


// ============================================================
// RENDER MY INTERESTS
// ============================================================

function renderMyInterests(
  interests
) {

  const containers = [
    document.getElementById(
      "myInterests"
    ),
    document.getElementById(
      "sentInterests"
    ),
    document.getElementById(
      "interestSentList"
    )
  ].filter(Boolean);


  if (!containers.length) {
    return;
  }


  const html =
    interests
      .map(item => {

        const profile =
          item.receiver;


        if (!profile) return "";


        const status =
          item.status || "pending";


        return `

          <div
            class="interest-card"
            style="
              padding:16px;
              margin-bottom:12px;
              border-radius:14px;
              border:1px solid #eee;
            "
          >

            <strong>
              ${escapeHtml(profile.full_name)}
            </strong>

            <div>
              ${
                profile.age
                  ? escapeHtml(profile.age) +
                    " years"
                  : ""
              }
              ${
                profile.city
                  ? " • " +
                    escapeHtml(profile.city)
                  : ""
              }
            </div>

            <div style="
              margin-top:8px;
              font-weight:600;
            ">

              ${
                status === "pending"
                  ? "⏳ Interest Pending"
                  : status === "accepted"
                    ? "✅ Interest Accepted"
                    : "❌ Interest Rejected"
              }

            </div>

          </div>
        `;
      })
      .join("");


  containers.forEach(
    container => {
      container.innerHTML =
        html ||
        `
          <div style="
            padding:25px;
            text-align:center;
          ">
            You have not sent any interests yet.
          </div>
        `;
    }
  );
}


// ============================================================
// ACCEPT INTEREST
// ============================================================

async function acceptInterest(
  interestId
) {
  if (!isSupabaseReady()) return;


  const user =
    await getCurrentUser();

  if (!user) {
    openModal("login");
    return;
  }


  try {

    const {
      data: interest,
      error: findError
    } =
      await supabaseClient
        .from("interests")
        .select("*")
        .eq(
          "id",
          interestId
        )
        .eq(
          "receiver_id",
          user.id
        )
        .single();


    if (findError) {
      throw findError;
    }


    const {
      data,
      error
    } =
      await supabaseClient
        .from("interests")
        .update({
          status: "accepted",
          updated_at:
            new Date().toISOString()
        })
        .eq(
          "id",
          interestId
        )
        .eq(
          "receiver_id",
          user.id
        )
        .select()
        .single();


    if (error) {
      throw error;
    }


    await createStatusNotification(
      user.id,
      interest.sender_id,
      interestId,
      "accepted"
    );


    await loadReceivedInterests();

    await loadMyInterests();

    await loadNotifications();


    alert(
      "✅ Interest accepted!"
    );


  } catch (error) {

    console.error(
      "ACCEPT INTEREST ERROR:",
      error
    );

    alert(
      error.message ||
      "Unable to accept interest."
    );
  }
}


// ============================================================
// REJECT INTEREST
// ============================================================

async function rejectInterest(
  interestId
) {
  if (!isSupabaseReady()) return;


  const user =
    await getCurrentUser();

  if (!user) {
    openModal("login");
    return;
  }


  try {

    const {
      data: interest,
      error: findError
    } =
      await supabaseClient
        .from("interests")
        .select("*")
        .eq(
          "id",
          interestId
        )
        .eq(
          "receiver_id",
          user.id
        )
        .single();


    if (findError) {
      throw findError;
    }


    const {
      error
    } =
      await supabaseClient
        .from("interests")
        .update({
          status: "rejected",
          updated_at:
            new Date().toISOString()
        })
        .eq(
          "id",
          interestId
        )
        .eq(
          "receiver_id",
          user.id
        );


    if (error) {
      throw error;
    }


    await createStatusNotification(
      user.id,
      interest.sender_id,
      interestId,
      "rejected"
    );


    await loadReceivedInterests();

    await loadMyInterests();

    await loadNotifications();


    alert(
      "Interest rejected."
    );


  } catch (error) {

    console.error(
      "REJECT INTEREST ERROR:",
      error
    );

    alert(
      error.message ||
      "Unable to reject interest."
    );
  }
}


// ============================================================
// STATUS NOTIFICATION
// ============================================================

async function createStatusNotification(
  senderId,
  receiverId,
  interestId,
  status
) {

  if (!supabaseClient) {
    return false;
  }


  const title =
    status === "accepted"
      ? "Interest Accepted ❤️"
      : "Interest Update";


  const message =
    status === "accepted"
      ? "Your interest has been accepted."
      : "Your interest has been rejected.";


  try {

    const {
      error
    } =
      await supabaseClient
        .from("notifications")
        .insert({
          user_id: receiverId,
          sender_id: senderId,
          interest_id: interestId || null,
          type: `interest_${status}`,
          title,
          message,
          is_read: false
        });


    if (error) {
      console.warn(
        "STATUS NOTIFICATION:",
        error.message
      );

      return false;
    }


    return true;

  } catch (error) {

    console.warn(
      "STATUS NOTIFICATION ERROR:",
      error
    );

    return false;
  }
}


// ============================================================
// NOTIFICATIONS
// ============================================================

async function loadNotifications() {
  if (!supabaseClient) return [];


  const user =
    await getCurrentUser();

  if (!user) return [];


  const {
    data,
    error
  } =
    await supabaseClient
      .from("notifications")
      .select("*")
      .eq(
        "user_id",
        user.id
      )
      .order(
        "created_at",
        {
          ascending: false
        }
      );


  if (error) {

    console.error(
      "LOAD NOTIFICATIONS ERROR:",
      error
    );

    return [];
  }


  const notifications =
    data || [];


  renderNotifications(
    notifications
  );


  updateNotificationBadge(
    notifications
  );


  return notifications;
}


// ============================================================
// RENDER NOTIFICATIONS
// ============================================================

function renderNotifications(
  notifications
) {

  const containers = [
    document.getElementById(
      "notifications"
    ),
    document.getElementById(
      "notificationList"
    ),
    document.getElementById(
      "notificationsList"
    )
  ].filter(Boolean);


  if (!containers.length) {
    return;
  }


  const html =
    notifications
      .map(notification => {

        return `

          <div
            class="notification-item"
            style="
              padding:14px;
              margin-bottom:8px;
              border-radius:12px;
              background:${
                notification.is_read
                  ? "#fff"
                  : "#fff8e6"
              };
              border:1px solid #eee;
            "
          >

            <strong>
              ${escapeHtml(
                notification.title ||
                "Notification"
              )}
            </strong>

            <div style="
              margin-top:4px;
            ">
              ${escapeHtml(
                notification.message ||
                ""
              )}
            </div>

            ${
              notification.created_at
                ? `
                  <small style="
                    display:block;
                    margin-top:6px;
                    opacity:.6;
                  ">
                    ${formatDate(
                      notification.created_at
                    )}
                  </small>
                `
                : ""
            }

          </div>
        `;
      })
      .join("");


  containers.forEach(
    container => {

      container.innerHTML =
        html ||
        `
          <div style="
            padding:25px;
            text-align:center;
          ">
            No new notifications.
          </div>
        `;
    }
  );
}


// ============================================================
// NOTIFICATION BADGE
// ============================================================

function updateNotificationBadge(
  notifications
) {

  const unread =
    notifications.filter(
      notification =>
        !notification.is_read
    ).length;


  const badges = [
    document.getElementById(
      "notificationBadge"
    ),
    document.getElementById(
      "notificationCount"
    ),
    document.querySelector(
      ".notification-badge"
    )
  ].filter(Boolean);


  badges.forEach(
    badge => {

      if (unread > 0) {

        badge.textContent =
          unread > 99
            ? "99+"
            : String(unread);

        badge.style.display =
          "inline-flex";

      } else {

        badge.textContent = "";

        badge.style.display =
          "none";
      }
    }
  );
}


// ============================================================
// MARK NOTIFICATIONS READ
// ============================================================

async function markNotificationsRead() {
  if (!supabaseClient) return;


  const user =
    await getCurrentUser();

  if (!user) return;


  const {
    error
  } =
    await supabaseClient
      .from("notifications")
      .update({
        is_read: true
      })
      .eq(
        "user_id",
        user.id
      )
      .eq(
        "is_read",
        false
      );


  if (error) {
    console.error(
      "MARK READ ERROR:",
      error
    );

    return;
  }


  await loadNotifications();
}


// ============================================================
// DATE FORMAT
// ============================================================

function formatDate(
  value
) {

  if (!value) return "";

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
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }
  );
}


// ============================================================
// PROFILE PHOTO UPLOAD
// ============================================================

async function uploadProfilePhoto(
  file
) {
  if (!isSupabaseReady()) return null;


  const user =
    await getCurrentUser();

  if (!user) {
    openModal("login");
    return null;
  }


  if (!file) {
    alert(
      "Please select a photo."
    );

    return null;
  }


  if (
    !file.type.startsWith(
      "image/"
    )
  ) {
    alert(
      "Please select an image file."
    );

    return null;
  }


  if (
    file.size >
    5 * 1024 * 1024
  ) {
    alert(
      "Photo must be smaller than 5 MB."
    );

    return null;
  }


  try {

    const extension =
      file.name
        .split(".")
        .pop()
        .toLowerCase();


    const filePath =
      `${user.id}/profile-${Date.now()}.${extension}`;


    const {
      error: uploadError
    } =
      await supabaseClient
        .storage
        .from("profile-photos")
        .upload(
          filePath,
          file,
          {
            upsert: true
          }
        );


    if (uploadError) {
      throw uploadError;
    }


    const {
      error: profileError
    } =
      await supabaseClient
        .from("profiles")
        .update({
          profile_photo:
            filePath
        })
        .eq(
          "id",
          user.id
        );


    if (profileError) {
      throw profileError;
    }


    if (currentProfile) {
      currentProfile.profile_photo =
        filePath;
    }


    alert(
      "📸 Profile photo uploaded successfully."
    );


    return filePath;

  } catch (error) {

    console.error(
      "PHOTO UPLOAD ERROR:",
      error
    );

    alert(
      "Photo upload failed: " +
      error.message
    );

    return null;
  }
}


// ============================================================
// AUTH STATE LISTENER
// ============================================================

if (supabaseClient) {

  supabaseClient.auth.onAuthStateChange(
    async (event, session) => {

      console.log(
        "AUTH EVENT:",
        event
      );


      if (
        session?.user
      ) {

        currentUser =
          session.user;

        setTimeout(
          async () => {

            await loadCurrentProfile();

            await refreshInterestUI();

            await loadNotifications();

          },
          0
        );

      } else {

        currentUser = null;
        currentProfile = null;
      }

    }
  );
}


// ============================================================
// INITIALISE APP
// ============================================================

async function initialiseSamajSaathi() {

  if (!supabaseClient) {
    return;
  }


  try {

    const {
      data
    } =
      await supabaseClient.auth
        .getSession();


    if (data?.session?.user) {

      currentUser =
        data.session.user;


      await loadCurrentProfile();

      await loadProfiles();

      await refreshInterestUI();

      await loadNotifications();

    }

  } catch (error) {

    console.error(
      "INITIALIZATION ERROR:",
      error
    );
  }
}


// ============================================================
// BACK BUTTON / SESSION PROTECTION
// ============================================================

window.addEventListener(
  "popstate",
  async () => {

    const session =
      await getCurrentUser();

    if (
      session &&
      window.location.hash !==
      "#logout"
    ) {

      await loadCurrentProfile();

      await refreshInterestUI();

      await loadNotifications();
    }
  }
);


// ============================================================
// ESC CLOSE MODAL
// ============================================================

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


// ============================================================
// GLOBAL FUNCTIONS
// ============================================================

window.openModal =
  openModal;

window.closeModal =
  closeModal;

window.registerUser =
  registerUser;

window.loginUser =
  loginUser;

window.logoutUser =
  logoutUser;

window.openDashboard =
  openDashboard;

window.loadProfiles =
  loadProfiles;

window.viewProfile =
  viewProfile;

window.sendInterest =
  sendInterest;

window.loadMyInterests =
  loadMyInterests;

window.loadReceivedInterests =
  loadReceivedInterests;

window.acceptInterest =
  acceptInterest;

window.rejectInterest =
  rejectInterest;

window.loadNotifications =
  loadNotifications;

window.markNotificationsRead =
  markNotificationsRead;

window.uploadProfilePhoto =
  uploadProfilePhoto;

window.refreshInterestUI =
  refreshInterestUI;


// ============================================================
// START
// ============================================================

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initialiseSamajSaathi
  );

} else {

  initialiseSamajSaathi();

}


// ============================================================
// END
// ============================================================
