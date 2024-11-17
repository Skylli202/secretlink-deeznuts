/// <reference path="../pb_data/types.d.ts" />

onRecordViewRequest((e) => {
  // console.log(e.httpContext)
  // console.log(e.record)

  // Increase view count
  e.record.set('viewCount', e.record.getInt("viewCount") + 1)
  $app.dao().saveRecord(e.record)
  console.log(`Increasing view count for record "${e.record.getId()}".`)

  // If the max view count is reach, delete the record.
  if (e.record.getInt("viewCount") === e.record.getInt("maxViewCount")) {
    $app.dao().deleteRecord(e.record)
    console.log(`Maximum view count exceeded for record "${e.record.getId()}".`)
  }
}, "secrets")

