# Most Frequently Used Commands

Below are the most frequently used linux commands for any developer using linux based OS or Mac OS.

Throughout this file the name `directory` and `folder` will be used interchangeably.

Most of the command below are shown the way we use in day to day life. I highly recommend to check the command information using `man` command, it will be a great way to learn about a command in depth and you can always refer it without memorizing anything.

&#128683; Work is in progress...

---

- [Most Frequently Used Commands](#most-frequently-used-commands)
  - [**ls** - List the files/folder in a folder](#ls---list-the-filesfolder-in-a-folder)
  - [**man** - Opens up manual for sub\_command](#man---opens-up-manual-for-sub_command)
  - [**cd** - Change directory](#cd---change-directory)
  - [**mv** - Move a file from one path to another](#mv---move-a-file-from-one-path-to-another)
  - [**cp** - copy file/folder](#cp---copy-filefolder)
  - [**touch** - Create an empty file](#touch---create-an-empty-file)
  - [**mkdir** - Create an empty directory/folder](#mkdir---create-an-empty-directoryfolder)
  - [**rmdir** - Delete an empty directory](#rmdir---delete-an-empty-directory)
  - [**rm** - Delete files/folders](#rm---delete-filesfolders)
  - [**tail** - Print last couples of lines from file](#tail---print-last-couples-of-lines-from-file)
  - [**cat** - Print all the content of the file in the terminal/standard output](#cat---print-all-the-content-of-the-file-in-the-terminalstandard-output)
  - [**sudo** - Provide super user access](#sudo---provide-super-user-access)
  - [**history** - List the commands ran earlier](#history---list-the-commands-ran-earlier)
  - [**head** - Print first couple of lines from file](#head---print-first-couple-of-lines-from-file)
  - [**exit** - Exit the terminal window](#exit---exit-the-terminal-window)
  - [**clear** - clear the console](#clear---clear-the-console)
  - [**pwd** - Print present working directory](#pwd---print-present-working-directory)
  - [**alias** - Create an alias of simple/complex command](#alias---create-an-alias-of-simplecomplex-command)
  - [**grep** - Matches pattern based on regex](#grep---matches-pattern-based-on-regex)
  - [**curl** - Tool for transferring data from or to a server](#curl---tool-for-transferring-data-from-or-to-a-server)
  - [**ping** - Echo request and response utility to/from server](#ping---echo-request-and-response-utility-tofrom-server)
  - [**ps** - Show process status](#ps---show-process-status)
  - [**kill** - Kill a process](#kill---kill-a-process)
  - [**echo** - Write variable's value or string to std output](#echo---write-variables-value-or-string-to-std-output)
  - [**shutdown** - Shutdown machine at given time](#shutdown---shutdown-machine-at-given-time)
  - [**chmod** - Change access/modes of file](#chmod---change-accessmodes-of-file)
  - [**passwd** - Change user's password](#passwd---change-users-password)
  - [**which** - Locate a program file in the user's path](#which---locate-a-program-file-in-the-users-path)
  - [**less** - Read file by opening few lines with forward/backward movement](#less---read-file-by-opening-few-lines-with-forwardbackward-movement)
  - [**whoami** - Display user ID](#whoami---display-user-id)
  - [**whatis** - Find what a command is for](#whatis---find-what-a-command-is-for)
  - [**wc** - Word count](#wc---word-count)
  - [**uname** - Name of the operating system implementation](#uname---name-of-the-operating-system-implementation)
  - [**find** - Walk a file hierarchy](#find---walk-a-file-hierarchy)
  - [**diff** - Compare files or directory](#diff---compare-files-or-directory)
  - [**export** - Export environment variable](#export---export-environment-variable)
  - [**chown** - Change file owner and group](#chown---change-file-owner-and-group)
  - [**top** - Display sorted information about processes](#top---display-sorted-information-about-processes)
  - [**useradd** - Add new user](#useradd---add-new-user)
  - [**usermod** - Update existing user data](#usermod---update-existing-user-data)
  - [**ssh** - OpenSSH remote login client](#ssh---openssh-remote-login-client)
  - [**zip** - Package and compress (archive) files](#zip---package-and-compress-archive-files)
  - [**unzip** - List, test and extract compressed files in a ZIP archive](#unzip---list-test-and-extract-compressed-files-in-a-zip-archive)
  - [**cal** - Open calendar](#cal---open-calendar)

---

## **ls** - List the files/folder in a folder

- List files and folders

```
  $ls
```

- List all with permission and user info

```
  $ls -l
```

- List all including hidden

```
  $ls -a
```

- Combination of -l and -a

```
  $ls -all
```

## **man** - Opens up manual for sub_command

```
  $man ls
  $man touch
```

## **cd** - Change directory

- Go to the provided folder

```
  $cd <folder_path>
```

- Go one directory back from preset directory

```
  $cd ..
```

- Go back to the previous directory

```
  $cd -
```

## **mv** - Move a file from one path to another

```
  $mv <source_file_path> <target_file_path>
```

## **cp** - copy file/folder

```
  $cp <source_file> <target_file>
```

## **touch** - Create an empty file

```
  $touch <file_name>
```

## **mkdir** - Create an empty directory/folder

```
  $mkdir <directory_name>
```

## **rmdir** - Delete an empty directory

```
  $rmdir <directory>
```

## **rm** - Delete files/folders

- Delete a file

```
  $rm <file_name>
```

- Delete directories as well as other types of files

```
  $rm -r <file/folder_path>
```

- Delete directories as well as other types of files FORCEFULLY.

```
  $rm -rf <file/folder_path>
```

**Note**: Use with caution &#9888;. It will not even ask for a confirmation.

## **tail** - Print last couples of lines from file

```
  $tail <file_name>
```

## **cat** - Print all the content of the file in the terminal/standard output

- Print content of one file

```
  $cat <file_name-1>
```

- Print content of more than one file in sequence

```
  $cat <file_name-1> <file_name-2> ...
```

## **sudo** - Provide super user access

```
  $sudo <sub_command>
```

**Note**: It will prompt for admin password, once provided it will allow to execute restricted commands.

## **history** - List the commands ran earlier

```
  $history
```

## **head** - Print first couple of lines from file

- Print first 10 (default) lines of a file

```
  $head <file_name>
```

- Display first 5 lines of a file

```
  $head -n 5 <file_name>
```

## **exit** - Exit the terminal window

```
  $exit
```

## **clear** - clear the console

```
  $clear
```

**Note**: You can also use `ctrl + l` shortcut to clear the console.

## **pwd** - Print present working directory

```
  $pwd
```

## **alias** - Create an alias of simple/complex command

```
  $alias <custom_command_name>="complex_command"
```

This one is my favorite. I create a lot of alias for complex or long commands and store it in `~/.bashrc`. As a result they are available like any other command in the terminal.

Eg:

```
  $alias fakechrome="open -a 'Google Chrome' --args --use-fake-device-for-media-stream"
```

You enter `fakechrome` in the terminal and it executes whole `open -a ...` command.

## **grep** - Matches pattern based on regex

- Mostly used as a filter command with a parent command separated with pipe.
- `|` is called pipe

Eg:

```
  $history | grep git
```

Above command will list all the commands ran previously containing `git` keyword.

## **curl** - Tool for transferring data from or to a server

```
  $curl [options] <url>
```

Eg:

```
  $curl www.google.com
```

**Note**: For options please check `$man curl`

## **ping** - Echo request and response utility to/from server

```
  $ping <host_name/url>
```

This can be used to check if you are connected to internet or some host is reachable or not.

## **ps** - Show process status

```

```

## **kill** - Kill a process

```

```

## **echo** - Write variable's value or string to std output

```

```

## **shutdown** - Shutdown machine at given time

```

```

## **chmod** - Change access/modes of file

```

```

## **passwd** - Change user's password

```

```

## **which** - Locate a program file in the user's path

```

```

## **less** - Read file by opening few lines with forward/backward movement

```

```

## **whoami** - Display user ID

```

```

## **whatis** - Find what a command is for

```

```

## **wc** - Word count

```

```

## **uname** - Name of the operating system implementation

```

```

## **find** - Walk a file hierarchy

```

```

## **diff** - Compare files or directory

```

```

## **export** - Export environment variable

```

```

## **chown** - Change file owner and group

```

```

## **top** - Display sorted information about processes

```

```

## **useradd** - Add new user

```

```

## **usermod** - Update existing user data

```

```

## **ssh** - OpenSSH remote login client

```

```

## **zip** - Package and compress (archive) files

```

```

## **unzip** - List, test and extract compressed files in a ZIP archive

```

```

## **cal** - Open calendar

```

```
