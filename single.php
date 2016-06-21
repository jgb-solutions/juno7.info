<?php get_header(); ?>

<?php get_template_part('slider-top'); ?>

<!-- Content -->
<div class="w75 left mt2 pr2 pa0m">

		<!-- CONTENT column -->
	<div class="w66 right pl2 pa0m">

		<h2 class="htitle txt30  txt25m txtcenterm text-center"><?= get_the_title(); ?></h2>
		<p class="post-meta text-center">
			<em>
				Posté le <?php the_time('d/m/Y \à g:i A'); ?> dans
				<?php
				$category = get_the_category();
				if ($category) {
					echo '<a href="' . get_category_link( $category[0]->term_id ) .
						'" title="' . sprintf( __( "Voir tous articles dans la catégorie %s" ),
							$category[0]->name ) . '" ' . '>' . $category[0]->name.'</a> ';
				}?>
				par <a href="<?= home_url('/' ); ?>">la rédaction</a>.
			</em>
		</p>

		<br />
		<br />

		<div class="linemam w100 ">

			<article>
				<?php the_content(); ?>
				
				<br>
				<br>

				<p>
					<?php the_tags( 'Mots-clés: ', ', ', '' ); ?>
				</p>
			</article>

		</div>

	</div>

	<!-- Left Column -->
	<?php get_sidebar('left'); ?>

</div>
<!-- /Content -->

<!-- RIGHT column -->
<?php get_sidebar('right'); ?>

<?php get_footer(); ?>