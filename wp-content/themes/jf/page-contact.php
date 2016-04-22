
<?php get_header(); ?>
 <div class="l-container">
	   <div class="contact">
	     <!-- <h1 class="heading&#45;1"><?php the_title(); ?></h1> -->
	     <div class="contact__inner">
			<a class="heading-1 contact__email" href="mailto:mail@jayfreestone.com">mail@jayfreestone.com</a>
			<div class="contact__copy"><?php the_field( 'page_content' ); ?></div>
			<ul class="contact__links">
			   <li><a href="">Twitter</a></li>
			   <li><a href="">Github</a></li>
			</ul>
	     </div>
	  </div>
 </div>
<?php get_footer(); ?>
