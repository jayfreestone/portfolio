<?php get_header(); ?>
<article class="dashboard">
	<header class="intro intro--dashboard whiteout cf">
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
		</section>
		
		<section class="chunk chunk--swap dashboard__section dashboard__problems whiteout cf">
			<div class="chunk__inner l-container">
				<div class="chunk__primary">
					<h2 class="heading-1"><?php the_field( 'problem_title' ); ?></h2>
					<?php the_field( 'problem_copy' ); ?>
				</div>
				<div class="chunk__secondary">
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
			<div class="l-container">
				<img src="<?php echo get_template_directory_uri(); ?>/img/dashboard/dashboard-ipad-flat.png" alt="Dashboard displayed on an iPad.">
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
						<div class="dashboard__terminal__buttons"><span></span></div>
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
			</div>
		</section>
	</div>

</article>
<?php get_footer(); ?>
