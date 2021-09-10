# Debugging JS

## Importance

Debugging is a vitally important skill.  Most of what we do as programmers is debug.  Whether we are chasing down a bug that is in an existing product, or chasing a bug in a feature we are trying to add, the number of times that code "just works" when we first write it is annoyingly small.

Do not learn these skills just to pass the class, learn these skills to prepare for your career.  (But pass the class too - that's important)

## Goal

The most important lesson in trying to debug code that isn't working is:

** Find what specific code isn't doing what you expect **

90% of the time, when you figure out what exactly isn't working the way you expect, it turns out to be easy to fix.  The hard part is finding that specific problem.  The other 10% of the time takes work, research, or help from someone else like the instructor or a TA, but you cannot do any of those things until you know exactly what isn't working.

If your code isn't working, but you can't point to the exact line that is behaving differently than you expect, you need to do more debugging.

## Tools

If a program is "have this input, get this output", and the output is wrong (in any way) you need to break the problem down into smaller parts.

The primary tools to do this are:

1. Console.log()
2. Debugger

You want to track what state your application is in as you move through steps of the program.  When a step - a line of code - happens, and everything before that line made sense but now you're confused as to why you got the response you did, you've located the real problem.  

### Console.log

Checking on the application state can be as simple as dropping in a "console.log()" at the right point to output one or more variables, so that you can see what the variables ACTUALLY hold at that point (compared to what you expect them to hold).  

Using Console.log() is perfectly fine for simple debugging, but you should follow a few tips:

#### Always make it clear what you are logging

If you have multiple things that you are using console.log() on, you can easily get confused as to which item output "undefined" or some other unexpected value.  You can even see an expected value output in the wrong place and not realize that was from the wrong place.

It is often good to output an identifier along with the value.  Here are some examples to log the value "someValue":

`console.log('in foo func', someValue); // makes clear where it was output`
`console.log({someValue});` // makes it clear the value "someValue" is being output`

#### Don't be too noisy

Too many console.log() statements can make it difficult to notice what you care about.  While debugging, as soon as a piece of information is no longer useful to your debugging, stop outputting it.  If you think you might need it again, you can comment it out, just remember to remove it from your code before commiting it to your PR.

The goal is to not output so much information that the log is not useful.

#### Be ready to move to a debugger when appropriate

console.log() is a quick and convenient method for checking on your state.  However, there are many scenarios where it's not a great solution to check your state.  As soon as you find the console.log() is becoming hard to use, switch to using a debugger which will give you much more control over when the code execution starts and stops.  A good professional will not always rely on a single tool.

#### Always remove your debugging before submitting

Your employer will want clean code from you, and your coworkers will want the same.  What you submit to me should be what you submit to them.  Always remove both debugging and commented out code from your work before submitting it.

### Debugger

For JS code running in a browser, the browser developer tools (DevTools) will provide both a console and a debugger.  Using the debugger you can set breakpoints.  Code execution will continue until you reach a breakpoint, and there it will pause.  While paused you can examine the state of local variables.  You can resume execution, or choose to execute single steps or single function calls.  

Server-side, there are a few debugging tools available.  Many IDEs will let you run code in a debugger, and there are options to run a basic debugger on the node executable, or to expose server-side code execution to a browser.  Exploring these options are outside the scope of the class, but clever students will look up how to do this on their own.

### Other browser debugging tools

#### Browser DevTools Network tab
When using a browser, you can and should look at the Network tab of the devtools to inspect your service calls.  
- Check the status code to see if you're getting an error
- Check the url to see what query params you are passing
- Click on the request to see the details.  
    - Check the Headers subtab and scroll to the bottom to see anything passed in the body.  (Why is the body under "Headers"?  No good reason).
    - Check the Response subtab to see what is being sent to you

Often people will spend time trying to debug JS on the server or on the browser when the mistake was on the other side, and the side they are looking at is working correctly, but is given empty or bad data.


