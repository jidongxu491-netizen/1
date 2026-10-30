import './style.css';

  // Mobile nav toggle
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  hamburger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }));

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Toast helper
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(msg){
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  // "加入菜单" quick feedback
  document.querySelectorAll('.add').forEach(btn => {
    btn.addEventListener('click', () => showToast('🍽️ 已加入点餐清单：' + btn.dataset.dish));
  });

  // Booking form
  const form = document.getElementById('booking-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value;
    if(!name){ showToast('请填写你的称呼'); return; }
    if(!/^1[3-9]\d{9}$/.test(phone)){ showToast('请填写正确的手机号'); return; }
    if(!date){ showToast('请选择用餐日期'); return; }
    showToast('✅ 预订已提交，我们会尽快与你确认');
    form.reset();
  });

  // Current year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Min booking date = today
  const dateInput = document.getElementById('date');
  dateInput.min = new Date().toISOString().split('T')[0];
