<!-- CONTENT column -->
<div class="w66 right pl2 pa0m">

	<?php get_template_part('featured_slider'); ?>

	<?php

	if ( ! is_active_sidebar( 'sidebar-6' ) ) { ?>
		<div class="panel-pane pane-node">
			<div class="article_content line linemam textcontent mb2">
			  	<p>
			  		<a href="https://www.afp.com/en/live-euro-2016-afp">
			  			<img height="607" width="607" class="media-element file-default" typeof="foaf:Image" src="<?php echo get_stylesheet_directory_uri () ?>/images/afp-products-services-euro-2016.jpg" alt="" />
			  		</a>
			  	</p>
			</div>
		</div>

	<?php } ?>

	<?php dynamic_sidebar( 'sidebar-6' ); ?>

</div>