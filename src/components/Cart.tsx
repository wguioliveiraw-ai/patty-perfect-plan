import { useState } from "react";
import { CartItem } from "@/types/menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
}

export const Cart = ({ 
  items, 
  isOpen, 
  onClose, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout 
}: CartProps) => {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = subtotal >= 35 ? 0 : 8.90;
  const total = subtotal + deliveryFee;

  const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace('.', ',')}`;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemoveItem(itemId);
      toast({
        title: "Item removido",
        description: "Item removido do carrinho com sucesso",
      });
    } else {
      onUpdateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    onRemoveItem(itemId);
    toast({
      title: "Item removido",
      description: "Item removido do carrinho com sucesso",
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Seu Pedido ({items.length} {items.length === 1 ? 'item' : 'itens'})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg mb-2">Carrinho vazio</p>
                <p className="text-muted-foreground text-sm">
                  Adicione itens do cardápio para começar seu pedido
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${JSON.stringify(item.customizations)}`} className="bg-card rounded-lg p-4 border">
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground mb-1 truncate">
                          {item.name}
                        </h4>
                        
                        {item.customizations && item.customizations.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {item.customizations.map((custom, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {custom.name}
                                {custom.price > 0 && ` +${formatPrice(custom.price)}`}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-secondary">
                            {formatPrice(item.totalPrice)}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-border rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-8 h-8"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              
                              <span className="px-3 py-1 text-sm font-medium">
                                {item.quantity}
                              </span>
                              
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-8 h-8"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            
                            {/* Remove Button */}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-destructive hover:bg-destructive/10"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <div className="border-t border-border pt-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Taxa de entrega</span>
                  <span className={deliveryFee === 0 ? "text-green-600 line-through" : ""}>
                    {formatPrice(deliveryFee)}
                    {deliveryFee === 0 && (
                      <span className="text-green-600 ml-1">GRÁTIS</span>
                    )}
                  </span>
                </div>
                
                {deliveryFee === 0 && (
                  <p className="text-xs text-green-600">
                    🎉 Parabéns! Você ganhou frete grátis
                  </p>
                )}
                
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="text-secondary">{formatPrice(total)}</span>
                </div>
              </div>

              <Button
                onClick={onCheckout}
                className="w-full btn-hero text-lg py-6"
              >
                Finalizar Pedido
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Entrega em 25-35 minutos
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};