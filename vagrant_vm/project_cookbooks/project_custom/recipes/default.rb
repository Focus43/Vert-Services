# Set the default locale file for the OS
cookbook_file 'etc/default/locale' do
	owner 'root'
	group 'root'
	mode 0644
	source 'locale'
end


# Use the template to generate the nginx virtual host
template "#{node[:nginx][:dir]}/sites-available/#{node[:project_custom][:app_name]}" do
	source 'nginx.conf.erb'
	mode '0644'
end


# Enable the site
nginx_site "#{node[:project_custom][:app_name]}"


# Setup grunt using dependencies from package.json
execute "npm dependencies installation" do
	cwd "/home/vagrant/app/"
	user "root"
	command "/usr/local/bin/npm install; /usr/local/bin/npm install -g grunt-cli"
	action :run
end