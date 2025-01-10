# bolistik-server

## Prerequisite

**Node Version Manager (nvm):** 0.40.1  
**Node.js**: v22.12.0 LTS

## Installation

### For macOS

Please use package managers to install necessary tools e.g. [Homebrew](https://brew.sh) or [MacPorts](https://www.macports.org).  
It is easier to control the tools' versions and switching between them.

#### Install **node.js** by using [**nvm**](https://github.com/nvm-sh/nvm)

`brew install nvm`

#### Download [Node LTS](https://nodejs.org/en/) (Long-term support) by using `nvm`.

`nvm install --lts`

Check `node.js` version: `nvm list` or `node --version`  
Enable corepack: `corepack enable`

Make sure that versions conform the [Prerequisite](#markdown-header-prerequisite)

#### Sources:

- https://nodejs.org/en/download/package-manager/
- https://github.com/nvm-sh/nvm

## Run the project

Check the status of packages: `pnpm list`  
Install npm packages: `pnpm install`

#### Start the server in different modes

- Development: `pnpm run start`
- Watch mode: `pnpm run start:dev`
- Production mode: `pnpm run start:prod`

#### API documentation:

Available: http://localhost:3000/api#/

#### Sources:

- https://github.com/nestjs/nest
