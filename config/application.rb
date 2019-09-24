require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ChatSpace
  class Application < Rails::Application
    config.generators do |g|
      g.test  false
      g.assets  false
      g.helper  false
      g.time_zone = 'Tokyo'
    end
    config.i18n.default_locale = :ja
  end
end
