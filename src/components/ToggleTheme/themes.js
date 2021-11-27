function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    const themeSwitcher = document.getElementById("theme-switching-element");
    themeSwitcher.className = themeName;
}

function keepTheme() {
  if (localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-dark');
    } else if (localStorage.getItem('theme') === 'theme-light') {
      setTheme('theme-light')
    }
  } else {
    setTheme('theme-dark')
  }
}

module.exports = {
  setTheme,
  keepTheme
}
