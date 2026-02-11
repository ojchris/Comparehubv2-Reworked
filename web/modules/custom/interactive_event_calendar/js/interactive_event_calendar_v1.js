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
          const target = $('#event-slides');
          
          // Load banner carousel page for clicked date
          $.ajax({
            url: '/event-slides/' + date,
            success: function (data) {
              target.html(data);
            },
            error: function () {
              target.html('<p>No events found for this date.</p>');
            }
          });
        });
      });
    }
  };
})(Drupal, jQuery, once);
