# Wayland Explorer

Easily browse and read Wayland protocols documentation.

## Motivation for this project

Wayland protocols are published as XML files. While the [core Wayland protocol](https://gitlab.freedesktop.org/wayland/wayland/-/blob/main/protocol/wayland.xml) specification is also available in HTML format for reading [online](https://wayland.freedesktop.org/docs/html/apa.html), that's not the case for all the [other](https://gitlab.freedesktop.org/wayland/wayland-protocols/-/tree/main/unstable) [Wayland](https://gitlab.freedesktop.org/wayland/wayland-protocols/-/tree/main/stable) [protocols](https://gitlab.freedesktop.org/wlroots/wlr-protocols/-/tree/master/unstable) which are not part of the core protocol.

This project attempts to fill this gap by parsing the XML protocol files and converting them to HTML in order to make it easy to browse and read them on the web.

## Technologies

Built with :sparkling_heart: using React, [Tailwind UI](https://tailwindui.com/components) and [vscode-codicons](https://github.com/microsoft/vscode-codicons).

## Disclaimer

This project has no affiliation with the official Wayland project.
