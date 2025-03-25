import { addProduct, fetchProducts } from './src/utils/api.js'

const products = await fetchProducts()


products.forEach(products => {
    console.log(products.name)
});

const newProduct = {
    name: 'Äpple',
    category: 'Fruits',
    price: 43,
    description: 'ett vanligt äpple',
    stock: 4
}

