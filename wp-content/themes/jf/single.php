<?php get_header(); ?>
<div class="l-content">
	<div class="l-container">
		<div class="journal-single-container">
			<article class="journal-single" itemscope itemtype="http://schema.org/BlogPosting">
				<header class="journal-single__header">
					<h1 class="heading-1 journal-single__title"><?php the_title(); ?></h1>
					<span class="journal-single__date"><?php the_date(); ?></span>
				</header>
				<div class="journal-single__main">
                    <?php if ( have_rows( 'journal_content' ) ) : ?>
                        <?php while ( have_rows( 'journal_content' ) ) : the_row(); ?>
                            <?php if (  get_row_layout() == 'markdown_text' ) : ?>
								<?php the_sub_field( 'text_area' ); ?>
							<?php elseif (  get_row_layout() == 'image' ) : ?>
                                <?php $image = get_sub_field( 'image' ); ?>
			                    <?php $imageSizes = $image['sizes']; ?>
			                    <?php $imageRatio = ($imageSizes['journal-300-height'] / $imageSizes['journal-300-width']) * 100; ?>

                                <div class="journal-single__image">
				                    <?php if ( $image['caption'] ) : ?>
										<figure>
									<?php endif; ?>

                                        <div class="image-wrapper image-wrapper--transparent"
                                             style="padding-bottom: <?php echo esc_attr($imageRatio); ?>%;"
                                        >
                                            <img
												class="lazyload"
												data-srcset="<?php echo esc_attr( $imageSizes['journal-300'] ); ?> 300w,
															 <?php echo esc_attr( $imageSizes['journal-600'] ); ?> 600w,
															 <?php echo esc_attr( $imageSizes['journal-900'] ); ?> 900w,
															 <?php echo esc_attr( $imageSizes['journal-1200'] ); ?> 1200w"
												sizes="(min-width: 70em) 42rem,
												       (min-width: 40em) 30rem,
												       calc(100vw - 2rem)"
												alt="<?php echo esc_attr( $image['alt'] ); ?>"
                                            >
                                        </div>

									<?php if ( $image['caption'] ) : ?>
											<p class="journal-single__image-caption"><?php echo esc_attr( $image['caption'] ); ?></p>
										</figure>
									<?php endif; ?>
                               </div>
							<?php endif; ?>
						<?php endwhile; ?>
                    <?php endif; ?>
				</div>
			</article>
			<span class="journal-single__navigation journal-single__navigation--previous">
				<?php previous_post_link( '%link' ); ?>
			</span>
			<span class="journal-single__navigation journal-single__navigation--next">
				<?php next_post_link( '%link' ); ?>
			</span>
		</div>
	</div>
</div>
<?php get_footer(); ?>
