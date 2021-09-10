# Command Line Essentials
## Background
### What is the Command Line

The _command-line_ is usually verbal shorthand to refer to a _command-line interface_ (CLI), which is usually accessed via a _terminal program_, and the _operating system_ provides a _shell_ to interpret your commands, invoke any programs, and pass them any instructions from your command.  CLIs are text-based: you type commands, stuff happens.  

The command line is in contrast to the _graphical user interface_ (GUI) - which is usually the visual interface with multiple windows, icons, and mouse-based interactions.

The 3 major non-mobile operating systems (Windows, Mac/OSX, Linux) all have CLIs in addition to GUIs - indeed, the CLI predates the graphical desktops that are now commonplace - and they each have various styles and quirks.  I will offer what assistance I can, but I am not an expert on operating systems (particularly Windows) and you are expected to be able to find solutions to any indirect problems.

### Why do we care (for purposes of this class)?

A great deal of material from this class will be demonstrated and explained via the command-line, not just by me but also by a large portion of the help/documentation/exercises/tutorials available online.  Using the command line is not a requirement of the class as long as everything ultimately comes to me in the form needed.  However, it is a good idea for any developer to have a basic understanding of the command-line, if only to be able to interpret online documentation and guides.  This is true even for those working on a primarily-graphical system and for those not working on coding for the web.  Only those programming exclusively on Windows, with languages intended primarily for Windows, using tools only for Windows are the exceptions to this advice.  

You may come to love the flexibility and power involved with the command line despite any shortcomings - there is a reason the majority of documentation exists as command-line instructions - or you may find it is not to your tastes to spend the bulk of your time at the command line.  For this class I will be giving examples using the command line.

### How do we do these things?
#### Differences between operating systems

Every system is different, but some systems are more different than others.  Without going into detail about the interwoven and fascinating histories that led to today's operating systems (no joke, it's pretty cool) here are the big points to know:
* All of these differences matter for the programs with which you write/edit your JS code, save and version your code, and use to run JS outside of a browser, but when we are talking about JS written for the browser, the browser matters far more than the operating system.
* Each of these operating systems has various versions, which can differ in small but sometimes significant ways, with Mac having the highest number of small-but-significant differences between its own versions
* Windows is particularly different from the other two systems, including:
    * Windows uses backslashes in file system paths (for historical but regrettable reasons), while everyone else uses slashes.  This applies to internal file paths only - paths in URLs are not impacted.  In many-but-not-all places Windows will try to use slashes, but there are exceptions    
    * Windows "text" files (which includes all program code for most any language) indicate a end-of-line (EOL) differently.  Most text editors will detect and convert this for you.  If you ever open a file and see a lot of "^M", that means that a file has moved between systems without changing the EOL appropriately.
    * Because they have many commonalities, Mac and Linux systems have an easier time using code original written for the other.  This means that Mac and Linux might have one set of tools available, while Windows has a completely different set.  Any of the programs needed for class are available on all major systems.
    * Windows is far more graphically oriented, which means the base command-line has fewer niceties
    * Windows has some command-line alternatives, such as Powershell or cygwin.  I have heard good things, but have no personal experience
    * Documentation for Windows about many of our processes are often separate, less complete, or missing.  This is due to a combination of the points above, that Microsoft encourages the exclusive use of their programming tools and platforms, and the origins of the internet and popular internet protocols and concepts on non-Windows systems. "Big" or popular tools are more likely to have strong support for all popular systems.  
* Mac and Linux are much more similar, but that does mean the differences are more subtle.  
* All systems have a concept of a "file extension", that is, the letters after a dot (.) in the file name.  Extensions do not automatically mean anything - they are just part of the name - but many shells and other programs will make assumptions about files based on their file extensions.  Modern GUIs tend to not display the file extensions unless you tell them to.  For programmers it is almost always a good idea to configure any GUIs to display the file extension.  File extensions are not inherently mandatory, though you may need them for particular tasks, and it is usually a good idea to have one, and most documentation including mine will assume you do so.
* Windows and Macs can be case-insensitive ('system' and 'System' are the same), while Linux and other systems are case-sensitive.  It is always a good idea to act as if everything was case-sensitive, because even if your system doesn't require it, other systems or programs you interact with might require it.

#### Running programs
### Binaries and executables

Generally speaking, there are two major types of computer files: Text and Binary.

The exact definitions are involved, but a short practical answer is:

Text files use a limited number of characters that each have some meaning to humans (plus a small number of formatting characters, such as 'newline'), even if the collection of characters itself is meaningless.  Example:  %#^@@ means nothing to me, but I can understand each character.  Text files are often line-based, and this is where the different indications of "end-of-line" between operating systems matters.

Text files can be used to represent basic text, HTML files, most programming code when it is written, configuration files, and a wide range of other options.  Some interfaces between systems (such as the protocol for the web, HTTP) use text because the limited range of characters makes it easy to be consistent between systems with different capabilities, different operating systems, and different hardware.

Binary files, on the other hand, use a much larger range of values that includes many values never intended for direct human reading.  (A simple example:  English has 26 letters, and we could make a system where each letter is represented by a different number.  1 = A, 2 = B, and so forth.  In that system, what would 28 represent?   312?).  Binary files are not impacted by any end-of-line differences between operating systems.

Binary files (or *binaries*) are used for data not intended to be directly read by humans (such as an image file, like a .gif) and/or situations where the density of the file data matters (a zip file of text files is itself a binary file - and much smaller in size than the original text files, despite containing all of the information from them).

An *executable* is a binary file that the operating system can translate into computer commands (i.e. a program).  Not all binaries are executables, but all executables are binaries (at least for the systems we'll be using).

Telling an operating system to use the program of a binary is called *executing* the program, *running* the program, or *invoking* the program (the terms are interchangeable).

In a GUI, running a program is usually a matter of clicking or double-clicking.  In a CLI, running a program is usually typing the programs name.  In most shells you can execute a program without including the file extension, but sometimes it is needed.  In Windows, an executable MUST end in certain file extensions, such as ".exe", though it can usually be run at the command line without including the file extension.
#### Environment Variables
Regardless of whether you are in a GUI or a CLI, the representation of your current usage is known as the "environment".  A lot differs between operating systems and shells when it comes to an environment, but generally we can say that each system can support multiple different environments at once, and that each environment can hold different definitions for its own variables, known as *environment variables*.  

In a GUI, these are usually very tucked away, as you don't interact with them directly.  In a CLI, they are more easily interacted with.  Environment variables are often used to inform programs of settings they should consider that are not specific to a particular single execution.

#### Directory Tree
All modern consumer computers have the concept of a *directory tree*.  Different files can be in a collection known as a *directory*.  GUIs often represent these as, and call them, *folders*, so the terms can be interchangeable, but when speaking generally 'directory' is the word more often used.

Directories can contain directories in addition to files, and those contained directories can also contain both directories and files, etc, which means that a representation of all the directories and files on a system can resemble a tree.  The base level is known as the *root*.  

A system can have multiple files with the same name if they are located in different directories.  

This concept of things containing things containing things shows up in many different places in programming.
#### Naming Files
Files and directories can be named a lot of different things - in fact, the technical rules are a lot less strict than the rules of what is a good idea.
* Both files and directories can have '.' in the name (remember - file extensions have no immediate inherit meaning to the operating system, interpretation of that comes from the shell and other programs) but as a general rule of thumb it always best to have a file extension for files, and not include the '.' character in directory names.
* Files and directories can have spaces and other special characters in them.  You should _never_ include spaces in the names for either, and should restrict special characters to `_`, `-`, and `.`.  
* You should generally avoid uppercase characters in directory names, and only use them in filenames in specific situations (usually files of program code, where a convention exists to give files using some capital letters additional meaning to humans)

You may notice that many directories your system comes with violate these conventions (e.g. "My Documents", "Photos").  These are all locations that are named to be more friendly to a non-technical user than than they are intended to be convenient for a programmer.  As we are programming, I recommend you follow these conventions or you may encounter more difficulties you could have avoided.  

#### Paths, Absolute and Relative
A shorthand for the location of a file or directory in the directory tree is a list of the directories leading to the final item with a separation character.  In most systems the separation character is a slash ("/"), in Windows it is a backslash ("\"). This list is known as the *path*. For this class, I will use slash-based paths, and Windows users will have to translate as needed.  The root directory is represented as this separation character alone.  Example: `/` 

At the command line (and sometimes at a GUI) you will talk about being "in" a directory.  You can change your current directory, and commands you give will default to using the current directory to look for files.

An *absolute path* is one that gives the location of the file or directory starting at the root. Example:
`/dir1/dir2/file.txt` refers to `file.txt` which is located in the `dir2` directory which is located in the `dir1` directory which is found in root directory.  Absolute paths are called that because regardless of what directory you are 'in', the absolute path will always (absolutely) refer to the same file or directory.

A *relative path* is one that gives the location of the file or directory relative to another directory (usually the directory you are in, but running programs may look for other files relative to some other path).  The directory you are currently in can be generically referred to as `.`, while the parent directory (the directory one level up) can be referred to as `..`.  Relative directories do not start with the root directory.
Examples:
* `foo/bar.txt` refers to the `bar.txt` files in the `foo` directory in the current directory
* `./foo/bar.txt` is identical to the above
* `./foo/../foo/bar.txt` is also the same (this is a highly unusual way to do it)
* `../baz.txt` refers to the `baz.txt` file in the parent directory of the current directory
* `foo` refers to the `foo` directory in the current directory

Absolute paths can include the `.` and `..` references, but there is usually no point, because in an absolute path there is no question as to what specific directory  it refers to.

#### The PATH environment variable

At the command line, when you type something that is not a built-in shell command and hit 'enter', the system will check to see if what you typed is the name of a program it should execute.  It does so by looking for files/programs with that name in a list of directories contained in an environment variable, known as the *PATH*.  This is distinct from just any path, and the similar names and concepts are usually clear from context.

The paths in the PATH are checked in order for a matching file, and if one is found the shell will try to execute it.  Notably, the PATH usually does _not_ include the current directory (for security reasons).  

The exception to the above scenario is if your command began with a path, either relative or absolute.  Examples:
* `foo` - tries to run the `foo` command by looking in PATH 
* `/bar/foo` - tries to run the `foo` command found in the `bar` directory off of the root.
* `./foo` - tries to run the `foo` command in the current directory,
* `bar/foo` - tries to run the `foo` command in the bar directory found in the current directory.

For our class you will have to make sure your PATH includes certain entries.  Environment variables can be set for all users of a system, or just one, or just for one instance of a shell, so you will want to make sure it is at least always set for your user name.  The ways of setting PATH vary by system and shell, with Mac and Linux being mostly identical and Windows being quite different...and different based on version of Windows.  Searching online for "set PATH" and adding your operating system should give you more information.

#### Home
Most system give each user account a "home" directory where files specific for that user can be stored.  In paths, this is often referred to as `~` (e.g. `~/foo.txt` means the `foo.txt` file in my home directory) - but unlike `.` and `..` this is not actually a standard path character.  Instead, most shells expand it to the actual directory.  The only significance to this is that you should feel free to use `~` at your command line, but should not include it in any programs or program configuration.

### Jargon
* Operating System (OS) - 
* Shell - 
* File system - 
* Directory/Folder - 
* Environment - 
* Invoke/Execute/Run - 
* UNIX/POSIX/Unix-like/\*nix - 
* BSD - 
* PC - 
* Text/Binary - 
* Executable -
* Symlink/Shortcut - 
* Hidden Files - 
* Permissions - 

## Getting Started
### Commands
#### Running a command
#### Flags, Switches, and Arguments
#### Common conventions
* -h / --help
* -v / --version

### Basic commands
There are long lists of programs and commands available, but here are some useful commands that are largely in common between all the systems.

#### ls / dir
#### cd
#### mkdir / md
#### rmdir / rd
#### rm / del
#### Ctrl-C
#### Ctrl-D
#### Ctrl-Z
### Additional Resources
#### Windows
* https://stackoverflow.com/questions/38428561/difference-between-forward-slash-and-backslash-in-file-path

#### Mac
* TODO

#### Linux
* TODO

### Self Quiz
* Imagine when you start your terminal, you begin in your home directory, `/home/student`.  What directory are you in after the following commands?  What would the directory tree look like after these commands? (assume no permission problems)
    * mkdir foo
    * mkdir /foo
    * mkdir ../bar
    * mkdir ~/../../bar
    * mkdir ./foo/bar
    * cd /
    * cd foo
    * cd ~/foo

