<?php


    function shortcode_valutakalkulator( $atts ) 
        {
            ob_start();
            ?>
                <div id="kalkis"></div>
                <script type="text/javascript">
                    jQuery(function() {
                        jQuery("#kalkis").kalkis({
                            overskrift: '',
                            desimaler: 2,
                            fra_sum:  100,
                            fra_val: 'NOK',
                            til_val: 'EUR'
                        });
                    });
                </script>
            <?php
            
            $html = ob_get_contents();
            ob_end_clean();
            
	        return $html;
        }
    add_shortcode( 'valutakalkulator', 'shortcode_valutakalkulator' );


?>