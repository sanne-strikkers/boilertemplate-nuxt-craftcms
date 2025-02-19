<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

use craft\config\GeneralConfig;
use craft\helpers\App;

return GeneralConfig::create()
    // Set the default week start day for date pickers (0 = Sunday, 1 = Monday, etc.)
    ->defaultWeekStartDay(1)
    // Prevent generated URLs from including "index.php"
    ->omitScriptNameInUrls()
    // Preload Single entries as Twig variables
    ->preloadSingles()
    // Prevent user enumeration attacks
    ->preventUserEnumeration()
    // Set the @webroot alias so the clear-caches command knows where to find CP resources
    ->aliases([
        '@webroot' => dirname(__DIR__) . '/web',
        '@uploads' => App::env('PRIMARY_SITE_URL') . '/uploads',
    ])
    // Whether the system should run in Headless Mode, which optimizes the system and control panel for headless CMS implementations
    ->headlessMode(true)
    // Required for API requests to be able to authenticate with a token
    ->allowedGraphqlOrigins([getenv('CRAFT_SITE_URL'), getenv('PRIMARY_SITE_URL')]);
;
