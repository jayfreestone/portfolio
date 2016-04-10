<?php
include 'includes/Parsedown.php';

/**
 * Sets up theme
 */
function jf_setup() {
	/**
	 * Sets up image sizes
	 */
	add_image_size( 'homepage', '2000', '1500', true );

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
 * Use pardown to convert markdown
 */
function md( $text ) {
	$Parsedown = new Parsedown();
	return $Parsedown->text( $text );
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
	add_filter( 'acf/load_value/type=textarea', 'acf_md', 10, 3 );
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
	// Use Google Ajax Library for jQuery.
	wp_deregister_script( 'jquery' );
	wp_register_script( 'jquery', '//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js', false, false, false );
	wp_enqueue_script( 'jquery' );

	if ( is_front_page() ) {
		wp_enqueue_script( 'touchswipe','https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.15/jquery.touchSwipe.js', false, false, false );
	}

	wp_enqueue_style( 'main', get_template_directory_uri() . '/public/assets/css/main.css', false, false, 'all' );
	wp_enqueue_script( 'mainjs', get_template_directory_uri() . '/public/assets/js/main.js', false, false, true );
	wp_enqueue_script( 'lazysizes', get_template_directory_uri() . '/node_modules/lazysizes/lazysizes.min.js', false, false, true );
}
add_action( 'wp_enqueue_scripts', 'enqueue_assets' );


/**
 * Get Recent Work
 */
function get_recent_work() {
	$work = get_transient( 'recent_work' );

	if ( false === $work ) {
		$work = new WP_Query(array(
			'post_type' => 'work',
			'posts_per_page' => 6,
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
 * Home Background images
 */
function home_images() {
	$work = get_recent_work();

	if ( is_front_page() ) {
?>
<style>
	<?php $i = 0; ?>
	<?php while ( $work->have_posts() ) : $work->the_post(); ?>
		<?php
		$i++;
		$workImage = get_field( 'homepage_image' );
		?>
		.work-preview--<?php echo $i ?> .work-preview__image {
			background-image: url('<?php echo $workImage['url']; ?>');
		}
	<?php endwhile; ?>
</style>
<?php
	}
}
add_action( 'wp_head', 'home_images' );
