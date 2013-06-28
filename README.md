
<img alt="Banner" src="https://lh6.googleusercontent.com/AkuCUZzHeSR-SsxHohbsyWQlQyPNT5eDvDrYpEkG2BsbQH8nj-kubMCoRKSCy3pYABsXPvuLHuc" title="A visual representation of WET-BOEW CKEditor">

# Web Experience Toolkit CKEditor Distribution
==================================================

## Development Code

This repository contains the WET-BOEW development version of CKEditor. 
It is a customised version of CKEditor to be used to edit content within the
context of the WET-BOEW environment.  

**Attention:** The code in this repository should be used locally and for
development purposes only. We don't recommend distributing it on remote websites
because the user experience will be very limited. For that purpose, you should
build it (see below) or use an official release instead, available on the
[CKEditor website](http://ckeditor.com).

### Code Installation

There is no special installation procedure to install the development code.
Simply clone it on any local directory and you're set.

### Available Branches

This repository contains the following branches:

  - **master**: development of the upcoming alpha release.
  

### Code Structure

The development code contains the following main elements:

  - Main coding folders:
    - `core/`: the core API of CKEditor. Alone, it does nothing, but
    it provides the entire JavaScript API that makes the magic happen.
    - `plugins/`: contains most of the plugins maintained by the CKEditor core team.
    - `skin/`: contains the official default skin of CKEditor.
    - `dev/`: contains "developer tools".

All activity should be concentrated in the configuration file, and the plugins. 

### Building a Release

A release optimized / minified version of the development code can be easily created
locally. The `dev/builder/build.sh` script can be used for that purpose:

	> ./dev/builder/build.sh

A "release ready" working copy of your development code will be built in the new
`dev/builder/release/` folder. An internet connection is necessary to run the
builder, for its first time at least.

### License

Licensed under the GPL, LGPL and MPL licenses, at your choice.

For full details about license, please check the LICENSE.md file.
