# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :consumir_api_react,
  ecto_repos: [ConsumirApiReact.Repo]

# Configures the endpoint
config :consumir_api_react, ConsumirApiReact.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "2A2/AD8jQXoGdRg6iMxQi+cKt+vjn9SWdQL9J2IF1TFvI6yQhoE31q8YEMicxkhV",
  render_errors: [view: ConsumirApiReact.ErrorView, accepts: ~w(html json)],
  pubsub: [name: ConsumirApiReact.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
