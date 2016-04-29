<?php get_header(); ?>
<article class="dashboard">
	<header class="intro dashboard__header chunk whiteout cf">
		<div class="chunk__inner l-container">
			<div class="chunk__primary">
				<h1 class="heading-1"><?php the_field( 'title' ); ?></h1>
				<?php the_field( 'intro' ); ?>
			</div>
			<div class="chunk__secondary">
				<div class="image-wrapper image-wrapper--dashboard-intro">
					<img src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/dashboard/dash-ipad-straight.png" alt="Dashboard on an iPad">
				</div>
			</div>
		</div>
	</header>

	<div class="site-main">
		<section class="chunk dashboard__section dashboard__setup cf">
			<div class="chunk__inner l-container">
				<div class="chunk__primary">
					<h2 class="heading-2"><?php the_field( 'setup_title' ); ?></h2>
					<?php the_field( 'setup_copy' ); ?>
				</div>
			</div>
		</section>
		
		<section class="chunk chunk--swap dashboard__section dashboard__problems cf">
			<div class="chunk__inner l-container">
				<div class="chunk__primary">
					<h2 class="heading-2"><?php the_field( 'problem_title' ); ?></h2>
					<?php the_field( 'problem_copy' ); ?>
				</div>
				<div class="chunk__secondary">
				</div>
			</div>
		</section>
		
		<section class="chunk dashboard__groundwork cf">
			<div class="chunk__inner l-container">
				<div class="chunk__primary">
					<h2 class="heading-2"><?php the_field( 'groundwork_title' ); ?></h2>
					<?php the_field( 'groundwork_copy' ); ?>
				</div>
				<div class="chunk__secondary dashboard__groundwork__logo">
					<?php include( 'img/dashboard/react.svg' ); ?>
				</div>
			</div>
		</section>
		
		<section class="dashboard__site-scroll">
			<div class="dashboard__site-scroll__inner">
				<img src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/dashboard/site-scroll.png" alt="Dashboard screenshot">
			</div>
		</section>
		
		<section class="chunk chunk--swap dashboard__section dashboard__deployment cf">
			<div class="chunk__inner l-container">
				<div class="chunk__primary">
					<h2 class="heading-2"><?php the_field( 'deployment_title' ); ?></h2>
					<?php the_field( 'deployment_copy' ); ?>
				</div>
				<div class="chunk__secondary">
					<div class="dashboard__terminal">
						<div class="dashboard__terminal__buttons"><span></span></div>
					</div>
				</div>
			</div>
		</section>
		
		<section class="chunk dashboard__section dashboard__bonus">
			<div class="chunk__inner l-container">
				<div class="chunk__primary">
					<h2 class="heading-2"><?php the_field( 'bonus_round_title' ); ?></h2>
					<?php the_field( 'bonus_round_copy' ); ?>
				</div>
			</div>
		</section>
	</div>

</article>
<?php get_footer(); ?>
