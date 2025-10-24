/* global Drupal */
/* global jQuery */
/* global once */
(function (Drupal, $, once) {
  Drupal.behaviors.interactiveEventCalendar = {
    attach: function (context, settings) {
      once('interactiveEventCalendar', '.fullcalendar', context).forEach(function () {
        //$('.fullcalendar').on('click', '.fc-daygrid-day', function () {
        $('.fullcalendar').on('click', '.fc-day-grid', function () {
          const date = $(this).data('date');
          const target = $('#event-banners');
          
          // Load banner carousel for clicked date
          $.ajax({
            url: '/event-banners/' + date,
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
