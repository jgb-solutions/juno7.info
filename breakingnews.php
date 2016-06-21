<?php
$args = [
	'tag' => 'breaking-news',
	'posts_per_page' => 5
];

$query = new WP_Query( $args );

if ($query->have_posts()) : ?>

<div  id="afp_ticker" class="entity entity-bean bean-afp-production w50 left relative bglightgrey">
	<div id="header_slider_container" class="w100" >
		<a id="header_slider_prev" class="w10 left slider_control slider_control_prev"><span></span></a>
		<div id="header_slider" class="w80" >
			<ul>

<?php while ($query->have_posts()) : $query->the_post();?>

	<li>
		<strong class="title">
			<a href="<?php echo home_url('/t/breaking-news' ); ?>">
				Breaking News
				<span class="date"> - <?php the_time('d/m/Y \- g:i'); ?></span>
			</a>
		</strong>
		<p id="afp_news_7|doc-bm1nv-copy" class="afp_news_visibility afp_news_visibility_show" >
			<a href="<?php the_permalink(); ?>"><?php the_title( ); ?></a>
		</p>
	</li>

<?php endwhile; ?>

<?php wp_reset_postdata(); ?>

				</ul>
			</div>
			<a  id="header_slider_next" class="w10 left slider_control slider_control_next"><span></span></a>
		</div>
	</div>

<?php endif; ?>