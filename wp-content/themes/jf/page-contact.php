<?php get_header(); ?>
<div class="l-container">
	<div class="contact">
	  <!-- <h1 class="heading&#45;1"><?php the_title(); ?></h1> -->
		<div class="contact__inner">
			<a class="heading-1 contact__email" href="mailto:mail@jayfreestone.com">mail@jayfreestone.com</a>
			<div class="contact__copy"><?php the_field( 'page_content' ); ?></div>

			<?php if ( have_rows( 'social_links' ) ) : ?>
				<ul class="contact__links">
					<?php while ( have_rows( 'social_links' ) ) : the_row(); ?>
						<li><a href="<?php the_sub_field( 'link' ); ?>"><?php the_sub_field( 'name' ); ?></a></li>
					<?php endwhile; ?>
				</ul>
			<?php endif; ?>

		</div>
	</div>
</div>
<?php get_footer(); ?>
