<?php get_header(); ?>
<article class="dashboard">
	<header class="dashboard__header cf">
		<div class="l-container">
			<div class="dashboard__intro">
				<h1 class="heading-1"><?php the_field( 'title' ); ?></h1>
				<?php the_field( 'intro' ); ?>
			</div>
		</div>
	</header>

	<section class="dashboard__section dashboard__setup">
		<div class="l-container">
			<h2 class="heading-2"><?php the_field( 'setup_title' ); ?></h2>
			<?php the_field( 'setup_copy' ); ?>
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


	<section class="dashboard__section dashboard__problems whiteout">
		<div class="l-container">
			<h2 class="heading-2"><?php the_field( 'problem_title' ); ?></h2>
			<?php the_field( 'problem_copy' ); ?>
		</div>
	</section>

	<section class="dashboard__section dashboard__groundwork">
		<div class="l-container">
			<h2 class="heading-2"><?php the_field( 'groundwork_title' ); ?></h2>
			<?php the_field( 'groundwork_copy' ); ?>
		</div>
	</section>

	<section class="dashboard__site-scroll">
		<img src="<?php echo get_template_directory_uri(); ?>/img/dashboard/site-scroll.png" alt="Dashboard screenshot">
	</section>

	<section class="dashboard__section dashboard__deployment">
		<div class="l-container">
			<h2 class="heading-2"><?php the_field( 'deployment_title' ); ?></h2>
			<?php the_field( 'deployment_copy' ); ?>
		</div>
	</section>

	<section class="dashboard__section dashboard__bonus">
		<div class="l-container">
			<h2 class="heading-2"><?php the_field( 'bonus_round_title' ); ?></h2>
			<?php the_field( 'bonus_round_copy' ); ?>
		</div>
	</section>

</article>
<?php get_footer(); ?>
