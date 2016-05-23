<?php get_header(); ?>
<article class="dashboard">

	<?php require( 'includes/intro.php' ); ?>

	<div class="site-main">
		<section class="chunk dashboard__section dashboard__setup cf">
			<div class="chunk__inner l-container">
				<div class="chunk__primary">
					<h2 class="heading-1"><?php the_field( 'setup_title' ); ?></h2>
					<?php the_field( 'setup_copy' ); ?>
				</div>
				<div class="chunk__secondary">
					<div class="dashboard__setup__image">
						<?php include( 'img/dashboard/illustration.svg' ); ?>
					</div>
				</div>
			</div>
		</section>
		
		<section class="chunk chunk--swap dashboard__section dashboard__problems cf">
			<div class="chunk__inner l-container">
				<div class="chunk__primary">
					<h2 class="heading-1"><?php the_field( 'problem_title' ); ?></h2>
					<?php the_field( 'problem_copy' ); ?>
				</div>
				<div class="chunk__secondary">
					<div class="dashbaord__problems__image">
						<?php include( 'img/dashboard/problems.svg' ); ?>
					</div>
				</div>
			</div>
		</section>
		
		<section class="chunk dashboard__groundwork cf">
			<div class="chunk__inner l-container">
				<div class="chunk__primary">
					<h2 class="heading-1"><?php the_field( 'groundwork_title' ); ?></h2>
					<?php the_field( 'groundwork_copy' ); ?>
				</div>
				<div class="chunk__secondary">
					<div class="dashboard__groundwork__logo">
						<?php include( 'img/dashboard/react.svg' ); ?>
					</div>
				</div>
			</div>
		</section>

		<section class="dashboard__preview">
			<div class="dashboard__preview__image">
				<div class="image-wrapper image-wrapper--dashboard-preview">
					<img data-srcset="<?php echo esc_url( get_template_directory_uri() ); ?>/img/dashboard/dashboard-ipad-flat--large.png 2560w,
								 <?php echo esc_url( get_template_directory_uri() ); ?>/img/dashboard/dashboard-ipad-flat--medium.png 1280w,
								 <?php echo esc_url( get_template_directory_uri() ); ?>/img/dashboard/dashboard-ipad-flat--small.png 640w"
						 sizes="100vw, (min-width: 80em) 80rem"
						 data-src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/dashboard/dashboard-ipad-flat--medium.png" alt="Dashboard displayed on an iPad." class="lazyload">
					<noscript>
						<img src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/dashboard/dashboard-ipad-flat--medium.png" alt="Dashboard displayed on an iPad.">
					</noscript>
				</div>
			</div>
		</section>
		
		<section class="chunk chunk--swap dashboard__section dashboard__deployment cf">
			<div class="chunk__inner l-container">
				<div class="chunk__primary">
					<h2 class="heading-1"><?php the_field( 'deployment_title' ); ?></h2>
					<?php the_field( 'deployment_copy' ); ?>
				</div>
				<div class="chunk__secondary">
					<div class="dashboard__terminal">
						<div class="dashboard__terminal__top">
							<div class="dashboard__terminal__buttons"><span></span></div>
						</div>
						<div class="dashboard__terminal__main">
							<code>~ </code>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="chunk dashboard__bonus">
			<div class="chunk__inner l-container">
				<div class="chunk__primary">
					<h2 class="heading-1"><?php the_field( 'bonus_round_title' ); ?></h2>
					<?php the_field( 'bonus_round_copy' ); ?>
				</div>
				<div class="chunk__secondary">
					<?php include( 'img/dashboard/composer.svg' ); ?>
				</div>
			</div>
		</section>
		
		<section class="chunk chunk--single dashboard__section dashboard__demo">
			<div class="chunk__inner l-container">
				<div class="chunk__primary">
					<h2 class="heading-1">In Action</h2>
					<p>What you see is one-click deployment — what you don't see is the massive amount of time saved.</p>
				</div>
				<video onclick="this.paused ? this.play() : this.pause();">
					<source src="<?php echo get_template_directory_uri(); ?>/img/dashboard/dashboard-deployment.mp4" type="video/mp4">
				</video>
			</div>
		</section>

	</div>

</article>

<?php get_template_part( 'includes/work-navigation' ); ?>

<?php get_footer(); ?>
