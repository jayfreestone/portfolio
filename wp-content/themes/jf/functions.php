<?php
include 'includes/Parsedown.php';

/**
 * Sets up theme
 */
function jf_setup() {
	/**
	 * Sets up image sizes
	 */
	add_image_size( 'homepage-300', '300' );
	add_image_size( 'homepage-600', '600' );
	add_image_size( 'homepage-1200', '1200' );
	add_image_size( 'homepage-2400', '2400' );

	add_image_size( 'landscape-300', '300', '200' );
	add_image_size( 'landscape-600', '600', '400' );
	add_image_size( 'landscape-900', '900', '600' );
	add_image_size( 'landscape-1200', '1200', '800' );
	add_image_size( 'landscape-1800', '1800', '1200' );
	add_image_size( 'landscape-2400', '2400', '1600' );
	add_image_size( 'landscape-3000', '3000', '2000' );

	add_image_size( 'portrait-300', '300', '533' );
	add_image_size( 'portrait-600', '600', '1066' );
	add_image_size( 'portrait-900', '900', '1599' );
	add_image_size( 'portrait-1200', '1200', '2132' );

	add_image_size( 'fullwidth-300', '300', '169', true );
	add_image_size( 'fullwidth-600', '600', '338', true );
	add_image_size( 'fullwidth-900', '900', '507', true );
	add_image_size( 'fullwidth-1320', '1320', '743', true );
	add_image_size( 'fullwidth-2000', '2000', '1125', true );
	add_image_size( 'fullwidth-2640', '2640', '1485', true );
	add_image_size( 'fullwidth-4000', '4000', '2250', true );
	add_image_size( 'fullwidth', '6000', '3376', true );

	/**
	 * Registers custom menus
	 */
	register_nav_menus( array(
		'header-menu'       => __( 'Header Menu', 'jf' ),
	) );

	/**
	 * Let WordPress manage the document title.
	 */
	add_theme_support( 'title-tag' );

}
add_action( 'after_setup_theme', 'jf_setup' );

/**
 * Use parsedown to convert markdown
 */
function md( $text ) {
	$parsedown = new Parsedown();
	return $parsedown->text( $text );
}

/**
 * Filter ACF textarea values through Parsedown
 */
function acf_md( $field ) {
	return md( $field );
}

/**
 * Add Markdown filter everywhere but the dashboard
 */
if ( ! is_admin() ) {
	add_filter( 'acf/format_value/type=textarea', 'acf_md', 10, 3 );
}

/**
 * Clean up the <head>
 */
function jf_clean_head_tags() {
	remove_action( 'wp_head', 'feed_links', 2 );
	remove_action( 'wp_head', 'feed_links_extra', 3 );
	remove_action( 'wp_head', 'rsd_link' );
	remove_action( 'wp_head', 'wlwmanifest_link' );
	remove_action( 'wp_head', 'index_rel_link' );
	remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );
	remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );
	remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );
	remove_action( 'wp_head', 'wp_generator' );
	remove_action( 'wp_head', 'wp_shortlink_wp_head', 10, 0 );
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
}
add_action( 'init', 'jf_clean_head_tags' );

/**
 * Renames "Posts" admin menu item
 */
function change_post_menu_label() {
	global $menu, $submenu;
	$menu[5][0]                 = 'Journal';
	$submenu['edit.php'][5][0]  = '';
	$submenu['edit.php'][10][0] = 'Add Article';
	$submenu['edit.php'][16][0] = 'Tags';
}
add_action( 'admin_menu', 'change_post_menu_label' );

/**
 * Changes "Posts" admin labels
 */
function change_post_object_label() {
	global $wp_post_types;
	$labels                     = $wp_post_types['post']->labels;
	$labels->name               = 'Journal';
	$labels->singular_name      = 'Article';
	$labels->add_new            = 'Add Article';
	$labels->add_new_item       = 'Add Article';
	$labels->edit_item          = 'Edit Article';
	$labels->new_item           = 'Article';
	$labels->view_item          = 'View Article';
	$labels->search_items       = 'Search Articles';
	$labels->not_found          = 'No Articles found';
	$labels->not_found_in_trash = 'No Articles found in Trash';
}
add_action( 'init', 'change_post_object_label' );

/**
 * JavaScript Detection
 * Adds a `js` class to the root `<html>` element when JavaScript is detected.
 */
function javascript_detection() {
	echo "<script>(function(html){html.className = html.className.replace(/\bno-js\b/,'js');})(document.documentElement);</script>\n";
}
add_action( 'wp_head', 'javascript_detection', 0 );

/**
 * Enqueues scripts & styles.
 */
function enqueue_assets() {
	wp_enqueue_style( 'maincss', get_template_directory_uri() . '/public/assets/css/main.css', false, false, 'all' );

	// Use Google Ajax Library for jQuery.
	wp_deregister_script( 'jquery' );

	// Removes unwanted WordPress embed script
	wp_deregister_script( 'wp-embed' );

	wp_enqueue_script( 'mainjs', get_template_directory_uri() . '/public/assets/js/main.js', array( 'tweenmax', 'scrollmagic', 'hammerjs' ), false, true );
	wp_enqueue_script( 'hammerjs', get_template_directory_uri() . '/public/assets/js/hammer.min.js', false, false, true );
	wp_enqueue_script( 'viewport-units-buggyfill', get_template_directory_uri() . '/public/assets/js/viewport-units-buggyfill.js', false, false, true );
	wp_enqueue_script( 'scrollmagic', get_template_directory_uri() . '/public/assets/js/ScrollMagic.min.js', false, false, true );
	wp_enqueue_script( 'tweenmax', get_template_directory_uri() . '/public/assets/js/TweenMax.min.js', false, false, true );
	wp_enqueue_script( 'lazysizes', get_template_directory_uri() . '/public/assets/js/lazysizes.min.js', false, false, true );
	wp_enqueue_script( 'picturefill', get_template_directory_uri() . '/public/assets/js/picturefill.min.js', false, false, true );
}
add_action( 'wp_enqueue_scripts', 'enqueue_assets' );

/**
 * Async Enqueued Scripts
 */
function js_async( $tag ) {

	$scripts_to_async = array( 'picturefill', 'lazysizes' );

	foreach ( $scripts_to_async as $async_script ) {
		if ( true == strpos( $tag, $async_script ) ) {
			return str_replace( ' src', ' async="async" src', $tag );
		}
	}

	return $tag;
}
add_filter( 'script_loader_tag', 'js_async', 10 );

/**
 * Initializes Viewport Units Buggyfill
 */
function viewport_buggyfill_inline() {
	if ( wp_script_is( 'viewport-units-buggyfill', 'done' ) ) {
		echo '<script>window.viewportUnitsBuggyfill.init();</script>';
	}
}
add_action( 'wp_footer', 'viewport_buggyfill_inline', 100 );

/**
 * Initializes webfont loader
 */
function web_font_loader() {
	?>
	<script>
		// Load webfonts
		var WebFontConfig = {
			custom: {
				families: ['Graphik Web']
			},
			active: function() {
				localStorage.setItem( 'fontloaded', true );
			}
		};

		(function(d) {
		  var wf = d.createElement('script'), s = d.scripts[0];
		  wf.src = '<?php echo get_template_directory_uri(); ?>/public/assets/js/webfontloader.js';
		  s.parentNode.insertBefore(wf, s);
		})(document);
	</script>
	<?php
}
add_action( 'wp_footer', 'web_font_loader', 100 );

/**
 * Handles returning font loading
 */
function font_loaded() {
	?>
	<script>
		// If the font has already been loaded, add the class immediately
		var fontLoaded = localStorage.getItem( 'fontloaded' );
		if (fontLoaded) {
			document.querySelector('html').classList.add('wf-graphikweb-n4-active', 'wf-active');
		}
	</script>
	<?php
}
add_action( 'wp_head', 'font_loaded' );

/**
 * Get Recent Work
 */
function get_recent_work() {
	$work = get_transient( 'recent_work' );

	if ( false === $work ) {
		$work = new WP_Query(array(
			'post_type' => 'work',
			'posts_per_page' => 6,
			'no_found_rows' => true,
			'orderby' => 'menu_order',
			'order' => 'ASC',
		));

		set_transient( 'recent_work', $work, 12 * HOUR_IN_SECONDS );
	}

	return $work;
}

/**
 * Delete Recent Work Transient
 */
function reset_recent_work() {
	delete_transient( 'recent_work' );
}

/**
 * Delete Recent Work Transient on Save
 */
function reset_recent_work_on_save() {
	if ( 'work' === get_post_type() ) {
		reset_recent_work();
	}
}
add_action( 'save_post', 'reset_recent_work_on_save' );

/**
 * Add Home Image
 * Generates the CSS for a work-preview background-image.
 */
function add_home_image( $image, $image_prefix, $image_size, $breakpoint, $number ) {
	$css = '';

	$css .= '.work-preview--' . esc_html( $number ) . ' .work-preview__image {';
	$css .= 'background-image: url(' . esc_url( $image['sizes'][$image_prefix . '-' . ((int)$image_size * 2)] ) . ');';
	$css .= '}';

	return $css;
}

/**
 * Home Background images
 * Used only as a backup for users with JS disabled.
 */
function home_images() {
	$image_css = '';

	if ( is_front_page() ) {
		$i = 0;
		$work = get_recent_work();

		while ( $work->have_posts() ) : $work->the_post();
			$i++;
			$work_image = get_field( 'homepage_image' );
			$image_css .= add_home_image( $work_image, 'homepage', '1200', '1200px', $i );
		 endwhile;

		echo '<style>' . $image_css . '</style>';
	}

	wp_reset_postdata();
}
add_action( 'wp_head', 'home_images' );

/**
 * Page Slug Body Class
 */
function add_slug_body_class( $classes ) {
	global $post;

	if ( isset( $post ) ) {
		$classes[] = $post->post_type . '-' . $post->post_name;
	}

	return $classes;
}
add_filter( 'body_class', 'add_slug_body_class' );

/**
 * Remove WP version from css and js
 */
function remove_wp_ver_css_js( $src ) {
    if ( strpos( $src, 'ver=' ) ) {
        $src = remove_query_arg( 'ver', $src );
    }
    return $src;
}
add_filter( 'style_loader_src', 'remove_wp_ver_css_js', 9999 );
add_filter( 'script_loader_src', 'remove_wp_ver_css_js', 9999 );
