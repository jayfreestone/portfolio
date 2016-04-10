<?php get_header(); ?>
<div class="l-content about">
	<div class="l-container">
		<h1 class="heading-1"><?php the_title(); ?></h1>
		<?php the_field( 'page_content' ); ?>
	</div>
</div>
<?php get_footer(); ?>
