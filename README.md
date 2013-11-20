# Vert Services :: ProCard #

This is the development repository for VERT's ProCard application.

### Vagrant / Project Dependencies ###
---
Instead of requiring a number of specific tools/libraries/languages be installed on your local machine to contribute to
the project, all you need are two open-source tools for:

* Running virtual machines with **Oracle's VirtualBox** and ...
* Managing/provisioning the VirtualBox VMs with **Vagrant**

Nutshell: write all your code using whichever tools you prefer on your local machine (host), while all the dependencies
to build and run the code are executed in a completely sandboxed virtual machine (guest). This ensures complete parity
among development environments for all team members. With a single command, Vagrant will take care of provisioning a VM
with the following pre-installed and configured specifically for this project:

* Ubuntu Linux 12.04 (64-bit headless), with 40% CPU execution cap on 2 cores and max 1024 mb memory
* NodeJS; with GruntJS build tools pre-configured
* Nginx web server
* Ruby 2.0, with Bundler and the SASS and Erubis gems

Your primary system will remain completely unpolluted, and the VM can be torn down and rebuilt, in a repeatable fashion,
whenever you see fit. The first time you run the VM, Vagrant will download and build all dependencies and may take
a while. Subsequent runs will skip the provisioning process and launch the VM in a matter of seconds.

### Installation ###
---
* Download and install [VirtualBox](https://www.virtualbox.org/wiki/Downloads) and [Vagrant](http://www.vagrantup.com/).
Installers are available for Windows, OSX, and Linux OSs.
* From the command line:
    * `$: git clone` (clone this repository to your local machine; location does not matter).
    * `$: cd {repository_root}/vagrant_vm` (change directory to repository root).
    * `$: vagrant up` (execute vagrant up command).
* Watch the magic. Or do something else... it can take a while for the initial VM build.

### Vagrant Workflow & Project Tools ###
---
As mentioned above, Vagrant allows you to write code using whichever tools you see fit on your local machine. However,
when you want to see your work in browser, instead of serving the code from a web server on your host machine, you'll
visit **http://localhost:8080**, which will forward the request to the web server running within the VM.

For clarification - when you run `vagrant up` and the VM gets launched, Vagrant will automatically mount the project
directory as a shared folder inside the linux VM at `/home/vagrant/app/`. Whenever you work on the project, you should
SSH into the VM by navigating to the /vagrant_vm directory in your project root (on your host machine), then doing

    $: vagrant ssh

Once logged in, `$: cd app/`, and notice that the files listed in that directory *exactly* mimick the file structure on
your host system. The web server inside of the VM points to the directory {project_root}/builds/dev when you visit
**localhost:8080** in your web browser. GruntJS (expanded below) is configured to output files into this directory as
you make changes to the source code.

#### GruntJS and SASS ####
This project uses the [GruntJS](http://gruntjs.com/) task runner for watching changes to your javascript and css files
during development, and will run on-the-fly a set of automated tasks upon saving changes to disk. Automated tasks include:
* Javascript syntax linting (rules are configurable for strictness)
* File concatenation (compile all your separate javascript libraries/dependencies into a single file)
* Javascript and CSS minification

**SASS**: all CSS is written using the excellent SASS ruby gem. See the documentation at [sass-lang.com](http://sass-lang.com/)
for a reference.
