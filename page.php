<?php get_header(); ?>

<?php get_template_part('slider-top'); ?>

<!-- Content -->
<div class="w75 left mt2 pr2 pa0m">

		<!-- CONTENT column -->
	<div class="w66 right pl2 pa0m">

		<h2 class="htitle txt30  txt25m txtcenterm text-center"><?= get_the_title(); ?></h2>

		<br />
		<br />

		<div class="linemam w100 ">

			<article><?php the_content(); ?></article>

		</div>

	</div>

	<!-- Left Column -->
	<?php // get_sidebar('left'); ?>

</div>
<!-- /Content -->

<!-- RIGHT column -->
<?php // get_sidebar('right'); ?>

<?php get_footer(); ?>