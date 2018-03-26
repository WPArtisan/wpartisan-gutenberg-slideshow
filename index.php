<?php
/**
 * Plugin Name: WPArtisan Gutenberg Slideshow
 * Description:
 * Author: OzTheGreat (WPArtisan)
 * Author URI: https://wpartisan.me
 * Version: 1.0.0
 * Plugin URI: https://wpartisan.me/plugins/gutenberg-slideshow
 *
 * @package wpartisan-gutenberg-slideshow
 */

defined( 'ABSPATH' ) || exit;

add_action( 'enqueue_block_editor_assets', 'gutenberg_examples_05_esnext_enqueue_block_editor_assets' );

function gutenberg_examples_05_esnext_enqueue_block_editor_assets() {
	wp_enqueue_script(
		'wpartisan-gutenberg_slideshow',
		plugins_url( 'block.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'underscore' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.build.js' )
	);
}

add_action( 'enqueue_block_assets', 'gutenberg_examples_05_esnext_enqueue_block_assets' );

function gutenberg_examples_05_esnext_enqueue_block_assets() {
	wp_enqueue_style(
		'wpartisan-gutenberg_slideshow',
		plugins_url( 'style.css', __FILE__ ),
		array( 'wp-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);
}
