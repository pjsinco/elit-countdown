<?php 
/*
Plugin Name: Elit Countdown
Description: Show a countdown timer
Version:  0.1.0
Author: Patrick Sinco
Author URI: github.com/pjsinco
License: GPL2
*/

// if this file is called directly, abort
if (!defined('WPINC')) {
  die;
}


function elit_countdown_enqueue_scripts() {
    $css_file = 'elit-downloadable.css';
    $css_path = "public/styles/$css_file";
    $js_file = 'elit-downloadable-bundle.js';
    $js_path = "public/scripts/$js_file";

    wp_register_script(
      'countdown',
      get_template_directory_uri() . '/scripts/countdown.js',
      array(),
      null,
      true
    );

    if ( is_front_page() ) {
      wp_enqueue_script( 'countdown' );
    }
}
add_action( 'wp_enqueue_scripts', 'elit_countdown_enqueue_scripts' );
