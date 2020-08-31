const detectron2Endpoint = "https://master-ainized-detectron2-gkswjdzz.endpoint.ainize.ai"

module.exports.getObjectCoordinates = function getObjectCoordinates (date = null) {


  if (!date) date = new Date()

  return Astronomy.Illumination('Mars', date).geo_dist
}


curl -X POST "https://master-ainized-detectron2-gkswjdzz.endpoint.ainize.ai/predictions" -H "accept: application/json" -H "Content-Type: multipart/form-data" -F "preview=true"

// module.exports.getObject = function getTimeDistance (date = null) {
//   const distance = this.getDistance(date)

//   return distance * C_PER_AU
// }


