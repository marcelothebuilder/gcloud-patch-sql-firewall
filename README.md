<h1 align="center">Welcome to gcloud-patch-sql-firewall 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/gcloud-patch-sql-firewall" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/gcloud-patch-sql-firewall.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: GPL" src="https://img.shields.io/badge/License-GPL-yellow.svg" />
  </a>
</p>

> Allow your public ip to access gcloud sql instances through command line

## Prerequisites

* Google Cloud CLI
* Node 16

## Install

```sh
npm install gcloud-patch-sql-firewall -g
```

## Usage

```sh
gcloud-patch-sql-firewall --gcloud-instance-id=postgresql --gcloud-project-id=my-project-id --gcloud-configuration=default
```

or


```sh
npm run start -- --gcloud-instance-id=postgresql --gcloud-project-id=my-project-id --gcloud-configuration=default
```

--gcloud-configuration is optional. If not provided, default to "default".

## Author

👤 **Marcelo Paixão Resende**

* Github: [@marcelothebuilder](https://github.com/marcelothebuilder)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_