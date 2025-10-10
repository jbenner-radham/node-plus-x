@radham/plus-x
==============

Make a file executable. A portable `chmod +x` equivalent.

Install
-------

As a system CLI tool:

```shell
npm install --global @radham/plus-x
```

As a project dependency:

```shell
npm install @radham/plus-x
```

Usage
-----

### CLI

```sh-session
$ plus-x --help
  Usage
    $ plus-x <FILE> [ADDITIONAL FILES...]

  Options
    --help, -h     Display this message.
    --version, -v  Display the application version.
```

### API

```typescript
import { makeExecutable, makeExecutableSync } from '@radham/plus-x';

const filepath = './bin';

// Asynchronous...
await makeExecutable(filepath); // > Promise<void>

// Synchronous...
makeExecutableSync(filepath);   // > void
```

See Also
--------

- [@radham/is-x](https://www.npmjs.com/package/@radham/is-x)

License
-------
The BSD 3-Clause License. See the [license file](LICENSE) for details.
