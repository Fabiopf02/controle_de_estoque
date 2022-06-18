export default {
  name: 'Sales',
  primaryKey: '_id',
  properties: {
    _id: {
      type: 'string',
      indexed: true,
    },
    products: 'ProductSold[]',
    total: 'double',
    quantity_of_products: 'int',
    created_at: {type: 'date', default: new Date(), optional: true},
  },
};
