<?php get_header(); ?>
<article class="dashboard">
	<header class="intro intro--dashboard whiteout cf">
		<div class="intro__background intro__background--dashboard is-hidden"></div>
		<div class="intro__overlay intro__overlay--dashboard"></div>
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
		<section class="chunk dashboard__section dashboard__setup cf">
			<div class="chunk__inner l-container">
				<div class="chunk__primary">
					<h2 class="heading-1"><?php the_field( 'setup_title' ); ?></h2>
					<?php the_field( 'setup_copy' ); ?>
				</div>
			</div>
			<div class="dashboard__setup__bg is-hidden"></div>
		</section>
		
		<section class="chunk chunk--swap dashboard__section dashboard__problems cf">
			<div class="chunk__inner l-container">
				<div class="chunk__primary">
					<h2 class="heading-1"><?php the_field( 'problem_title' ); ?></h2>
					<?php the_field( 'problem_copy' ); ?>
				</div>
				<div class="chunk__secondary">
					<img srcset="<?php echo get_template_directory_uri(); ?>/img/dashboard/dash-cube--xlarge.jpg 2000w,
								 <?php echo get_template_directory_uri(); ?>/img/dashboard/dash-cube--large.jpg 1200w,
								 <?php echo get_template_directory_uri(); ?>/img/dashboard/dash-cube--medium.jpg 700w,
								 <?php echo get_template_directory_uri(); ?>/img/dashboard/dash-cube--small.jpg 250w"
						 sizes="(min-width: 60em) 17vw, 33.33vw"
						 src="<?php echo get_template_directory_uri(); ?>/img/dashboard/dash-cube--medium.jpg" alt="Photo of a rubix cube.">
				</div>
			</div>
		</section>
		
		<section class="chunk dashboard__groundwork cf">
			<div class="chunk__inner l-container">
				<div class="chunk__primary">
					<h2 class="heading-1"><?php the_field( 'groundwork_title' ); ?></h2>
					<?php the_field( 'groundwork_copy' ); ?>
				</div>
				<div class="chunk__secondary dashboard__groundwork__logo">
					<?php include( 'img/dashboard/react.svg' ); ?>
				</div>
			</div>
		</section>

		<section class="dashboard__preview">
			<img src="<?php echo get_template_directory_uri(); ?>/img/dashboard/dashboard-ipad-flat.png" alt="Dashboard displayed on an iPad.">
		</section>
		
		<section class="chunk chunk--swap dashboard__section dashboard__deployment cf">
			<div class="chunk__inner l-container">
				<div class="chunk__primary">
					<h2 class="heading-1"><?php the_field( 'deployment_title' ); ?></h2>
					<?php the_field( 'deployment_copy' ); ?>
				</div>
				<div class="chunk__secondary">
					<div class="dashboard__terminal">
						<div class="dashboard__terminal__buttons"><span></span></div>
						<code>~ </code>
					</div>
				</div>
			</div>
		</section>
		
		<section class="chunk dashboard__section dashboard__bonus">
			<div class="chunk__inner l-container">
				<div class="chunk__primary">
					<h2 class="heading-1"><?php the_field( 'bonus_round_title' ); ?></h2>
					<?php the_field( 'bonus_round_copy' ); ?>
				</div>
				<div class="chunk__secondary">
					<img src="<?php echo get_template_directory_uri(); ?>/img/dashboard/dash-composer.png" alt="Composer Generator on OV Dash">
				</div>
			</div>
		</section>
	</div>

</article>

<?php
if ( get_previous_post() ) {
	previous_post_link( '%link', 'Next' );
} else {
	next_post_link( '%link', 'Previous' );
}
?>
<?php get_footer(); ?>
