import Realm from 'realm';

import ProductSchema from '../schemas/ProductSchema';
import ProductSoldSchema from '../schemas/ProductSoldSchema';
import SalesSchema from '../schemas/SalesSchema';

export default function getRealm() {
  return Realm.open({
    schema: [ProductSchema, ProductSoldSchema, SalesSchema],
    deleteRealmIfMigrationNeeded: true,
  });
}
