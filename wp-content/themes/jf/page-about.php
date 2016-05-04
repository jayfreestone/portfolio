<?php get_header(); ?>
<div class="l-content">
	<div class="l-container">

		<div class="about cf">
			<div class="about__content">
			   <h1 class="heading-1"><?php the_title(); ?></h1>
				<?php the_field( 'page_content' ); ?>
			</div>

			<?php
			$photo = get_field( 'photo' );
			$wide_photo = get_field( 'photo_wide' );

			$photo_sizes = $photo['sizes'];
			$wide_photo_sizes = $wide_photo['sizes'];
			?>

			<div class="about__image">
			   <div class="image-wrapper image-wrapper--about">
			      <picture>
					 <source data-srcset="<?php echo esc_url( $wide_photo_sizes['landscape-3000'] ) ?> 3000w,
										  <?php echo esc_url( $wide_photo_sizes['landscape-2400'] ) ?> 2400w,
										  <?php echo esc_url( $wide_photo_sizes['landscape-1800'] ) ?> 1800w,
										  <?php echo esc_url( $wide_photo_sizes['landscape-1200'] ) ?> 1200w,
										  <?php echo esc_url( $wide_photo_sizes['landscape-900'] ) ?> 900w,
										  <?php echo esc_url( $wide_photo_sizes['landscape-600'] ) ?> 600w,
										  <?php echo esc_url( $wide_photo_sizes['fullwidth-300'] ) ?> 300w" 
										  media="(min-width: 75em)">
					 <source data-srcset="<?php echo esc_url( $photo_sizes['portrait-1200'] ); ?> 1200w,
										  <?php echo esc_url( $photo_sizes['portrait-900'] ) ?> 900w,
										  <?php echo esc_url( $photo_sizes['portrait-600'] ) ?> 600w,
										  <?php echo esc_url( $photo_sizes['portrait-300'] ) ?> 300w"
										  media="(min-width: 60em)">
					 <source data-srcset="<?php echo esc_url( $wide_photo_sizes['landscape-3000'] ) ?> 3000w,
										  <?php echo esc_url( $wide_photo_sizes['landscape-2400'] ) ?> 2400w,
										  <?php echo esc_url( $wide_photo_sizes['landscape-1800'] ) ?> 1800w,
										  <?php echo esc_url( $wide_photo_sizes['landscape-1200'] ) ?> 1200w,
										  <?php echo esc_url( $wide_photo_sizes['landscape-900'] ) ?> 900w,
										  <?php echo esc_url( $wide_photo_sizes['landscape-600'] ) ?> 600w,
										  <?php echo esc_url( $wide_photo_sizes['fullwidth-300'] ) ?> 300w" 
										  media="(min-width: 32em)">
					 <source data-srcset="<?php echo esc_url( $photo_sizes['portrait-1200'] ); ?> 1200w,
										  <?php echo esc_url( $photo_sizes['portrait-900'] ) ?> 900w,
										  <?php echo esc_url( $photo_sizes['portrait-600'] ) ?> 600w,
										  <?php echo esc_url( $photo_sizes['portrait-300'] ) ?> 300w">
			         <img class="lazyload" data-src="<?php echo esc_url( $photo_sizes['portrait-600'] ); ?>" alt="Photo of Jay Freestone">
			      </picture>

				  <noscript>
			         <img class="lazyload" src="<?php echo esc_url( $photo_sizes['portrait-600'] ); ?>" alt="Photo of Jay Freestone">
				  </noscript>
			   </div>
			</div>

			
		</div>
	</div>
</div>
<?php get_footer(); ?>
