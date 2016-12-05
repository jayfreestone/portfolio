# OV Deploy

## Capistrano Deployment for WordPress Sites

1. Add the following code to your `composer.json`

    ```json
    {
      "repositories": [{
        "type": "package",
        "package": {
          "name": "overture/ov-deploy",
          "version": "1.0.1",
          "dist": {
            "type": "zip",
            "url": "http://theseum.ovlabs.co.uk/overture/ov-deploy/repository/archive.zip?ref=1.0.1"
          }
        }
      }],
      "require": {
        "mnsami/composer-custom-directory-installer": "1.1.*",
        "overture/ov-deploy": "1.0.1"
      },
      "extra": {
        "installer-paths": {
          "./ov-deploy": ["overture/ov-deploy"]
        }
      }
    }
    ```
2. Run `composer install`
3. Copy the following files into a top level directory called `config`:
 * `config/global-config-example.rb`
 * `config/database-example.yml`
4. Remove `-example` from file names
5. Populate files with correct details