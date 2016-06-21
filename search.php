<?php get_header(); ?>

<?php get_template_part('slider-top'); ?>

<!-- Content -->
<div class="w75 left mt2 pr2 pa0m">

	<!-- CONTENT column -->
<div class="w66 right pl2 pa0m">

	<?php

	if (have_posts()) :?>

	<h2 class="htitle txt30  txt25m txtcenterm text-center">
		Résulats pour: "<?= $_GET['s']; ?>""
	</h2>

	<br />
	<br />

	<div class="linemam w100 ">
		<ul>

			<?php while (have_posts()) : the_post();?>

			<li class="article w100 left clear mb1">
				<a href="<?= get_permalink(); ?>">

	 				<?php

	             		$attr = [
							'class'	=> "left mr1 shadow",
							'alt'	=> get_the_title(),
							'title'	=> get_the_title(),
						];

		              		the_post_thumbnail('thumbnail', $attr); ?>

					</a>
					<h3 class="htitle txt20  txt25m txtcenterm ">
						<a href="<?= get_permalink(); ?>">
							<em><?= get_the_title() ?></em>
						</a>
					</h3>

					<article><?php the_content('Voir l\'article.', true); ?></article>
				</li>

			<?php endwhile; ?>

			</ul>
			<div>&nbsp;</div>
			<div>&nbsp;</div>
			<div class="navigation text-center mb2">
				<?php

				$args = [
					'prev_text'          => __('« Avant'),
					'next_text'          => __('Après »')
				];

				echo paginate_links( $args );?>

			</div>

		</div>

		<?php else: ?>

			<h2 class="htitle txt30  txt25m txtcenterm text-center">
				Pas de résultats pour: "<?= $_GET['s']; ?>""
			</h2>

			<br />
			<br />

			<article>
				<p>
					Nous sommes désolés. Mais nous n'avons pas pu trouver ce que vous recherchiez.<br/>
					Essayez de chercher autre chose dans la forme ci-dessous ou retournez sur
					 <a href="<?= home_url('/'); ?>">la page d'accueil</a>.
				</p>
				<p class="text-center">
					<?php get_search_form(); ?>
				</p>
			</article>

		<?php endif; ?>


	</div>

	<!-- Left Column -->
	<?php get_sidebar('left'); ?>

</div>
<!-- /Content -->

<!-- RIGHT column -->
<?php get_sidebar('right'); ?>

<?php get_footer(); ?>