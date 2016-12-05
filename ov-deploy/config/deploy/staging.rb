set :stage, :staging
set :stage_url, $staging_url
server $staging_ip, user: "deploy", roles: %w{app}
set :deploy_to, $staging_path
set :branch, $staging_branch
