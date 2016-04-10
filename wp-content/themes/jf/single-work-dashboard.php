<?php get_header(); ?>
<article class="dashboard">
	<header class="dashboard__header cf">
		<div class="l-container">
			<div class="dashboard__intro">
				<h1 class="heading-1"><?php the_field( 'title' ); ?></h1>
				<?php the_field( 'intro' ); ?>
			</div>
		</div>
	</header>
</article>
<?php get_footer(); ?>
