# AgWeather Website

This is the code to build the MSU AgWeather website for Dr. Jeff Andresen, MSU
Geography, Environment, and Spatial Sciences.  It is designed based on MSU web 
branding and accessibility standards (to the best of our ability)

This code will 'build' a website in the `/build` folder.   See below for how to 
build and deploy it, but the end product is https://github.com/enviroweather/agweather-build

## Tech

This is a javascript site, using [Svelte.js](https://svelte.dev/) that can build a mostly static website.  This source code can be built before deployment. 

- We use [`pnpm`](https://pnpm.io/) instead of npm to manage this node package, but `npm` should work ok.  project has a 'lockfile' describing which 
- [Svelte.js](https://svelte.dev/) 5.5 and SvelteKit 2.5.7
- Theme built with Daisy UI components, which are based on Tailwind CSS
- Font is 


### Getting stated

0. requires Node.js for building only (not for deploy) and PHP for forecast functionality
    -  Install pnpm and node if necessary.  <br\>
   This was developed with `node` v22.17
   - Install PHP, it was tested with 8.2
1. install things: `pnpm i --frozen-lockfile`  this will use the versions here
    - if you are developing and need update package, just use `pnpm -i` but check the

2. try building:  `pnpm run build` will update files in the `/build` folder

### real testing/preview

The site uses PHP , but npm does not.  There may be an easier way to do this, but
this works.  This is written fro MacOS/Linux.  Help writing these for windows is
requested!

0. Build if you need to
1. start a php server that looks at the build folder (Mac/Linux), and put it on the background: 
   `php -S localhost:9000 -t build&`   
2. open a browser on https://localhost:9000 to see the site and forecasts pages
3. Edit stuff and save
4. rebuild `pnpm run build`
5. review in the browser.  

Note PHP is only needed for the 'forecasts' page.  If you want to edit and 
preview all the other pages simply, you can just do `pnpm run dev` to get
hot reload, etc or `pnpm run preview`  to preview the built version (requires
rebuild to see changes) but these `pnpm` commands won't run PHP stuff. 

### Test... tbd

- will require writing tests to ensure all pages build
- uses [`playwright` ](https://playwright.dev/)
- TODO:  add accessibility testing, see https://playwright.dev/docs/accessibility-testing 


### Deployment

This repo uses github and github actions.   

**when it's ready for deployment**

0. build the latest/greatest version `pnmp run build`
1. checkout production branch with `git checkout production`
2. merge or rebase (I like rebase)   `git rebase main`  (only when on production)
3. send to github `git push origin production` 
4. Pushing to the `production` branch (with a built `build/` folder committed)
triggers [`.github/workflows/publish-build.yml`](.github/workflows/publish-build.yml),
which mirrors (copies/pushes) `build/` to the root of the github rebo http://github.com/enviroweather/agweather-build`. 


## Deployment setup

If you move these repos you will need to setup ssh keys for the workflow to work 
(pushing the production branch 'build' folder to a new repo)

One-time setup

1. **Generate an SSH key pair.**  I used ssh-keygen to the file `~/.ssh/agweather-deploy` and don't add a passphrase
2. **Add the public key** ( `agweather-deploy.pub`) as a Deploy Key (write access) on enviroweather/agweather-build → Settings → Deploy keys.
3. Add the private key as a secret named AGWEATHER_BUILD_DEPLOY_KEY on enviroweather/agweather → Settings → Secrets and variables → Actions.
4. Make sure agweather-build exists (even empty) before the first run.

For deployment at a web root, the default build is ready to copy. For a subdirectory such as `/agweather`, build with:

```sh
BASE_PATH=/agweather pnpm run build
```

The forecast page requests same-origin data from `api/forecast-proxy.php?station=klan`, so no CORS configuration is required between the browser and the PHP script. Static-only preview commands do not execute PHP; test the generated `build/` directory with a local Apache/PHP server when validating forecasts.

## Editing

This is a Svelte site that uses reuseable components, found in /src/lib/components. Currently there 
are only the header, nav and footer.  The rest of the page is only HTML and a little javascript. 

The Theme of the page is taken from https://github.com/billspat/Unofficial-MSU-Website-Template , 
a build is in https://billspat.github.io/Unofficial-MSU-Website-Template/

This site uses only a handful of design elements from that theme, but when adding more look for 
examples from that theme. 

## Note

This project was started with the Svelte `sv` utility as follows:

```sh
# recreate the skeleton basis for this project
pnpm dlx sv@0.15.3 create --template minimal --types ts --add eslint vitest="usages:unit" playwright tailwindcss="plugins:typography" sveltekit-adapter="adapter:static" --install pnpm agweather
```


### More!

See also the [notes](notes) folder in this repo for more hints on about how to develop


