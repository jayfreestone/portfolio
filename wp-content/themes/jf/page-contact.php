
<?php get_header(); ?>
<div class="l-content">
	<div class="l-container">
		<div class="contact cf">
			<h1 class="heading-1"><?php the_title(); ?></h1>

			<div class="contact__content">
				<?php the_field( 'page_content' ); ?>
			</div>

			<div class="contact__form">
				<?php echo do_shortcode( '[contact-form-7 id="87" title="Contact Form"]' ); ?>
			</div>
			
			<?php if ( have_rows( 'social_links' ) ) : ?>
				<ul class="contact__social link-widget">
				<?php while ( have_rows( 'social_links' ) ) : the_row(); ?>
					<li>
						<h3 class="heading-3"><?php the_sub_field( 'name' ); ?></h3>
						<?php the_sub_field( 'link' ); ?>
					</li>
				<?php endwhile; ?>
				</ul>
			<?php endif; ?>
		</div>
	</div>
</div>
<?php get_footer(); ?>
