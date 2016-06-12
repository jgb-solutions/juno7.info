<?php
$args = [
	'tag' => 'top-actualites',
	'posts_per_page' => 10
];

$query = new WP_Query( $args );

if ($query->have_posts()) : $i = 0; ?>

<div class="panel-pane pane-block pane-bean-afp-production-stories">
	<div  about="/en/block/afp-production-stories" typeof="" class="entity entity-bean bean-afp-production line relative mb2 mt2">
		<h2 class="hideXL htitle txt30 txt25m txtcenterm mb2">Top Actualités</h2>
		<div id="home_slider_container" class="w100 left bgwhite pa1" >
			<a  id="home_slider_prev" class="w05 left slider_control slider_control_prev"><span>&lt;</span></a>
				<div id="home_slider" class="w90 center">
					<ul>

					<?php while ($query->have_posts()) : $query->the_post();?>

						<li id="afp_news_15|doc-<?= $i ?>" class="afp_news_visibility afp_news_visibility_show">
							<div class="date">
								<strong><?php the_time('d/m/Y \- g:i'); ?></strong>
							</div>
							<a href="<?php the_permalink(); ?>" class="picture">

								<?php

				             		$attr = [
									'alt'	=> get_the_title(),
									'title'	=> get_the_title()
								];

				              		the_post_thumbnail('juno-show', $attr);

				              		?>
								<br>
							</a>
							
							<h3>
								<a href="<?php the_permalink(); ?>">
									<?php the_title(); ?>
								</a>
							</h3>
						</li>

					<?php $i++ ?>
					<?php endwhile; ?>

					<?php wp_reset_postdata(); ?>

					</ul>
				</div>
			<a  id="home_slider_next" class="w05 left slider_control slider_control_next"><span>&gt;</span></a>
			<div class="w100 left clear"></div>
		</div>
	</div>
</div>

<?php endif; ?>