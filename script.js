// Enkel klientlogikk for input-validering, passordstyrke og UI
const form = document.getElementById('loginForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
const remember = document.getElementById('remember');
const submitBtn = document.getElementById('submitBtn');
const statusBox = document.getElementById('status');
const bar = document.getElementById('bar');
const togglePw = document.getElementById('togglePw');
const eyeOpen = document.getElementById('eyeOpen');
const eyeClosed = document.getElementById('eyeClosed');
const clearEmail = document.getElementById('clearEmail');
const forgot = document.getElementById('forgot');
const loginDemo = document.getElementById('loginDemo');

// Aktiver/deaktiver knapp basert på gyldige felt
function canSubmit(){
  return email.validity.valid && password.value.length >= 8;
}
function updateSubmit(){
  submitBtn.disabled = !canSubmit();
}
email.addEventListener('input', updateSubmit);
password.addEventListener('input', () => { updateSubmit(); updateStrength(); });

// Passordstyrke (enkel heuristikk)
function updateStrength(){
  const v = password.value;
  let score = 0;
  if(v.length >= 8) score++;
  if(/[A-ZÅØÆ]/.test(v)) score++;
  if(/[a-zåøæ]/.test(v)) score++;
  if(/[0-9]/.test(v)) score++;
  if(/[^A-Za-z0-9]/.test(v)) score++;
  const pct = Math.min(100, score * 20);
  bar.style.width = pct + '%';
  bar.style.backgroundColor = pct < 40 ? 'var(--danger)' : pct < 80 ? 'var(--warn)' : 'var(--ok)';
}

// Vis/Skjul passord
togglePw.addEventListener('click', () => {
  const isPw = password.type === 'password';
  password.type = isPw ? 'text' : 'password';
  eyeOpen.style.display = isPw ? 'none' : '';
  eyeClosed.style.display = isPw ? '' : 'none';
  password.focus();
});

// Tøm e‑post
clearEmail.addEventListener('click', () => {
  email.value = '';
  updateSubmit();
  email.focus();
});

// Simulert «Glemt passord?»
forgot.addEventListener('click', (e) => {
  e.preventDefault();
  showStatus('Sjekk e‑posten din for instruksjoner om tilbakestilling av passord (simulert).', 'ok');
});

// Demo-innlogging (fyller feltene)
loginDemo.addEventListener('click', () => {
  email.value = 'demo@eksempel.no';
  password.value = 'DemoPass123!';
  remember.checked = true;
  updateStrength();
  updateSubmit();
  showStatus('Demofelter fylt inn. Trykk «Logg inn».', 'ok');
});

// Skjema‑send (simulert autentisering)
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if(!canSubmit()){
    showStatus('Vennligst fyll inn gyldig e‑post og passord (minst 8 tegn).', 'err');
    return;
  }

  // Vis «laster…»
  const prev = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span class="spinner"></span>Logger inn…';
  submitBtn.disabled = true;

  // Simuler nettverkskall
  await new Promise(r => setTimeout(r, 900));

  // Suksess (her kan du bytte ut med ekte API‑kall)
  showStatus('Innlogging vellykket! Du blir omdirigert…', 'ok');

  // Eksempel på redirect
  setTimeout(() => {
    submitBtn.innerHTML = prev;
    // window.location.href = '/dashboard';
  }, 700);
});

function showStatus(msg, kind){
  statusBox.textContent = msg;
  statusBox.className = 'status show ' + (kind === 'ok' ? 'ok' : 'err');
}

// Init
updateSubmit();
updateStrength();