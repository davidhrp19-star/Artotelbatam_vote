// Ubah nama, departemen, dan foto kandidat di daftar ini.
const candidates = [
  {id:"candidate1", name:"Kandidat 01", department:"Muhammad Ridho & Front office", photo:"assets/Ridho-1.jpeg"},
  {id:"candidate2", name:"Kandidat 02", department:"Margareth Delvia & Engineering", photo:"assets/Margareth-2.jpeg"},
  {id:"candidate3", name:"Kandidat 03", department:"Samsul Sinaga & Housekeeping", photo:"assets/Samsul-3.jpeg"}
];
const STORAGE_KEY = "artotel_best_employee_votes_v1";
let selectedId = null;
const grid = document.getElementById("candidateGrid");
const submit = document.getElementById("submitVote");
const notice = document.getElementById("voteNotice");
function getVotes(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||[];}catch{return [];}}
function render(){
  grid.innerHTML = candidates.map((c,i)=>`<article class="candidate ${selectedId===c.id?'selected':''}" data-id="${c.id}" tabindex="0" role="button" aria-pressed="${selectedId===c.id}"><div class="photo-wrap"><img src="${c.photo}" alt="Foto ${c.name}"><span class="candidate-number">0${i+1}</span><span class="select-dot">${selectedId===c.id?'✓':''}</span></div><h2>${c.name}</h2><p>${c.department}</p></article>`).join("");
  grid.querySelectorAll(".candidate").forEach(card=>{
    const choose=()=>{selectedId=card.dataset.id;submit.disabled=false;notice.textContent="Pilihan Anda: "+candidates.find(c=>c.id===selectedId).name;render();};
    card.addEventListener("click",choose);card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();choose();}});
  });
}
submit.addEventListener("click",()=>{
  if(!selectedId)return;
  if(!confirm("Konfirmasi suara Anda untuk "+candidates.find(c=>c.id===selectedId).name+"?"))return;
  const votes=getVotes();votes.push({candidateId:selectedId, timestamp:new Date().toISOString()});localStorage.setItem(STORAGE_KEY,JSON.stringify(votes));
  selectedId=null;submit.disabled=true;notice.textContent="Terima kasih! Suara Anda sudah tercatat di browser ini.";render();
});
render();