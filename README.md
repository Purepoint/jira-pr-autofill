# JIRA PR Autofill
This Chrome extension autofills the PR title with the title of the JIRA card and the description with the link.

## Installation
- Open chrome://extensions.
- Check the "Developer mode" checkbox and click the "Load Unpacked Extension..." button.
- Select the folder containing the extension.

## Usage
Just click the JIRA icon in the toolbar.

It works only if the name of the branch starts with the ID of the card (e. g., `HWS-2694-broken-fr-pages`).

Currently there’s no error handling so if you aren’t logged in to JIRA or the card doesn’t exist then it will fail
silently.
