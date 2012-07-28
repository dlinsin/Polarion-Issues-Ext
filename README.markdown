# Polarion Issues Ext

A __Safari Extension__ which extracts information from a ticket of a [Polarion system](http://www.polarion.com/) 
and adds it to a [GitHub issue](https://github.com/dlinsin/Polarion-Issues-Ext/issues).

Written by [David Linsin](http://dlinsin.github.com), July 2012.

## Installation

Download the [latest version](https://github.com/downloads/dlinsin/Polarion-Issues-Ext/polarion_issues_ext-1.1.safariextz) of the Safari Extension 
and double click to install it.

## Usage

1. Open a new Tab and navigate to any Polarion ticket. Navigate to the print view, which you can find in the _Action_ menu:

![Print Menu](https://github.com/downloads/dlinsin/Polarion-Issues-Ext/print_menu.png)

Cancel the printer dialog and right click anywhere in order to bring up the context menu item _Copy Polarion Info_. 
Clicking it will extract the following information:

  * ID
  * Title
  * Description
  * Type
  * Author
  * Priority
  * Severity
  * Error Version
  * Target OS
  * Repair Version
  * Creation Date
  * Url 

Alternatively, after canceling the printer dialog, you can use the keyboard shortcut _SHIFT+CTRL+P_ to extract the information 
directly.

2. Create a [new GitHub Issue](https://github.com/dlinsin/Polarion-Issues-Ext/issues/new) and 
bring up the context menu by right clicking anywhere on the site. Click on the menu item 
_Add Polarion Info_ which will set the following Polarion infos:

  * the issues title to ID + title
  * a block quote containing the information mentioned above and the ID as a link to the URL of the original Polarion ticket

Alternatively you can use the keyboard shortcut _SHIFT+CTRL+O_ to add the information to the 
new issue directly.

## Known Issues

### General

Polarion can be customized and the fields extracted here might not suit your needs. You can easily customize 
them by adopting `dataFields_en` in the file `injected.js`.

At the moment the only language supported is English. If you'd like to contribute another language, please 
open a [pull request](https://github.com/dlinsin/Polarion-Issues-Ext/pulls).

### GitHub Issue Submit Button

Under some circumstances the _Submit new Issue_ button on a GitHub issue might stay disabled after 
inserting the Polarion information. As a workaround, you can simply add any character to the title of 
the issue, that's the reason why it's being focused right after insertion.

## Issues and Feature Requests

Please report issues via GitHub's issue tracker.

## License

Polarion Issues Ext is licensed under the Apache 2 License, expect for shortcuts.js which is 
licenses under BSD and cvi_busy_lib.js which is under the [Netzgestade Non-commercial Software License Agreement](http://www.netzgesta.de/cvi/LICENSE.html). 
