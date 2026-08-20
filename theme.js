// ---------- Theme toggle ----------
  function setTheme(isLight){
    document.body.classList.toggle('light', isLight);
    const icon1 = document.getElementById('themeIconLogin');
    const icon2 = document.getElementById('themeIconApp');
    const iconClass = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    if(icon1) icon1.className = iconClass;
    if(icon2) icon2.className = iconClass;
  }
  document.getElementById('themeToggleLogin').addEventListener('click', () => {
    setTheme(!document.body.classList.contains('light'));
  });
  document.getElementById('themeToggleApp').addEventListener('click', () => {
    setTheme(!document.body.classList.contains('light'));
  });
