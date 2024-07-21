require_relative 'boot'

require 'rails/all'
# Pick the frameworks you want:
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'active_storage/engine'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
require 'action_cable/engine'
require 'sprockets/railtie'
ENV['RANSACK_FORM_BUILDER'] = '::SimpleForm::FormBuilder'

# require "rails/test_unit/railtie"
# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module EspressoRailsTestLucas
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2
    config.app_generators.scaffold_controller :responders_controller
    config.responders.flash_keys = [ :success, :error ]

    # TimeZone
    config.time_zone = 'America/Sao_Paulo'
    config.active_record.default_timezone = :local

    config.i18n.default_locale = 'pt-BR'
    config.exceptions_app = self.routes

    config.action_mailer.default_url_options = { host: ENV['URL'] || "localhost" }

    config.action_controller.include_all_helpers = false

    Time::DATE_FORMATS[:default] = "%d/%m/%Y %H:%M:%S"
    Date::DATE_FORMATS[:default] = "%d/%m/%Y"

    config.action_mailer.raise_delivery_errors = true
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
    # Don't generate system test files.
    # Flexirest::Base.base_url = ENV['API_URL'] || "localhost"

    config.action_mailer.delivery_method = :smtp
    config.action_mailer.smtp_settings = {
      user_name:  ENV['MAILER_USER_NAME'],
      password: ENV['MAILER_PASSWORD'],
      domain: ENV['MAILER_DOMAIN'],
      address: ENV['MAILER_ADDRESS'],
      port:  ENV['MAILER_PORT'],
      authentication: :plain,
      enable_starttls_auto: true
    }

    RenderAsync.configure do |config|
      config.jquery = true # This will render jQuery code, and skip Vanilla JS code
      config.turbolinks = false # Enable this option if you are using Turbolinks 5+
    end

  end
end
