<?php get_header(); ?>
	<article class="prime-labs">
		<header class="intro intro--prime-labs whiteout cf">
			<div class="intro__overlay intro__overlay--prime-labs"></div>
			<div class="intro__content l-container">
				<div class="intro__copy">
					<span class="badge">Case Study</span>
					<h1 class="heading-1 intro__title"><?php the_field( 'title' ); ?></h1>
					<div class="intro__description"><?php the_field( 'intro' ); ?></div>
				</div>
				<ul class="intro__skillset">
					<?php if ( have_rows( 'skills' ) ) : ?>
						<?php while ( have_rows( 'skills' ) ) : the_row(); ?><!--
							--><li><?php the_sub_field( 'skill' ); ?></li><!--
						--><?php endwhile; ?>
					<?php endif; ?>
				</ul>
			</div>
		</header>
		<div class="site-main">
			<section class="chunk prime-labs__section prime-labs__section--backstory">
				<div class="chunk__inner l-container">
					<div class="chunk__primary">
						<h2 class="heading-1">The Backstory</h2>
						<?php the_field( 'the_backstory' ); ?>
					</div>
					<div class="chunk__secondary">
						<picture>
							<source srcset="<?php echo esc_url( get_template_directory_uri() ); ?>/img/primelabs/primelabs-collab.svg" media="(min-width: 40em)">
							<source srcset="<?php echo esc_url( get_template_directory_uri() ); ?>/img/primelabs/primelabs-collab-mobile.svg">
							<img class="primelabs__collab" src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/primelabs/primelabs-collab-mobile.svg" alt="Prime Labs and Jay Freestone logos">
						</picture>
					</div>
				</div>
			</section>
			<section class="chunk chunk--swap prime-labs__section--problems">
				<div class="chunk__inner l-container">
					<div class="chunk__primary">
						<h2 class="heading-1">The Problems</h2>
						<?php the_field( 'the_problems' ); ?>
						<p>Let's start with the product...</p>
					</div>
				</div>
			</section>
			<section class="chunk">
				<div class="l-container chunk__inner">
					<div class="chunk__primary">
						<h2 class="heading-1">What's a Smart Drug</h2>
						<?php the_field( 'whats_a_smart_drug' ); ?>
					</div>
				</div>
			</section>
			<section class="chunk chunk--swap whiteout prime-labs__section--day-life">
				<div class="l-container chunk__inner">
					<div class="chunk__primary">
						<h2 class="heading-1">A Day in the Life</h2>
						<?php the_field( 'a_day_in_the_life' ); ?>
					</div>
				</div>
			</section>
			<section class="chunk chunk--single">
				<div class="chunk__inner l-container">
					<div class="chunk__primary">
						<h2 class="heading-1">Round & Round</h2>
						<?php the_field( 'round_&_round' ); ?>
					</div>
				</div>
			</section>
			<section class="chunk prime-labs__section--modular-boxes">
				<div class="chunk__inner l-container">
					<div class="chunk__primary">
						<h2 class="heading-1">Modular Boxes</h2>
						<?php the_field( 'modular_boxes_part_one' ); ?>
						<?php the_field( 'modular_boxes_part_two' ); ?>
						<img class="prime-labs__box prime-labs__box--description" src="<?php echo get_template_directory_uri(); ?>/img/primelabs/description.png">
						<img class="prime-labs__box prime-labs__box--ingredients" src="<?php echo get_template_directory_uri(); ?>/img/primelabs/ingredients.png">
					</div>
				</div>
			</section>
			<section class="chunk chunk--swap">
				<div class="chunk__inner l-container">
					<div class="chunk__primary">
						<h2 class="heading-1">Graceful Growth</h2>
						<?php the_field( 'graceful_growth_part_one' ); ?>
						<?php the_field( 'graceful_growth_part_two' ); ?>
					</div>
				</div>
			</section>
			<section class="chunk">
				<div class="chunk__inner l-container">
					<div class="chunk__primary">
						<h2 class="heading-1">Brand</h2>
						<?php the_field( 'brand' ); ?>
					</div>
				</div>
			</section>
			<section class="chunk chunk--swap">
				<div class="chunk__inner l-container">
					<div class="chunk__primary">
						<h2 class="heading-1">Platform</h2>
						<?php the_field( 'platform_part_one' ); ?>
						<?php the_field( 'platform_part_two' ); ?>
					</div>
				</div>
			</section>
			<section class="chunk prime-labs__section--as-standard">
				<div class="chunk__inner l-container">
					<div class="chunk__primary">
						<h2 class="heading-1">As Standard</h2>
						<?php the_field( 'as_standard' ); ?>
					</div>
					<div class="chunk__secondary">
						<video class="prime-labs__video" width="870" height="473" loop>
							<source src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/primelabs/prime-labs-resize-video.mp4" type="video/mp4">
							<!-- <source src="/img/casestudies/primelabs/prime&#45;labs&#45;resize&#45;video.webm" type="video/webm"> -->
						</video>
					</div>
				</div>
			</section>
			<section class="chunk chunk--swap">
				<div class="chunk__inner l-container">
					<div class="chunk__primary">
						<h2 class="heading-1">Reflections</h2>
						<?php the_field( 'reflections' ); ?>
					</div>
				</div>
			</section>
		</div>
	</article>
<?php get_footer(); ?>
