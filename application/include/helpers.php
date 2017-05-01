<?php

if (! function_exists('env')) {
    /**
     * Gets the value of an environment variable. Supports boolean, empty and null.
     *
     * @param  string  $key
     * @param  mixed   $default
     * @return mixed
     */
    function env($key, $default = null)
    {
        $value = getenv($key);

        if ($value === false) {
            return value($default);
        }

        switch (strtolower($value)) {
            case 'true':
            case '(true)':
                return true;

            case 'false':
            case '(false)':
                return false;

            case 'empty':
            case '(empty)':
                return '';

            case 'null':
            case '(null)':
                return;
        }

        if (strlen($value) > 1 && substr($value, 0, 1)=='"' && substr($value, -1, 1)=='"' ) {
            return substr($value, 1, -1);
        }

        return $value;
    }
}

if (! function_exists('root_path')) {
    function root_path( $customPath = '' )
    {
        $appFolder   = DIRECTORY_SEPARATOR.'application';
        $path        = str_replace('\\', '/', getcwd());

        if( substr($path, -strlen($appFolder))==$appFolder ) {
            $path = substr($path, 0, -strlen($appFolder));
        }

        if( $customPath!='' ) {
            $path .= DIRECTORY_SEPARATOR.$customPath;
        }

        return $path;
    }
}

if( !function_exists('url') )
{
    function url($path='')
    {
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']!="off" ? 'https://' : 'http://';
        $domain   = substr($_SERVER['SERVER_NAME'], -1)=='/' ? substr($_SERVER['SERVER_NAME'], 0, strlen($_SERVER['SERVER_NAME'])) : ($_SERVER['SERVER_NAME']);
        $port     = $_SERVER['SERVER_PORT'];
        $request  = join('/', array_intersect(explode('/', root_path()), explode('/', $_SERVER ['REQUEST_URI'])));
        $url      = $protocol . str_replace('//', '/', $domain . ($port!='80'?':'.$port:'') .'/'. $request);

        return $url . ($path!=''?'/'.$path:'');
    }
}

if( !function_exists('rev') )
{
    function rev($path)
    {
        return env('APP_ENV')!='local'?'build/'.json_decode(file_get_contents(root_path('build/rev-manifest.json')))->{$path}:'build/'.$path;
    }
}

if( !function_exists('url_rev') )
{
    function url_rev($path)
    {
        return url(rev($path));
    }
}

