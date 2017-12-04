source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.1.4'
#gem 'sqlite3'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.7'
gem 'rack-cors'
gem 'elasticsearch', git: 'git://github.com/elasticsearch/elasticsearch-ruby.git'
gem 'webpacker', '~> 3.0', '>= 3.0.2'
gem 'foreman'

group :development, :test do
  gem 'byebug', platforms: %i(mri mingw x64_mingw)
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
