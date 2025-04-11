// Custom Toggle
const termsTabPills = document.querySelectorAll('.context-tab-selector');
termsTabPills.forEach(termsTabPill => {
  termsTabPill.addEventListener('click', function () {
    termsTabPills.forEach(pillItem => {
      pillItem.classList.remove('active-tab-selector');
      document.querySelector(`#${pillItem.dataset.contentSection}`).style.display = 'none';
    })
    termsTabPill.classList.add('active-tab-selector');
    document.querySelector(`#${termsTabPill.dataset.contentSection}`).style.display = 'block';
  })
});