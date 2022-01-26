<?php

if (!function_exists('generateUrl')) {
   
    function generateUrl()
    {
        return new \Laravel\Lumen\Routing\UrlGenerator(app());
    }
}
if (!function_exists('asset')) {
    function asset($path, $secured = false)
    {
        return generateUrl()->asset($path, $secured);
    }
}