(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.fullcalendarInteraction = {
    attach: function (context, settings) {
      // Listen for the dateClick event on the FullCalendar instance.
      // Get the FullCalendar ID from the drupalSettings or find it.
      const calendarId = drupalSettings.fullcalendar.calendars[0].domId;
      const calendarEl = document.getElementById(calendarId);
      if (calendarEl && !$(calendarEl).hasClass('processed')) {
        $(calendarEl).addClass('processed');
        const calendar = new FullCalendar.Calendar(calendarEl, {
          dateClick: function(info) {
            const clickedDate = info.dateStr;
            // Trigger a refresh on the carousel view block.
            const carouselViewId = 'interactive_calendar_events';
            const carouselDisplayId = 'interactive_calendar_block';
            const $carouselView = $('.view-' + carouselViewId + '.view-display-id-' + carouselDisplayId);
            // Trigger the 'RefreshView' event with the new date argument.
            // You may need to inspect the AJAX requests to find the correct format.
            if ($carouselView.length) {
              const viewAjax = $carouselView.data('ajaxViewState');
              if (viewAjax) {
                viewAjax.view_args = clickedDate; // Pass the date as argument.
                $carouselView.trigger('RefreshView');
              }
            }
          }
        });
      }
    }
  };
})(jQuery, Drupal, drupalSettings);
