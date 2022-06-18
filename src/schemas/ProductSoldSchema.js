export default {
  name: 'ProductSold',
  primaryKey: '_id',
  properties: {
    _id: {
      type: 'string',
      indexed: true,
    },
    name: 'string',
    price: 'double',
    quantity: 'int',
    barcode: 'string',
  },
};
