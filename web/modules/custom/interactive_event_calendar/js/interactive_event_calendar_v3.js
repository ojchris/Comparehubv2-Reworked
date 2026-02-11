/* global Drupal */
/* global jQuery */
/* global once */
(function (Drupal, $, once) {

   /**
   * Force-load Blazy images inside dynamically injected content.
   * This is required because Blazy does not re-register images
   * added outside Views AJAX / BigPipe.
   */
  function forceLoadBlazyImages(context) {
  $(context)
    .find('img.b-lazy[data-src]')
    .each(function () {
      if (!this.src || this.src.startsWith('data:image')) {
        this.src = this.dataset.src;
        //this.classList.remove('b-lazy');
      }
    });
}

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
              let html = '';

              // Loop Drupal AJAX commands to find the 'insert' command.
              if (response && response[3] && response[3].command === 'insert') {
                html = response[3].data;
              }

              if (html) {
                target.html(html);

                // Re-init Slick on the new content
                $(once('slick-slider', '.event-carousel-slider', context)).slick({
                  infinite: true,
                  slidesToShow: 3,
                  slidesToScroll: 1,
                });

                // 🔥 Force Blazy images to load
              forceLoadBlazyImages($target);
                
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
