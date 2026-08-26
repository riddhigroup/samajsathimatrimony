// ============================================
// SAMAJ SAATHI MATRIMONY
// SUPABASE CONNECTED APP
// STAGE 1 - MEMBER DASHBOARD
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
// PHOTO DISPLAY FIX
// ============================================

(function addPhotoDisplayFix() {

  if (
    document.getElementById(
      "samajSaathiPhotoFix"
    )
  ) {
    return;
  }

  const style =
    document.createElement("style");

  style.id =
    "samajSaathiPhotoFix";

  style.innerHTML = `

    .profile-img.has-real-photo::before,
    .profile-img.has-real-photo::after {
      display:none !important;
      content:none !important;
    }

    .profile-img.has-real-photo {
      background:#eee !important;
    }

    .profile-img.has-real-photo img {
      display:block !important;
      visibility:visible !important;
      opacity:1 !important;
    }

    .samaj-match-card {
      position:relative;
      overflow:hidden;
    }

    .samaj-match-photo {
      width:100%;
      height:100%;
      object-fit:cover;
      display:block;
    }

    .samaj-match-actions {
      display:flex;
      gap:10px;
      margin-top:15px;
      flex-wrap:wrap;
    }

    .samaj-match-actions button {
      cursor:pointer;
    }

    .samaj-view-profile-btn {
      border:1px solid #6f1025;
      background:#fff;
      color:#6f1025;
      padding:9px 14px;
      border-radius:8px;
      font-weight:600;
      cursor:pointer;
    }

    .samaj-interest-btn {
      border:0;
      background:#6f1025;
      color:#fff;
      padding:9px 14px;
      border-radius:8px;
      font-weight:600;
      cursor:pointer;
    }

    .samaj-match-info {
      padding:18px;
    }

    .samaj-match-info h3 {
      margin:0 0 6px;
      font-size:18px;
    }

    .samaj-match-info small {
      display:block;
      margin:5px 0;
    }

    .samaj-no-matches {
      grid-column:1/-1;
      text-align:center;
      padding:40px 20px;
      border-radius:14px;
      background:#f8f1f3;
    }

    /* ========================================
       MEMBER DASHBOARD
       ======================================== */

    .samaj-dashboard {
      min-height:100vh;
      background:#faf7f8;
    }

    .samaj-dashboard-header {
      background:#6f1025;
      color:#fff;
      padding:16px 24px;
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:20px;
      position:sticky;
      top:0;
      z-index:100;
      box-shadow:0 3px 15px rgba(0,0,0,.12);
    }

    .samaj-dashboard-brand {
      display:flex;
      align-items:center;
      gap:12px;
    }

    .samaj-dashboard-brand-logo {
      width:42px;
      height:42px;
      border-radius:50%;
      background:#fff;
      color:#6f1025;
      display:flex;
      align-items:center;
      justify-content:center;
      font-weight:800;
      font-size:18px;
    }

    .samaj-dashboard-brand-name {
      font-size:21px;
      font-weight:700;
    }

    .samaj-dashboard-brand-sub {
      font-size:12px;
      opacity:.8;
    }

    .samaj-dashboard-header-actions {
      display:flex;
      align-items:center;
      gap:10px;
      flex-wrap:wrap;
    }

    .samaj-header-btn {
      border:1px solid rgba(255,255,255,.45);
      background:rgba(255,255,255,.08);
      color:#fff;
      padding:9px 15px;
      border-radius:9px;
      cursor:pointer;
      font-weight:600;
    }

    .samaj-header-btn:hover {
      background:rgba(255,255,255,.18);
    }

    .samaj-dashboard-layout {
      max-width:1200px;
      margin:0 auto;
      padding:25px 20px 60px;
    }

    .samaj-dashboard-menu {
      display:grid;
      grid-template-columns:
        repeat(4,minmax(0,1fr));
      gap:14px;
      margin-bottom:25px;
    }

    .samaj-dashboard-menu-btn {
      border:1px solid #ead9dd;
      background:#fff;
      border-radius:15px;
      padding:18px 15px;
      text-align:left;
      cursor:pointer;
      transition:.2s;
      color:#321820;
    }

    .samaj-dashboard-menu-btn:hover {
      transform:translateY(-2px);
      box-shadow:0 8px 22px rgba(111,16,37,.10);
      border-color:#cdaab4;
    }

    .samaj-dashboard-menu-btn.active {
      background:#6f1025;
      color:#fff;
      border-color:#6f1025;
    }

    .samaj-menu-icon {
      font-size:25px;
      display:block;
      margin-bottom:8px;
    }

    .samaj-menu-title {
      font-size:15px;
      font-weight:700;
      display:block;
    }

    .samaj-menu-description {
      font-size:12px;
      opacity:.7;
      display:block;
      margin-top:4px;
    }

    .samaj-dashboard-welcome {
      background:linear-gradient(
        135deg,
        #6f1025,
        #8b3048
      );
      color:#fff;
      border-radius:20px;
      padding:28px;
      margin-bottom:25px;
    }

    .samaj-dashboard-welcome h1 {
      margin:7px 0;
      font-size:30px;
    }

    .samaj-dashboard-welcome p {
      margin:5px 0 0;
      opacity:.9;
    }

    .samaj-dashboard-section {
      background:#fff;
      border:1px solid #eadfe2;
      border-radius:18px;
      padding:25px;
      margin-bottom:25px;
    }

    .samaj-dashboard-section-header {
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:15px;
      margin-bottom:20px;
      flex-wrap:wrap;
    }

    .samaj-dashboard-section-header h2 {
      margin:5px 0;
    }

    .samaj-section-hidden {
      display:none !important;
    }

    .samaj-profile-summary {
      display:grid;
      grid-template-columns:
        180px 1fr;
      gap:25px;
      align-items:start;
    }

    .samaj-profile-summary-photo {
      width:180px;
      height:180px;
      border-radius:18px;
      overflow:hidden;
      background:#f0e6e8;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:60px;
    }

    .samaj-profile-summary-photo img {
      width:100%;
      height:100%;
      object-fit:cover;
      display:block;
    }

    .samaj-profile-details-grid {
      display:grid;
      grid-template-columns:
        repeat(2,minmax(0,1fr));
      gap:12px;
    }

    .samaj-profile-detail {
      border:1px solid #eee;
      border-radius:12px;
      padding:14px;
      background:#fff;
    }

    .samaj-profile-detail small {
      display:block;
      color:#777;
      margin-bottom:5px;
    }

    .samaj-profile-detail strong {
      color:#301821;
    }

    .samaj-coming-soon {
      text-align:center;
      padding:50px 20px;
      background:#faf6f7;
      border-radius:15px;
    }

    .samaj-coming-soon-icon {
      font-size:50px;
      margin-bottom:10px;
    }

    @media(max-width:800px) {

      .samaj-dashboard-menu {
        grid-template-columns:
          repeat(2,minmax(0,1fr));
      }

      .samaj-profile-summary {
        grid-template-columns:1fr;
      }

      .samaj-profile-summary-photo {
        margin:auto;
      }

    }

    @media(max-width:520px) {

      .samaj-dashboard-header {
        padding:13px 15px;
      }

      .samaj-dashboard-brand-name {
        font-size:18px;
      }

      .samaj-dashboard-brand-sub {
        display:none;
      }

      .samaj-dashboard-menu {
        grid-template-columns:1fr 1fr;
        gap:10px;
      }

      .samaj-dashboard-menu-btn {
        padding:14px 11px;
      }

      .samaj-profile-details-grid {
        grid-template-columns:1fr;
      }

      .samaj-dashboard-welcome {
        padding:22px;
      }

      .samaj-dashboard-welcome h1 {
        font-size:25px;
      }

      .samaj-dashboard-section {
        padding:18px;
      }

    }

  `;

  document.head.appendChild(style);

})();


// ============================================
// ESCAPE HTML
// ============================================

function escapeHtml(value) {

  return String(value ?? "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");

}


// ============================================
// GET PUBLIC PHOTO URL
// ============================================

function getProfilePhotoUrl(photoPath) {

  if (!photoPath) {
    return null;
  }

  try {

    const result =
      supabaseClient
        .storage
        .from("profile-photos")
        .getPublicUrl(photoPath);

    return result.data?.publicUrl || null;

  } catch(error) {

    console.error(
      "PUBLIC PHOTO URL ERROR:",
      error
    );

    return null;

  }

}


// ============================================
// LOAD PUBLIC PROFILES
// ============================================

async function loadProfiles() {

  const grid =
    document.getElementById("profiles");

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
        .eq("is_active",true)
        .order("created_at",{
          ascending:false
        })
        .limit(6);

    if (result.error) {

      console.error(
        "PUBLIC PROFILES LOAD ERROR:",
        result.error
      );

      grid.innerHTML = `
        <div style="
          grid-column:1/-1;
          text-align:center;
          padding:40px;
          color:#b42318;
        ">
          <h3>Unable to load profiles</h3>
          <p>
            ${escapeHtml(result.error.message)}
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
          <h3>No profiles available yet.</h3>
          <p>
            New members will appear here after registration.
          </p>
        </div>
      `;

      return;

    }

    grid.innerHTML =
      profiles
        .map(function(p) {
          return createPublicProfileCard(p);
        })
        .join("");

  } catch(error) {

    console.error(
      "PUBLIC PROFILES ERROR:",
      error
    );

    grid.innerHTML = `
      <div style="
        grid-column:1/-1;
        text-align:center;
        padding:40px;
      ">
        Something went wrong while loading profiles.
      </div>
    `;

  }

}


// ============================================
// PUBLIC PROFILE CARD
// ============================================

function createPublicProfileCard(p) {

  const location =
    [p.city,p.state]
      .filter(Boolean)
      .join(", ");

  const photoPath =
    p.profile_photo ||
    p.photo_url ||
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
            p.full_name || "Profile"
          )}"
          loading="lazy"
          style="
            width:100%;
            height:100%;
            object-fit:cover;
            display:block;
          "
          onerror="this.style.display='none';"
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
            p.full_name || "Member"
          )}
          ${
            p.age
              ? ", " + escapeHtml(p.age)
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
            p.community || ""
          )}
          ${
            p.surname
              ? " · " +
                escapeHtml(p.surname)
              : ""
          }
          ${
            p.kul
              ? " · " +
                escapeHtml(p.kul)
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


// ============================================
// FIND YOUR MATCHES
// ============================================

async function loadMatches() {

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
      padding:40px;
      color:#6f1025;
    ">
      Finding suitable profiles...
    </div>
  `;

  try {

    const sessionResult =
      await supabaseClient
        .auth
        .getSession();

    const session =
      sessionResult.data?.session;

    if (!session) {

      grid.innerHTML = `
        <div class="samaj-no-matches">

          <h3>Please login first</h3>

          <p>
            Login to see profiles matching your preferences.
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


    // CURRENT USER

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
        .eq("id",currentUserId)
        .maybeSingle();


    if (currentResult.error) {

      console.error(
        "CURRENT PROFILE ERROR:",
        currentResult.error
      );

      grid.innerHTML = `
        <div class="samaj-no-matches">
          <h3>Unable to load your profile</h3>
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

          <h3>Complete your profile first</h3>

          <p>
            Your profile must be created before we can find matches.
          </p>

        </div>
      `;

      return;

    }


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

          <h3>Gender information required</h3>

          <p>
            Please update your gender in your profile.
          </p>

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
        .eq("is_active",true)
        .eq("gender",oppositeGender)
        .neq("id",currentUserId)
        .order("created_at",{
          ascending:false
        });


    if (matchesResult.error) {

      console.error(
        "MATCHES LOAD ERROR:",
        matchesResult.error
      );

      grid.innerHTML = `
        <div class="samaj-no-matches">

          <h3>Unable to load matches</h3>

          <p>
            ${escapeHtml(
              matchesResult.error.message
            )}
          </p>

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
            font-size:45px;
            margin-bottom:10px;
          ">
            💕
          </div>

          <h3>No matches available yet</h3>

          <p>
            New ${
              oppositeGender === "female"
                ? "women"
                : "men"
            }
            profiles will appear here when they join SamajSaathi.
          </p>

        </div>
      `;

      return;

    }


    grid.innerHTML =
      matches
        .map(function(profile) {
          return createMatchCard(profile);
        })
        .join("");

  } catch(error) {

    console.error(
      "FIND MATCHES ERROR:",
      error
    );

    grid.innerHTML = `
      <div class="samaj-no-matches">

        <h3>Something went wrong</h3>

        <p>
          Please refresh the page and try again.
        </p>

      </div>
    `;

  }

}


// ============================================
// MATCH CARD
// ============================================

function createMatchCard(profile) {

  const location =
    [profile.city,profile.state]
      .filter(Boolean)
      .join(", ");

  const photoPath =
    profile.profile_photo ||
    profile.photo_url ||
    null;

  const photoUrl =
    getProfilePhotoUrl(photoPath);

  let photoHtml = `
    <div style="
      height:280px;
      background:#c08b8b;
      display:flex;
      align-items:center;
      justify-content:center;
    ">
      <span style="font-size:75px;">
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
          onerror="
            this.style.display='none';
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


      <div class="samaj-match-info">

        <h3>
          ${escapeHtml(
            profile.full_name ||
            "Member"
          )}
          ${
            profile.age
              ? ", " +
                escapeHtml(profile.age)
              : ""
          }
        </h3>


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
                escapeHtml(profile.surname)
              : ""
          }
        </small>


        <small>
          ${
            profile.kul
              ? "Kul: " +
                escapeHtml(profile.kul)
              : ""
          }
        </small>


        <div class="samaj-match-actions">

          <button
            type="button"
            class="samaj-view-profile-btn"
            onclick="viewProfile('${escapeHtml(
              profile.id
            )}')"
          >
            View Profile
          </button>


          <button
            type="button"
            class="samaj-interest-btn"
            onclick="sendInterest('${escapeHtml(
              profile.id
            )}')"
          >
            ❤️ Send Interest
          </button>

        </div>

      </div>

    </article>
  `;

}


// ============================================
// VIEW PROFILE
// ============================================

async function viewProfile(profileId) {

  if (!profileId) {
    return;
  }

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
      .eq("id",profileId)
      .maybeSingle();

  if (result.error) {

    alert(
      "Profile could not be loaded: " +
      result.error.message
    );

    return;

  }

  if (!result.data) {

    alert("Profile not found.");

    return;

  }

  const profile =
    result.data;

  let modal =
    document.getElementById(
      "samajProfileViewer"
    );

  if (modal) {
    modal.remove();
  }

  const photoPath =
    profile.profile_photo ||
    profile.photo_url ||
    null;

  const photoUrl =
    getProfilePhotoUrl(photoPath);

  let photoHtml = `
    <div style="
      width:150px;
      height:150px;
      border-radius:50%;
      background:#c08b8b;
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

  modal =
    document.createElement("div");

  modal.id =
    "samajProfileViewer";

  modal.style.cssText = `
    position:fixed;
    inset:0;
    z-index:10001;
    background:rgba(0,0,0,.55);
    display:flex;
    align-items:center;
    justify-content:center;
    padding:20px;
  `;

  modal.innerHTML = `
    <div style="
      width:min(600px,100%);
      max-height:90vh;
      overflow:auto;
      background:#fff;
      border-radius:20px;
      padding:30px;
      position:relative;
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
          border:0;
          background:#f5eeee;
          width:36px;
          height:36px;
          border-radius:50%;
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
                escapeHtml(profile.age)
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
          "City",
          [profile.city,profile.state]
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

              <strong>About</strong>

              <p>
                ${escapeHtml(profile.bio)}
              </p>

            </div>
          `
          : ""
      }

      <div style="
        margin-top:20px;
        text-align:center;
      ">

        <button
          type="button"
          class="samaj-interest-btn"
          onclick="
            sendInterest('${escapeHtml(
              profile.id
            )}')
          "
        >
          ❤️ Send Interest
        </button>

      </div>

    </div>
  `;

  document.body.appendChild(modal);

  modal.addEventListener(
    "click",
    function(event) {

      if (event.target === modal) {
        modal.remove();
      }

    }
  );

}


// ============================================
// PROFILE VIEW ITEM
// ============================================

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
          value || "Not specified"
        )}
      </strong>

    </div>
  `;

}


// ============================================
// SEND INTEREST
// STAGE 3 PLACEHOLDER
// ============================================

async function sendInterest(profileId) {

  if (!profileId) {
    return;
  }

  const sessionResult =
    await supabaseClient
      .auth
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
    "❤️ Interest system will be connected in the next stage."
  );

}


// ============================================
// OPEN FIND MATCHES
// ============================================

async function openFindMatches() {

  const sessionResult =
    await supabaseClient
      .auth
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

    },
    300
  );

}


// ============================================
// DASHBOARD NAVIGATION
// ============================================

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
          "dashboardSection-" + name
        );

      if (element) {

        if (name === section) {
          element.classList.remove(
            "samaj-section-hidden"
          );
        } else {
          element.classList.add(
            "samaj-section-hidden"
          );
        }

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


  const target =
    document.getElementById(
      "dashboardSection-" + section
    );

  if (target) {

    setTimeout(
      function() {

        target.scrollIntoView({
          behavior:"smooth",
          block:"start"
        });

      },
      50
    );

  }

}


// ============================================
// SCROLL TO ID
// ============================================

function scrollToId(id) {

  const element =
    document.getElementById(id);

  if (element) {

    element.scrollIntoView({
      behavior:"smooth"
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
      .replace(/[^a-z]/g,"");

  const last =
    String(lastName)
      .toLowerCase()
      .replace(/[^a-z]/g,"");

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


  // ========================================
  // LOGIN
  // ========================================

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

  // ========================================
  // REGISTER
  // ========================================

  else {

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
            autocomplete="email"
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

            <option value="female">
              Woman
            </option>

            <option value="male">
              Man
            </option>

          </select>

        </div>

        <div class="field">

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
      await supabaseClient
        .auth
        .signUp({

          email:email,

          password:password,

          options:{
            data:{
              first_name:firstName,
              last_name:lastName,
              full_name:fullName,
              username:username,
              display_user_id:displayUserId
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

      id:data.user.id,

      full_name:fullName,

      gender:gender,

      date_of_birth:dob,

      age:calculateAge(dob),

      city:city,

      community:community,

      surname:surname,

      kul:kul,

      is_active:true

    };


    if (data.session) {

      const profileResult =
        await supabaseClient
          .from("profiles")
          .upsert(
            profileData,
            {
              onConflict:"id"
            }
          );


      if (profileResult.error) {

        console.error(
          "PROFILE INSERT ERROR:",
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

        userId:displayUserId,

        username:username,

        firstName:firstName,

        password:password

      });


      await loadProfiles();

    }

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

  } catch(err) {

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
// CALCULATE AGE
// ============================================

function calculateAge(
  dateString
) {

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


// ============================================
// AFTER SIGNUP
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

  if (!content) {
    return;
  }

  content.innerHTML = `

    <div style="text-align:center;">

      <div style="font-size:48px;">
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
        Please save your login details.
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

  if (!content) {
    return;
  }

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

          <small>User ID</small>

          <strong style="
            display:block;
            font-size:20px;
            margin-top:4px;
          ">
            ${escapeHtml(user.userId)}
          </strong>

        </div>

        <div style="margin-bottom:12px;">

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
          class="btn primary"
          type="button"
          onclick="openDashboard()"
        >
          Go to My Dashboard →
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
      await supabaseClient
        .auth
        .signInWithPassword({

          email:email,

          password:password

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


  } catch(err) {

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

  if (!pending) {
    return;
  }

  let profileData;

  try {

    profileData =
      JSON.parse(pending);

  } catch(error) {

    localStorage.removeItem(
      "samajSaathiPendingProfile"
    );

    return;

  }


  const sessionResult =
    await supabaseClient
      .auth
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
          onConflict:"id"
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


  await loadProfiles();

}


// ============================================
// OPEN DASHBOARD
// ============================================

async function openDashboard() {

  const sessionResult =
    await supabaseClient
      .auth
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
      .eq("id",userId)
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
    document.createElement("div");

  dashboard.id =
    "samajSaathiDashboard";

  dashboard.className =
    "samaj-dashboard";


  dashboard.innerHTML = `

    <!-- ==================================
         DASHBOARD HEADER
         ================================== -->

    <header class="samaj-dashboard-header">

      <div class="samaj-dashboard-brand">

        <div class="
          samaj-dashboard-brand-logo
        ">
          SS
        </div>

        <div>

          <div class="
            samaj-dashboard-brand-name
          ">
            SamajSaathi
          </div>

          <div class="
            samaj-dashboard-brand-sub
          ">
            Member Dashboard
          </div>

        </div>

      </div>


      <div class="
        samaj-dashboard-header-actions
      ">

        <button
          type="button"
          class="samaj-header-btn"
          onclick="
            showDashboardSection('profile')
          "
        >
          👤 My Profile
        </button>

        <button
          type="button"
          class="samaj-header-btn"
          onclick="logoutUser()"
        >
          Logout
        </button>

      </div>

    </header>


    <!-- ==================================
         MAIN DASHBOARD
         ================================== -->

    <main class="samaj-dashboard-layout">


      <!-- ==================================
           DASHBOARD MENU
           ================================== -->

      <nav class="samaj-dashboard-menu">


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
            Update your details
          </span>

        </button>


        <button
          type="button"
          class="samaj-dashboard-menu-btn"
          data-section="matches"
          onclick="
            showDashboardSection('matches');
            loadMatches();
          "
        >

          <span class="samaj-menu-icon">
            💕
          </span>

          <span class="samaj-menu-title">
            Find Your Matches
          </span>

          <span class="samaj-menu-description">
            Discover profiles
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
            📩
          </span>

          <span class="samaj-menu-title">
            Received Interests
          </span>

          <span class="samaj-menu-description">
            See who likes you
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
            Your updates
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


        <button
          type="button"
          class="samaj-dashboard-menu-btn"
          onclick="logoutUser()"
        >

          <span class="samaj-menu-icon">
            🚪
          </span>

          <span class="samaj-menu-title">
            Logout
          </span>

          <span class="samaj-menu-description">
            Sign out safely
          </span>

        </button>


      </nav>


      <!-- ==================================
           WELCOME
           ================================== -->

      <section class="samaj-dashboard-welcome">

        <span class="eyebrow">
          MEMBER DASHBOARD
        </span>

        <h1>
          Hello,
          ${escapeHtml(
            profile.full_name
          )}!
        </h1>

        <p>
          Welcome to your SamajSaathi matrimonial dashboard.
        </p>

      </section>


      <!-- ==================================
           MY PROFILE
           ================================== -->

      <section
        id="dashboardSection-profile"
        class="samaj-dashboard-section"
      >

        <div class="
          samaj-dashboard-section-header
        ">

          <div>

            <span class="eyebrow">
              MY PROFILE
            </span>

            <h2>
              Your Profile
            </h2>

          </div>


          <button
            type="button"
            class="btn primary"
            onclick="
              showDashboardSection('edit')
            "
          >
            ✏️ Edit Profile
          </button>

        </div>


        <div class="
          samaj-profile-summary
        ">


          <!-- PHOTO -->

          <div>

            <div
              id="dashboardProfilePhoto"
              class="
                samaj-profile-summary-photo
              "
            >
              👤
            </div>

          </div>


          <!-- DETAILS -->

          <div class="
            samaj-profile-details-grid
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

            ${dashboardItem(
              "Occupation",
              profile.occupation
            )}

          </div>

        </div>


        <!-- PHOTO UPLOAD -->

        <div style="
          margin-top:25px;
          padding:20px;
          background:#f8f1f3;
          border-radius:15px;
        ">

          <strong>
            📷 Profile Photo
          </strong>

          <p style="
            margin:6px 0 15px;
            color:#666;
            font-size:14px;
          ">
            Add a clear photo to help other members recognize you.
          </p>


          <input
            id="profilePhotoInput"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            style="
              display:block;
              margin-bottom:12px;
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
            style="margin-top:10px;"
          ></div>

        </div>

      </section>


      <!-- ==================================
           EDIT PROFILE
           ================================== -->

      <section
        id="dashboardSection-edit"
        class="
          samaj-dashboard-section
          samaj-section-hidden
        "
      >

        <div class="
          samaj-dashboard-section-header
        ">

          <div>

            <span class="eyebrow">
              PROFILE SETTINGS
            </span>

            <h2>
              ✏️ Edit Profile
            </h2>

          </div>

        </div>


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
          style="margin-top:15px;"
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

      </section>


      <!-- ==================================
           FIND MATCHES
           ================================== -->

      <section
        id="dashboardSection-matches"
        class="
          samaj-dashboard-section
          samaj-section-hidden
        "
      >

        <div class="
          samaj-dashboard-section-header
        ">

          <div>

            <span class="eyebrow">
              DISCOVER
            </span>

            <h2>
              💕 Find Your Matches
            </h2>

            <p style="
              margin:0;
              color:#666;
            ">
              Discover suitable members from the SamajSaathi community.
            </p>

          </div>

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
          ">
            Click Find Your Matches to load profiles.
          </div>

        </div>

      </section>


      <!-- ==================================
           MY INTERESTS
           ================================== -->

      <section
        id="dashboardSection-interests"
        class="
          samaj-dashboard-section
          samaj-section-hidden
        "
      >

        <div class="
          samaj-dashboard-section-header
        ">

          <div>

            <span class="eyebrow">
              CONNECTIONS
            </span>

            <h2>
              ❤️ My Interests
            </h2>

          </div>

        </div>


        <div class="samaj-coming-soon">

          <div class="
            samaj-coming-soon-icon
          ">
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


      <!-- ==================================
           RECEIVED INTERESTS
           ================================== -->

      <section
        id="dashboardSection-received"
        class="
          samaj-dashboard-section
          samaj-section-hidden
        "
      >

        <div class="
          samaj-dashboard-section-header
        ">

          <div>

            <span class="eyebrow">
              CONNECTIONS
            </span>

            <h2>
              📩 Received Interests
            </h2>

          </div>

        </div>


        <div class="samaj-coming-soon">

          <div class="
            samaj-coming-soon-icon
          ">
            📩
          </div>

          <h3>
            Received Interests
          </h3>

          <p>
            When another member sends you an interest,
            it will appear here.
          </p>

          <small>
            Interest system will be connected in Stage 3.
          </small>

        </div>

      </section>


      <!-- ==================================
           NOTIFICATIONS
           ================================== -->

      <section
        id="dashboardSection-notifications"
        class="
          samaj-dashboard-section
          samaj-section-hidden
        "
      >

        <div class="
          samaj-dashboard-section-header
        ">

          <div>

            <span class="eyebrow">
              UPDATES
            </span>

            <h2>
              🔔 Notifications
            </h2>

          </div>

        </div>


        <div class="samaj-coming-soon">

          <div class="
            samaj-coming-soon-icon
          ">
            🔔
          </div>

          <h3>
            No new notifications
          </h3>

          <p>
            Your important SamajSaathi updates will appear here.
          </p>

        </div>

      </section>


      <!-- ==================================
           ACCOUNT
           ================================== -->

      <section
        id="dashboardSection-account"
        class="
          samaj-dashboard-section
          samaj-section-hidden
        "
      >

        <div class="
          samaj-dashboard-section-header
        ">

          <div>

            <span class="eyebrow">
              ACCOUNT
            </span>

            <h2>
              ⚙️ Account
            </h2>

          </div>

        </div>


        <div class="samaj-profile-details-grid">

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

          <p style="margin-bottom:0;">
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


    </main>

  `;


  document.body.appendChild(
    dashboard
  );


  // LOAD PHOTO

  await loadProfilePhoto(
    profile.profile_photo
  );


  // LOAD MATCHES IN BACKGROUND

  await loadMatches();


  // DEFAULT SECTION

  showDashboardSection(
    "profile"
  );

}


// ============================================
// LOAD PROFILE PHOTO
// ============================================

async function loadProfilePhoto(
  photoPath
) {

  if (!photoPath) {
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
    await supabaseClient
      .auth
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
        profile_photo:filePath
      })
      .eq("id",userId);


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


// ============================================
// UPDATE PROFILE
// ============================================

async function updateProfile() {

  const message =
    document.getElementById(
      "updateProfileMessage"
    );


  const sessionResult =
    await supabaseClient
      .auth
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

        full_name:fullName,

        gender:gender,

        date_of_birth:
          dob || null,

        age:
          calculateAge(dob),

        community:community,

        surname:surname,

        kul:kul,

        city:city

      })
      .eq("id",userId);


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


// ============================================
// DASHBOARD ITEM
// ============================================

function dashboardItem(
  label,
  value
) {

  return `

    <div class="
      samaj-profile-detail
    ">

      <small>
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


// ============================================
// LOGOUT
// ============================================

async function logoutUser() {

  try {

    await supabaseClient
      .auth
      .signOut();

  } catch(error) {

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


  const profileViewer =
    document.getElementById(
      "samajProfileViewer"
    );

  if (profileViewer) {
    profileViewer.remove();
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


// ============================================
// MESSAGE
// ============================================

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


// ============================================
// INITIALIZE APP
// ============================================

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
