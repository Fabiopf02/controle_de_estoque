export default {
  name: 'Product',
  primaryKey: '_id',
  properties: {
    _id: {
      type: 'string',
      indexed: true,
    },
    name: 'string',
    brand: 'string?',
    price: 'double',
    quantity: 'int',
    expiration_date: 'date',
    url_image: 'string?',
    created_at: {type: 'date', default: new Date(), optional: true},
  },
};
