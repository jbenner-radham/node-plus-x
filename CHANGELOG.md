Changelog
=========

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

[Unreleased]
------------

### Added

- Verbose output mode for the CLI app.

### Changed

- The CLI app no longer modifies files which are already executable to match the behavior of
  `chmod`.

[0.6.0] - 2025-10-22
--------------------

### Changed

- Enhanced the output of `--help` on the CLI app.

[0.5.2] - 2025-10-17
--------------------

### Fixed

- The app description was being displayed twice in the output of `--help` on the CLI app.

[0.5.1] - 2025-10-17
--------------------

### Fixed

- The output of `--version` on the CLI app.

[0.5.0] - 2025-10-17
--------------------

### Added

- An `--exclude` flag to the CLI app, which can be used to exclude files from being processed.
- An error message when the CLI app is run, but no matching file paths are found.

[0.4.0] - 2025-10-10
--------------------

### Added

- Glob support for the CLI app.

### Changed

- Adjusted the formatting of the CLI app's `--help` output.

[0.3.0] - 2025-10-09
--------------------

### Added

- The CLI app can now process multiple file arguments.

[0.2.0] - 2025-10-08
--------------------

### Added

- A description to the output of `--help` on the CLI app.

### Changed

- The required Node.js version is now `>=20`.

### Fixed

- An error where the CLI app would crash because it could not read the `package.json` file.

[0.1.0] - 2025-10-07
--------------------

### Added

- Initial release.

[Unreleased]: https://github.com/jbenner-radham/node-plus-x/compare/v0.6.0...HEAD
[0.6.0]: https://github.com/jbenner-radham/node-plus-x/compare/v0.5.2...v0.6.0
[0.5.2]: https://github.com/jbenner-radham/node-plus-x/compare/v0.5.1...v0.5.2
[0.5.1]: https://github.com/jbenner-radham/node-plus-x/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/jbenner-radham/node-plus-x/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/jbenner-radham/node-plus-x/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/jbenner-radham/node-plus-x/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/jbenner-radham/node-plus-x/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/jbenner-radham/node-plus-x/releases/tag/v0.1.0
