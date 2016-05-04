<?php get_header(); ?>

<div class="l-content">
	<div class="l-container" itemscope itemtype="http://schema.org/Blog">
		<?php if ( have_posts() ) : ?>
			<?php while ( have_posts() ) : the_post(); ?>
				<article class="journal-preview" itemprop="blogPosts" itemscope itemtype="http://schema.org/BlogPosting">
					<h2 class="heading-2 journal-preview__title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
					<div class="journal-preview__snippet"><?php echo esc_html( wp_trim_words( get_field( 'page_content' ), 30 ) ); ?></div>
					<div class="journal-preview__date"><?php the_date(); ?></div>
				</article>
			<?php endwhile; ?>
		<?php endif; ?>
	</div>
</div>

<?php get_footer(); ?>
