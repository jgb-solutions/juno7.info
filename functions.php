<?php
/**
 * juno7info functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package juno7info
 */

if ( ! function_exists( 'juno7info_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function juno7info_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on juno7info, use a find and replace
	 * to change 'juno7info' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'juno7info', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	add_image_size( 'juno-small', 130, 87, true );
	add_image_size( 'juno-show', 457, 304, true );
	add_image_size( 'juno-tiny', 50, 50, true );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary', 'juno7info' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 * See https://developer.wordpress.org/themes/functionality/post-formats/
	 */
	add_theme_support( 'post-formats', array(
		'aside',
		'image',
		'video',
		'quote',
		'link',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'juno7info_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif;
add_action( 'after_setup_theme', 'juno7info_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function juno7info_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'juno7info_content_width', 640 );
}
add_action( 'after_setup_theme', 'juno7info_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function juno7info_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'juno7info' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'juno7info' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar Right', 'juno7info' ),
		'id'            => 'sidebar-2',
		'description'   => esc_html__( 'Add widgets here.', 'juno7info' ),
		'before_widget' => '<div id="%1$s" class="panel-pane pane-block widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="htitle txtcenterm txt30 txt20m txtblack mb1">',
		'after_title'   => '</h4>',
	) );

	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar Footer 1', 'juno7info' ),
		'id'            => 'sidebar-3',
		'description'   => esc_html__( 'Add widgets here.', 'juno7info' ),
		'before_widget' => '<div id="%1$s">',
		'after_widget'  => '</div><br>',
		'before_title'  => '<h6 class="txt14 txtgrey txtbold mb2 txtcenterm">',
		'after_title'   => '</h6>',
	) );

	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar Footer 2', 'juno7info' ),
		'id'            => 'sidebar-4',
		'description'   => esc_html__( 'Add widgets here.', 'juno7info' ),
		'before_widget' => '<div id="%1$s">',
		'after_widget'  => '</div><br>',
		'before_title'  => '<h6 class="txt14 txtgrey txtbold mb2 txtcenterm bgwhitem pa2m">',
		'after_title'   => '</h6>',
	) );

	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar Footer 3', 'juno7info' ),
		'id'            => 'sidebar-5',
		'description'   => esc_html__( 'Add widgets here.', 'juno7info' ),
		'before_widget' => '<div id="%1$s">',
		'after_widget'  => '</div><br>',
		'before_title'  => '<h6 class="txt14 txtgrey txtbold mb2 txtcenterm">',
		'after_title'   => '</h6>',
	) );

	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar Under Featured Home', 'juno7info' ),
		'id'            => 'sidebar-6',
		'description'   => esc_html__( 'Add widgets here.', 'juno7info' ),
		'before_widget' => '<div id="%1$s">',
		'after_widget'  => '</div><br>',
		'before_title'  => '<h6 class="txt14 txtgrey txtbold mb2 txtcenterm">',
		'after_title'   => '</h6>',
	) );

	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar Sponsors', 'juno7info' ),
		'id'            => 'sidebar-7',
		'description'   => esc_html__( 'Add Sponsors here.', 'juno7info' ),
		'before_widget' => '<div id="%1$s" class="w20 left">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4>',
		'after_title'   => '</h4>',
	) );

}
add_action( 'widgets_init', 'juno7info_widgets_init' );

/**
 * Implement the Custom Header feature.
 */
// require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';

    /**
	 * Enqueue scripts
	 *
	 * @param string $handle Script name
	 * @param string $src Script url
	 * @param array $deps (optional) Array of script names on which this script depends
	 * @param string|bool $ver (optional) Script version (used for cache busting), set to null to disable
	 * @param bool $in_footer (optional) Whether to enqueue the script before </head> or before </body>
	 */
	function theme_name_scripts()
	{
		wp_enqueue_script(
			'junoJS',
			get_stylesheet_directory_uri ()  . '/js/all.js',
			null,
			true,
			true
		);

		wp_localize_script( 'junoJS', 'junoJS', [
			'template_url' => get_template_directory_uri()
		]);

	}

	add_action( 'wp_enqueue_scripts', 'theme_name_scripts' );