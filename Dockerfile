FROM jayfreestone/wordpress-base:latest

ENV APP_DIR /var/www/html/web

# Install Composer dependencies in order to cache them for later use.
# This means we can utilise Docker layer caching.
RUN mkdir -p /tmp/composer
WORKDIR /tmp/composer

# To run composer install we need the ACF env variable to be set, so it
# needs to be part of the image build.
COPY .env composer.json composer.lock ./
RUN composer install \
    --no-interaction \
    --no-autoloader && \
    rm -R *

# Reset to app directory
WORKDIR ${APP_DIR}

# Copy relevant site files
COPY . ./

# Actual in-place Composer installation
RUN composer install --no-interaction
