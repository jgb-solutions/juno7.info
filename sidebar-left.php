<div class="w33 left mb0m">

	<?php

	$args = [
		'posts_per_page' => 1,
		'category_name' => 'editorial'
	];

	$query = new WP_Query( $args );

	if ($query->have_posts()) :?>

	<div class="linemam w100 left clear">
		<h3  class="htitle txtcenterm txt25 txt22m mb1 pa2m">
			<a href="<?= home_url('/c/editorial'); ?>"><em>Editorial</em></a>
		</h3>

		<ul class="line">

			<?php while ($query->have_posts()) : $query->the_post(); ?>

			<li class="article w100 left clear mb1">
				<div class="metadata txtgrey">
 					<span class="date">
 						<strong><?php the_time('d/m/Y \- g:i'); ?></strong>
 					</span>
				</div>

				<h4 class="txt16 txtblack txtbold mtv">
					<a href="<?= get_permalink(); ?>" class="content_feed">
						<?= get_the_title(); ?>
					</a>
				</h4>

				<p class="txtgrey mtv">
					<?= get_the_content('...', true); ?>
				</p>
			</li>

			<?php endwhile; ?>

			<?php wp_reset_postdata(); ?>
		</ul>
	</div>

	<?php endif; ?>

	<!-- Articles Populaires -->
	<?php

	$args = [
		'posts_per_page' => 10,
		'orderby' => 'meta_value_num',
		'meta_key' => 'juno_views',
		'order' => 'DESC',
		// 'year' => date('Y'),
		// 'w' => date('W')
		'm' => date('Ym')
	];

	$query = new WP_Query( $args );

	if ($query->have_posts()) :?>

	<div class="linemam w100 left clear mb2">
		<h3  class="htitle txtcenterm txt25 txt22m mb2">Articles Populaires</h3>

		<ul>

			<?php while ($query->have_posts()) : $query->the_post(); ?>

			<li class="article w100 left clear mb1">
				<a href="<?= get_permalink(); ?>">

	 				<?php

	             		$attr = [
						'class'	=> "left mr1",
						'alt'	=> get_the_title(),
						'title'	=> get_the_title(),
					];

	              		the_post_thumbnail('juno-tiny', $attr); ?>

				</a>

				<span class="date txtgrey ">
					<strong><?php the_time('d/m/Y \- g:i'); ?></strong>
				</span>
				<br />
				<span>
					<a href="<?= get_permalink(); ?>"><?= get_the_title() ?></a>
				</span>
			</li>

			<?php endwhile; ?>

			<?php wp_reset_postdata(); ?>
		</ul>
	</div>

	<?php endif; ?>

</div>