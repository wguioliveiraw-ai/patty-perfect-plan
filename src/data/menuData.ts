import { MenuItem } from "@/types/menu";

export const menuItems: MenuItem[] = [
  // Burgers
  {
    id: "burger-1",
    name: "Smash Classic",
    description: "Hambúrguer artesanal 180g, queijo cheddar, alface, tomate, cebola roxa e molho especial",
    price: 28.90,
    image: "/api/placeholder/300/200?text=Smash+Classic",
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão brioche", "Hambúrguer 180g", "Queijo cheddar", "Alface", "Tomate", "Cebola roxa", "Molho especial"],
    preparationTime: 15,
  },
  {
    id: "burger-2",
    name: "Black Angus",
    description: "Carne Angus premium 200g, queijo gruyère, cogumelos salteados, rúcula e aioli trufado",
    price: 42.90,
    image: "/api/placeholder/300/200?text=Black+Angus",
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão preto", "Angus 200g", "Queijo gruyère", "Cogumelos", "Rúcula", "Aioli trufado"],
    preparationTime: 18,
  },
  {
    id: "burger-3",
    name: "Crispy Chicken",
    description: "Frango empanado crocante, queijo swiss, coleslaw, pickles e molho barbecue",
    price: 32.90,
    image: "/api/placeholder/300/200?text=Crispy+Chicken",
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão brioche", "Frango empanado", "Queijo swiss", "Coleslaw", "Pickles", "BBQ sauce"],
    preparationTime: 16,
  },
  {
    id: "burger-4",
    name: "Veggie Deluxe",
    description: "Hambúrguer vegetal da casa, queijo vegano, abacate, brotos e molho tahine",
    price: 29.90,
    image: "/api/placeholder/300/200?text=Veggie+Deluxe",
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão integral", "Hambúrguer vegetal", "Queijo vegano", "Abacate", "Brotos", "Molho tahine"],
    preparationTime: 14,
  },

  // Sides
  {
    id: "side-1",
    name: "Batata Rústica",
    description: "Batatas cortadas na casa com pele, temperadas com ervas",
    price: 16.90,
    image: "/api/placeholder/300/200?text=Batata+Rustica",
    category: "sides",
    preparationTime: 12,
  },
  {
    id: "side-2",
    name: "Onion Rings",
    description: "Anéis de cebola empanados e fritos até ficarem dourados",
    price: 14.90,
    image: "/api/placeholder/300/200?text=Onion+Rings",
    category: "sides",
    preparationTime: 10,
  },
  {
    id: "side-3",
    name: "Sweet Potato Fries",
    description: "Batata doce em bastões crocantes com molho de iogurte",
    price: 18.90,
    image: "/api/placeholder/300/200?text=Sweet+Potato",
    category: "sides",
    preparationTime: 14,
  },

  // Drinks
  {
    id: "drink-1",
    name: "Refrigerante Lata",
    description: "Coca-Cola, Guaraná, Sprite ou Fanta",
    price: 6.90,
    image: "/api/placeholder/300/200?text=Refrigerante",
    category: "drinks",
    preparationTime: 1,
  },
  {
    id: "drink-2",
    name: "Suco Natural",
    description: "Laranja, limão, maracujá ou acerola - 500ml",
    price: 9.90,
    image: "/api/placeholder/300/200?text=Suco+Natural",
    category: "drinks",
    preparationTime: 3,
  },
  {
    id: "drink-3",
    name: "Milkshake",
    description: "Chocolate, morango, baunilha ou Ovomaltine - 400ml",
    price: 16.90,
    image: "/api/placeholder/300/200?text=Milkshake",
    category: "drinks",
    preparationTime: 5,
  },

  // Desserts
  {
    id: "dessert-1",
    name: "Brownie com Sorvete",
    description: "Brownie de chocolate quente com sorvete de baunilha e calda",
    price: 19.90,
    image: "/api/placeholder/300/200?text=Brownie",
    category: "desserts",
    preparationTime: 8,
  },

  // Combos
  {
    id: "combo-1",
    name: "Combo Smash",
    description: "Smash Classic + Batata Rústica + Refrigerante",
    price: 39.90,
    image: "/api/placeholder/300/200?text=Combo+Smash",
    category: "combos",
    preparationTime: 15,
  },
];

export const customizationOptions = {
  breads: [
    { id: "brioche", name: "Pão Brioche", price: 0 },
    { id: "sesame", name: "Pão com Gergelim", price: 0 },
    { id: "wholemeal", name: "Pão Integral", price: 2 },
    { id: "black", name: "Pão Preto", price: 3 },
  ],
  meats: [
    { id: "beef-120", name: "Hambúrguer 120g", price: 0 },
    { id: "beef-180", name: "Hambúrguer 180g", price: 5 },
    { id: "beef-200", name: "Hambúrguer 200g", price: 8 },
    { id: "angus", name: "Angus Premium", price: 12 },
    { id: "chicken", name: "Frango Grelhado", price: 3 },
    { id: "veggie", name: "Hambúrguer Vegetal", price: 2 },
  ],
  cheeses: [
    { id: "cheddar", name: "Cheddar", price: 0 },
    { id: "swiss", name: "Queijo Swiss", price: 2 },
    { id: "gruyere", name: "Gruyère", price: 5 },
    { id: "vegan", name: "Queijo Vegano", price: 3 },
  ],
  extras: [
    { id: "bacon", name: "Bacon Crocante", price: 6 },
    { id: "egg", name: "Ovo Frito", price: 3 },
    { id: "avocado", name: "Abacate", price: 4 },
    { id: "mushroom", name: "Cogumelos Salteados", price: 5 },
    { id: "pickles", name: "Pickles", price: 2 },
  ],
};