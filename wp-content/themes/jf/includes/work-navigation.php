<?php if ( get_previous_post() ) : ?>
	<span class="nav-link nav-link--previous">
		<?php previous_post_link( '%link', 'Next' ); ?>
	</span>
<?php else : ?>
	<span class="nav-link nav-link--next">
		<?php next_post_link( '%link', 'Previous' ); ?>
	</span>
<?php endif; ?>
