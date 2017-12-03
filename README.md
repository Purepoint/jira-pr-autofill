# JIRA PR Autofill
This Chrome extension autofills the PR title with the ID and the title of the JIRA card and the description with the card's link.

## Installation
- Open chrome://extensions.
- Check the "Developer mode" checkbox and click the "Load Unpacked Extension..." button.
- Select the folder containing the extension.

## Configuration
- Set the JIRA URL on the options page.

## Usage
Click the JIRA icon in the toolbar to autofill title and description or use the following keyboard shortcuts:
- Alt+A - Autofill title and description
- Alt+L - Autofill description
- Alt+W - Add [WIP] prefix to title

It works only if you are logged in to JIRA, the name of the branch starts with the ID of the card (e. g., `HWS-2694-broken-fr-pages`), the card exists and you have permission to access it.
