<?php
	$intro_class = 'intro';

	if ( get_field( 'header_whiteout' ) ) {
		$intro_class .= ' whiteout';
	}
?>

<header class="<?php echo esc_attr($intro_class); ?> cf" style="background-color: <?php echo esc_attr( get_field( 'intro_background_color' ) ); ?>">
	<div class="intro__content l-container">
		<div class="intro__copy">
			<span class="badge">Case Study</span>
			<h1 class="heading-1 intro__title"><?php the_field( 'title' ); ?></h1>
			<div class="intro__description"><?php the_field( 'intro' ); ?></div>
		</div>
	</div>
	<ul class="intro__skillset l-container">
		<?php if ( have_rows( 'skills' ) ) : ?>
			<?php while ( have_rows( 'skills' ) ) : the_row(); ?><!--
				--><li><?php the_sub_field( 'skill' ); ?></li><!--
			--><?php endwhile; ?>
		<?php endif; ?>
	</ul>
</header>
