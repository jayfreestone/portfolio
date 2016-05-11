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
				$work_class .= ' whiteout';
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
						<?php get_template_part( 'includes/type-badge' ); ?>
						<h2 class="heading-1 work-preview__title" itemprop="name"><?php the_title(); ?></h2>
						<div itemprop="description"><?php the_field( 'homepage_intro' ); ?></div>
						<span class="work-preview__link">View Work</span>
					</a>
				</div>

				<a class="work-preview__image" href="<?php the_permalink(); ?>">
					<?php $work_image = get_field( 'homepage_image' ); ?>

					<img class="work-preview__image-preload" 
						 srcset="<?php echo esc_url( $work_image['sizes']['homepage-300'] ); ?> 300w,
								 <?php echo esc_url( $work_image['sizes']['homepage-600'] ); ?> 600w,
								 <?php echo esc_url( $work_image['sizes']['homepage-1200'] ); ?> 1200w,
								 <?php echo esc_url( $work_image['sizes']['homepage-2000'] ); ?> 2000w"
						 sizes="(min-width: 60em) 58vw, (min-width: 40em) calc(100vw - 8rem), calc(100vw - 3rem)" 
						 src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="<?php the_title(); ?>">
				</a>


			</article>

		<?php endwhile; ?>

	<?php endif; ?>

	</div>

<?php get_footer(); ?>
