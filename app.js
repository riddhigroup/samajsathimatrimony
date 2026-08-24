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
