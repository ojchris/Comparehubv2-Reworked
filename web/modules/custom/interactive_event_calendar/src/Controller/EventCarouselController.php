<?php

namespace Drupal\interactive_event_calendar\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Response;

class EventCarouselController extends ControllerBase {

  public function render($date) {

    // Render the View block with argument
    $view = views_embed_view(
      'event_list_date_controlled',
      'block_one',
      $date
    );

    if (empty($build)) {
      return new Response('');
    }

    // Render to HTML string
    $html = \Drupal::service('renderer')->renderRoot($view);

    return new Response($html);

  }

}
