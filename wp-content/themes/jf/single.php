<?php get_header(); ?>
<div class="l-content">
	<div class="l-container">
		<div class="journal-single-container">
			<article class="journal-single">
				<header class="journal-single__header">
					<h1 class="heading-1 journal-single__title"><?php the_title(); ?></h1>
					<span class="journal-single__date"><?php the_date(); ?></span>
				</header>
				<?php the_field( 'page_content' ); ?>
			</article>
			<span class="journal-single__navigation journal-single__navigation--previous">
				<?php previous_post_link( '%link' ); ?>
			</span>
			<span class="journal-single__navigation journal-single__navigation--next">
				<?php next_post_link( '%link' ); ?>
			</span>
		</div>
	</div>
</div>
<?php get_footer(); ?>
