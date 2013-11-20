# Vert Services :: ProCard #

This is the development repository for VERT's ProCard application.

#### Vagrant / Project Dependencies ####

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

#### Installation ####

* Download and install [VirtualBox](https://www.virtualbox.org/wiki/Downloads) and [Vagrant](http://www.vagrantup.com/).
Installers are available for Windows, OSX, and Linux OSs.
* Checkout this repository via GIT to any directory on your system. It can be anywhere.
* From the command line, change directories to the `{repository_root}/vagrant_vm`, then run `vagrant up`

