[中文介绍](https://github.com/rebron1900/twentynineteen-ghost/blob/master/README-ZH.md) | [English](https://github.com/rebron1900/twentynineteen-ghost/blob/master/README.md)


# Twenty Nineteen Ghost

This is a [Ghost](https://ghost.org) port of WordPress's [Twenty Nineteen](https://wordpress.org/themes/twentynineteen/) theme.
Ghost theme development scaffolding uses [Ghost-theme-starter](https://github.com/royalfig/ghost-theme-starter), thanks to @royalfig for the tool.

## Highlights

- waiting for perfection

## Installation

- To get started, click `Use this template` and clone the repo
- CD into the directory

```bash
npm install
```

- Make a symlink from the theme directory to your local install of Ghost's themes folder 

``` bash
# /content/themes
ln -s ~/your-theme-folder .
```
- Restart ghost (`ghost restart`)

## Dev Script

```bash
# Start the live reload server and compile your JS/CSS assets, and watch for changes
npm run dev
```
If your site isn't refreshing, you'll likely need to disable your browser's caching. Go to the Network tab in your dev tools and toggle "Disable cache".

## Production Scripts
```bash
# Fix any CSS issues, compile your JS/CSS assets for production, and create a ZIP file
npm run zip

# Scan your theme for potential incompatibilties with gscan
npm run check
```

## Differences from original theme
- The comment system uses [twikoo](https://twikoo.js.org)
- waiting for perfection


## Available Site Params
- waiting for perfection


## Social 
- waiting for perfection

