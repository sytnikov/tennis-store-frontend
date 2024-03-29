import CartItem from "../../types/CartItem";

const cartData: CartItem[] = [
  {
    _id: "1",
    name: "Handcrafted Bronze Gloves",
    price: 359,
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    images: [
      "https://i.imgur.com/DumuKkD.jpeg",
      "https://i.imgur.com/imQx3Az.jpeg",
      "https://i.imgur.com/aCDF0yh.jpeg",
    ],
    categoryId: {
      _id: "2",
      name: "Equipment",
      images: [
          "https://img.tenniswarehouse-europe.com/fpcache/1176/marketing/PERCEPTFP-md.jpg"
      ]
  },
    quantity: 1,
  },
  {
    _id: "2",
    name: "Generic Concrete Tuna",
    price: 140,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    images: [
      "https://i.imgur.com/s8WRA2O.jpeg",
      "https://i.imgur.com/5iNAL9T.jpeg",
      "https://i.imgur.com/OARGZQW.jpeg",
    ],
    categoryId: {
      _id: "2",
      name: "Equipment",
      images: [
          "https://img.tenniswarehouse-europe.com/fpcache/1176/marketing/PERCEPTFP-md.jpg"
      ]
  },
    quantity: 20,
  },
];

export default cartData;
