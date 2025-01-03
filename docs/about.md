# Introduction to Ratel

![Logo](/images/favicon-128.png)

## About Ratel

Ratel is a universal, scalable, and customizable graphic editing tool that can work online or offline and does not necessarily require a network. Support the creation of flowcharts UML、 Mockup drawings, etc. It can be accessed through a web browser or run directly through Windows, Macos, or Linux desktop applications. Basic graphic editing functions can be completed without the need for a network, except for a personal graphic library. However, advanced features such as remote storage of documents, customization of personal graphic libraries, team management, site management, and document sharing management can be achieved through the internet.

Please visit：<https://ratel.ivipa.com>.

## Main functions

- Support basic shapes, flowcharts, UML、 Mockup diagrams, Pools, source code editor and more

- Supports online or offline working modes, and most functions can work offline

- Support browser access or local desktop application mode access, local applications support Windows, Linux and MacOS

- Supports exporting to PNG/JPG format or SVG format, as well as importing PNG/JPG and SVG graphics

- Supports saving graphic files to the local environment and loading them from the local environment, as well as online saving and loading

- Support syntax highlighting graphic components

- Supports personal library features, allowing selected graphics to be saved as a personal graphics library, as well as importing PNG/JPG and SVG to a personal graphics library (requires network connection)

- Support sharing function and team management (network required)

- Support local deployment (including desktop application and server-side)

## Main Components

### ratel-web

Ratel web is responsible for graphic editing related work. It is front-end project.

### ratel-server

Ratel server is responsible for document management, team management, and other related tasks. It works as backend project.

### ratel-deployment

Ratel deployment is a deployment tool currently used to generate Docker files.
