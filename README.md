# Portfolio

Jay Freestone's personal portfolio site, built in WordPress.

## Deployment

A few quick reminders (for myself) about deployment:

- Config files are not stored in the repo, for obvious security reasons. The config files for OV-Deploy will need to added or created.
- There needs to be a `.env` file containing a valid ACF key in order for the [relevant Composer plugin to work](https://github.com/PhilippBaschke/acf-pro-installer).
- MySQL/PHP running locally will need to be in your PATH to use helpers like db:pull etc. since they rely on WP-CLI.