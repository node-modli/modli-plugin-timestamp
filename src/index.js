// const Promise = require('bluebird');

const processProperties = function (instance, properties) {
  for (let p in properties) {
    properties[p].forEach((method) => {
      // Hold onto the method temporarily
      let tmpMethod = instance[method]
      // Override method
      instance[method] = (tmpMethod.arguments)
    })
  }
}

/**
 * @method timestamp
 */
const timestamp = function () {
  const instance = this;
  for (let s in instance.schemas) {
    if (instance.schemas[s].hasOwnProperty('timestamp')) {
      processProperties(instance, instance.schemas[s].timestamp);
    }
  }
  
};

export default timestamp;
