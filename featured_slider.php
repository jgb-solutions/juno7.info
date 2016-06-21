<?php

$args = [
	'posts_per_page' => 5,
	'category_name' => 'a-la-une'
];

$query = new WP_Query( $args );

if ($query->have_posts()) : $i = 0 ?>

<div class="panel-pane pane-block pane-bean-afp-production-diapo-main">
	<div class="entity entity-bean bean-afp-production line mb2">
	    <h2 class="htitle txt30  txt25m txtcenterm ">
		    	<a href="<?= home_url('/cat/a-la-une'); ?>">À la <em>Une</em></a>
	    	</h2>
	    <div class="w100 left clear mt1" id="diaporama">
			<ul class="w100" >

			<?php while ($query->have_posts()) : $query->the_post();?>

				<li class="w100 diaporama_slide afp_news_visibility afp_news_visibility_show">
			          <a
			          	data-index="<?= $i ?>"
			          	class="slideshow"
			          	href="<?php the_permalink(); ?>">
			             		<?php

			             		$attr = [
								'class'	=> "diaporama_illustr line",
								'alt'	=> get_the_title(),
								'title'	=> get_the_title(),
							];

			              		the_post_thumbnail('juno-show', $attr);

			              		?>
			          </a>
			          <div class="diaporama_caption pa1">
			            	<span class="w10 left txtwhite txt12  ">1 / 10</span>
			            	<p class="w90 left txtwhite txt12  ">
			            		<?php the_time('d/m/Y \- g:i'); ?> -
			            		<?php the_title(); ?>
			            	</p>
			         	</div>
			     </li>

			 <?php $i++ ?> ?>

			<?php endwhile; ?>

			<?php wp_reset_postdata(); ?>

			</ul>
		</div>
	</div>
</div>

<?php endif; ?>