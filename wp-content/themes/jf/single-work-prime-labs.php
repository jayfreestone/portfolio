<?php get_header(); ?>
	<article class="prime-labs">
		<header class="prime-labs__section prime-labs__section--intro">
			<div class="l-container">
				<h1 class="heading-1"><?php the_field( 'title' ); ?></h1>
				<?php the_field( 'intro' ); ?>
			</div>
		</header>
		<div class="site-main">
			<section class="prime-labs__section prime-labs__section--backstory">
				<div class="l-container">
					<h2 class="heading-2">The Backstory</h2>
					<?php the_field( 'the_backstory' ); ?>
					<picture>
						<source srcset="<?php echo get_template_directory_uri(); ?>/img/primelabs/primelabs-collab.svg" media="(min-width: 40em)">
						<source srcset="<?php echo get_template_directory_uri(); ?>/img/primelabs/primelabs-collab-mobile.svg">
						<img class="primelabs__collab" src="<?php echo get_template_directory_uri(); ?>/img/primelabs/primelabs-collab-mobile.svg" alt="Prime Labs and Jay Freestone logos">
					</picture>
				</div>
			</section>
			<section class="prime-labs__section prime-labs__section--problems">
				<div class="l-container">
					<h2 class="heading-2">The Problems</h2>
					<?php the_field( 'the_problems' ); ?>
					<p>Let's start with the product...</p>
				</div>
			</section>
			<section class="prime-labs__section">
				<div class="l-container">
					<h2 class="heading-2">What's a Smart Drug</h2>
					<?php the_field( 'whats_a_smart_drug' ); ?>
				</div>
			</section>
			<section class="prime-labs__section prime-labs__section--day-life">
				<div class="l-container">
					<h2 class="heading-2">A Day in the Life</h2>
					<?php the_field( 'a_day_in_the_life' ); ?>
				</div>
			</section>
			<section class="prime-labs__section">
				<div class="l-container">
					<h2 class="heading-2">Round & Round</h2>
					<?php the_field( 'round_&_round' ); ?>
				</div>
			</section>
			<section class="prime-labs__section prime-labs__section--modular-boxes">
				<div class="l-container">
					<h2 class="heading-2">Modular Boxes</h2>
					<?php the_field( 'modular_boxes_part_one' ); ?>
					<?php the_field( 'modular_boxes_part_two' ); ?>
					<img class="prime-labs__box prime-labs__box--description" src="<?php echo get_template_directory_uri(); ?>/img/primelabs/description.png">
					<img class="prime-labs__box prime-labs__box--ingredients" src="<?php echo get_template_directory_uri(); ?>/img/primelabs/ingredients.png">
				</div>
			</section>
			<section class="prime-labs__section">
				<div class="l-container">
					<h2 class="heading-2">Graceful Growth</h2>
					<?php the_field( 'graceful_growth_part_one' ); ?>
					<?php the_field( 'graceful_growth_part_two' ); ?>
				</div>
			</section>
			<section class="prime-labs__section">
				<div class="l-container">
					<h2 class="heading-2">Brand</h2>
					<?php the_field( 'brand' ); ?>
				</div>
			</section>
			<section class="prime-labs__section">
				<div class="l-container">
					<h2 class="heading-2">Platform</h2>
					<?php the_field( 'platform_part_one' ); ?>
					<?php the_field( 'platform_part_two' ); ?>
				</div>
			</section>
			<section class="prime-labs__section prime-labs__section--as-standard">
				<div class="l-container">
					<h2 class="heading-2">As Standard</h2>
					<?php the_field( 'as_standard' ); ?>
					<video class="prime-labs__video" width="870" height="473" loop>
						<source src="<?php echo get_template_directory_uri(); ?>/img/primelabs/prime-labs-resize-video.mp4" type="video/mp4">
						<!-- <source src="/img/casestudies/primelabs/prime&#45;labs&#45;resize&#45;video.webm" type="video/webm"> -->
					</video>
				</div>
			</section>
			<section class="prime-labs__section">
				<div class="l-container">
					<h2 class="heading-2">Reflections</h2>
					<?php the_field( 'reflections' ); ?>
				</div>
			</section>
		</div>
	</article>
<?php get_footer(); ?>
