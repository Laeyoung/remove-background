const superagent = require('superagent')

const detectron2Endpoint = 'https://master-ainized-detectron2-gkswjdzz.endpoint.ainize.ai'

async function getObjectCoordinates () {
  return superagent
    .post(`${detectron2Endpoint}/predictions`)
    .accept('application/json')
    .type('form')
    .set({ preview: false })
    .attach('file', './cat.jpg')
}


//curl -X POST "https://master-ainized-detectron2-gkswjdzz.endpoint.ainize.ai/predictions" -H "accept: application/json" -H "Content-Type: multipart/form-data" -F "preview=true"

// module.exports.getObject = function getTimeDistance (date = null) {
//   const distance = this.getDistance(date)

//   return distance * C_PER_AU
// }



getObjectCoordinates()
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

