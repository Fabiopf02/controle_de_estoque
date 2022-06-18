const colors = ['#925bf0', '#925bf0ca', '#925bf09a', '#925bf080', '#925bf070'];

function getObject({
  name = '',
  _id = '',
  barcode = '',
  quantity = 0,
  price = 0,
}) {
  return {
    _id,
    name,
    barcode,
    quantity,
    price,
  };
}

export function countSales(array, filterId = 'all') {
  const vl = [];
  if (filterId !== 'all') {
    array = array.filter(item => item._id === filterId);
    if (array.length === 0) {
      return [getObject({})];
    }
  }
  while (true) {
    const item = getObject(array[0]);
    array.shift();
    array.map(p => {
      if (item.barcode === p.barcode) {
        item.quantity += p.quantity;
      }
    });
    vl.push(item);
    array = array.filter(it => it.barcode !== item.barcode);
    if (array.length === 0) {
      break;
    }
  }
  return vl;
}

export function getTheBestSellers(array, q = 5) {
  let newArray = array.sort((a, b) => a.quantity - b.quantity).reverse();
  newArray = newArray.length < q ? newArray : newArray.slice(0, q - 1);
  const newArrayF = newArray.map((v, i) => {
    const newValue = {
      name: v.name,
      quantity: v.quantity,
      legendFontColor: '#fefefe',
      legendFontSize: 13,
      color: colors[i],
    };
    return newValue;
  });
  return newArrayF;
}

export function countByMonth(data, filterId = 'all') {
  const values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  data.map(item => {
    if (filterId !== 'all') {
      const q = item.products.filter(p => p.barcode === filterId);
      if (q.length === 0) {
        return;
      }
    }
    const month = item.created_at.getMonth();
    values[month] += item.quantity_of_products;
  });
  return values;
}

export function countByDay(data, filterId = 'all') {
  const values = [0, 0, 0, 0, 0, 0, 0];
  data.map(item => {
    let quantity_of_products = item.quantity_of_products;
    if (filterId !== 'all') {
      const products = item.products.filter(pdt => pdt.barcode === filterId);
      quantity_of_products = products.length > 0 ? products[0].quantity : 0;
    }
    const day = item.created_at.getDay();
    values[day] += quantity_of_products;
  });
  return values;
}

export function countByYear(data, filterId = 'all') {
  const sortedData = [...data.sorted('created_at', false)];
  const year = sortedData[0].created_at.getFullYear();
  const labels = [String(year)];
  const values = [0];
  const now = new Date();
  let m = 0;
  if (now.getFullYear() - year < 3) {
    m = 3;
  }
  for (let i = 0; i < now.getFullYear() - year + m; i++) {
    labels.push(String(year + i + 1));
    values.push(0);
  }
  sortedData.map(item => {
    if (filterId !== 'all') {
      const q = item.products.filter(p => p.barcode === filterId);
      if (q.length === 0) {
        return;
      }
    }
    const y = now.getFullYear() - item.created_at.getFullYear();
    values[y] += item.quantity_of_products;
  });
  return {
    data: values,
    labels,
  };
}
