/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b9dnyudxgawabd8")

  collection.updateRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b9dnyudxgawabd8")

  collection.updateRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
})
