import axios from 'axios';
import cosmos from '../config/cosmos';

const api = axios.create({
  baseURL: 'https://api.cosmos.bluesoft.com.br/',
});

export async function getProduct(barcode) {
  try {
    const response = await api.get(`/gtins/${barcode}`, {
      headers: {
        'X-Cosmos-Token': cosmos.token,
        'Content-Type': 'application/json',
      },
    });
    const {brand, description, thumbnail} = response.data;
    return {
      name: description,
      thumbnail,
      brand: brand.name,
    };
  } catch (err) {
    Error('> getProduct function: ' + err);
  }
}
