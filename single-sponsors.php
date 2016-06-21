<?php get_header(); ?>

<?php get_template_part('slider-top'); ?>

<!-- Content -->
<div class="w75 left mt2 pr2 pa0m">

		<!-- CONTENT column -->
	<div class="w66 right pl2 pa0m">

		<h2 class="htitle txt30  txt25m txtcenterm text-center">
			<?= get_the_title(); ?>
			<small><small><small>
				(<em><a href="<?= home_url('/sponsors'); ?>">Tous nos sponsors</a></em>)
			</small></small></small>
			</h2>

		<br />
		<br />

		<div class="linemam w100 ">

			<article <?php post_class(); ?>>

				<?php the_content(); ?>
				
				<br />
				<div class="panel panel-default">
                        	<table class="table table-bordered table-striped">
                              <tbody>


                              	<?php if ( get_post_meta( get_the_id(), 'telephone', true ) ): ?>

							<tr>
                                       <td>
                                            <span class="glyphicon glyphicon-phone-alt" aria-hidden="true"></span> Téléphone
                                       </td>
                                       <td>
                                            <a href="tel:+<?= get_post_meta( get_the_id(), 'telephone', true )?>">
                                            	<?= get_post_meta( get_the_id(), 'telephone', true ); ?>
                                            </a>
                                       </td>
                                  	</tr>
                                  <?php endif; ?>
							
							<?php if ( get_post_meta( get_the_id(), 'email', true ) ): ?>
							<tr>
                                      	<td>
                                          	<span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> E-mail
                                      	</td>
                                      	<td>
                                          	<a href="mailto:<?= get_post_meta( get_the_id(), 'email', true ); ?>"
                                          		target="_top"><?= get_post_meta( get_the_id(), 'email', true ); ?>
                                          	</a>
                                      	</td>
                                  	</tr>
                                  	<?php endif; ?>
							
							<?php if ( get_post_meta( get_the_id(), 'website', true ) ): ?>
							<tr>
	                                  <td>
                                            <span class="glyphicon glyphicon-globe" aria-hidden="true"></span> Site web
                                       </td>
                                       <td>
                                            <a href="<?= get_post_meta( get_the_id(), 'website', true ); ?>" target="_blank">
                                            	<?= get_post_meta( get_the_id(), 'website', true ); ?>
                                            </a>
                                       </td>
	                             	</tr>
	                             <?php endif; ?>
							
							<?php if ( get_post_meta( get_the_id(), 'address', true ) ): ?>
							<tr>
	                                  <td>
	                                       <span class="glyphicon glyphicon-home" aria-hidden="true"></span> Adresse
	                                  </td>
	                                  <td><?= get_post_meta( get_the_id(), 'address', true ); ?></td>
	                             </tr>
	                          <?php endif; ?>

                              </tbody>
                          </table>
                      </div>
			</article>

		</div>

	</div>

	<!-- Left Column -->
	<?php get_sidebar('left'); ?>

</div>
<!-- /Content -->

<!-- RIGHT column -->
<?php get_sidebar('right'); ?>

<?php get_footer(); ?>