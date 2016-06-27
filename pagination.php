<div>&nbsp;</div>
<div>&nbsp;</div>

<div class="navigation text-center mb2">
	<?php

	$args = [
		'prev_text'          => __('« Avant'),
		'next_text'          => __('Après »')
	];

	echo paginate_links( $args );?>

</div>