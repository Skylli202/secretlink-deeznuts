/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "b9dnyudxgawabd8",
    "created": "2024-11-04 06:11:15.972Z",
    "updated": "2024-11-04 06:11:15.972Z",
    "name": "secrets",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "boepedyy",
        "name": "iv",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "nhtligom",
        "name": "data",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "w8liopwm",
        "name": "KeyPubPart",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("b9dnyudxgawabd8");

  return dao.deleteCollection(collection);
})
