<?php get_header(); ?>
	<article class="prime-labs">
		<?php get_template_part( 'includes/intro' ); ?>
		<div class="site-main">
			<section class="chunk prime-labs__backstory">
				<div class="chunk__inner l-container">
					<div class="chunk__primary">
						<h2 class="heading-1">The Backstory</h2>
						<?php the_field( 'the_backstory' ); ?>
					</div>
					<div class="chunk__secondary">
						<svg id="prime-labs__backstory__logo" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="662.3" height="243.17" viewBox="0 0 662.3 243.17"><title>Prime-Labs-Remade</title><path id="Type" d="M231.47,145.69q-5.85-6.06-17.77-6.07H188.33a7.77,7.77,0,0,0-7.8,7.8v66.76h15.39V187.53h18.86q11.06,0,16.91-6.07,5.85-6.5,5.85-17.77Q237.54,151.76,231.47,145.69Zm-11.92,25.79q-2.6,2.6-8.67,2.6h-15V152.63h15.82a11.91,11.91,0,0,1,8,2.6,11.91,11.91,0,0,1,2.6,8Q222.37,169.1,219.55,171.48Zm50.05-15h1.08v15.39h-5q-6.29,0-9.32,3t-3,9.54v29.7H238.17v-28a35.7,35.7,0,0,1,2.49-14.2,23.5,23.5,0,0,1,6.83-9.21,26.86,26.86,0,0,1,9.65-4.77,42.89,42.89,0,0,1,11.38-1.52h1.08Zm19.1,2.17a7.11,7.11,0,0,1,2.17,5.2v50.29H275.69V156.52h7.8A7.12,7.12,0,0,1,288.7,158.69Zm0-16.91a7.11,7.11,0,0,1,2.17,5.2v4.55H275.69V139.62h7.8A7.11,7.11,0,0,1,288.7,141.79Zm92.82,38.58v33.82h-7.59a7.06,7.06,0,0,1-7.37-7.37V177.34q0-5.2-3.14-7.59a11.6,11.6,0,0,0-14.09,0q-3.15,2.39-3.14,7.59v36.85h-15V177.34q0-5.2-3.14-7.59a11.39,11.39,0,0,0-7-2.38,10.93,10.93,0,0,0-6.94,2.38q-3,2.39-3,7.59v36.85H295.89V180.37q0-14.74,7.7-19.72a33.64,33.64,0,0,1,17-5.42,44,44,0,0,1,9.75,1.08,20.53,20.53,0,0,1,8.67,4.34,19.17,19.17,0,0,1,7.7-4,43.22,43.22,0,0,1,9.21-1.41,32.62,32.62,0,0,1,17.56,5Q381.51,165.2,381.51,180.37ZM432.69,163q-7.16-7.81-20.16-7.81-12.36,0-19.29,8-6.72,7.8-6.72,21.68,0,14.52,6.94,22.33,6.93,8,19.29,8,10.19,0,16.91-5,6.72-4.77,9.11-13.87H427.92a6.45,6.45,0,0,0-4,1.08,4.67,4.67,0,0,0-1.63,1.73l-1.19,1.19a3,3,0,0,1-1.19.76,12.28,12.28,0,0,1-6.29,1.52q-5.64,0-8.45-3.47-3-3.25-3.25-10h37.5a3.8,3.8,0,0,0,.22-1.52v-2.38Q439.63,171,432.69,163ZM401.91,179.5q0.21-5.63,3.25-8.67a10.56,10.56,0,0,1,7.8-3q5.2,0,8,3,2.6,2.82,3,8.67H401.91Zm57.68,20.81H496v13.87H444.2V147.42a7.77,7.77,0,0,1,7.8-7.8h7.59v60.7Zm84.36-41q-6.07-4.12-18.21-4.12-10.84,0-16.69,5A16.69,16.69,0,0,0,503,171.27h14.53A5.91,5.91,0,0,1,521,168a15.89,15.89,0,0,1,5.42-.87,22.31,22.31,0,0,1,6.18,1,4.1,4.1,0,0,1,3.36,4.23q0,4.34-9.53,5.64c-1.3.15-2.46,0.32-3.47,0.54a12.75,12.75,0,0,1-2.6.32,30.62,30.62,0,0,0-13.55,5.2q-5.31,3.9-5.31,13,0,9.76,5.85,14A22.69,22.69,0,0,0,521,215.27a87.31,87.31,0,0,0,9-.54,26.7,26.7,0,0,0,9.65-2.93,19.23,19.23,0,0,0,7.48-7q3.14-4.87,3.14-13.55V171.48A13.92,13.92,0,0,0,544,159.34Zm-7.8,31.22q0,6.07-3.47,9.54t-9.54,3.47a8.2,8.2,0,0,1-5.63-1.73,7,7,0,0,1-2-5.2,8.82,8.82,0,0,1,1.52-4.77,12.88,12.88,0,0,1,5.64-2.82l5-1.08a40.93,40.93,0,0,0,8.46-2.82v5.42Zm66.35-26.88q-6.5-8.46-16.69-8.46a19.42,19.42,0,0,0-9.54,2.17,18.28,18.28,0,0,0-6.94,6.72V146.77A7.39,7.39,0,0,0,562,139.4H554.6V189q0,15.39,8.88,20.81a36.39,36.39,0,0,0,19.3,5.42,34.5,34.5,0,0,0,10.94-1.84,18.18,18.18,0,0,0,8.78-6q6.5-8.45,6.5-21.9T602.5,163.68ZM590.8,198.15a10.76,10.76,0,0,1-9.32,4.55,10.54,10.54,0,0,1-9.1-4.55q-3-4.12-3-13.22,0-7.8,3.26-12.35,3.25-4.34,9.32-4.33a10.34,10.34,0,0,1,8.89,4.55q3.25,4.34,3.25,12.14Q594,193.6,590.8,198.15Zm72.85-2.38q0,9.54-6.93,14.74-6.51,4.77-19.51,4.77-12.35,0-18.42-5-6.29-5-6.29-14.52v-0.65h14.74a8,8,0,0,0,3.25,6.5,15.39,15.39,0,0,0,8.67,2.17,14,14,0,0,0,6.72-1.52,4.61,4.61,0,0,0,2.6-4.12q0-3.9-9.11-5.85a41.33,41.33,0,0,1-5.85-1.3q-11.5-2.81-15.39-6.72a13.31,13.31,0,0,1-4.33-10.4,17.27,17.27,0,0,1,6.29-13.65q6.5-5,16.91-5,11.27,0,18,5a19.07,19.07,0,0,1,6.73,14.09h-9.33a6.88,6.88,0,0,1-6.28-3.69l-1.73-1.73a11.68,11.68,0,0,0-7.15-2q-4.34,0-6.5,1.3a4.37,4.37,0,0,0-2,3.9q0,3.47,11.27,5.85a22.75,22.75,0,0,0,2.28.65,8.42,8.42,0,0,0,1.84.22q11.05,2.82,15.39,6.5A13.67,13.67,0,0,1,663.65,195.76Z" transform="translate(-1.35 -1.42)" fill="#223b4c"/><g id="Icon"><path d="M167.76,142.63L156,149.44v0a72.14,72.14,0,0,1,0,23.86v0l11.79,6.81a2.21,2.21,0,0,1,.81,3l-22.85,39.58a2.22,2.22,0,0,1-1.92,1.11,2.24,2.24,0,0,1-1.11-.3l-11.8-6.82,0,0a71.84,71.84,0,0,1-20.66,11.94h0v13.61a2.22,2.22,0,0,1-2.22,2.22H62.26A2.22,2.22,0,0,1,60,242.37V228.76h0a71.79,71.79,0,0,1-20.66-11.94l0,0-11.8,6.81a2.21,2.21,0,0,1-3-.81L1.65,183.21a2.22,2.22,0,0,1,.81-3l11.79-6.81v0a72.4,72.4,0,0,1,0-23.86v0L2.46,142.63a2.21,2.21,0,0,1-.81-3L24.5,100a2.22,2.22,0,0,1,3-.81L39.32,106l0,0A71.65,71.65,0,0,1,60,94.06h0V76.75a2.22,2.22,0,0,1,2.22-2.22h5.85a2.22,2.22,0,0,1,2.22,2.22v28.81a2.22,2.22,0,0,1-1.57,2.12,56.15,56.15,0,1,0,32.71,0,2.22,2.22,0,0,1-1.57-2.12V76.75a2.22,2.22,0,0,1,2.22-2.22H108a2.22,2.22,0,0,1,2.22,2.22v17.3h0A71.66,71.66,0,0,1,130.86,106l0,0,11.8-6.81a2.22,2.22,0,0,1,3,.81l22.85,39.58A2.21,2.21,0,0,1,167.76,142.63Z" transform="translate(-1.35 -1.42)" fill="#223b4c"/><path d="M87.06,158.2c20.24,14.27,38.75,6.76,46.46,2.34,0,1.09,0,2.19,0,3.29a48,48,0,0,1-96-1.75C45.5,156,66.18,143.48,87.06,158.2Z" transform="translate(-1.35 -1.42)" fill="#ff622b"/><circle id="bubbleBottom" cx="78.74" cy="59.83" r="7.91" fill="#ff622b"/><circle id="bubbleMiddle" cx="100.38" cy="39.24" r="9.32" fill="#ff622b"/><path id="bubbleTop" d="M64.84,15A13.58,13.58,0,1,1,78.41,28.58,13.58,13.58,0,0,1,64.84,15Z" transform="translate(-1.35 -1.42)" fill="#ff622b"/></g></svg>
					</div>
				</div>
			</section>
			<section class="chunk chunk--single prime-labs__problems">
				<div class="chunk__inner l-container">
					<div class="chunk__primary">
						<h2 class="heading-1">The Problems</h2>
						<?php the_field( 'the_problems' ); ?>
					</div>
				</div>
			</section>
			<section class="chunk chunk--swap prime-labs__what-is">
				<div class="l-container chunk__inner">
					<div class="chunk__primary">
						<h2 class="heading-1">What's a Smart Drug</h2>
						<?php the_field( 'whats_a_smart_drug' ); ?>
					</div>
					<div class="chunk__secondary">
					</div>
				</div>
			</section>
			<section class="chunk whiteout prime-labs__day-life">
				<div class="l-container chunk__inner">
					<div class="chunk__primary">
						<h2 class="heading-1">A Day in the Life</h2>
						<?php the_field( 'a_day_in_the_life' ); ?>
					</div>
					<div class="chunk__secondary"></div>
				</div>
			</section>
			<section class="chunk chunk--single prime-labs__carousel">
				<div class="chunk__inner l-container">
					<div class="chunk__primary">
						<h2 class="heading-1">Round & Round</h2>
						<?php the_field( 'round_&_round' ); ?>
					</div>
				</div>
			</section>
			<section class="chunk prime-labs__modular-boxes">
				<div class="chunk__inner l-container">
					<div class="chunk__primary">
						<h2 class="heading-1">Modular Boxes</h2>
						<?php the_field( 'modular_boxes_part_one' ); ?>
						<?php the_field( 'modular_boxes_part_two' ); ?>
					</div>
					<div class="chunk__secondary">
						<img src="<?php echo get_template_directory_uri(); ?>/img/primelabs/pl-modular-boxes.svg" alt="">
					</div>
				</div>
			</section>
			<section class="chunk chunk--single prime-labs__growth">
				<div class="chunk__inner l-container">
					<div class="chunk__primary">
						<h2 class="heading-1">Graceful Growth</h2>
						<?php the_field( 'graceful_growth_part_one' ); ?>
						<?php the_field( 'graceful_growth_part_two' ); ?>
					</div>
					<div class="chunk__secondary">
						<img src="<?php echo get_template_directory_uri(); ?>/img/primelabs/pl-product-list.png" alt="">
					</div>
				</div>
			</section>
			<section class="chunk prime-labs__brand whiteout">
				<div class="chunk__inner l-container">
					<div class="chunk__primary">
						<h2 class="heading-1">Brand</h2>
						<?php the_field( 'brand' ); ?>
					</div>
					<div class="chunk__secondary">
						<img src="<?php echo get_template_directory_uri(); ?>/img/primelabs/pl-iphone.png" alt="">
					</div>
				</div>
			</section>
			<section class="chunk chunk--swap">
				<div class="chunk__inner l-container">
					<div class="chunk__primary">
						<h2 class="heading-1">Platform</h2>
						<?php the_field( 'platform_part_one' ); ?>
						<?php the_field( 'platform_part_two' ); ?>
					</div>
					<div class="chunk__secondary">
						<img src="<?php echo get_template_directory_uri(); ?>/img/primelabs/pl-custom-fields.png" alt="">
					</div>
				</div>
			</section>
			<section class="chunk  prime-labs__as-standard">
				<div class="chunk__inner l-container">
					<div class="chunk__primary">
						<h2 class="heading-1">As Standard</h2>
						<?php the_field( 'as_standard' ); ?>
					</div>
					<div class="chunk__secondary">
						<video class="prime-labs__video" width="870" loop>
							<source src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/primelabs/prime-labs-resize-video.mp4" type="video/mp4">
							<!-- <source src="/img/casestudies/primelabs/prime&#45;labs&#45;resize&#45;video.webm" type="video/webm"> -->
						</video>
					</div>
				</div>
			</section>
			<section class="chunk chunk--single">
				<div class="chunk__inner l-container">
					<div class="chunk__primary">
						<h2 class="heading-1">Reflections</h2>
						<?php the_field( 'reflections' ); ?>
					</div>
				</div>
			</section>
		</div>
	</article>
<?php get_footer(); ?>
