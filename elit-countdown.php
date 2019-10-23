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
    $css_file = 'elit-countdown.css';
    $css_path = "public/styles/$css_file";
    $js_file = 'elit-countdown-bundle.js';
    $js_path = "public/scripts/$js_file";

    if ( is_front_page() ) {
        wp_enqueue_script(
            'countdown-js',
            plugins_url( $js_path, __FILE__ ),
            array(),
            filemtime( plugin_dir_path(__FILE__) . "/" . $js_path ),
            true
        );

        wp_enqueue_style(
            'countdown-css',
            plugins_url( $css_path, __FILE__ ),
            array(),
            filemtime( plugin_dir_path(__FILE__) . "/" . $css_path ),
            'all'
        );
    }
}
add_action( 'wp_enqueue_scripts', 'elit_countdown_enqueue_scripts' );

function elit_countdown_add_markup( $content ) {
    if ( is_front_page() ) {
?>
        <script type="text/template" id="countdownTemplate">
                <div class="countdown hide reveal">
                    <div class="countdown__display reveal"><div class="countdown__figure" id="days"></div> <span id="daysString">days</span></div>
                    <div class="countdown__display reveal"><div class="countdown__figure" id="hours"></div> <span id="hoursString">hours</span></div>
                    <div class="countdown__display reveal"><div class="countdown__figure" id="minutes"></div> min</div>
                    <div class="countdown__display reveal"><div class="countdown__figure" id="seconds"></div> sec</div>
                </div>
                <div class="countdown__title">Countdown to OMED 2019</div>
        </script>
<?php
    }

    return $content;
}
add_filter( 'the_content', 'elit_countdown_add_markup', 10, 1 );


