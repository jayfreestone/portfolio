<?php get_header(); ?>

	<?php
	$work = new WP_Query(array(
		'post_type' => 'work',
		'posts_per_page' => 6,
		'orderby' => 'menu_order',
		'order' => 'ASC',
	));
	$workCount = $work->post_count;
	?>

	<div class="work-preview-container">

		<div class="work-preview__label">
			<span>
				<a href="" target="_blank">mail@jayfreestone.com</a>
			</span>
		</div>

	<?php if ( $work->have_posts() ) : ?>

		<nav class="work-preview-container__nav">
			<ul>
				<?php for ( $x = 0; $x < $workCount; $x++ ) : ?>
					<li class="work-preview-container__nav__item"><a href="work-preview--<?php echo $x + 1; ?>">0<?php echo $x + 1; ?></a></li>
				<?php endfor ?>
			</ul>
		</nav>

		<?php $i = 0; ?>

		<?php while ( $work->have_posts() ) : $work->the_post(); ?>

			<?php
			$i++;
			$workClass = 'work-preview';
			$workClass .= ' work-preview--' . $i;

			if ( get_field( 'whiteout' ) ) {
				$workClass .= ' work-preview--whiteout';
			}

			if ( get_field( 'text_on_right' ) ) {
				$workClass .= ' work-preview--text-on-right';
			}

			if ($i >= 2) {
				$workClass .= ' work-preview--next';
			}
		   	?>

			<article id="work-preview--<?php echo $i; ?>" class="<?php echo $workClass; ?>" style="background-color: <?php the_field( 'homepage_background_color' ); ?>">
				<div class="work-preview__copy">
					<a href="<?php the_permalink(); ?>">
						<h2 class="heading-1"><?php the_title(); ?></h2>
						<?php the_field( 'homepage_intro' ); ?>
						<span href="<?php the_permalink(); ?>" class="work-preview__link">
							View Work
						</span>
					</a>
				</div>

				<div class="work-preview__image">
					<!-- <div class="image&#45;wrapper image&#45;wrapper&#45;&#45;home"> -->
						<?php 
						$workImage = get_field( 'homepage_image' );
						$homepage = $workImage['sizes']['homepage'];
						?>
						<!-- <img class="lazyload" data&#45;src="<?php echo $homepage; ?>" alt="<?php the_title(); ?> Thumbnail"> -->
					<!-- </div> -->
				</div>
			</article>

		<?php endwhile; ?>

	<?php endif; ?>

	</div>

<?php get_footer(); ?>
