<header class="intro intro--dashboard whiteout cf">
	<div class="intro__background intro__background--dashboard is-hidden"></div>
	<div class="intro__overlay intro__overlay--dashboard"></div>
	<div class="intro__content l-container">
		<div class="intro__copy">
			<span class="badge">Case Study</span>
			<h1 class="heading-1 intro__title"><?php the_field( 'title' ); ?></h1>
			<div class="intro__description"><?php the_field( 'intro' ); ?></div>
		</div>
	</div>
	<ul class="intro__skillset l-container">
		<?php if ( have_rows( 'skills' ) ) : ?>
			<?php while ( have_rows( 'skills' ) ) : the_row(); ?><!--
				--><li><?php the_sub_field( 'skill' ); ?></li><!--
			--><?php endwhile; ?>
		<?php endif; ?>
	</ul>
</header>
