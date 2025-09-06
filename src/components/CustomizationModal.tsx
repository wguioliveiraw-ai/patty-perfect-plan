import { useState } from "react";
import { MenuItem, Customization } from "@/types/menu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Minus } from "lucide-react";
import { customizationOptions } from "@/data/menuData";
import { toast } from "@/hooks/use-toast";

interface CustomizationModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, customizations: Customization[], quantity: number) => void;
}

export const CustomizationModal = ({ 
  item, 
  isOpen, 
  onClose, 
  onAddToCart 
}: CustomizationModalProps) => {
  const [selectedBread, setSelectedBread] = useState<string>("");
  const [selectedMeat, setSelectedMeat] = useState<string>("");
  const [selectedCheese, setSelectedCheese] = useState<string>("");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace('.', ',')}`;

  const calculateTotalPrice = () => {
    if (!item) return 0;
    
    let total = item.price;
    
    // Add bread price
    const bread = customizationOptions.breads.find(b => b.id === selectedBread);
    if (bread) total += bread.price;
    
    // Add meat price
    const meat = customizationOptions.meats.find(m => m.id === selectedMeat);
    if (meat) total += meat.price;
    
    // Add cheese price
    const cheese = customizationOptions.cheeses.find(c => c.id === selectedCheese);
    if (cheese) total += cheese.price;
    
    // Add extras price
    selectedExtras.forEach(extraId => {
      const extra = customizationOptions.extras.find(e => e.id === extraId);
      if (extra) total += extra.price;
    });
    
    return total * quantity;
  };

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const handleAddToCart = () => {
    if (!item) return;

    const customizations: Customization[] = [];
    
    // Add selected customizations
    const bread = customizationOptions.breads.find(b => b.id === selectedBread);
    if (bread) customizations.push({ ...bread, type: 'ingredient' });
    
    const meat = customizationOptions.meats.find(m => m.id === selectedMeat);
    if (meat) customizations.push({ ...meat, type: 'ingredient' });
    
    const cheese = customizationOptions.cheeses.find(c => c.id === selectedCheese);
    if (cheese) customizations.push({ ...cheese, type: 'ingredient' });
    
    selectedExtras.forEach(extraId => {
      const extra = customizationOptions.extras.find(e => e.id === extraId);
      if (extra) customizations.push({ ...extra, type: 'extra' });
    });

    onAddToCart(item, customizations, quantity);
    
    // Reset form
    setSelectedBread("");
    setSelectedMeat("");
    setSelectedCheese("");
    setSelectedExtras([]);
    setQuantity(1);
    
    toast({
      title: "Item adicionado!",
      description: `${item.name} personalizado foi adicionado ao carrinho`,
    });
    
    onClose();
  };

  const handleClose = () => {
    // Reset form when closing
    setSelectedBread("");
    setSelectedMeat("");
    setSelectedCheese("");
    setSelectedExtras([]);
    setQuantity(1);
    onClose();
  };

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Personalize seu <span className="text-secondary">{item.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item Image and Info */}
          <div className="flex gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
              <p className="text-secondary font-bold mt-1">
                Base: {formatPrice(item.price)}
              </p>
            </div>
          </div>

          {/* Bread Selection */}
          <div>
            <h4 className="font-semibold mb-3">Escolha o Pão</h4>
            <RadioGroup value={selectedBread} onValueChange={setSelectedBread}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {customizationOptions.breads.map((bread) => (
                  <div key={bread.id} className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-muted/50">
                    <RadioGroupItem value={bread.id} id={bread.id} />
                    <img
                      src={bread.image}
                      alt={bread.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <Label htmlFor={bread.id} className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <span>{bread.name}</span>
                        <span className="text-secondary font-semibold">
                          {bread.price === 0 ? "Grátis" : `+${formatPrice(bread.price)}`}
                        </span>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Meat Selection */}
          <div>
            <h4 className="font-semibold mb-3">Escolha a Proteína</h4>
            <RadioGroup value={selectedMeat} onValueChange={setSelectedMeat}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {customizationOptions.meats.map((meat) => (
                  <div key={meat.id} className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-muted/50">
                    <RadioGroupItem value={meat.id} id={meat.id} />
                    <img
                      src={meat.image}
                      alt={meat.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <Label htmlFor={meat.id} className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <span>{meat.name}</span>
                        <span className="text-secondary font-semibold">
                          {meat.price === 0 ? "Grátis" : `+${formatPrice(meat.price)}`}
                        </span>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Cheese Selection */}
          <div>
            <h4 className="font-semibold mb-3">Escolha o Queijo</h4>
            <RadioGroup value={selectedCheese} onValueChange={setSelectedCheese}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {customizationOptions.cheeses.map((cheese) => (
                  <div key={cheese.id} className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-muted/50">
                    <RadioGroupItem value={cheese.id} id={cheese.id} />
                    <img
                      src={cheese.image}
                      alt={cheese.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <Label htmlFor={cheese.id} className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <span>{cheese.name}</span>
                        <span className="text-secondary font-semibold">
                          {cheese.price === 0 ? "Grátis" : `+${formatPrice(cheese.price)}`}
                        </span>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Extras Selection */}
          <div>
            <h4 className="font-semibold mb-3">Extras (Opcionais)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {customizationOptions.extras.map((extra) => (
                <div key={extra.id} className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-muted/50">
                  <Checkbox
                    id={extra.id}
                    checked={selectedExtras.includes(extra.id)}
                    onCheckedChange={() => handleExtraToggle(extra.id)}
                  />
                  <img
                    src={extra.image}
                    alt={extra.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <Label htmlFor={extra.id} className="flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span>{extra.name}</span>
                      <span className="text-secondary font-semibold">+{formatPrice(extra.price)}</span>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity and Total */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">Quantidade:</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-2xl font-bold text-secondary">
                {formatPrice(calculateTotalPrice())}
              </span>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full btn-hero text-lg py-6"
              disabled={!selectedBread || !selectedMeat || !selectedCheese}
            >
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};