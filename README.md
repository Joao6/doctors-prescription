# Stetoskop Web
This is a web module of an project of medical solution.

# Features
* SASS support including sourceMaps
* Minimal CSS styling of the view
* Gulp watch, build and local server tasks
* Responsive navigation
* Owl slider directive
* localStorage service for set, get, remove data
* queryService $http wrapper to handle calls
* clear folder structure
* less than 10 request in build version
* minified CSS and JS build files
* google analytics snippet

## Download

```bash
git clone https://github.com/Joao6/stetoskop-web.git
```

## 1. Setup
```bash
npm install
```

## 2. Watch files
```bash
npm start
```
or
```bash
gulp
```

## 3. Build production version
```bash
npm run build
```
or
```bash
gulp build
```

## 4. Start webserver without watch task
```bash
npm run server
```
or
```bash
gulp server
```

## 5. Start webserver from build folder
```bash
npm run serverbuild
```
or
```bash
gulp server-build
```