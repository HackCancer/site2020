# ![HackCancer/site](_src/_assets/img/share-image.png)

> A 24h Datathon
> https://HackCancer.eu

---

[**Live**](https://HackCancer.eu) | [**Styleguide**](https://HackCancer.eu/styleguide/)

---

# Contents

- [Content editing](#content-editing)
  - [Pages](#pages)
  - [Special pages](#special-pages)
    - [Front page](#front-page)
- [Development](#development)
  - [Install dependencies](#install-dependencies)
  - [Development build](#development-build)
- [Continuous deployment: always be shipping](#continuous-deployment-always-be-shipping)
- [Manual deployment](#manual-deployment)
  - [Prerequisite: authentication](#prerequisite-authentication)
  - [Staging build & beta deployment](#staging-build--beta-deployment)
  - [Production build & live deployment](#production-build--live-deployment)
- [Coding conventions](#coding-conventions--browser-support)
  - [(S)CSS](#scss)
  - [js](#js)
- [Authors & Contributors](#authors--contributors)
- [License](#license)

# Content editing

Most content on the site can be edited on GitHub without messing with HTML markup.

The site's source and structure is in the [`_src/`](_src) folder. Ignore everything with an underscore in its name.

When viewing a file on GitHub you will see a small pencil icon in the top right. Click that to edit the file.

## Pages

All pages are simple Markdown files. Markdown is a way of telling the site how an element should be marked up, like headings & bold text:

```markdown
I'm a simple paragraph. No fancy symbols needed.

# I'm a heading 1
## I'm a heading 2

You can make text **bold like so**
```

## Special pages

Some pages like front page source their content dynamically during site build. This is so we have a single source of truth for content used in multiple places on the site.

- [`_src/_data/content-front.yml`](_src/_data/content-front.yml)


# Development

You need to have the following tools installed on your development machine before moving on:

- [node.js](http://nodejs.org/) & [npm](https://npmjs.org/)
- (optional) use [Yarn](https://yarnpkg.com) instead of npm for faster dependency installations
- [Ruby](https://www.ruby-lang.org) (for sanity, install with [rvm](https://rvm.io/))
- [Bundler](http://bundler.io/)

## Install dependencies

Run the following command from the repository's root folder to install all dependencies.

```bash
npm i && bundle install
npm install gulpjs/gulp-cli -g
```

## Development build

Spin up local dev server and livereloading watch task, reachable under [https://localhost:1337](https://localhost:1337):

```bash
gulp
```

# Continuous deployment: always be shipping

The site gets built & deployed automatically via Travis. This is the preferred way of deployment, it makes sure the site is always deployed with fresh dependencies and only after a successful build.

Build & deployment happens under the following conditions on Travis:

- every push builds the site
- **live deployment**: every push to the master branch initiates a live deployment
- **beta deployment**: every new pull request and every subsequent push to it initiates a beta deployment

# Manual deployment

For emergency live deployments or beta deployments, the manual method can be used. The site is hosted in an S3 bucket and gets deployed via a gulp task.

## Prerequisite: authentication

To deploy the site, you must authenticate yourself against the AWS API with your AWS credentials. Get your AWS access key and secret and add them to `~/.aws/credentials`:

```
[default]
aws_access_key_id = <YOUR_ACCESS_KEY_ID>
aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>
```

This is all that is needed to authenticate with AWS if you've setup your credentials as the default profile.

If you've set them up as another profile, say `[HackCancer]` you can grab those credentials by using the `AWS_PROFILE` variable like so:

```bash
AWS_PROFILE=HackCancer gulp deploy --live
```

In case that you get authentication errors or need an alternative way to authenticate with AWS, check out the [AWS documentation](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html).

## Staging build & beta deployment

The staging build is a full production build but prevents search engine indexing & Google Analytics tracking.

```bash
# make sure your local npm packages & gems are up to date
npm update && bundle update

# make staging build in /_dist
# build preventing search engine indexing & Google Analytics tracking
gulp build --staging

# deploy contents of /_dist to beta
gulp deploy --beta
```

## Production build & live deployment

```bash
# make sure your local npm packages & gems are up to date
npm update && bundle update

# make production build in /_dist
gulp build --production

# deploy contents of /_dist to live
gulp deploy --live
```

# Coding conventions & Browser support

Lint with ESLint & [stylelint](https://stylelint.io) in your editor or run:

```bash
npm test
```

As a rule of thumb, make your CSS & JavaScript work in the last 2 versions of modern browsers, and ideally in IE 11. Adapt the `browserslist` key values in the [`package.json`](package.json) when a change in visitor statistics allows that.

## (S)CSS

Follows [stylelint-config-bigchaindb](https://github.com/bigchaindb/stylelint-config-bigchaindb) which itself extends [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard).

## js

Follows [ascribe/javascript](https://github.com/ascribe/javascript) which itself extends [airbnb/javascript](https://github.com/airbnb/javascript).

Try to not use any jQuery, always prefer vanilla JavaScript.

At the moment, jQuery is only used for the form submissions for its simple `$.ajax` functionality, and neither `XMLHttpRequest` or `fetch` seem to work with MailChimp.

# Authors & Contributors

- Gabriel de Maeztu ([@merqurio](https://github.com/merqurio))
- Oier Echaniz ([@oiertwo](https://github.com/oiertwo))

# License

For all code in this repository the Apache License, Version 2.0 is applied.
This repo is based in the IPDB site.
