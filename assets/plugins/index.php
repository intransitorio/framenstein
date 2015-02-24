<?php

$last_modified_time = filemtime('index.php'); 
$etag = md5_file('index.php');
// always send headers
header("Last-Modified: ".gmdate("D, d M Y H:i:s", $last_modified_time)." GMT"); 
header("Etag: $etag"); 
// exit if not modified
if (@strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) == $last_modified_time || 
    @trim($_SERVER['HTTP_IF_NONE_MATCH']) == $etag) { 
    header("HTTP/1.1 304 Not Modified"); 
    exit; 
}

$varArr = explode('/load/', str_replace('/index.js', '', $_SERVER['REQUEST_URI']));
$varArr = explode('/', $varArr[1]);

header("Content-type: application/javascript");

if( is_array($varArr) ) {
    foreach( $varArr as $v ) {
        if( $v != '' ) {
            if( file_exists($v.'/scripts.min.js') ) {
                include( $v.'/scripts.min.js' );                
            } else if( file_exists($v.'/scripts.js') ) {
                include( $v.'/scripts.js' );                
            }
        }
    }
}

?>