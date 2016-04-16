<html class="no-js" <?php language_attributes(); ?>>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<link rel="preload" href="<?php get_template_directory_uri(); ?>/src/fonts/graphik/Graphik-Bold-Web.woff" as="font" type="font/woff" crossorigin>
		<?php wp_head(); ?>
		<script>
			// If the font has already been loaded, add the class immediately
			var fontLoaded = localStorage.getItem( 'fontloaded' );
			if (fontLoaded) {
				document.querySelector('html').classList.add('wf-graphikweb-n4-active', 'wf-active');
			}
		</script>
	</head>

	<?php 
	$headerClass = 'l-siteheader';

	if ( get_field( 'header_whiteout' ) ) {
		$headerClass .= ' l-siteheader--white';
	}
   	?>

	<body <?php body_class(); ?>>
		<header class="<?php echo $headerClass; ?>">
			<div class="l-container">
				<div class="l-siteheader__brand">
					<a href="<?php echo home_url();?>">
						<svg class="l-siteheader__logo" width="20" height="20.19" viewBox="0 0 20 20.19"><title>Jay Freestone Logo</title><path d="M19.39,5.61L21.2,0.9H9.75V15.19a1.94,1.94,0,0,1-2,1.87h0a2,2,0,0,1-2-1.88V13.27H8.76V8.54H1.2v6.12A6.43,6.43,0,0,0,7.79,21.1H7.93a6.48,6.48,0,0,0,6.66-6.43V13.3h3.68V8.51H14.62V5.61h4.77Z" transform="translate(-1.2 -0.9)" fill="#231f20"/></svg>
						<span class="l-siteheader__sitename">Jay Freestone</span>
					</a>
					<button class="l-siteheader__menu-toggle">Menu</button>
				</div>
				<nav class="l-siteheader__nav">
					<?php wp_nav_menu( array( 'theme_location' => 'header-menu', 'container' => '', 'menu_class' => 'primary-nav' ) ); ?>
				</nav>
			</div>
		</header>

		<div class="site-content">
