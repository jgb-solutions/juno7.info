<?php get_header(); ?>

<?php get_template_part('slider-top'); ?>

<!-- Content -->
<div class="w75 left mt2 pr2 pa0m">

	<!-- CONTENT column -->
<div class="w66 right pl2 pa0m">

	<h2 class="htitle txt30  txt25m txtcenterm text-center">Mot-clé: <?= single_tag_title(); ?></h2>

	<?php

	if (have_posts()) :?>

	<br />
	<br />

	<div class="linemam w100 ">
		<ul>

			<?php while (have_posts()) : the_post();?>

			<li class="article w100 left clear mb1">
				<a href="<?= get_permalink(); ?>#hentry">

	 				<?php

	             		$attr = [
							'class'	=> "left mr1 shadow",
							'alt'	=> get_the_title(),
							'title'	=> get_the_title(),
						];

		              		the_post_thumbnail('thumbnail', $attr); ?>

					</a>
					<h3 class="htitle txt20  txt25m txtcenterm ">
						<a href="<?= get_permalink(); ?>#hentry">
							<em><?= get_the_title() ?></em>
						</a>
					</h3>

					<article><?php the_content('Voir le sponsor.', true); ?></article>
				</li>

			<?php endwhile; ?>

			</ul>

			<?php include 'pagination.php'; ?>

		</div>

		<?php endif; ?>

	</div>

	<!-- Left Column -->
	<?php get_sidebar('left'); ?>

</div>
<!-- /Content -->

<!-- RIGHT column -->
<?php get_sidebar('right'); ?>

<?php get_footer(); ?>