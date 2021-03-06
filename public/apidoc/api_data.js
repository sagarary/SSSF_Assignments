define({ "api": [
  {
    "type": "delete",
    "url": "/delete/:id",
    "title": "Remove a cat",
    "description": "<p>Delete an entry from cats database</p>",
    "group": "Cats",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "_id",
            "optional": false,
            "field": "id",
            "description": "<p>Cat _id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n {\n 'message': 'Successfully deleted',\n 'id' : 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Delete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Cats",
    "name": "DeleteDeleteId"
  },
  {
    "type": "get",
    "url": "/all",
    "title": "Get all cats",
    "description": "<p>Get all entries from cats database</p>",
    "group": "Cats",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>Cat _id</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Cat date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Cat Category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "details",
            "description": "<p>Cat Details</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "coordinates",
            "description": "<p>Cat Coordinates</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thumbnail",
            "description": "<p>Cat Thumbnail Uri</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Cat Mid size image Uri</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "original",
            "description": "<p>Cat Original image Uri</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n\"time\" : \n\"title\" : \"Title\",\n\"category\" : \"Category,\"\n\"details\" : \"a quick brown fox jumps over a lazy dog\",\n\"coordinates\" : {\n\"lat\": 77.77,\n\"lng\": 77.77\n },\n\"thumbnail\" : \"thumbnail/1e1a91fff026a7d0402ebe52f9c56b90\"\n\"image\" : \"image/1e1a91fff026a7d0402ebe52f9c56b90\"\n\"original\" :\"original.1e1a91fff026a7d0402ebe52f9c56b90\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Cats",
    "name": "GetAll"
  },
  {
    "type": "get",
    "url": "/find/:id",
    "title": "Get cat by id",
    "description": "<p>Find an entry from cats database</p>",
    "group": "Cats",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "_id",
            "optional": false,
            "field": "_id",
            "description": "<p>Cat _id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>Cat _id</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Cat date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Cat Category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "details",
            "description": "<p>Cat Details</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "coordinates",
            "description": "<p>Cat Coordinates</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thumbnail",
            "description": "<p>Cat Thumbnail Uri</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Cat Mid size image Uri</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "original",
            "description": "<p>Cat Original image Uri</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n\"time\" : \n\"title\" : \"Title\",\n\"category\" : \"Category,\"\n\"details\" : \"a quick brown fox jumps over a lazy dog\",\n\"coordinates\" : {\n\"lat\": 77.77,\n\"lng\": 77.77\n },\n\"thumbnail\" : \"thumbnail/1e1a91fff026a7d0402ebe52f9c56b90\"\n\"image\" : \"image/1e1a91fff026a7d0402ebe52f9c56b90\"\n\"original\" :\"original.1e1a91fff026a7d0402ebe52f9c56b90\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Cats",
    "name": "GetFindId"
  },
  {
    "type": "post",
    "url": "/post",
    "title": "Add a new cat",
    "description": "<p>Add a new entry to cats database</p>",
    "group": "Cats",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Cat Title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Cat Category</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "details",
            "description": "<p>Cat Details</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "coordinates",
            "description": "<p>Cat Coordinates</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "thumbnail",
            "description": "<p>Cat Thumbnail Uri</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Cat Mid size image Uri</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "original",
            "description": "<p>Cat Original image Uri</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "new Cat",
          "content": "{\n\"title\" : \"Title\",\n\"category\" : \"Category,\"\n\"details\" : \"a quick brown fox jumps over a lazy dog\",\n\"coordinates\" : {\n\"lat\": 77.77,\n\"lng\": 77.77\n },\n\"thumbnail\" : \"thumbnail/1e1a91fff026a7d0402ebe52f9c56b90\"\n\"image\" : \"image/1e1a91fff026a7d0402ebe52f9c56b90\"\n\"original\" :\"original.1e1a91fff026a7d0402ebe52f9c56b90\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>Cat _id</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Cat date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Cat Title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Cat Category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "details",
            "description": "<p>Cat Details</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "coordinates",
            "description": "<p>Cat Coordinates</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thumbnail",
            "description": "<p>Cat Thumbnail Uri</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Cat Mid size image Uri</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "original",
            "description": "<p>Cat Original image Uri</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n\"time\" : \n\"title\" : \"Title\",\n\"category\" : \"Category,\"\n\"details\" : \"a quick brown fox jumps over a lazy dog\",\n\"coordinates\" : {\n\"lat\": 77.77,\n\"lng\": 77.77\n },\n\"thumbnail\" : \"thumbnail/1e1a91fff026a7d0402ebe52f9c56b90\"\n\"image\" : \"image/1e1a91fff026a7d0402ebe52f9c56b90\"\n\"original\" :\"original.1e1a91fff026a7d0402ebe52f9c56b90\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Cats",
    "name": "PostPost"
  },
  {
    "type": "put",
    "url": "/update/:id",
    "title": "Update a Cat",
    "group": "Cats",
    "description": "<p>Update an entry of the cats database</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Cat id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Cat Title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Cat Category</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "details",
            "description": "<p>Cat Details</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "coordinates",
            "description": "<p>Cat Coordinates</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "thumbnail",
            "description": "<p>Cat Thumbnail Uri</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Cat Mid size image Uri</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "original",
            "description": "<p>Cat Original image Uri</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "new Cat",
          "content": "{\n\"title\" : \"Title\",\n\"category\" : \"Category,\"\n\"details\" : \"a quick brown fox jumps over a lazy dog\",\n\"coordinates\" : {\n\"lat\": 77.77,\n\"lng\": 77.77\n },\n\"thumbnail\" : \"thumbnail/1e1a91fff026a7d0402ebe52f9c56b90\"\n\"image\" : \"image/1e1a91fff026a7d0402ebe52f9c56b90\"\n\"original\" :\"original.1e1a91fff026a7d0402ebe52f9c56b90\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>Cat _id</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Cat date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Cat Title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Cat Category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "details",
            "description": "<p>Cat Details</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "coordinates",
            "description": "<p>Cat Coordinates</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thumbnail",
            "description": "<p>Cat Thumbnail Uri</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Cat Mid size image Uri</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "original",
            "description": "<p>Cat Original image Uri</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n\"time\" : \n\"title\" : \"Title\",\n\"category\" : \"Category,\"\n\"details\" : \"a quick brown fox jumps over a lazy dog\",\n\"coordinates\" : {\n\"lat\": 77.77,\n\"lng\": 77.77\n },\n\"thumbnail\" : \"thumbnail/1e1a91fff026a7d0402ebe52f9c56b90\"\n\"image\" : \"image/1e1a91fff026a7d0402ebe52f9c56b90\"\n\"original\" :\"original.1e1a91fff026a7d0402ebe52f9c56b90\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Cats",
    "name": "PutUpdateId"
  }
] });
