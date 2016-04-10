		<footer class="l-sitefooter">
			<div class="l-container">
				&copy; <?php echo date( 'Y' ) . ' ' . get_bloginfo( 'sitename' ); ?> 
			</div>
		</footer>

		<script>
			// Load webfonts
			var WebFontConfig = {
				custom: {
					families: ['Graphik Web']
				},
				active: function() {
					localStorage.setItem( 'fontloaded', true );
				}
			};

			(function(d) {
			  var wf = d.createElement('script'), s = d.scripts[0];
			  wf.src = '//ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js';
			  s.parentNode.insertBefore(wf, s);
			})(document);
		</script>

		<?php wp_footer(); ?>
	</body>

</html>
