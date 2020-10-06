const mix = require('laravel-mix');

mix.js([
        'web/app/js/common.js',
        'web/app/js/app.js'
    ], 'web/public/js/app.js')
    .sass('web/app/sass/app.scss', 'web/public/css')
    .copy('web/app/index.html', 'web/public/index.html')
    .setPublicPath('web/public');
