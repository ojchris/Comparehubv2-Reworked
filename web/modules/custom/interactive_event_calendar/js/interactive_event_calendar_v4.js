/* global Drupal */
/* global jQuery */
/* global once */
(function (Drupal, $, once) {
  Drupal.behaviors.interactiveEventCalendar = {
    attach: function (context, settings) {
      once('interactiveEventCalendar', '.js-drupal-fullcalendar', context).forEach(function () {
        //$('.fullcalendar').on('click', '.fc-daygrid-day', function () {
        //$('.fullcalendar').on('click', '.fc-day-grid', function () {
        //$('.fullcalendar').on('click', '.fc-day', function () {
        $('.js-drupal-fullcalendar').on('click', '.fc-day-top', function () {
          const date = $(this).data('date');

          if (!date) return;

          console.log('Clicked date:', date);

          const $target = $('#event-slides');

          $target
            .addClass('is-loading')
            .empty();

          $.ajax({
            url: `/event-slides/${date}`,
            type: 'GET',
            success: function (html) {

              if (!html || !html.trim()) {
                $target.html('<p>No events found for this date.</p>');
                return;
              }

              $target
                .removeClass('is-loading')
                .html(html);

              // 🔑 THIS is the important Drupal step
              Drupal.attachBehaviors($target[0]);
            },
            error: function () {
              $target.html('<p>No events found for this date.</p>');
            }
          });

        });
      });
    }
  };
})(Drupal, jQuery, once);
