const API_URL = 'https://fakestoreapi.com';

const fallbackProducts = [
  {
    id: 1,
    title: 'Everyday Cotton Jacket',
    price: 64.95,
    description:
      'A lightweight jacket with clean lines, easy layering, and durable stitching for daily wear.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    rating: { rate: 4.4, count: 138 }
  },
  {
    id: 2,
    title: 'Polished Silver Bracelet',
    price: 24.5,
    description:
      'A simple silver-toned bracelet designed for casual and occasion outfits.',
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
    rating: { rate: 4.1, count: 92 }
  },
  {
    id: 3,
    title: 'Slim Travel Backpack',
    price: 42.0,
    description:
      'Compact backpack with room for daily essentials, books, and small electronics.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: { rate: 4.7, count: 221 }
  },
  {
    id: 4,
    title: 'Portable Solid State Drive',
    price: 109.99,
    description:
      'Fast external storage for backups, coursework, creative projects, and travel.',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
    rating: { rate: 4.8, count: 311 }
  }
];

async function fetchJson(path) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch(`${API_URL}${path}`, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } finally {
    window.clearTimeout(timeout);
  }
}

export async function getProducts() {
  try {
    return await fetchJson('/products');
  } catch (error) {
    console.warn('Using fallback products:', error);
    return fallbackProducts;
  }
}

export async function getProductById(id) {
  try {
    return await fetchJson(`/products/${id}`);
  } catch (error) {
    console.warn('Using fallback product:', error);
    return fallbackProducts.find((product) => String(product.id) === String(id)) || null;
  }
}

export async function getCategories() {
  try {
    return await fetchJson('/products/categories');
  } catch (error) {
    console.warn('Using fallback categories:', error);
    return [...new Set(fallbackProducts.map((product) => product.category))];
  }
}
