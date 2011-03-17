require "rubygems"
require "sinatra"
require "active_support/ordered_hash"
require "active_support/json"

set :public, File.expand_path('../..', __FILE__)
set :method_override, true

get "/" do
  redirect "/test/wyme.html"
end

get "/test" do
  browse("test")
end

def browse(path)
  contents = "<!DOCTYPE html>\n<html>\n<body><ul>"
  
  Dir.open(File.expand_path("../../" + path, __FILE__)) do |d|
    d.each do |f|
      contents += "<li><a href=\"/#{path}/#{f}\">#{f}</a></li>\n" unless [".", ".."].include?(f)
    end
  end
  
  contents + "</ul>\n</body>\n</html>"
end

