const superagent = require('superagent')
const fs = require('fs')

const detectron2Endpoint = 'https://master-ainized-detectron2-gkswjdzz.endpoint.ainize.ai'
const removeBg = 'CrTKqaTctt7fizhrWHJm2zNs'

async function getObjectCoordinates () {
  return superagent
    .post(`${detectron2Endpoint}/predictions`)
    .accept('application/json')
    .type('form')
    .set({ preview: false })
    .attach('file', './cat.jpg')
}

async function getBgRemovedImage () {
  return superagent
    .post('https://api.remove.bg/v1.0/removebg')
    .set({ 'X-Api-Key': removeBg })
    .type('form')
    .field('size', 'auto')
    .attach('image_file', fs.createReadStream('./cat.jpg'))
}


//curl -X POST "https://master-ainized-detectron2-gkswjdzz.endpoint.ainize.ai/predictions" -H "accept: application/json" -H "Content-Type: multipart/form-data" -F "preview=true"

// module.exports.getObject = function getTimeDistance (date = null) {
//   const distance = this.getDistance(date)

//   return distance * C_PER_AU
// }



getBgRemovedImage()
  .then(res => {
    fs.writeFileSync('no-bg.png', res.body)
  })
  .catch(err => {
    console.log(err)
  })

