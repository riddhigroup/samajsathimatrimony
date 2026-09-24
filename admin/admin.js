const SUPABASE_URL="https://drrsborerbgzthxdazqu.supabase.co";
const SUPABASE_ANON_KEY="sb_publishable_ACdKChyHYC11rSK9_HZ0Jg_l22KO06k";

let sb=null;
if(window.supabase && SUPABASE_URL.startsWith("http") && !SUPABASE_ANON_KEY.startsWith("YOUR_")){
  sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
}

const $=id=>document.getElementById(id);
const pages=["dashboard","profiles","homepage","requests","payments","reports","content","settings"];

function msg(id,text,ok=true){
  const e=$(id);
  if(e){e.textContent=text;e.className="message "+(ok?"ok":"error");}
}
function clearMsg(id){const e=$(id);if(e)e.textContent="";}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));}

function go(p){
  pages.forEach(x=>$(x)?.classList.toggle("active-page",x===p));
  document.querySelectorAll("[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===p));
  $("pageTitle").textContent=p==="settings"?"Settings & Security":p[0].toUpperCase()+p.slice(1);
  if(p==="profiles")loadProfiles();
  if(p==="homepage")loadHome();
  if(p==="content")loadContent();
}

document.addEventListener("click",e=>{
  const b=e.target.closest("[data-page]");
  if(b)go(b.dataset.page);
});

function showLogin(){
  $("loginView").classList.remove("hidden");
  $("forgotView").classList.add("hidden");
  $("recoveryView").classList.add("hidden");
  $("appView").classList.add("hidden");
  $("adminEmail").value="";
  $("adminPassword").value="";
}
function showForgot(){
  $("loginView").classList.add("hidden");
  $("forgotView").classList.remove("hidden");
  $("recoveryView").classList.add("hidden");
  $("appView").classList.add("hidden");
  $("resetEmail").value=$("adminEmail").value.trim();
  clearMsg("forgotMessage");
}
function showRecovery(){
  $("loginView").classList.add("hidden");
  $("forgotView").classList.add("hidden");
  $("recoveryView").classList.remove("hidden");
  $("appView").classList.add("hidden");
  clearMsg("recoveryMessage");
}
function showApp(session){
  $("loginView").classList.add("hidden");
  $("forgotView").classList.add("hidden");
  $("recoveryView").classList.add("hidden");
  $("appView").classList.remove("hidden");
  $("adminUser").textContent=session?.user?.email||"Admin";
  loadDashboard();
}

async function boot(){
  if(!sb){msg("loginMessage","Supabase could not be initialized.",false);return;}
  const {data,error}=await sb.auth.getSession();
  if(error){showLogin();return;}
  if(data.session)showApp(data.session);else showLogin();
  sb.auth.onAuthStateChange((_event,session)=>{
    if(session && _event!=="PASSWORD_RECOVERY")showApp(session);
    else if(!session)showLogin();
  });
}

$("loginForm").onsubmit=async e=>{
  e.preventDefault();
  clearMsg("loginMessage");
  if(!sb)return;
  const email=$("adminEmail").value.trim();
  const password=$("adminPassword").value;
  const {data,error}=await sb.auth.signInWithPassword({email,password});
  if(error){msg("loginMessage",error.message,false);return;}
  showApp(data.session);
};

$("forgotBtn").onclick=showForgot;
$("backLoginBtn").onclick=showLogin;

$("forgotForm").onsubmit=async e=>{
  e.preventDefault();
  clearMsg("forgotMessage");
  if(!sb)return;
  const email=$("resetEmail").value.trim();
  if(!email){msg("forgotMessage","Enter your admin email.",false);return;}
  const redirectTo=window.location.origin+window.location.pathname;
  const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo});
  if(error){msg("forgotMessage",error.message,false);return;}
  msg("forgotMessage","Password reset link sent. Check your email inbox and spam folder.",true);
};

$("recoveryForm").onsubmit=async e=>{
  e.preventDefault();
  clearMsg("recoveryMessage");
  const p=$("newPassword").value;
  const c=$("confirmPassword").value;
  if(p.length<8){msg("recoveryMessage","Password must be at least 8 characters.",false);return;}
  if(p!==c){msg("recoveryMessage","Passwords do not match.",false);return;}
  const {error}=await sb.auth.updateUser({password:p});
  if(error){msg("recoveryMessage",error.message,false);return;}
  msg("recoveryMessage","Password updated successfully. You can now login with the new password.",true);
  setTimeout(showLogin,1400);
};

$("logoutBtn").onclick=async()=>{await sb?.auth.signOut();showLogin();};
$("refreshBtn").onclick=loadDashboard;

async function loadDashboard(){
  if(!sb)return;
  const a=await sb.from("profiles").select("id",{count:"exact",head:true});
  const b=await sb.from("profiles").select("id",{count:"exact",head:true}).eq("is_active",true);
  const since=new Date(Date.now()-604800000).toISOString();
  const c=await sb.from("profiles").select("id",{count:"exact",head:true}).gte("created_at",since);
  $("totalProfiles").textContent=a.count??0;
  $("activeProfiles").textContent=b.count??0;
  $("newProfiles").textContent=c.count??0;
}

let profileData=[];
async function loadProfiles(){
  const body=$("profilesBody");
  if(!body||!sb)return;
  body.innerHTML="<tr><td colspan=7>Loading...</td></tr>";
  const r=await sb.from("profiles").select("id,full_name,gender,date_of_birth,age,city,state,surname,profile_photo,photo_url,is_active,created_at").order("created_at",{ascending:false}).limit(500);
  if(r.error){body.innerHTML=`<tr><td colspan=7>${esc(r.error.message)}</td></tr>`;return;}
  profileData=r.data||[];
  renderProfiles(profileData);
}
function age(d,a){
  if(!d)return a||"â€”";
  const b=new Date(d),n=new Date();
  let x=n.getFullYear()-b.getFullYear();
  if(n.getMonth()<b.getMonth()||(n.getMonth()===b.getMonth()&&n.getDate()<b.getDate()))x--;
  return x;
}
function renderProfiles(list){
  $("profilesBody").innerHTML=list.length?list.map(p=>{
    const im=p.profile_photo||p.photo_url||"";
    return `<tr><td><div class="profile-cell">${im?`<img class="avatar" src="${esc(im)}" alt="">`:`<div class="avatar"></div>`}<div><b>${esc(p.full_name||"Unnamed")}</b><small>${esc(p.surname||"")}</small></div></div></td><td>${esc(p.gender||"â€”")}</td><td>${age(p.date_of_birth,p.age)}</td><td>${esc(p.city||"â€”")}</td><td><span class="status ${p.is_active?"":"off"}">${p.is_active?"Active":"Inactive"}</span></td><td>${p.created_at?new Date(p.created_at).toLocaleDateString():"â€”"}</td><td><button class="action-btn" onclick="toggleProfile('${p.id}',${!!p.is_active})">${p.is_active?"Deactivate":"Activate"}</button></td></tr>`;
  }).join(""):"<tr><td colspan=7>No profiles found.</td></tr>";
}
$("profileSearch").oninput=e=>{const q=e.target.value.toLowerCase();renderProfiles(profileData.filter(p=>[p.full_name,p.city,p.state,p.surname,p.gender].filter(Boolean).join(" ").toLowerCase().includes(q)));};
async function toggleProfile(id,on){const r=await sb.from("profiles").update({is_active:!on}).eq("id",id);if(r.error)alert(r.error.message);else loadProfiles();}

async function loadHome(){
  const r=await sb.from("site_settings").select("*").eq("id","homepage").maybeSingle();
  if(r.error||!r.data)return;
  const d=r.data;
  for(const[k,id]of Object.entries({hero_eyebrow:"homeEyebrow",hero_heading:"homeHeading",hero_description:"homeDescription",primary_button:"homePrimary",secondary_button:"homeSecondary",featured_profile_id:"featuredProfileId",logo_url:"siteLogoUrl",announcement:"homeAnnouncement"}))$(id).value=d[k]||"";
}
$("homepageForm").onsubmit=async e=>{
  e.preventDefault();
  const d={id:"homepage",hero_eyebrow:$("homeEyebrow").value,hero_heading:$("homeHeading").value,hero_description:$("homeDescription").value,primary_button:$("homePrimary").value,secondary_button:$("homeSecondary").value,featured_profile_id:$("featuredProfileId").value||null,logo_url:$("siteLogoUrl").value,announcement:$("homeAnnouncement").value,updated_at:new Date().toISOString()};
  const r=await sb.from("site_settings").upsert(d);
  msg("homeMsg",r.error?.message||"Homepage settings saved.",!r.error);
};

async function loadContent(){
  const r=await sb.from("site_settings").select("*").eq("id","content").maybeSingle();
  if(r.error||!r.data)return;
  const d=r.data;
  for(const[k,id]of Object.entries({about_title:"aboutTitle",about_text:"aboutText",contact_email:"contactEmail",contact_whatsapp:"contactWhatsapp",privacy_text:"privacyText",terms_text:"termsText"}))$(id).value=d[k]||"";
}
$("contentForm").onsubmit=async e=>{
  e.preventDefault();
  const d={id:"content",about_title:$("aboutTitle").value,about_text:$("aboutText").value,contact_email:$("contactEmail").value,contact_whatsapp:$("contactWhatsapp").value,privacy_text:$("privacyText").value,terms_text:$("termsText").value,updated_at:new Date().toISOString()};
  const r=await sb.from("site_settings").upsert(d);
  msg("contentMsg",r.error?.message||"Website content saved.",!r.error);
};

$("changePasswordForm").onsubmit=async e=>{
  e.preventDefault();
  clearMsg("changePasswordMsg");
  const p=$("changePassword").value;
  const c=$("changePasswordConfirm").value;
  if(p.length<8){msg("changePasswordMsg","Password must be at least 8 characters.",false);return;}
  if(p!==c){msg("changePasswordMsg","Passwords do not match.",false);return;}
  const {error}=await sb.auth.updateUser({password:p});
  if(error){msg("changePasswordMsg",error.message,false);return;}
  $("changePassword").value="";$("changePasswordConfirm").value="";
  msg("changePasswordMsg","Password changed successfully.",true);
};

$("securityResetBtn").onclick=async()=>{
  const {data:{user}}=await sb.auth.getUser();
  if(!user?.email){msg("securityResetMsg","Admin email could not be found.",false);return;}
  const redirectTo=window.location.origin+window.location.pathname;
  const {error}=await sb.auth.resetPasswordForEmail(user.email,{redirectTo});
  msg("securityResetMsg",error?.message||"Password reset link sent to your admin email.",!error);
};

// If Supabase opens this page after clicking a recovery link, show the new-password screen.
window.addEventListener("load",()=>{
  if(window.location.hash.includes("type=recovery")){
    showRecovery();
  }
});

boot();
