<?php

$args = [
	'post_type' => 'sponsors',
	'posts_per_page' => 10
];

$query = new WP_Query( $args );

if ($query->have_posts()) :?>

<div class="hsldr-container">

	<?php while ($query->have_posts()) : $query->the_post(); ?>

	<figure>
		<a href="<?= get_permalink(); ?>">
				<?php

		    		$attr = [
					'class'	=> "left mr1",
					'alt'	=> get_the_title(),
					'title'	=> get_the_title(),
				];

		     	the_post_thumbnail('thumbnail', $attr); ?>

			<figcaption><?= get_the_title() ?></figcaption>
		</a>
	</figure>

	<?php endwhile; ?>

	<?php wp_reset_postdata(); ?>

</div>

<?php endif; ?>