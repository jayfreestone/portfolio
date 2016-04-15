<?php get_header(); ?>
<article class="dashboard">
	<header class="intro dashboard__header whiteout cf">
		<div class="l-container">
			<div class="dashboard__intro">
				<h1 class="heading-1"><?php the_field( 'title' ); ?></h1>
				<?php the_field( 'intro' ); ?>
			</div>
			<div class="dashboard__header__image">
				<div class="image-wrapper image-wrapper--dashboard-intro">
					<img src="<?php echo get_template_directory_uri(); ?>/img/dashboard/dashboard-ipad.png" alt="Dashboard on an iPad">
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
				<div class="chunk__secondary">
					<img src="<?php echo get_template_directory_uri(); ?>/img/dashboard/dashboard-ipad.png" alt="Dashboard on an iPad">
				</div>
			</div>
		</section>
		
		<section class="dashboard__process cf">
			<div class="dashboard__height">
				<?php include 'img/dashboard/local.svg'; ?>
			</div>
			<div class="dashboard__process__inner">
				<figure class="dashboard__figure dashboard__figure--local">
					<?php include 'img/dashboard/local.svg'; ?>
					<figcaption>Local</figcaption>
				</figure>
				<div class="dashboard__connector dashboard__connector--capistrano">
					<div class="dashboard__connector__label">Capistrano</div>
					<div class="dashboard__connector__line">
						<span class="dashboard__connector__pulse"><span></span></span>
					</div>
				</div>
				<figure class="dashboard__figure dashboard__figure--remote">
					<?php include 'img/dashboard/server.svg'; ?>
					<figcaption>Webserver</figcaption>
				</figure>
				<div class="dashboard__connector dashboard__connector--git">
					<div class="dashboard__connector__label">Git (clone)</div>
					<div class="dashboard__connector__line">
						<span class="dashboard__connector__pulse"><span></span></span>
					</div>
				</div>
				<figure class="dashboard__figure dashboard__figure--git">
					<?php include 'img/dashboard/git.svg'; ?>
					<figcaption>Git Server</figcaption>
				</figure>
				<div class="dashboard__connector dashboard__connector--files">
					<div class="dashboard__connector__label">On server</div>
					<div class="dashboard__connector__line">
						<span class="dashboard__connector__pulse"><span></span></span>
					</div>
				</div>
				<figure class="dashboard__figure dashboard__figure--files">
					<?php include 'img/dashboard/files.svg'; ?>
					<figcaption>Files</figcaption>
				</figure>
				<div class="dashboard__connector dashboard__connector--releases">
					<div class="dashboard__connector__label">Build</div>
					<div class="dashboard__connector__line">
						<span class="dashboard__connector__pulse"><span></span></span>
					</div>
				</div>
				<figure class="dashboard__figure dashboard__figure--release">
					<?php include 'img/dashboard/release.svg'; ?>
					<figcaption>Release</figcaption>
				</figure>
			</div>
		</section>
		
		
		<section class="chunk chunk--swap dashboard__section dashboard__problems whiteout cf">
			<div class="chunk__inner l-container">
				<div class="chunk__primary">
					<h2 class="heading-2"><?php the_field( 'problem_title' ); ?></h2>
					<?php the_field( 'problem_copy' ); ?>
				</div>
				<div class="chunk__secondary">
					<img src="<?php echo get_template_directory_uri(); ?>/img/dashboard/dashboard-ipad.png" alt="Dashboard on an iPad">
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
				<img src="<?php echo get_template_directory_uri(); ?>/img/dashboard/site-scroll.png" alt="Dashboard screenshot">
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
