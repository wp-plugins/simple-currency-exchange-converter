<?php
/*
Plugin Name: Wordpress Simple Currency Exchange Converter
Description: Wordpress Simple Currency Exchange Converter
Version: 1.0.1
Author: xn--ln-yia.priv.no
Author URI: http://xn--ln-yia.priv.no
Author Email: post@qts.no
*/


define('VK_PATH',    plugin_dir_path(__FILE__));
define('VK_URL',     plugins_url('', __FILE__));


register_deactivation_hook(__FILE__, 'VK_deactivated');
register_activation_hook(__FILE__, 'VK_activated');

function VK_activated() 
    {
        
    }
    
function VK_deactivated() 
    {
        
    }
    
    
include (VK_PATH . '/shortcodes/shortcodes.php');
   
add_action('init', 'VK_init');
function VK_init()
    {

        
    }
            
add_action('wp_print_styles', 'VK_TemplateStyles');
add_action('wp_print_scripts', 'VK_TemplateScripts'); 

function VK_TemplateScripts()
    {
        if(is_admin())
            return;
            
        wp_enqueue_script('jquery');
      
        $myJsFile = VK_URL . '/js/vkalkulator.js';
        wp_register_script('vkalkulator.js', $myJsFile);
        wp_enqueue_script( 'vkalkulator.js');    
    }
    
function VK_TemplateStyles()
    {
        if(is_admin())
            return;
            
        $myCssFile = VK_URL . '/css/vkalkulator.css';
        wp_register_style('vkalkulator.css', $myCssFile);
        wp_enqueue_style( 'vkalkulator.css');   
        
    }


?>