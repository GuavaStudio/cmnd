# CMND
## Command Line Interface Utility for Node.js

CMND is a package that lets you easily generate CLI tools in Node.js.

# Usage

To use CMND, first install it in your Node project with `npm install cmnd --save`.

Next, modify your project's `package.json` to include:

```
"bin": {
  "mycli": "./cli.js"
}
```

Where `mycli` is the intended name of your command in the CLI.

Now create a file: `./cli.js` and folder `./commands`:

```javascript
#!/usr/bin/env node

'use strict';

const CommandLineInterface = require('cmnd').CommandLineInterface;
const CLI = new CommandLineInterface();

CLI.load(__dirname, './commands');
CLI.run(process.argv.slice(2));
```

Finally, populate your commands directory with your commands, here's an example
file: `./commands/example.js`

```javascript
module.exports = (() => {

  'use strict';

  const Command = require('cmnd').Command;

  class ExampleCommand extends Command {

    constructor() {

      super('example');

    }

    help() {

      return {
        description: 'An example command',
        args: ['example_arg1', 'example_arg2'],
        flags: {flag: 'An example flag'},
        vflags: {vflag: 'An example verbose flag'}
      };

    }

    run(args, flags, vflags, callback) {

      // Run code here.
      // To throw an error, use: callback(new Error(msg))
      // To optionally return a result, use: callback(null, result)

      callback(null);

    }

  }

  return ExampleCommand;

})();
```

## Creating manual pages (help)

View all the commands available to your CLI with `mycli help` where `mycli` is
the intended name of your command in the CLI. To modify help information,
change the return value of the `help()` method for each command.

## Creating Subcommands

To subclass a command (i.e. `mycli command_name:sub_name`) simply change the `contructor()`
method in your command to the following:

```
constructor() {

  super('command_name', 'sub_name');

}
```

## Running your commands

Each command has a `run()` method which takes three arguments: `args`, `flags`,
and `vflags`.

`args` is the array of arguments, passed before any flags.

i.e. `mycli command alpha beta` would populate `args` with `['alpha', 'beta']`

`flags` is an object containing any flags (prefixed with `-`), where each entry
is an array of values passed after the flag

i.e. `mycli command -f my flag` would populate `vflags` with `{f: ['my', 'flag']}`

`vflags` works identically to flags, but with "verbose flags" (prefixed
with `--`).

## Acknowledgements

Thanks for checking it out! This is a very simple module initially built to be
used with [Nodal](http://nodaljs.com), but can be used anywhere you'd like.

Cheers!

Follow me on Twitter, [@keithwhor](http://twitter.com/keithwhor).

Feel free to check out more of [my GitHub projects](http://github.com/keithwhor).
