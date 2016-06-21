</div> <!-- / .container -->

<div class="line">
	<footer id="footer" role="banner">

		<?php if ( ! is_post_type_archive('sponsors') ): ?>

		<div class="line bgwhite paddingTB sponsors">
		   	<div class="container">
				<?php include('hslider.php'); ?>
			</div>
		</div>

		<?php endif; ?>

		<div id="footer_about" class="line bglightgrey">
			<div class="container">
				<div class="entity entity-bean bean-afp-rich-block">

				   	<div class="w33 left footer_about_illustr hidem">&nbsp;</div>

					<div class="w33 left mb2 pr2 pa0m txtbrown txt14 pa2m">

						<?php

						if ( ! is_active_sidebar( 'sidebar-3' ) ) { ?>
							<h6 class="txt14 txtgrey txtbold mb2 txtcenterm">
								À propos de <?= get_bloginfo('name'); ?>
							</h6>

							<p>
								<b><?= get_bloginfo('name' ); ?></b> is a global news agency delivering fast, in-depth coverage of the events shaping our world from wars and conflicts to politics, sports, entertainment and the latest breakthroughs in health, science and technology.
							</p>

						<?php } ?>

						<?php dynamic_sidebar( 'sidebar-3' ); ?>

					</div>

				</div>

				<div
					id="block-menu-menu-footer" role="navigation"
					class="block block--menu block--menu-menu-footer w30 w100m left mb2 txtbrown txt14 ma0m">

					<?php

						if ( ! is_active_sidebar( 'sidebar-4' ) ) { ?>
							<h6 class="txt14 txtgrey txtbold mb2 txtcenterm bgwhitem pa2m">Liens Utiles</h6>
				   			<ul>
								<li class="w33m leftm txtcenterm">
									<a href="https://www.afp.com/en/sitemap">Site Map</a>
								</li>
								<li class="w33m leftm txtcenterm">
									<a href="https://www.afp.com/en/contact">Contact us</a>
								</li>
								<li class="w33m leftm txtcenterm">
									<a href="https://www.afp.com/en/terms-use">Terms of use</a>
								</li>
							</ul>

						<?php } ?>

						<?php dynamic_sidebar( 'sidebar-4' ); ?>
				</div>
			</div>
		</div>

	<!-- 	<div class="line bg-black paddingTB">
		   	<div class="container">
		   		<p class="text-center">
		   			Site Web Développé en partenariat avec
		   			<a href="//twitter.com/jgbneatdesign" target="blank">JGB! Neat Design</a>
		   		</p>
			</div>
		</div>
 -->	</footer>
</div>

<?php wp_footer(); ?>

</body>
</html>


