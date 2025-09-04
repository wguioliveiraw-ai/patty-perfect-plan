import { MenuItem } from "@/types/menu";

// Import existing images
import smashClassic from "@/assets/burgers/smash-classic.jpg";
import blackAngus from "@/assets/burgers/black-angus.jpg";
import crispyChicken from "@/assets/burgers/crispy-chicken.jpg";
import veggieDeluxe from "@/assets/burgers/veggie-deluxe.jpg";
import doubleBacon from "@/assets/burgers/double-bacon.jpg";
import bbqMonster from "@/assets/burgers/bbq-monster.jpg";
import buffaloChicken from "@/assets/burgers/buffalo-chicken.jpg";
import grilledChicken from "@/assets/burgers/grilled-chicken.jpg";

// Import side images
import batataRustica from "@/assets/sides/batata-rustica.jpg";
import onionRings from "@/assets/sides/onion-rings.jpg";
import sweetPotatoFries from "@/assets/sides/sweet-potato-fries.jpg";
import loadedNachos from "@/assets/sides/loaded-nachos.jpg";
import mozzarellaSticks from "@/assets/sides/mozzarella-sticks.jpg";
import buffaloWings from "@/assets/sides/buffalo-wings.jpg";

// Import sauce images
import bbqSauce from "@/assets/sauces/bbq-sauce.jpg";
import cheddarSauce from "@/assets/sauces/cheddar-sauce.jpg";
import specialSauce from "@/assets/sauces/special-sauce.jpg";
import guavaKetchup from "@/assets/sauces/guava-ketchup.jpg";

// Import drink images
import soda2L from "@/assets/drinks/soda-2l.jpg";
import soda1L from "@/assets/drinks/soda-1l.jpg";
import sodaCan from "@/assets/drinks/soda-can.jpg";
import water from "@/assets/drinks/water.jpg";
import heineken from "@/assets/drinks/heineken.jpg";
import sprite from "@/assets/drinks/sprite.jpg";
import orangeJuice from "@/assets/drinks/orange-juice.jpg";

// Import dessert images
import fudgeCake from "@/assets/desserts/fudge-cake.jpg";
import pudding from "@/assets/desserts/pudding.jpg";

// Import combo images
import familyCombo from "@/assets/combos/family-combo.jpg";
import coupleCombo from "@/assets/combos/couple-combo.jpg";

export const menuItems: MenuItem[] = [
  // Hambúrgueres Premium 2.0
  {
    id: "burger-2.0-1",
    name: "Salada 2.0",
    description: "2 blend's artesanais de 150gr, queijo prato, molho especial, picles, cebola roxa, alface e tomate",
    price: 39.00,
    image: smashClassic,
    category: "burgers-2.0",
    isCustomizable: true,
    ingredients: ["Pão artesanal", "2x Blend artesanal 150g", "Queijo prato", "Molho especial", "Picles", "Cebola roxa", "Alface", "Tomate"],
  },
  {
    id: "burger-2.0-2",
    name: "Salada 2.0 Vegetariano",
    description: "2 blend's de alho e ervas de 150gr, queijo prato, molho especial, picles, cebola roxa, alface e tomate",
    price: 45.00,
    image: veggieDeluxe,
    category: "burgers-vegetarianos",
    isCustomizable: true,
    ingredients: ["Pão artesanal", "2x Blend alho e ervas 150g", "Queijo vegetal", "Molho especial", "Picles", "Cebola roxa", "Alface", "Tomate"],
  },
  {
    id: "burger-2.0-3",
    name: "Nacho 2.0",
    description: "2 blend's artesanais de 150gr, queijo prato, molho especial, picles, cebola roxa, alface, tomate e doritos",
    price: 41.00,
    image: bbqMonster,
    category: "burgers-2.0",
    isCustomizable: true,
    ingredients: ["Pão artesanal", "2x Blend artesanal 150g", "Queijo prato", "Molho especial", "Picles", "Cebola roxa", "Alface", "Tomate", "Doritos"],
  },
  {
    id: "burger-2.0-4",
    name: "Da Casa 2.0",
    description: "2 blend artesanais de 150gr, queijo prato, molho especial, picles, cebola roxa, alface, tomate, bacon, ovo e molho bbq",
    price: 45.00,
    image: doubleBacon,
    category: "burgers-2.0",
    isCustomizable: true,
    ingredients: ["Pão artesanal", "2x Blend artesanal 150g", "Queijo prato", "Molho especial", "Picles", "Cebola roxa", "Alface", "Tomate", "Bacon", "Ovo", "Molho BBQ"],
  },
  {
    id: "burger-2.0-5",
    name: "Nacho 2.0 Vegetariano",
    description: "2 blend's de alho e ervas de 150gr, queijo prato, molho especial, picles, cebola roxa, alface, tomate e doritos",
    price: 47.00,
    image: veggieDeluxe,
    category: "burgers-vegetarianos",
    isCustomizable: true,
    ingredients: ["Pão artesanal", "2x Blend alho e ervas 150g", "Queijo vegetal", "Molho especial", "Picles", "Cebola roxa", "Alface", "Tomate", "Doritos"],
  },
  {
    id: "burger-2.0-6",
    name: "Cheddar Bacon 2.0",
    description: "2 blends artesanais de 150gr, bacon e cheddar",
    price: 44.00,
    image: blackAngus,
    category: "burgers-2.0",
    isCustomizable: true,
    ingredients: ["Pão artesanal", "2x Blend artesanal 150g", "Bacon", "Cheddar"],
  },
  {
    id: "burger-2.0-7",
    name: "Catupiry 2.0",
    description: "2 Blend's artesanal de 150g, bacon e catupiry original",
    price: 45.00,
    image: doubleBacon,
    category: "burgers-2.0",
    isCustomizable: true,
    ingredients: ["Pão artesanal", "2x Blend artesanal 150g", "Bacon", "Catupiry original"],
  },

  // Hambúrgueres Regulares (Carne Bovina e Frango)
  {
    id: "beef-1",
    name: "Burguer da Casa",
    description: "Blend artesanal de 200g, queijo prato, molho especial, picles, cebola roxa, alface, tomate, bacon, ovo e molho bbq",
    price: 39.00,
    image: doubleBacon,
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão brioche", "Blend artesanal 200g", "Queijo prato", "Molho especial", "Picles", "Cebola roxa", "Alface", "Tomate", "Bacon", "Ovo", "Molho BBQ"],
  },
  {
    id: "beef-2",
    name: "Salada",
    description: "Blend artesanal de 200g, queijo prato, molho especial, picles, cebola roxa, alface e tomate",
    price: 33.00,
    image: smashClassic,
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão brioche", "Blend artesanal 200g", "Queijo prato", "Molho especial", "Picles", "Cebola roxa", "Alface", "Tomate"],
  },
  {
    id: "beef-3",
    name: "Salada + Bacon",
    description: "Blend artesanal de 200g, queijo prato, molho especial, picles, cebola roxa, alface, tomate e bacon",
    price: 35.00,
    image: doubleBacon,
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão brioche", "Blend artesanal 200g", "Queijo prato", "Molho especial", "Picles", "Cebola roxa", "Alface", "Tomate", "Bacon"],
  },
  {
    id: "beef-4",
    name: "Bacon",
    description: "Blend artesanal de 200g, bacon, queijo prato, molho especial e picles",
    price: 36.00,
    image: doubleBacon,
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão brioche", "Blend artesanal 200g", "Bacon", "Queijo prato", "Molho especial", "Picles"],
  },
  {
    id: "beef-5",
    name: "Nacho",
    description: "Blend artesanal de 200g, queijo prato, molho especial, picles, cebola roxa, alface, tomate e doritos",
    price: 35.00,
    image: bbqMonster,
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão brioche", "Blend artesanal 200g", "Queijo prato", "Molho especial", "Picles", "Cebola roxa", "Alface", "Tomate", "Doritos"],
  },
  {
    id: "beef-6",
    name: "Gorgonzola",
    description: "Blend artesanal de 200g, creme de gorgonzola artesanal, rúcula e tomate seco",
    price: 38.00,
    image: blackAngus,
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão brioche", "Blend artesanal 200g", "Creme de gorgonzola", "Rúcula", "Tomate seco"],
  },
  {
    id: "beef-7",
    name: "Catupiry",
    description: "Blend artesanal de 200g, bacon e catupiry original",
    price: 39.00,
    image: doubleBacon,
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão brioche", "Blend artesanal 200g", "Bacon", "Catupiry original"],
  },
  {
    id: "beef-8",
    name: "Cheddar BBQ",
    description: "Blend artesanal de 200g, cheddar, cebola caramelizada e molho bbq",
    price: 38.00,
    image: bbqMonster,
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão brioche", "Blend artesanal 200g", "Cheddar", "Cebola caramelizada", "Molho BBQ"],
  },
  {
    id: "beef-9",
    name: "Cheddar Bacon",
    description: "Blend artesanal de 200g, bacon e cheddar",
    price: 38.00,
    image: doubleBacon,
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão brioche", "Blend artesanal 200g", "Bacon", "Cheddar"],
  },
  {
    id: "beef-10",
    name: "Kids",
    description: "Blend artesanal de 150g, queijo prato e 150g de batata palito",
    price: 26.00,
    image: smashClassic,
    category: "burgers",
    isCustomizable: false,
    ingredients: ["Pão brioche", "Blend artesanal 150g", "Queijo prato", "Batata palito 150g"],
  },
  {
    id: "beef-11",
    name: "Cheese Burguer",
    description: "Blend artesanal de 150g, queijo prato, picles, cebola roxa, ketchup e mostarda",
    price: 26.00,
    image: smashClassic,
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão brioche", "Blend artesanal 150g", "Queijo prato", "Picles", "Cebola roxa", "Ketchup", "Mostarda"],
  },
  {
    id: "beef-12",
    name: "Burguer Linguiça com Catupiry",
    description: "Pão baguete tipo francês, blend de linguiça artesanal de 200g, dobro de queijo prato, molho especial, cebola roxa, tomate, rúcula e catupiry",
    price: 37.00,
    image: doubleBacon,
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão baguete francês", "Blend linguiça artesanal 200g", "2x Queijo prato", "Molho especial", "Cebola roxa", "Tomate", "Rúcula", "Catupiry"],
  },
  {
    id: "beef-13",
    name: "Lombo Acebolado",
    description: "Pão baguete tipo francês, lombo de porco, molho da casa, dobro de queijo prato, tomate e cebola chapeada",
    price: 34.00,
    image: blackAngus,
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão baguete francês", "Lombo de porco", "Molho da casa", "2x Queijo prato", "Tomate", "Cebola chapeada"],
  },
  {
    id: "chicken-1",
    name: "Chicken House",
    description: "Blend de frango de 200g, queijo prato, molho especial, picles, cebola roxa, alface e tomate",
    price: 32.00,
    image: crispyChicken,
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão brioche", "Blend de frango 200g", "Queijo prato", "Molho especial", "Picles", "Cebola roxa", "Alface", "Tomate"],
  },
  {
    id: "chicken-2",
    name: "Filé de Frango com Catupiry",
    description: "Pão baguete tipo francês, filé de frango, molho da casa, dobro de queijo prato, tomate e catupiry",
    price: 37.00,
    image: grilledChicken,
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão baguete francês", "Filé de frango", "Molho da casa", "2x Queijo prato", "Tomate", "Catupiry"],
  },

  // Hambúrgueres Vegetarianos
  {
    id: "vegan-3",
    name: "Burguer da Casa Vegetariano",
    description: "Blend a base de plantas 110g, queijo prato, molho especial, picles, cebola roxa, alface, tomate, ovo e molho bbq",
    price: 43.00,
    image: veggieDeluxe,
    category: "burgers-vegetarianos",
    isCustomizable: true,
    ingredients: ["Pão brioche", "Blend vegetal 110g", "Queijo vegetal", "Molho especial", "Picles", "Cebola roxa", "Alface", "Tomate", "Ovo vegetal", "Molho BBQ"],
  },
  {
    id: "vegan-4",
    name: "Cheddar BBQ Vegetariano",
    description: "Blend a base de plantas de 100g, cheddar, cebola caramelizada e molho bbq",
    price: 42.00,
    image: veggieDeluxe,
    category: "burgers-vegetarianos",
    isCustomizable: true,
    ingredients: ["Pão brioche", "Blend vegetal 100g", "Cheddar vegetal", "Cebola caramelizada", "Molho BBQ"],
  },
  {
    id: "vegan-5",
    name: "Salada Vegetariano",
    description: "Blend a base de plantas de 110g, queijo prato, molho especial, picles, cebola roxa, alface e tomate",
    price: 37.00,
    image: veggieDeluxe,
    category: "burgers-vegetarianos",
    isCustomizable: true,
    ingredients: ["Pão brioche", "Blend vegetal 110g", "Queijo vegetal", "Molho especial", "Picles", "Cebola roxa", "Alface", "Tomate"],
  },
  {
    id: "vegan-6",
    name: "Kids Vegetariano",
    description: "Blend de alho e ervas 150g, queijo prato e 150g de batata",
    price: 34.00,
    image: veggieDeluxe,
    category: "burgers-vegetarianos",
    isCustomizable: false,
    ingredients: ["Pão brioche", "Blend alho e ervas 150g", "Queijo vegetal", "Batata palito 150g"],
  },
  {
    id: "vegan-7",
    name: "Gorgonzola Vegetariano",
    description: "Blend a base de plantas 110g, creme de gorgonzola artesanal, rúcula e tomate seco",
    price: 42.00,
    image: veggieDeluxe,
    category: "burgers-vegetarianos",
    isCustomizable: true,
    ingredients: ["Pão brioche", "Blend vegetal 110g", "Creme gorgonzola vegetal", "Rúcula", "Tomate seco"],
  },
  {
    id: "vegan-8",
    name: "Nacho Vegetariano",
    description: "Blend a base de plantas 110g, queijo prato, molho especial, picles, cebola roxa, alface, tomate e doritos",
    price: 39.00,
    image: veggieDeluxe,
    category: "burgers-vegetarianos",
    isCustomizable: true,
    ingredients: ["Pão brioche", "Blend vegetal 110g", "Queijo vegetal", "Molho especial", "Picles", "Cebola roxa", "Alface", "Tomate", "Doritos"],
  },
  {
    id: "vegan-9",
    name: "Cheese Burguer Vegetariano",
    description: "Blend a base de plantas de 110g, queijo prato, cebola roxa, picles, molho especial, ketchup e mostarda",
    price: 34.00,
    image: veggieDeluxe,
    category: "burgers-vegetarianos",
    isCustomizable: true,
    ingredients: ["Pão brioche", "Blend vegetal 110g", "Queijo vegetal", "Cebola roxa", "Picles", "Molho especial", "Ketchup", "Mostarda"],
  },

  // Acompanhamentos
  {
    id: "side-1",
    name: "Batata Frita",
    description: "300 gramas",
    price: 17.00,
    image: batataRustica,
    category: "sides",
  },
  {
    id: "side-2",
    name: "Nuggets",
    description: "8 unidades",
    price: 17.00,
    image: mozzarellaSticks,
    category: "sides",
  },
  {
    id: "side-3",
    name: "Batata Frita com Cheddar",
    description: "300 gramas de batata com cheddar ou catupiry e bacon",
    price: 25.00,
    image: loadedNachos,
    category: "sides",
  },
  {
    id: "side-4",
    name: "Bolinha de Pizza",
    description: "8 bolinhas recheadas com presunto, queijo e orégano. Acompanha ketchup de goiabada",
    price: 25.00,
    image: mozzarellaSticks,
    category: "sides",
  },
  {
    id: "side-5",
    name: "Coxinha de Costela",
    description: "8 coxinhas recheadas de costela desfiada. Acompanha ketchup de goiabada",
    price: 27.00,
    image: buffaloWings,
    category: "sides",
  },
  {
    id: "side-6",
    name: "Onion Rings",
    description: "10 onion rings",
    price: 18.00,
    image: onionRings,
    category: "sides",
  },

  // Molhos
  {
    id: "sauce-1",
    name: "Molho Barbecue",
    description: "Pote individual de 150g",
    price: 5.00,
    image: bbqSauce,
    category: "sauces",
  },
  {
    id: "sauce-2",
    name: "Cheddar Cremoso",
    description: "Pote individual de 150g",
    price: 5.00,
    image: cheddarSauce,
    category: "sauces",
  },
  {
    id: "sauce-3",
    name: "Molho Especial",
    description: "Pote individual de 150g",
    price: 5.00,
    image: specialSauce,
    category: "sauces",
  },
  {
    id: "sauce-4",
    name: "Ketchup de Goiabada",
    description: "Pote individual de 150g",
    price: 5.00,
    image: guavaKetchup,
    category: "sauces",
  },

  // Bebidas
  {
    id: "drink-1",
    name: "Refrigerante 2L",
    description: "Coca-Cola ou Guaraná Antártica",
    price: 12.00,
    image: soda2L,
    category: "drinks",
  },
  {
    id: "drink-2",
    name: "Refrigerante 1L",
    description: "Coca-Cola ou Guaraná Antártica",
    price: 9.00,
    image: soda1L,
    category: "drinks",
  },
  {
    id: "drink-3",
    name: "Refrigerante Lata",
    description: "350ml",
    price: 6.00,
    image: sodaCan,
    category: "drinks",
  },
  {
    id: "drink-4",
    name: "Refri Zero Lata",
    description: "350ml",
    price: 6.00,
    image: sodaCan,
    category: "drinks",
  },
  {
    id: "drink-5",
    name: "Água",
    description: "500ml",
    price: 4.00,
    image: water,
    category: "drinks",
  },
  {
    id: "drink-6",
    name: "Heineken",
    description: "Long neck 330ml",
    price: 10.00,
    image: heineken,
    category: "drinks",
  },
  {
    id: "drink-7",
    name: "Sprite Lemon Fresh",
    description: "510ml",
    price: 6.00,
    image: sprite,
    category: "drinks",
  },
  {
    id: "drink-8",
    name: "Suco Life",
    description: "Suco laranja integral pasteurizado - 300ml",
    price: 6.00,
    image: orangeJuice,
    category: "drinks",
  },

  // Sobremesas
  {
    id: "dessert-1",
    name: "Bolo Fudge",
    description: "Deliciosa fatia de bolo fudge. Se preferir, aquecer de 20 à 40 segundos no micro-ondas para a calda derreter",
    price: 10.00,
    image: fudgeCake,
    category: "desserts",
  },
  {
    id: "dessert-2",
    name: "Pudim no Copo",
    description: "Pudim cremoso servido no copo",
    price: 15.00,
    image: pudding,
    category: "desserts",
  },

  // Combos
  {
    id: "combo-1",
    name: "Combo Família",
    description: "1 burguers Kids, 1 burguer salada, 1 burguer da casa, 1 refrigerante 2L (guaraná antártica ou coca-cola)",
    price: 100.00,
    image: familyCombo,
    category: "combos",
  },
  {
    id: "combo-2",
    name: "Combo Casal",
    description: "1 burguer salada, 1 burguer nacho, 1 acompanhamento (batata palito ou nuggets) e 1 refrigerante de 1L",
    price: 87.00,
    image: coupleCombo,
    category: "combos",
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