<?php
global $post;
if ( $post && $post->post_parent ) {
	wp_redirect( get_permalink( $post->post_parent ), 301 );
	exit;
} else {
	wp_redirect( home_url( '/' ), 301 );
	exit;
}
