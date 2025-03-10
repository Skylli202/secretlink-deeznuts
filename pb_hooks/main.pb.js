/// <reference path="../pb_data/types.d.ts" />

onRecordViewRequest((e) => {
  try {
    // Increase view count
    e.record.set('viewCount', e.record.getInt("viewCount") + 1)
    $app.save(e.record)
    $app.logger().info(`Increased view count for record "${e.record.id}".`)

    // If the max view count is reach, delete the record.
    if (e.record.getInt("viewCount") >= e.record.getInt("maxViewCount")) {
      $app.delete(e.record)
      $app.logger().info(`Maximum view count exceeded for record "${e.record.getId()}".`)
    }
    e.next()
  } catch (e) {
    console.log(e)
  }
}, "secrets")

