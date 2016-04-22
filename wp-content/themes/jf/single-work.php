<?php get_header(); ?>
<article class="l-content work" itemscope itemtype="http://schema.org/CreativeWork">
	<div class="l-container">
		<div class="work__copy">
			<h1 class="heading-2" itemprop="name"><?php the_title(); ?></h1>
			<div itemprop="description">
				<?php echo esc_html( wp_strip_all_tags( get_field( 'page_content' ) ) ); ?>
				<?php if ( get_field( 'website_url' ) ) : ?>
				   &nbsp; <a href="<?php the_field( 'website_url' ); ?>" target="blank" class="work__url">View</a>
				<?php endif; ?>
			</div>
		</div>
		<?php $images = get_field( 'work_images' ); ?>
		<?php if ( $images ) : ?>
			<?php foreach ( $images as $image ) : ?>
				<div class="image-wrapper image-wrapper--16-9 work__image">
					<img class="lazyload" 
						 data-srcset="<?php echo esc_url( $image['sizes']['fullwidth-4000'] ); ?> 4000w,
									  <?php echo esc_url( $image['sizes']['fullwidth-2640'] ); ?> 2640w,
									  <?php echo esc_url( $image['sizes']['fullwidth-2000'] ); ?> 2000w,
									  <?php echo esc_url( $image['sizes']['fullwidth-1320'] ); ?> 1320w,
									  <?php echo esc_url( $image['sizes']['fullwidth-900'] ); ?> 900w,
									  <?php echo esc_url( $image['sizes']['fullwidth-600'] ); ?> 600w,
									  <?php echo esc_url( $image['sizes']['fullwidth-300'] ); ?> 300w"
						 data-src="<?php echo esc_url( $image['sizes']['fullwidth-600'] ); ?>" 
						 sizes="(min-width: 40em) calc(100vw - 4rem), calc(100vw - 2rem)"
						 alt="<?php echo esc_html( $image['alt'] ); ?>" itemprop="image" />
				</div>
			<?php endforeach; ?>
		<?php endif; ?>

		<?php
		if ( get_next_post() ) {
			next_post_link( '%link', 'Next' );
		} else {
			previous_post_link( '%link', 'Previous' );
		}
	   	?>
	</div>
</article>
<?php get_footer(); ?>
