<?php get_header(); ?>

	<?php
	$work = get_recent_work();
	$work_count = $work->post_count;
	?>

	<div class="work-preview-container">

	<?php if ( $work->have_posts() ) : ?>

		<nav class="work-preview-container__nav">
			<ul>
				<?php for ( $x = 0; $x < $work_count; $x++ ) : ?>
					<li class="work-preview-container__nav__item"><a href="#work-preview--<?php echo esc_html( $x + 1 ); ?>">0<?php echo esc_html( $x + 1 ); ?></a></li>
				<?php endfor ?>
			</ul>
		</nav>

		<?php $i = 0; ?>

		<?php while ( $work->have_posts() ) : $work->the_post(); ?>

			<?php
			$i++;
			$work_class = 'work-preview';
			$work_class .= ' work-preview--' . $i;

			if ( get_field( 'whiteout' ) ) {
				$work_class .= ' work-preview--whiteout';
			}

			if ( get_field( 'text_on_right' ) ) {
				$work_class .= ' work-preview--text-on-right';
			}

			if ( $i >= 2 ) {
				$work_class .= ' work-preview--next';
			}
		   	?>

			<article id="work-preview--<?php echo esc_html( $i ); ?>" class="<?php echo esc_html( $work_class ); ?>" style="background-color: <?php the_field( 'homepage_background_color' ); ?>" itemscope itemtype="http://schema.org/CreativeWork">
				<div class="work-preview__copy">
					<a href="<?php the_permalink(); ?>">
						<?php $type = get_the_terms( $post, 'type' ); ?>
						<?php if ( $type ) : ?>
							<span class="badge"><?php echo esc_html( $type[0]->name ); ?></span>
						<?php endif; ?>
						<h2 class="heading-1 work-preview__title" itemprop="name"><?php the_title(); ?></h2>
						<span itemprop="description"><?php the_field( 'homepage_intro' ); ?></span>
						<span class="work-preview__link">
							View Work
						</span>
					</a>
				</div>

				<a class="work-preview__image is-hidden" href="<?php the_permalink(); ?>"></a>
			</article>

		<?php endwhile; ?>

	<?php endif; ?>

	</div>

<?php get_footer(); ?>
