<?php get_header(); ?>

	<?php
	$work = get_recent_work();
	$workCount = $work->post_count;
	?>

	<div class="work-preview-container">

	<?php if ( $work->have_posts() ) : ?>

		<nav class="work-preview-container__nav">
			<ul>
				<?php for ( $x = 0; $x < $workCount; $x++ ) : ?>
					<li class="work-preview-container__nav__item"><a href="work-preview--<?php echo esc_html( $x + 1 ); ?>">0<?php echo esc_html( $x + 1 ); ?></a></li>
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

			if ( $i >= 2 ) {
				$workClass .= ' work-preview--next';
			}
		   	?>

			<article id="work-preview--<?php echo esc_html( $i ); ?>" class="<?php echo esc_html( $workClass ); ?>" style="background-color: <?php the_field( 'homepage_background_color' ); ?>" itemscope itemtype="http://schema.org/CreativeWork">
				<div class="work-preview__copy">
					<a href="<?php the_permalink(); ?>">
						<h2 class="heading-1 work-preview__title" itemprop="name"><?php the_title(); ?></h2>
						<span itemprop="description"><?php the_field( 'homepage_intro' ); ?></span>
						<span href="<?php the_permalink(); ?>" class="work-preview__link">
							View Work
						</span>
					</a>
				</div>

				<div class="work-preview__image">
					<?php
					$workImage = get_field( 'homepage_image' );
					$homepage = $workImage['sizes']['homepage'];
					?>
				</div>
			</article>

		<?php endwhile; ?>

	<?php endif; ?>

	</div>

<?php get_footer(); ?>
