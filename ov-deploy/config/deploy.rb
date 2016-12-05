set :application, $app_name
set :repo_url, $git_repo
set :wp_localurl, $local_url
set :theme_path, $theme_path

$extra_linked_dirs  ||= []
$extra_linked_files ||= []

set :linked_dirs, ['wp-content/uploads'].push(*$extra_linked_dirs)
set :linked_files, ['wp-config.php'].push(*$extra_linked_files)

namespace :deploy do

  desc "create WordPress files for symlinking"
  task :create_wp_files do
    on roles(:app) do
      execute :touch, "#{shared_path}/wp-config.php"
    end
  end

  after 'check:make_linked_dirs', :create_wp_files

  desc "Creates robots.txt for non-production envs"
  task :create_robots do
    on roles(:app) do
      if fetch(:stage) != :production then

        io = StringIO.new('User-agent: *
Disallow: /')
        upload! io, File.join(release_path, "robots.txt")
        execute :chmod, "644 #{release_path}/robots.txt"
      end
    end
  end

  desc "Install node modules non-globally"
  task :npm_install do
    on roles(:app) do
      execute "\\mkdir -p #{shared_path}#{fetch(:theme_path)} && cp #{release_path}#{fetch(:theme_path)}/package.json #{shared_path}#{fetch(:theme_path)}"
      execute "cd #{shared_path}#{fetch(:theme_path)} && npm install"
      execute "ln -s #{shared_path}#{fetch(:theme_path)}/node_modules #{release_path}#{fetch(:theme_path)}"
    end
  end

  desc "Build assets"
  task :gulp do
    on roles(:app) do
      execute "cd #{release_path}#{fetch(:theme_path)} && gulp build --production"
    end
  end

  desc "Purge cache"
  task :purge do
    on roles(:app) do
      wp_siteurl = fetch(:stage_url)
      execute "curl –silent #{wp_siteurl}/purge/"
    end
  end

  task :setup_group do
    on roles(:app) do
      execute "chown -R deploy:www-data #{release_path} && chmod -R g+s #{release_path}"
      execute "sudo chown -R deploy:www-data #{shared_path}/wp-content/uploads && find #{shared_path}/wp-content/uploads -type d -exec chmod 2775 {} + && find #{shared_path}/wp-content/uploads -type f -exec chmod 664 {} + "
    end
  end

  desc "Write the git hash of the last deployment (for OV Dash)"
  task :create_rev do
    on roles(:app) do
      execute "echo #{fetch(:current_revision)} > #{release_path}/rev.txt"
    end
  end

  if $npm then
    after :updated, :npm_install
    if $gulp then
      after :npm_install, :gulp
    end
  end
  # after :finished, :setup_group
  after :finished, :create_robots
  if $purge then
    after :finished, :purge
  end
  after :finished, :create_rev
  after :finishing, "deploy:cleanup"

end
