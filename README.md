# Dalia Task

## _Email subscription widget_

[![N|Solid](https://www.dalialabs.com/wp-content/themes/dalia-theme/img/logo.svg)](https://www.dalialabs.com/)

## Features

- Nice UI
- Bottom right corner
- Recivies list of emails provided by users


## Tech

Email Subscription Widget uses a number of open source projects to work properly:

- [Javascript] 
- [Webcomponent] 

And of course Email subscription widget itself is open source with a [public repository][dill]
 on GitHub.

## Installation

Just include the script file in your html page

```sh
<script src="https://omarelhamy.github.io/dalia-task/dist/email-subscription.js"></script>
```

## Usage

```
    <email-subscription icon="far fa-envelope" iconOpened="far fa-envelope-open" onSubmit="yourCallbackMethod"></email-subscription>
```

## Properties

Email widget is currently extended with the following properties.

| Property | description |
| ------ | ------ |
| icon | The default icon when the widget is closed ( fontawesome ) |
| iconOpened | The icon when the widget is opened |
| onSubmit | callback function when the user submit his / her email


## Test

Using Mocha for testing just run  ``` npm test ```

## License

MIT

**Free Software, Hell Yeah!**


   [dill]: <https://github.com/omarelhamy/dalia-task>
   [git-repo-url]: <https://github.com/omarelhamy/dalia-task-backend>
   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
