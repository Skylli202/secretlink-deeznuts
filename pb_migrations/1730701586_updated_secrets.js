/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b9dnyudxgawabd8")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w8liopwm",
    "name": "keyPubPart",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b9dnyudxgawabd8")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
