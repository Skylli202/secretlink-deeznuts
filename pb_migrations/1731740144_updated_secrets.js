/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b9dnyudxgawabd8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zt77be7w",
    "name": "maxViewCount",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": null,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b9dnyudxgawabd8")

  // remove
  collection.schema.removeField("zt77be7w")

  return dao.saveCollection(collection)
})
