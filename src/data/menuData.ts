import { MenuItem } from "@/types/menu";

// Import burger images
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

export const menuItems: MenuItem[] = [
  // Burgers
  {
    id: "burger-1",
    name: "Smash Classic",
    description: "Hambúrguer artesanal 180g, queijo cheddar, alface, tomate, cebola roxa e molho especial",
    price: 28.90,
    image: smashClassic,
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
    image: blackAngus,
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
    image: crispyChicken,
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
    image: veggieDeluxe,
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão integral", "Hambúrguer vegetal", "Queijo vegano", "Abacate", "Brotos", "Molho tahine"],
    preparationTime: 14,
  },
  {
    id: "burger-5",
    name: "Double Bacon",
    description: "Dois hambúrgueres 150g, bacon crocante, queijo cheddar duplo, alface e tomate",
    price: 38.90,
    image: doubleBacon,
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão brioche", "2x Hambúrguer 150g", "Bacon crocante", "2x Queijo cheddar", "Alface", "Tomate"],
    preparationTime: 20,
  },
  {
    id: "burger-6",
    name: "BBQ Monster",
    description: "Hambúrguer 200g, onion rings, queijo cheddar, alface e molho barbecue especial",
    price: 35.90,
    image: bbqMonster,
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão com gergelim", "Hambúrguer 200g", "Onion rings", "Queijo cheddar", "Alface", "Molho BBQ"],
    preparationTime: 18,
  },
  {
    id: "burger-7",
    name: "Buffalo Chicken",
    description: "Frango grelhado apimentado, queijo blue cheese, aipo, alface e molho buffalo",
    price: 34.90,
    image: buffaloChicken,
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão brioche", "Frango buffalo", "Blue cheese", "Aipo", "Alface", "Molho buffalo"],
    preparationTime: 17,
  },
  {
    id: "burger-8",
    name: "Grilled Chicken Light",
    description: "Peito de frango grelhado, queijo swiss, abacate, brotos e molho de mostarda e mel",
    price: 31.90,
    image: grilledChicken,
    category: "burgers",
    isCustomizable: true,
    ingredients: ["Pão integral", "Frango grelhado", "Queijo swiss", "Abacate", "Brotos", "Mostarda e mel"],
    preparationTime: 15,
  },

  // Sides
  {
    id: "side-1",
    name: "Batata Rústica",
    description: "Batatas cortadas na casa com pele, temperadas com ervas",
    price: 16.90,
    image: batataRustica,
    category: "sides",
    preparationTime: 12,
  },
  {
    id: "side-2",
    name: "Onion Rings",
    description: "Anéis de cebola empanados e fritos até ficarem dourados",
    price: 14.90,
    image: onionRings,
    category: "sides",
    preparationTime: 10,
  },
  {
    id: "side-3",
    name: "Sweet Potato Fries",
    description: "Batata doce em bastões crocantes com molho de iogurte",
    price: 18.90,
    image: sweetPotatoFries,
    category: "sides",
    preparationTime: 14,
  },
  {
    id: "side-4",
    name: "Loaded Nachos",
    description: "Nachos crocantes com queijo derretido, jalapeños, creme azedo e guacamole",
    price: 22.90,
    image: loadedNachos,
    category: "sides",
    preparationTime: 8,
  },
  {
    id: "side-5",
    name: "Mozzarella Sticks",
    description: "Bastões de mozzarella empanados e fritos, servidos com molho marinara",
    price: 19.90,
    image: mozzarellaSticks,
    category: "sides",
    preparationTime: 12,
  },
  {
    id: "side-6",
    name: "Buffalo Wings",
    description: "Asinhas de frango no molho buffalo com aipo e molho blue cheese",
    price: 26.90,
    image: buffaloWings,
    category: "sides",
    preparationTime: 18,
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