<?php $type = get_the_terms( $post, 'type' ); ?>
<?php if ( $type ) : ?>
	<span class="badge"><?php echo esc_html( $type[0]->name ); ?></span>
<?php endif; ?>
