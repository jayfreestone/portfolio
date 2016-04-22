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
			$widePhoto = get_field( 'photo_wide' );
			?>

			<div class="about__image">
			   <div class="image-wrapper image-wrapper--about">
			      <picture>
			         <source data-srcset="<?php echo $widePhoto['url']; ?>" media="(min-width: 75em)">
			         <source data-srcset="<?php echo $photo['url']; ?>" media="(min-width: 60em)">
			         <source data-srcset="<?php echo $widePhoto['url']; ?>" media="(min-width: 32em)">
			         <source data-srcset="<?php echo $photo['url']; ?>">
			         <img class="lazyload" data-src="<?php echo $photo['url'] ?>" alt="Photo of Jay Freestone">
			      </picture>
			   </div>
			</div>

			
		</div>
	</div>
</div>
<?php get_footer(); ?>
