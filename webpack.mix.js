const mix = require('laravel-mix');

mix.js([
    'web/app/js/common.js',
    'web/app/js/app.js'
], 'web/public/js/app.js')
    .sass('web/app/sass/app.scss', 'web/public/css')
    .copy('web/app/icons', 'web/public/icons')
    .copy('web/app/index.html', 'web/public/index.html')
    .copy('web/app/manifest.json', 'web/public/manifest.json')
    .copy('web/app/favicon.ico', 'web/public/favicon.ico')
    .setPublicPath('web/public');
