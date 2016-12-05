set :stage, :production
set :stage_url, $production_url
server $production_ip, user: "deploy", roles: %w{app}
set :deploy_to, $production_path
set :branch, $production_branch
