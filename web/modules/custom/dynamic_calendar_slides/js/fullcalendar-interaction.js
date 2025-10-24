(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.fullcalendarInteraction = {
    attach: function (context, settings) {
      // Listen for the dateClick event on the FullCalendar instance.
      // Get the FullCalendar ID from the drupalSettings or find it.
      // const calendarId = drupalSettings.fullcalendar.calendars[0].domId;
      const calendarId = Object.keys(drupalSettings.fullcalendar)[0];
      // ID is e.g. = js-view-dom-id-a8f21861d730faf313b0ee1e4a94b9d1ed647c39b105a6b97f15875d90db2675;
      const calendarEl = document.getElementById(calendarId);
      if (calendarEl && !$(calendarEl).hasClass('processed')) {
        $(calendarEl).addClass('processed');
        const calendar = new FullCalendar.Calendar(calendarEl, {
          dateClick: function(info) {
            const clickedDate = info.dateStr;
            // Trigger a refresh on the carousel view block.
            //block-comparenone-views-block-brand-events-dynamic-event-calendar

            const carouselViewId = 'brand_events';
            const carouselDisplayId = 'block__event_carousel_dynamic_event_slides';
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
