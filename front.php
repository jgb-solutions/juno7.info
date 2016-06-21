<?php
/*
Template Name: Front Page
*/
?>

<?php get_header(); ?>

<?php get_template_part('slider-top'); ?>

<!-- Content -->
<div class="w75 left mt2 pr2 pa0m">

	<?php get_template_part('main'); ?>

	<!-- Left Column -->
	<?php get_sidebar('left'); ?>

</div>
<!-- /Content -->

<!-- RIGHT column -->
<?php get_sidebar('right'); ?>

<?php get_footer(); ?>