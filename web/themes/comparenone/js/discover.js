
/**
 * @file
 * comparenone behaviors.
 */
(function (Drupal) {

  'use strict';

  Drupal.behaviors.discoverjs = {
    attach (context, settings) {

      console.log('It works really well!');

      const pageItems = context.querySelectorAll('[data-for-dialog]');
      pageItems.forEach(pageItem => {
        item.addEventListener('click', function (e) {
          console.log(e, `#${pageItem.dataset.forDialog}`);
          document.querySelector(`#${pageItem.dataset.forDialog}`).classList.add('dialog-opened');
          document.querySelector(`#${pageItem.dataset.forDialog}`).classList.add('animate__animated');
          document.querySelector(`#${pageItem.dataset.forDialog}`).classList.add('animate__fadeIn');
          document.querySelector(`#${pageItem.dataset.forDialog} .dialog-container`).classList.add('animate__animated');
          document.querySelector(`#${pageItem.dataset.forDialog} .dialog-container`).classList.add('animate__slideInRight');
        })
      });

      const dialogCloseIcons = context.querySelectorAll('[data-modal-id]');
      dialogCloseIcons.forEach(dialogCloseIcon => {
        dialogCloseIcon.addEventListener('click', function (e) {
          console.log(e, `#${dialogCloseIcon.dataset.modalId}`);
          const dialogElement = document.querySelector(`#${dialogCloseIcon.dataset.modalId}`);
          const dialogContainer = dialogElement.querySelector('.dialog-container');

          dialogElement.classList.add('animate__animated', 'animate__fadeOut');
          dialogContainer.classList.add('animate__animated', 'animate__slideOutRight');

          function cleanUpAnimation() {
            dialogElement.classList.remove('dialog-opened', 'animate__animated', 'animate__fadeOut');
            dialogContainer.classList.remove('animate__animated', 'animate__slideOutRight');
            dialogElement.removeEventListener('animationend', cleanUpAnimation);
          }

          dialogElement.addEventListener('animationend', cleanUpAnimation);
        });
      });

      const searchInputs = context.querySelectorAll('.dialog-input');
      searchInputs.forEach(searchInput => {
        searchInput.addEventListener('input', filterCategories);
      });

      function filterCategories() {
        const searchValue = this.value.toLowerCase();
        const categoryId = this.dataset.categoryId;
        const categoryElements = document.querySelector(`#${categoryId}`).querySelectorAll('.dialog-filter-content-text');
        const noMatchMessage = document.querySelector(`#${categoryId}`).querySelector('.no-match-message');
        let matchFound = false;
        const prevSelectedOption = document.querySelector(`#${categoryId} .dialog-filter-content-text.selected`);
        if (prevSelectedOption) {
          prevSelectedOption.classList.remove('selected');
        }
        categoryElements.forEach(category => {
          const categoryText = category.textContent.toLowerCase();
          if (categoryText.includes(searchValue)) {
            category.style.display = 'block';
            matchFound = true;
          } else {
            category.style.display = 'none';
          }
        });
        if (matchFound) {
          noMatchMessage.style.display = 'none';
        } else {
          noMatchMessage.style.display = 'block';
        }
      }

      function initializeDropdown(dropdownType) {
        const dropdownContainer = document.querySelector(`.app-custom-dropdown[data-for-dialog="select${dropdownType}Dialog"]`);
        const dropdownLabel = dropdownContainer.querySelector('.custom-dropdown-label');
        const dropdownDialog = document.getElementById(`select${dropdownType}Dialog`);
        const options = dropdownDialog ? dropdownDialog.querySelectorAll('.dialog-filter-content-text') : [];
        options.forEach((option) => {
          option.addEventListener('click', () => {
            const prevSelectedOption = dropdownDialog.querySelector('.dialog-filter-content-text.selected');
            if (prevSelectedOption) {
              prevSelectedOption.classList.remove('selected');
            }
            option.classList.add('selected');
            dropdownLabel.textContent = option.textContent;
          });
        });
      }

      initializeDropdown('Category');
      initializeDropdown('Location');
      initializeDropdown('Brand');

    }
  };

} (Drupal));






