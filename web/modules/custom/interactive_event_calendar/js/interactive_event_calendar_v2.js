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

          if (!date) return;

          target.html('<p>Loading events...</p>');
          
          // Load banner carousel BLOCK for clicked date
          $.ajax({
            url:
              '/views/ajax?view_name=event_carousel_passed_value' +
              '&view_display_id=block_one' +
              '&view_args=' + date,
            type: 'GET',
            dataType: 'json',
            
            success: function (response) {
              if (response[0] && response[0].data) {
                target.html(response[0].data);
                Drupal.attachBehaviors(target[0]);
              } else {
                target.html('<p>No events found for this date.</p>');
              }
            },
            error: function () {
              target.html('<p>Error loading events.</p>');
            }
          });
        });
      });
    }
  };
})(Drupal, jQuery, once);
