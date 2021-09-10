# Basic git usage for this class
## Overview
### Git
*Git* is an open-source and free software distributed  *version control system*, also known as a *source control system*. Git is one of many such systems, but is currently a very popular one among software developers.  What this means in practical terms is:
* git can record snapshots of the files in and beneath a directory when you tell it to
* The location of this data is know as a *repository* (*repo* for short)
* git can maintain different versions of these files/directories, known as *branches*
* git can switch between branches and/or revisions within those branches
* git can send ('push') or get ('pull') changes to files/directories from other repositories 
* git can copy the data, including history, from other repositories 

### Github
Github.com is a site that offers online git repositories (like git itself, Github is one of many, but is itself very popular). The repositories on github can be public (viewable to everyone) or private (restricted to a limited audience).

### How you will use git and Github for this class
For this class, you will be given access to one or more private repositories on Github
* You will create a 'local' git repository ('repo') on your system that is a copy of the one on github (a 'clone')
* You will receive lessons, assignments, and material by copying updates that are made to the github repo to your own local repo (a 'pull')
* You will create a version of your repository called a 'feature branch' based off of the 'main branch'
  * Note: Originally the primary branch defaulted to being called 'master' branch.  Many places are shifting to 'main' instead of 'master', but you will definitely encounter many places that are still using 'master'.  Just understand it is the default primary branch, regardless of the name.
* You will do any of your coding and work on your machine, saving to your local repository feature branch as needed/desired
* You will send a copy of your work to the repository on Github (a `push`)
* You will create a Pull Request (PR) (on the github.com website) to merge the changes in your feature branch into the main branch on the github repository
* I or a TA will approve the PR and merge the changes, or we may request changes from you
   * If we request changes from you, you will update your local feature branch and push those changes to the github feature branch.  The Pull Request will automatically update to show those updated changes, and we will again review them to request additional changes or approve and merge them.
   * If we merge the changes, you will pull the changes that are now in the github main branch into your local main branch

## Fundamentals

I will not go into great detail about using git (or any VCS) or Github (or any other online repository provider), in part because that is not the focus of the class, and in part because there are a large number of excellent guides and books available online.  However, here are some fundamental concepts involved:

### Basic Operations

Assuming you have git installed on your system (see _Additional Resources_ below), here are some core concepts that are covered in more depth in any of the online tutorials.
#### Fundamental Concepts
* a *package* is any collection of code that is tracked in one or more git repos (see below).  Sometimes multiple packages are tracked in a single repo (known as a "monorepo").
* a git *repo* is any directory tree that git has been told to track (which is done with `git init`)
    * You can have many git repos on your machine or elsewhere, of the same project/package or different ones
    * A repo may be based off another repo on the same or a different machine or may be an original one
* a git *branch* is one particular version of the code in that repo
    * `main` is the default name for the default branch, but there is no magic to the name, just convention
    * Branches are used to track development of particular features 
    * Branches can be *merge*d, where differences are brought together
    * Branches can be *push*ed to other repos, or *pull*ed in from other repose
    * Compared to some other VCS, git uses branches often and casually
* a *commit* is one set of file changes
    * commits have *commit messages* that are short descriptions summarizing the content of the commit
    * It is tempting to have nearly empty and repetitive commit messages, but it is better to have each commit message be meaningful
    * I recommend having the commit message complete this sentence: "This commit does ..."
* When you are changing files, each file change can have different statuses
    * Files can be *untracked*, which is usually a new file
    * Files can be tracked and *unstaged* changes, which means you've made changes but have not told git that you want these changes to be recorded
    * Files can be tracked and have *staged* changes, which means that a set of changes are ready to be recorded, but have not yet actually been recorded
    * *staged* changes can be *committed*, which records the changes 

All of which means that a file in a git repo can be all of the following at once:
    * originally from a different repo
    * has commited changes from that original version
    * has committed changes that differ from the same file in a different branch
    * have staged changes in the current branch that are not yet committed
    * have additional changes from the staged changes that are not yet staged nor committed

When you *merge*, it is not overwriting, but rather taking the differences of both branches from a common root and trying to apply both.  If one branch changes line 1 of a file, and another branch changes line 10 of the same file, the merged version will have both changes.  If two branches modify something in ways that git cannot figure out how to safely merge, it will be a *merge conflict*, which will insert the changes both branches want to make into the file.  You will need to manually alter the file to remove anything inserted that you don't want to keep, and commit the newly updated file.  The merge will then complete.

#### Common usage

This is a pattern you may use often in this class

* `git checkout main` - here we say to switch to the main branch in the current repo
* `git pull origin main` - this says to _pull_ in changes from the branch named _main_ from the repository named _origin_.  Both _origin_ and _main_ are commonly used defaults, but branches and references to other repos can use many names, there is nothing special about these.
    * `git pull` - Like the above, but it uses whatever repo and branch the current branch has as the source (_upstream_), which may or may not be defined
* `git checkout -b some-new-branch` - tells git to create a NEW branch (named some-new-branch) AND switch to it.  Simply changing to an existing branch is the _command_ as done in the first line.
    * _some-new-branch_ can be most anything, but is usually named for a short bit of work - a new feature, a particularly adjustment.  
    * `git checkout -b some-new-branch` some-repo/some-branch-on-that-repo - As above, but sets the _upstream_ for the new branch, which is the default if you use `git pull` in the future without specifying where you are pulling from.  The repo _some-repo_ is a repo reference defined in _git remote_, such as _origin_.
* Do some changes to files
* `git add some-filename` - *stages* the file changes to be committed. 
    * You can use wildcards to stage multiple files, or even `git add .` to stage all file changes in the current directory.  
    * You may have changed multiple files for different reasons.  If so, you can stage (add) and commit those changes separately.  This is fairly rare.
* `git status` - this just lists which files are *staged*, *unstaged*, or *untracked*.  You can use this at anytime, but it's definitely a good idea to do this before committing to make sure you didn't include or miss any files.
* `git commit -m"some-message"` - *commits* the staged file changes, with the commit message "some-message"
    * `git commit` - *commits* the staged file changes and opens the system default text editor to let you write a commit message.  Unless you have a long and detailed commit message, I recommend the -m"" version.
    * If you don't have the -m, you might get stuck in the default editor, which is often vim (a text-based editor), you can save-and-quit by hitting the escape key, then typing a colon (:) followed by the letters 'w' and then 'q': `ESC:wq` You can quit w/o saving (this could cancel the git operation you were doing) by typing `ESC:q!`   
* Your changes are now recorded to the current branch (_some-new-branch_) in the local repo.  If you have more changes to do for a different reason (and different commit message), now you can do them.  Once all your changes are done, options include:
    * `git checkout main` - just like we started, this takes us back to the main branch.  What follows can be done with any branch, but your primary branch is the most common recipient, and _main_ is the name commonly used for a primary branch.  Once you are again in the main branch, you can do the `git pull origin main` as listed near the start of this list to capture recent updates to the main branch.
    * (not for this class) `git merge some-new-branch` - this pulls the current contents of _some-new-branch_ and *merges* it into the current branch.  This is useful when you aren't using a repository as a central repository.  Because we are using the github.com repository as a central repository, we don't do this step, and it is listed here for the purpose of general learning.

This pattern allows you to make changes to the original code without impacting the original code in that original branch (or anything based off of that branch), and bring those changes into the original branch only when they are complete.  

## Additional Resources
### Downloading and installing git
* You can download git from the [official site](https://git-scm.com/downloads)
* Mac users that have Homebrew installed can instead install it with `brew git`
* Linux users can also use their package management system to install git

### Git Tutorials
* https://try.github.io/
* https://services.github.com/on-demand/intro-to-github/
* https://services.github.com/on-demand/downloads/github-git-cheat-sheet/
* https://guides.github.com/introduction/flow/
* https://git-scm.com/book/en/v2
* http://gitimmersion.com/
* http://rogerdudler.github.io/git-guide/

### Using Github
* Create a github account: https://github.com/
* Github tutorial: https://guides.github.com/activities/hello-world/


