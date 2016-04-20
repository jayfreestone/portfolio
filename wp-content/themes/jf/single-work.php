<?php get_header(); ?>
<article class="l-content work">
	<div class="l-container l-container--full">
		<div class="work__copy">
			<h1 class="heading-1"><?php the_title(); ?></h1>
			<?php the_field( 'page_content' ); ?>
		</div>
		<?php $images = get_field( 'work_images' ); ?>
		<?php if ( $images ) : ?>
		<?php foreach( $images as $image ) : ?>
		<div class="image-wrapper image-wrapper--16-9 work__image">
			<img class="lazyload" data-src="<?php echo $image['sizes']['fullwidth']; ?>" alt="<?php echo $image['alt']; ?>" />
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
