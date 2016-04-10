<?php get_header(); ?>
<div class="l-content">
	<div class="l-container">
		<h1 class="heading-1"><?php the_title(); ?></h1>

		<div class="about cf">
			<?php 
			$photo = get_field( 'photo' );
			$widePhoto = get_field( 'photo_wide' );
			?>
			
			<picture class="about__image">
				<source data-srcset="<?php echo $photo['url']; ?>" media="(min-width: 60em)">
				<source data-srcset="<?php echo $widePhoto['url']; ?>">
				<img class="lazyload" data-src="<?php echo $widePhoto['url'] ?>" alt="Photo of Jay Freestone">
			</picture>

			<div class="about__content">
				<?php the_field( 'page_content' ); ?>
			</div>
			
			<div class="about__currently">
				<?php if ( have_rows( 'currently' ) ) : ?>
					<ul class="link-widget">
					<?php while ( have_rows( 'currently' ) ) : the_row(); ?>
						<li>
							<h3 class="heading-3"><?php the_sub_field( 'type' ); ?></h3>
							<?php the_sub_field( 'thing' ); ?>
						</li>
					<?php endwhile; ?>
					</ul>
				<?php endif; ?>
			</div>
			
		</div>
	</div>
</div>
<?php get_footer(); ?>
