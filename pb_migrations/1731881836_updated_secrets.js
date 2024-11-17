/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b9dnyudxgawabd8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zb38smmc",
    "name": "viewCount",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b9dnyudxgawabd8")

  // remove
  collection.schema.removeField("zb38smmc")

  return dao.saveCollection(collection)
})
