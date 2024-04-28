import { faker } from "@faker-js/faker";

export const generateRandomProducts = (numProducts) => {
  const products = [];

  for (let i = 0; i < numProducts; i++) {
    products.push(generateRandomProduct());
  }

  return products;
};

const generateRandomProduct = () => {
  return {
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    category: faker.commerce.productAdjective(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    thumbnail: faker.image.url(),
    code: faker.string.uuid(),
    stock: faker.number.int({ min: 1, max: 200 }),
    status: true,
  };
};
