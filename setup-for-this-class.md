# Initial Setup for Info 6150: Web Design UI/UX

## A Warning about Limited Support

For all of the items listed here I will offer what support I can, but deciphering the needs of different operating systems and different software bugs is beyond the scope of this class and often outside my skillset.  

## Accounts
### Github.com
You will need a (free of cost) account on github.com
* https://github.com/

Existing accounts are fine.

I recommend using only LOWERCASE letters in your username, because it makes things harder when you need to also worry about capitalization.  That is just a recommendation, not a requirement

### Slack.com
You will need a (free of cost) account on slack.com to join in the discussion there.  That account is specific to the class workspace (there is not a "general" account as on github)
* https://rebrand.ly/seainfo6150-slack

I recommend the desktop client and/or the mobile client over the web-based one.  Slack is where most info on the class is discussed, just like many programming shops.

## Required Software
### Git
You will need to install a git client (free of cost):
* https://git-scm.com/downloads

All instruction and examples in class use the **command-line client**, not a graphical one.  

### NodeJS and npm
You will need to install a recent version of NodeJS (which will also install npm) (free of cost)
* https://nodejs.org/   (I recommend LTS version)

All instruction and examples will use `npm` instead of `yarn`.
- Do *NOT* install anything for node/npm with 'sudo' or as administrator unless you know how to clean up the permissions mess it creates.   (e.g. Do NOT run commands that start with `sudo npm install` )

### Chrome Web Browser
You will need to install and use the (free of cost) Chrome web browser if you do not already have it
* https://www.google.com/chrome/browser/desktop/index.html

Be sure to configure it as mentioned further down!

### Text Editor
You will need a text editor or IDE of your choice (note: A Text Editor is NOT a word processor).  Some popular (and free of cost) available ones include VSCode, Atom, Brackets, or Notepad++ (windows), while some commercial ones that allow limited free demos include SublimeText and WebStorm.  Those users familiar with more old-school editors such as vim or emacs are welcome to use them.
* NOTE: I highly recommend having a specific directory(folder) to hold material from the class.  Students that just work out of "Documents" or "Downloads" quickly find their work lost among other files there.
* NOTE: Directory (folder) names ARE case sensitive.  This can be tricky if you mess it up.  Mac (for example) will pretend to be case insensitive, but once you start talking to git it break.  So always be precise, which is a good practice for programming anyway.
* NOTE: I recommend AGAINST having spaces in directory(folder) names.  Spaces make command-line commands hard to run, and you WILL be running some commands on the command line.
  - Good: ~/class/info6150/
  - Bad: ~/My Documents/
  - Bad: ~/Documents/

### Terminal Program of your choice (optional)
To my knowledge all common systems come with a command-line terminal, however some of the OS-provided ones are sub-par.  If you wish to install and use programs like iTerm2 (Mac) or Powershell (Windows) or any of a bazillion options (Linux) you may do so.  (Many free of cost)

Many MANY examples in class will be done at the command line, as will documentation you find online.

## Configuration

### Chrome Dev Tools Console

You should make the configuration changes below.  The exact means to get to these options can differ slightly between OS and Chrome version
* View -> Developer -> Javascript Console
* Gear icon on upper right
* Check 'LogXMLHttpRequests'
* Network subtab -> Check 'Disable Cache'

## Making sure it all works

Do the following, which will let me (and you) know that everything is working.  If you run into a problem you can't solve, speak up on Slack.

1. Complete all the installation and config steps above
2. If you have not already followed the below link to create your own copy of the class repo on github, follow it now:
    * https://rebrand.ly/seainfo6150-github
3. If you have not cloned the repository this file is in to your computer, do so now (`git clone value-from-the-code-button-on-github`)
    * the `value-from-code-button-on-github` is an instruction, you should replace that value with the value you can copy when you click the "code" button on the repo in github.
    * After cloning, be sure to be in the correct directory, the root directory of the project, that is, the directory that git clone just created
4. If you are not strong with git, see the 'basic-git.md' file in the readings/ directory, but for now just follow the steps here
5. Change into the repo directory (`cd student-YOUR-GITHUB-ID`) on the command line
6. Change into the work/setup-test directory in the repo (`cd work/setup-test`)
7. Follow the instructions in the README.md there.

## I'm a bit confused

Here are some resources you can use to get started if you feel particularly lost.
* https://guides.github.com/activities/hello-world/ (fully web-based to focus on the concepts)
* https://www.youtube.com/githubguides

You don't need to be strong with git/github at this point, so long as you are able to navigate the steps above, but I highly recommend improving your git skills as git is used in many, MANY workplaces, and even in those that don't you will often work with open-source libraries that use git.

You should ask questions on Slack - odds are if you're having an issue so is someone else.  You should not be afraid to admit you don't know something - if you knew it, you wouldn't be taking the class.  
