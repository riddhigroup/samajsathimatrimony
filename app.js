const profiles=[
{name:"Priya",age:27,city:"Siliguri, West Bengal",community:"Dom",surname:"Rauth",kul:"Piari Baiswar",match:94,photo:"p1"},
{name:"Neha",age:26,city:"Alipurduar, West Bengal",community:"Dom",surname:"Basfor",kul:"Not specified",match:91,photo:"p2"},
{name:"Anjali",age:29,city:"Kolkata, West Bengal",community:"Dom",surname:"Bansfor",kul:"Piari Baiswar",match:89,photo:"p3"},
{name:"Kavita",age:28,city:"Patna, Bihar",community:"Dom",surname:"Rauth",kul:"Other",match:87,photo:"p4"}];

const grid=document.getElementById("profiles");
grid.innerHTML=profiles.map(p=>`<article class="profile"><div class="profile-img ${p.photo}"><span class="profile-tag">✓ Verified</span></div><div class="profile-body"><b>${p.name}, ${p.age}</b><small>${p.city}</small><small>${p.community} · ${p.surname} · ${p.kul}</small><small class="match">${p.match}% Match</small></div></article>`).join("");

function scrollToId(id){document.getElementById(id)?.scrollIntoView({behavior:"smooth"})}
function openModal(type){
 const modal=document.getElementById("modal"), c=document.getElementById("modalContent");
 if(type==="login"){
  c.innerHTML=`<span class="eyebrow">WELCOME BACK</span><h2>Login to SamajSaathi</h2><p>Access your matches, interests and conversations.</p><div class="form-grid"><div class="field full"><label>Email or Mobile</label><input placeholder="Enter email or mobile"></div><div class="field full"><label>Password</label><input type="password" placeholder="Password"></div></div><div class="modal-actions"><button class="btn primary" onclick="demoLogin()">Login</button></div>`;
 }else{
  c.innerHTML=`<span class="eyebrow">CREATE YOUR PROFILE</span><h2>Begin your journey.</h2><p>Tell us a little about yourself. You can complete the rest of your profile later.</p><div class="form-grid"><div class="field"><label>First Name</label><input placeholder="First name"></div><div class="field"><label>Last Name</label><input placeholder="Last name"></div><div class="field"><label>Date of Birth</label><input type="date"></div><div class="field"><label>Gender</label><select><option>Select</option><option>Woman</option><option>Man</option></select></div><div class="field full"><label>Community / Jati</label><select><option>Dom</option><option>Other SC Community</option></select></div><div class="field"><label>Surname</label><select><option>Rauth</option><option>Basfor</option><option>Bansfor</option><option>Other</option></select></div><div class="field"><label>Kul / Clan</label><select><option>Piari Baiswar</option><option>Other</option><option>Not Known</option></select></div><div class="field full"><label>Current City</label><input placeholder="e.g. Siliguri"></div></div><div class="modal-actions"><button class="btn primary" onclick="demoRegister()">Continue →</button></div>`;
 }
 modal.classList.add("show");
}
function closeModal(){document.getElementById("modal").classList.remove("show")}
function demoRegister(){alert("Demo profile started. In the full version this step will connect to secure authentication and the database.");closeModal()}
function demoLogin(){alert("Demo login. Connect authentication/backend for real accounts.");closeModal()}
document.getElementById("modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});