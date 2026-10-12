// Ganti password ini sebelum digunakan. Ini hanya proteksi sederhana untuk demo lokal.
const ADMIN_PASSWORD = "Artotelbatam";
const STORAGE_KEY = "artotel_best_employee_votes_v1";
const candidates = [
  {id:"candidate1", name:"Kandidat 01", department:"Muhammad Ridho & Front Office", photo:"assets/Ridho-1.jpeg"},
  {id:"candidate2", name:"Kandidat 02", department:"Margareth Delvia & Engineering", photo:"assets/Margareth-2.jpeg"},
  {id:"candidate3", name:"Kandidat 03", department:"Samsul Sinaga & Housekeeping", photo:"assets/Samsul-3.jpeg"}
];
const $=id=>document.getElementById(id);
function getVotes(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||[];}catch{return [];}}
function login(){
  if($("adminPassword").value!==ADMIN_PASSWORD){$("loginError").textContent="Password salah. Silakan coba lagi.";return;}
  $("loginPanel").hidden=true;$("dashboard").hidden=false;renderDashboard();
}
$("loginButton").addEventListener("click",login);
$("adminPassword").addEventListener("keydown",e=>{if(e.key==="Enter")login();});
$("logoutButton").addEventListener("click",()=>{$("dashboard").hidden=true;$("loginPanel").hidden=false;$("adminPassword").value="";});
function renderDashboard(){
  const votes=getVotes();const counts=candidates.map(c=>({...c,count:votes.filter(v=>v.candidateId===c.id).length})).sort((a,b)=>b.count-a.count);
  $("totalVotes").textContent=votes.length;
  $("leaderName").textContent= votes.length ? counts[0].name : "Belum ada";
  $("results").innerHTML=counts.map(c=>`<article class="result-row"><img src="${c.photo}" alt=""><div><div class="result-name">${c.name}</div><div class="small-note">${c.department} · ${votes.length?Math.round(c.count/votes.length*100):0}% suara</div><div class="bar"><div class="bar-fill" style="width:${votes.length?c.count/votes.length*100:0}%"></div></div></div><strong class="result-count">${c.count}</strong></article>`).join("");
}
$("exportButton").addEventListener("click",()=>{
  const votes=getVotes();const rows=[["No","Kandidat","Waktu voting"]];
  votes.forEach((v,i)=>{const c=candidates.find(x=>x.id===v.candidateId);rows.push([i+1,c?c.name:v.candidateId,v.timestamp]);});
  const csv=rows.map(r=>r.map(x=>'"'+String(x).replace(/"/g,'""')+'"').join(",")).join("\r\n");
  const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8;"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="hasil-voting-artotel-batam.csv";a.click();URL.revokeObjectURL(url);
});
$("resetButton").addEventListener("click",()=>{
  if(confirm("Yakin ingin menghapus seluruh suara di browser ini? Tindakan ini tidak bisa dibatalkan.")){localStorage.removeItem(STORAGE_KEY);renderDashboard();}
});
