# Process Management

- [Process Management](#process-management)
  - [**ps** - Show process status](#ps---show-process-status)
  - [**kill** - Terminate or signal a process](#kill---terminate-or-signal-a-process)

---

Use this table to understand the data displayed on running below commands

| Column Header | What does it means                                        |
| ------------- | --------------------------------------------------------- |
| `PID`         | Process ID                                                |
| `TTY`         | Controlling terminal associated with the process          |
| `TIME`        | CPU usages                                                |
| `CMD`         | Name of the command                                       |
| `PPID`        | Parent process ID                                         |
| `SID`         | Session ID                                                |
| `PGID`        | Parent group process ID                                   |
| `TPGID`       | Terminal sessions ID with which the process is associated |
| `UID`         | User ID associated with the process                       |

---

## **ps** - Show process status

- Display processes that have controlling terminals

```
  $ps
```

- Display other user's process info including those without controlling terminals

```
  $ps -ef
```

- Display the most amount of information

```
  $ps aux
```

- Display processes ran by a particular user

```
  $ps -u <user_name>
```

- Display processes ran by a particular group

```
  $ps -g <group_name>
```

- Display processes and it's sub-processes

```
  $ps -ejH
```

- Filter and display a particular type of process

```
  $ps -ef | grep http
```

## **kill** - Terminate or signal a process

- It is used to send signal to the processes using `pid` (Process ID).
- In order to send signal to other user's process you have to be super-user.
- The utility exits 0 on success, and >0 if an error occurs.

- Some of the more commonly used signals:

  ```
    1       HUP (hang up)
    2       INT (interrupt)
    3       QUIT (quit)
    6       ABRT (abort)
    9       KILL (non-catchable, non-ignorable kill)
    14      ALRM (alarm clock)
    15      TERM (software termination signal)
  ```

- Display all the available signals

```
  $kill -l
```

- Terminate the processes with PIDs 142 and 157

```
  $kill 142 157
```

- Send the hangup signal (SIGHUP) to the process with PID 507

```
  $kill -s HUP 507
```

- Terminate the process group with PGID 117

```
  $kill -- -117
```

**Note** : Check `man` of `ps` and `kill` to know more available options.
