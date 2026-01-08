# frozen_string_literal: true

source "https://rubygems.org"

gemspec

group :test do
  gem "html-proofer", "~> 5.0"
  gem "jekyll-compose", group: [:jekyll_plugins]
  gem "base64"
  gem "jekyll", "~> 4.3.3"
  gem "csv"
end

platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.2.0", :platforms => [:windows]
gem "webrick", "~> 1.8"
