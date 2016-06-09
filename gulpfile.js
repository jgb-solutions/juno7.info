var gulp = require('gulp');
var elixir = require('laravel-elixir');

elixir.config.assetsPath = 'source';
elixir.config.publicPath = '';

elixir(function(mix) {
	mix.styles([
		'1.css',
		'2.css',
		'3.css',
		'4.css',
		'main.css',
      	])

        .scripts([
        		// 'jquery.js',
        		'respond.min.js',
        		'0.js',
        		'1.js',
        		// '2.js',
        		// '3.js',
        		// '4.js',
        		'6.js',
        		// '7.js',
          ])

        // .version(['css/all.css', 'js/all.js'])
});
