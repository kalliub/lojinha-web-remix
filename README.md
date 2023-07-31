# Lojinha Web

[![Netlify Status](https://api.netlify.com/api/v1/badges/5b82ce0b-54ed-4c80-82d0-4cb6ddf4cd2c/deploy-status)](https://app.netlify.com/sites/lojinha-remix/deploys)

### [🔗 Check it out!](https://lojinha-remix.netlify.app/)

## About the project

This project is a more updated version of the [current Lojinha official website](https://lojinhaimportados.com.br/lista/), where I better showcase my most recent learnings in Front End development, implement best practices and open it to a public repository.

### The challenge

When I first develop this project on **Jan/2020**, it had the following requirements:

#### The users

- Should be able to see the products available in the store, displayed on different categories with their respective prices and descriptions;
- Were used to use a Google Sheets spreadsheet to see the products, so the new website could have a similar "list" layout;
- Would access the website from their mobile phones, so the website should be responsive, fast and lightweight;

#### The staff

- Should be able to update the products on the spreadsheet and the website should update automatically and immediately;
- Access the website from a desktop or tablet.
- Are used to the Google Sheets spreadsheet to update the products, so I could not use a CMS or a database to store the products, but I could adapt their spreadsheet.

### My solution

- I developed an script to read the spreadsheet and generate a JSON file with the products data, which would be used by the website, [which can be found on this repository](https://github.com/kalliub/google-sheets-to-json). So yes, Google Sheets is my database and API.
- The website was rapidly designed by me using Figma, and approved by the staff. Then, this website was online.
- We (me and my life partner [Geovanna Nista](https://github.com/rainhavisenya)) also developed a React Native app for the same list, because their already had one app, which some customers used to see the products. But this repository I probably won't make public, because it's not as well developed as this one.

### About Lojinha

"Lojinha Importados" is a Brazilian store focused on general electronic products, selling its items in a physical store and on marketplaces such as MercadoLivre and its own virtual store.

### Technologies and Libraries

- [TypeScript](https://www.typescriptlang.org/): Language
- [React](https://react.dev/): JavaScript Framework
- [Remix](https://remix.run/): Server-Side Rendering framework
- [Netlify](https://www.netlify.com/): Hosting solution
- [Material UI](https://mui.com/material-ui/getting-started/): Component library
- [Zod](https://zod.dev/): TypeScript validation library
