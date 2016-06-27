var gulp = require('gulp');
var elixir = require('laravel-elixir');

elixir.config.assetsPath = 'source';
elixir.config.publicPath = '';

elixir(function(mix) {
	mix.styles([
		'1.css',
		'3.css',
		'4.css',
		'hslider.css',
		'main.css',
      	])

        .scripts([
        		'respond.min.js',
        		'0.js',
        		'1.js',
        		'6.js',
               'imagesloaded.pkgd.js',
               'hslider.js',
               'app.js',
          ])

        // .version(['css/all.css', 'js/all.js'])
});
