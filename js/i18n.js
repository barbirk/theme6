/* ============================================================
   Arts et Math — i18n Engine
   ============================================================ */

const I18n = {
  lang: localStorage.getItem('lang') || 'fr',

  t(key, vars = {}) {
    const str = (APP_DATA.i18n[this.lang] && APP_DATA.i18n[this.lang][key]) ||
                APP_DATA.i18n['fr'][key] || key;
    return str.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
  },

  setLang(lang) {
    this.lang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    this.updateDOM();
  },

  toggle() {
    this.setLang(this.lang === 'fr' ? 'en' : 'fr');
  },

  updateDOM() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key.endsWith('.desc') || key.includes('subtitle')) {
        el.textContent = this.t(key);
      } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = this.t(key);
      } else if (el.tagName === 'BUTTON') {
        const icon = el.textContent.match(/^[\s\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]+/u)?.[0] || '';
        el.innerHTML = (icon ? icon + ' ' : '') + this.t(key);
      } else {
        const html = this.t(key);
        if (html.includes('<')) el.innerHTML = html;
        else el.textContent = html;
      }
    });

    // Update dynamic content
    if (window.App && App.renderLessonsList) App.renderLessonsList();
    if (window.App && App.renderQuizList) App.renderQuizList();
    if (window.App && App.renderGamesList) App.renderGamesList();
    if (window.App && App.renderFormulas) App.renderFormulas();
    if (window.App && App.renderProgress) App.renderProgress();

    // Update lang button
    const btn = document.getElementById('btn-lang');
    if (btn) btn.textContent = this.lang.toUpperCase();
  }
};

I18n.updateDOM();
