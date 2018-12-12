Bioturk::Application.config.instance_name = 'LOCAL'
Bioturk::Application.config.image_server_interface = 'http://your.image.server'
Bioturk::Application.config.vision_server_interface = ''

Bioturk::Application.config.debug_tools = true # false will hide debug buttons in planner and manager
Bioturk::Application.config.krill_port = 3500
Bioturk::Application.config.krill_hostname = 'krill' # for docker NAT

Bioturk::Application.config.angular_rails_csrf_options = {
  cookie_name: "XSRF-TOKEN_#{Bioturk::Application.environment_name}",
  header_name: "X-XSRF-TOKEN_#{Bioturk::Application.environment_name}"
}