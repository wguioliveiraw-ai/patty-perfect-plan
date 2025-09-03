import { useState } from "react";
import { MenuItem, MenuCategory } from "@/types/menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, Leaf } from "lucide-react";
import { menuItems } from "@/data/menuData";
interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
  onCustomizeItem: (item: MenuItem) => void;
}
const categoryNames: Record<MenuCategory, string> = {
  burgers: "Hambúrgueres",
  sides: "Acompanhamentos",
  drinks: "Bebidas",
  desserts: "Sobremesas",
  combos: "Combos"
};
export const MenuSection = ({
  onAddToCart,
  onCustomizeItem
}: MenuSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>("burgers");
  const categories = Object.keys(categoryNames) as MenuCategory[];
  const filteredItems = menuItems.filter(item => item.category === selectedCategory);
  const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace('.', ',')}`;
  return <section id="menu" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nosso <span className="text-secondary">Cardápio</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Ingredientes frescos, sabores únicos e a qualidade que você merece!</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => <Button key={category} variant={selectedCategory === category ? "default" : "outline"} onClick={() => setSelectedCategory(category)} className={selectedCategory === category ? "btn-hero" : "btn-outline-yellow"}>
              {categoryNames[category]}
            </Button>)}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => <Card key={item.id} className="card-elevated hover:scale-105 transition-all duration-300 group">
              <div className="relative overflow-hidden rounded-t-xl">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" onError={e => {
              (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
            }} />
                {item.category === "burgers" && item.ingredients?.includes("Hambúrguer vegetal") && <Badge className="absolute top-3 left-3 bg-green-500 text-white">
                    <Leaf className="w-3 h-3 mr-1" />
                    Vegano
                  </Badge>}
                {item.preparationTime && <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {item.preparationTime}min
                  </div>}
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-secondary transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-2xl font-bold text-secondary">
                    {formatPrice(item.price)}
                  </span>
                </div>
                
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>
                
                <div className="flex gap-2">
                  <Button onClick={() => onAddToCart(item)} className="flex-1 btn-hero" aria-label={`Adicionar ${item.name} ao carrinho`}>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar
                  </Button>
                  
                  {item.isCustomizable && <Button variant="outline" onClick={() => onCustomizeItem(item)} className="btn-outline-yellow px-4" aria-label={`Personalizar ${item.name}`}>
                      Personalizar
                    </Button>}
                </div>
              </CardContent>
            </Card>)}
        </div>

        {filteredItems.length === 0 && <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhum item encontrado nesta categoria.
            </p>
          </div>}
      </div>
    </section>;
};