## Loneshark <img src="https://raw.github.com/L1fescape/loneshark/master/images/shark.png" width="200px" />
> The singularity is now.

Loneshark prevents Grooveshark from being open in multiple tabs. When a link to Grooveshark is opened and there is already an instance of Grooveshark running, Loneshark will close the new tab and add the linked song to the end of the current queue.

## Install

Clone the repo:

```
git clone https://github.com/L1fescape/loneshark
```

Load the Chrome Extension:
- Open `chrome://extensions` in Chrome
- Click `Load Unpacked Extension`
- Navigate to where you cloned the Loneshark repo
- `Open`

## Todo

- Close or unbind confirm prompt that appears when closing a Grooveshark tab.
- Fix redelegation of primary grooveshark tab (sometimes doesn't pick a master player after all players have been closed)
- Album links

## Acknowledgements

- [Mike Cugini](https://github.com/betamike) - Creator of the original [Loneshark](https://github.com/betamike/loneshark)
- [Abraham Al-Rajhi](https://github.com/theabraham) - Help with javascript injection into Grooveshark tabs
- [Chris Dolphin](https://github.com/likethemammal) - Help with Chrome bindings and executing scripts

## License

MIT License • © [Andrew Kennedy](https://github.com/L1fescape)
