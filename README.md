# Portfolio 05

![Argo CD sync status](https://cd.jayfreestone.com/api/badge?name=portfolio-05)
![Build & Deploy](https://github.com/jayfreestone/portfolio-05/workflows/Build%20&%20Deploy/badge.svg)

A WordPress build for my portfolio (v5).

Dependencies managed by Composer.

Notes:

- Expects the environment to provide a mounted `wp-config.php` file.
- An `.env` file [will be required for ACF](https://github.com/PhilippBaschke/acf-pro-installer) installation. An actual `dotenv` file is required, not just an environment variable. Since this is required for downloading the plugin, it is a build-time requirement.
