<?php get_header(); ?>

<?php // get_template_part('slider-top'); ?>

<!-- Content -->
<div class="w75 left mt2 pr2 pa0m">

		<!-- CONTENT column -->
	<div class="w66 right pl2 pa0m">

		<h2 class="htitle txt30  txt25m txtcenterm text-center">Erreur 404! Page non trouvée.</h2>

		<br />
		<br />

		<div class="linemam w100 ">

			<article>
				<p>
					Nous sommes désolés. Mais nous n'avons pas pu trouver ce que vous recherchiez.<br/>
					Essayez de chercher autre chose dans la forme ci-dessous ou retournez sur
					 <a href="<?= home_url('/'); ?>">la page d'accueil</a>.
				</p>
				<p>
					<?php get_search_form(); ?>
				</p>
			</article>

		</div>

	</div>

	<!-- Left Column -->
	<?php // get_sidebar('left'); ?>

</div>
<!-- /Content -->

<!-- RIGHT column -->
<?php // get_sidebar('right'); ?>

<?php get_footer(); ?>