const superagent = require('superagent')
const fs = require('fs')

const detectron2Endpoint = 'https://master-ainized-detectron2-gkswjdzz.endpoint.ainize.ai'
const removeBg = 'CrTKqaTctt7fizhrWHJm2zNs'

/**
 * @classdesc Represents an Detectron2 API call.
 * @class
 * @abstract
 */
class Detectron2 {
  /**
   * Create a Detectron2.
   * @constructor
   * @param {string} baseURL - String with the base URL.
   */
  constructor (baseURL) {
    this.baseURL = baseURL
  }

  getObjectCoordinates () {
    return superagent
      .post(`${detectron2Endpoint}/predictions`)
      .accept('application/json')
      .type('form')
      .set({ preview: false })
      .attach('file', './cat.jpg')
  }

  getBgRemovedImage (removeBgApiKey) {
    if (!removeBgApiKey) throw new Error('removeBgApiKey param is empty.')

    return superagent
      .post('https://api.remove.bg/v1.0/removebg')
      .set({ 'X-Api-Key': removeBgApiKey })
      .type('form')
      .field('size', 'auto')
      .attach('image_file', fs.createReadStream('./cat.jpg'))
  }
}

class RemoveBg {
  constructor () {
    this.detectron2 = new Detectron2(this.baseURL)
  }
}

module.exports = RemoveBg

// ---- For Testing ----
new RemoveBg().detectron2.getBgRemovedImage(removeBg)
  .then(res => {
    fs.writeFileSync('no-bg-cat.png', res.body)
  })
  .catch(err => {
    console.log(err)
  })
