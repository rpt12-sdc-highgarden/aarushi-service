# About The Author module from goodreads

>  The module will display author info of the book that is displayed. Specifically, this module will
    display the author's name, number of followers, and a biography. Also, the top 5 books of that
    author will display along with a pop-up window with detailed book information that displays
    if the user hovers over a particular book title.

## Related Projects

  - https://github.com/rpt12-sdc-highgarden/mike-service
  - https://github.com/rpt12-sdc-highgarden/anait-service
  - https://github.com/rpt12-sdc-highgarden/alyssa-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

### Initial Setup
Complete these two steps ONCE before starting the application for the first time:
1.  `npm install -g webpack` to install webpack globally.
2. `npm install` to install dependencies.
3. `npm run create-db-mysql` to create MySql database for the application.
4. `npm run create-index` to create index on the Books table.

### Regular Usage
To start the application, Please run the following "package.json" scripts:<br>
1. `npm run build` to start Webpack.<br>
2. `npm run start` to start the Node server.<br>
3. `npm run seed` to add fake data to the db.<br>

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 10.13.0
- etc

## Development

## API Endpoints

**URL:** /author<br>
**Description:** This example retrieves an author's name, number of follwers, and a biography.<br>
**API Response:**<br>
```
{
  "name":"Rosalinda Kutch IV",
  "followers":91593,
  "biography":"Sunt sed vitae aliquid. Qui libero
  et explicabo maxime veritatis asperiores quia et
  mollitia. Dolor ipsam   laboriosam libero tempore."
  "author_image": '[link to image]'
}

```

**URL:** /five-books-by-author<br>
**Description:** This example retrives a maximum of five books written by an author.<br>
**API Response:**<br>
```
{
  "titles":
  [
    "Licensed Rubber Cheese",
  "Incredible Frozen Pants",
  "Handcrafted Wooden Bike",
  "Practical Steel Pizza",
  "Incredible Wooden Sausages"
  ]
}

```

**URL:** book-item-hover-window<br>
**Description:** This example retrieves a book's title, total number<br>
of ratings, the average rating, the year of publication, and a description of the book.<br>
**API Response:**<br>
```
{<br>
  "title":"Handcrafted Rubber Table",
  "total_ratings":18274,
  "average_ratings":"4",
  "year":2007,
  "description":"Eum hic dolorem. Illum omnis tenetur atque
  iusto non. Iste placeat et amet cupiditate quo."
}

```
## CRUD
**CREATE AUTHOR:** <br>
**Method:** post <br>
**Endpoint:** /author<br>
**Description:** This operation creates a new random author with a createdAt and updatedAt date/time that matches the date of creation. <br>
**API Response:**<br>
```
added author [id of added author in author table, # of added authors (1)]
```
<br><br>
**UPDATE FOLLOWERS:** <br>
**Method:** put <br>
**Endpoint:** /author/:id <br>
**Description:** This operation adds a follower to an author when a user clicks on the "Follow Author" button. <br>
**API Response:**<br>
```
added followers [updated author (object/document)]
```
<br><br>
**DELETE BOOK & AUTHOR:** <br>
**Method:** delete <br>
**Endpoint:** /author/:id <br>
**Description:** This operation deletes an author where the id in the authors table matches the id in the endpoint. <br>
**API Response:**<br>
```
deleted book [deleted book (object/document)]
delted author [deleted author (object/document)]
```
