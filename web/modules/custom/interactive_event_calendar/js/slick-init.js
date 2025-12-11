(function ($, Drupal, once) {
  Drupal.behaviors.slickInit = {
    attach: function (context) {
      $(once('slick-init', '.event-carousel-slider', context)).slick({
        slidesToShow: 3,
        dots: true,
        arrows: true,
        infinite: true,
      });
    }
  };
})(jQuery, Drupal, once);
