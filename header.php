<html <?php language_attributes(); ?>>
<head>
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=PT+Sans:400,700,400italic" media="all" />
	<link type="text/css" rel="stylesheet" href="<?php echo get_stylesheet_directory_uri () ?>/css/all.css" media="all" />
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	 <header>
		<div id="header" class="line bglightgrey bgwhitem ">
			<div class="container    ">
				<div class="line bg-blue">
					<h1 id="logo" class="  left txtleft  ">
					          <a href="<?php echo home_url('/' ); ?>" title="Accueil">
					     		<img src="<?php echo get_stylesheet_directory_uri () ?>/images/logo.png" alt="Home" class="" width="165" />
					   	</a>
					</h1>
					<!-- <div  id="block-locale-language" role="complementary" class="block block--locale block--locale-language w80 right">
						<ul id="language_switcher" class="right language-switcher-locale-url">
							<li class="fr first"><a href="<?php echo home_url(); ?>/fr" class="language-link" xml:lang="fr">Français</a></li>
							<li class="en active"><a href="en" class="language-link active" xml:lang="en">English</a></li>
							<li class="es"><a href="<?php echo home_url(); ?>/es" class="language-link" xml:lang="es">Español</a></li>
						</ul>
						<div id="language_switcher_btn" class="">
							EN
						</div>
					</div> -->

					<br />
					<br />

					<?php get_template_part('breakingnews' ); ?>

					<?php get_search_form(); ?>

					<?php get_template_part('menu'); ?>
				</div>
			</div>
		</div>
	</header>

<div class="line">
  <div class="container ">