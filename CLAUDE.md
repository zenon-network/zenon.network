# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

zenon.network is a static marketing website for the Zenon Network cryptocurrency project. It's a single-page application without modern build tools, using plain HTML, SASS/CSS, and JavaScript with jQuery.

## Development Commands

Since this is a static site without build tools:

1. **Running the site locally**: Use any HTTP server
   ```bash
   python3 -m http.server 8000
   # or
   npx http-server
   ```

2. **Compiling SASS**: Manual compilation required
   ```bash
   sass css/styles.sass css/styles.css
   # For watching changes:
   sass --watch css/styles.sass:css/styles.css
   ```

3. **Testing**: No test suite present

4. **Linting**: No linting configuration present

## Architecture & Key Components

### Core Files
- `index.html` - Single-page application entry point
- `js/main.js` - All JavaScript functionality including:
  - CoinGecko/GeckoTerminal API integration for price updates
  - Countdown timer for reward distributions
  - GitHub API integration for dynamic download links
  - Smooth scrolling navigation
  - Mobile menu handling

### Styling Structure
- `css/styles.sass` - Main SASS entry point that imports all partials
- `css/parts/` - SASS partials organized by concern:
  - `_settings.sass` - Variables and configuration
  - `_mixins.sass` - Reusable SASS mixins
  - `_base.sass` - Base element styles
  - `_general.sass` - General component styles
  - `_homepage.sass` - Homepage-specific styles

### API Integrations
1. **Price Data**: Fetches from CoinGecko and GeckoTerminal for real-time ZNN/wZNN prices
2. **GitHub Releases**: Dynamically fetches latest Syrius wallet releases for download links

### Third-party Dependencies
All loaded via CDN except Flipster (local):
- jQuery 3.7.1
- Font Awesome 6.6.0
- Normalize.css 8.0.1
- Lottie Player 2.0.8
- PostHog analytics

## Important Development Notes

1. **SASS Compilation**: Must be done manually - there's no automated build process
2. **Git Workflow**: Work on `site-updates` branch, PR to `master`
3. **GitHub Pages**: Site is deployed via GitHub Pages with custom domain (CNAME file)
4. **No Package Manager**: No npm/yarn - dependencies are CDN-based or committed
5. **Download Links**: Recently updated to fetch dynamically from GitHub API - see fetchLatestRelease() in main.js