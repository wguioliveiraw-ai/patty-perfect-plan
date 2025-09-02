import { useState, useCallback } from "react";
import { MenuItem, CartItem, Customization, DeliveryInfo } from "@/types/menu";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { MenuSection } from "@/components/MenuSection";
import { Cart } from "@/components/Cart";
import { CustomizationModal } from "@/components/CustomizationModal";
import { DeliveryForm } from "@/components/DeliveryForm";
import { toast } from "@/hooks/use-toast";

type AppState = "menu" | "checkout" | "orderComplete";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("menu");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizationItem, setCustomizationItem] = useState<MenuItem | null>(null);

  // Helper function to generate unique cart item ID
  const generateCartItemId = (item: MenuItem, customizations: Customization[] = []) => {
    const customizationString = customizations
      .map(c => `${c.id}:${c.name}`)
      .sort()
      .join('|');
    return `${item.id}-${customizationString}`;
  };

  // Add item to cart (simple version)
  const handleAddToCart = useCallback((item: MenuItem) => {
    const existingItemIndex = cartItems.findIndex(
      cartItem => cartItem.id === item.id && !cartItem.customizations?.length
    );

    if (existingItemIndex >= 0) {
      // Update quantity of existing item
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      updatedItems[existingItemIndex].totalPrice = 
        updatedItems[existingItemIndex].price * updatedItems[existingItemIndex].quantity;
      setCartItems(updatedItems);
    } else {
      // Add new item
      const cartItem: CartItem = {
        ...item,
        quantity: 1,
        totalPrice: item.price,
      };
      setCartItems(prev => [...prev, cartItem]);
    }

    toast({
      title: "Item adicionado!",
      description: `${item.name} foi adicionado ao carrinho`,
    });
  }, [cartItems]);

  // Add item to cart with customizations
  const handleAddCustomizedToCart = useCallback((
    item: MenuItem, 
    customizations: Customization[], 
    quantity: number
  ) => {
    const customizationPrice = customizations.reduce((sum, c) => sum + c.price, 0);
    const totalItemPrice = (item.price + customizationPrice) * quantity;

    const cartItem: CartItem = {
      ...item,
      quantity,
      customizations,
      totalPrice: totalItemPrice,
    };

    setCartItems(prev => [...prev, cartItem]);
  }, []);

  // Update item quantity in cart
  const handleUpdateQuantity = useCallback((itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }

    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const pricePerUnit = item.totalPrice / item.quantity;
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: pricePerUnit * newQuantity,
        };
      }
      return item;
    }));
  }, []);

  // Remove item from cart
  const handleRemoveFromCart = useCallback((itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  // Open customization modal
  const handleCustomizeItem = useCallback((item: MenuItem) => {
    setCustomizationItem(item);
  }, []);

  // Close customization modal
  const handleCloseCustomization = useCallback(() => {
    setCustomizationItem(null);
  }, []);

  // Handle order button click
  const handleOrderClick = useCallback(() => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione itens ao carrinho antes de fazer o pedido",
        variant: "destructive",
      });
      return;
    }
    setIsCartOpen(true);
  }, [cartItems.length]);

  // Handle checkout
  const handleCheckout = useCallback(() => {
    setCurrentState("checkout");
    setIsCartOpen(false);
  }, []);

  // Handle order completion
  const handleOrderComplete = useCallback((deliveryInfo: DeliveryInfo) => {
    // Here you would typically send the order to your backend
    console.log("Order completed:", { cartItems, deliveryInfo });
    
    // Clear cart and show success
    setCartItems([]);
    setCurrentState("orderComplete");
    
    toast({
      title: "Pedido realizado com sucesso!",
      description: `Entrega prevista em ${deliveryInfo.estimatedTime} minutos`,
    });

    // Redirect back to menu after 3 seconds
    setTimeout(() => {
      setCurrentState("menu");
    }, 3000);
  }, [cartItems]);

  // Calculate cart items count
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Render different states
  if (currentState === "checkout") {
    return (
      <DeliveryForm
        cartItems={cartItems}
        onOrderComplete={handleOrderComplete}
        onBack={() => setCurrentState("menu")}
      />
    );
  }

  if (currentState === "orderComplete") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-secondary-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">Pedido Confirmado!</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Obrigado por escolher a Smash Point! Seu pedido está sendo preparado.
          </p>
          <div className="animate-pulse text-sm text-muted-foreground">
            Redirecionando para o cardápio...
          </div>
        </div>
      </div>
    );
  }

  // Main menu state
  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemsCount={cartItemsCount}
        onCartOpen={() => setIsCartOpen(true)}
      />
      
      <main>
        <HeroSection onOrderClick={handleOrderClick} />
        <MenuSection
          onAddToCart={handleAddToCart}
          onCustomizeItem={handleCustomizeItem}
        />
      </main>

      {/* Cart Sidebar */}
      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {/* Customization Modal */}
      <CustomizationModal
        item={customizationItem}
        isOpen={!!customizationItem}
        onClose={handleCloseCustomization}
        onAddToCart={handleAddCustomizedToCart}
      />

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center font-bold text-secondary-foreground">
                  SP
                </div>
                <span className="text-xl font-bold">Smash Point</span>
              </div>
              <p className="text-primary-foreground/80">
                Hambúrgueres artesanais com ingredientes premium e delivery ultra rápido.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <div className="space-y-2 text-primary-foreground/80">
                <p>📞 (11) 99999-9999</p>
                <p>📧 contato@smashpoint.com</p>
                <p>📍 São Paulo, SP</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Horário</h3>
              <div className="space-y-2 text-primary-foreground/80">
                <p>Segunda a Sexta: 18h - 00h</p>
                <p>Sábado e Domingo: 18h - 01h</p>
                <p>🚚 Delivery em 25-35 min</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 Smash Point. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;