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

  // Base item para "Montar seu lanche"
  const buildYourBurgerItem: MenuItem = {
    id: "builder-base",
    name: "Monte Seu Smash",
    description: "Escolha pão, proteína, queijo e extras do seu jeito",
    price: 24.9,
    image: "/placeholder.svg",
    category: "burgers",
    isCustomizable: true,
    ingredients: [],
  };

  // Scroll até o cardápio
  const scrollToMenu = useCallback(() => {
    const el = document.getElementById("menu");
    if (el) el.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, []);

  // Abrir fluxo de personalização
  const handleStartBuilder = useCallback(() => {
    setCustomizationItem(buildYourBurgerItem);
  }, []);

  // Add item ao carrinho (simples)
  const handleAddToCart = useCallback((item: MenuItem) => {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id && !cartItem.customizations?.length);
    if (existingItemIndex >= 0) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      updatedItems[existingItemIndex].totalPrice = updatedItems[existingItemIndex].price * updatedItems[existingItemIndex].quantity;
      setCartItems(updatedItems);
    } else {
      const cartItem: CartItem = {
        ...item,
        quantity: 1,
        totalPrice: item.price
      };
      setCartItems(prev => [...prev, cartItem]);
    }
    toast({
      title: "Item adicionado!",
      description: `${item.name} foi adicionado ao carrinho`
    });
  }, [cartItems]);

  // Add item personalizado ao carrinho
  const handleAddCustomizedToCart = useCallback((item: MenuItem, customizations: Customization[], quantity: number) => {
    const customizationPrice = customizations.reduce((sum, c) => sum + c.price, 0);
    const totalItemPrice = (item.price + customizationPrice) * quantity;
    const cartItem: CartItem = {
      ...item,
      quantity,
      customizations,
      totalPrice: totalItemPrice
    };
    setCartItems(prev => [...prev, cartItem]);
  }, []);

  // Atualiza quantidade
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
          totalPrice: pricePerUnit * newQuantity
        };
      }
      return item;
    }));
  }, []);

  // Remove item
  const handleRemoveFromCart = useCallback((itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  // Modal de customização
  const handleCustomizeItem = useCallback((item: MenuItem) => {
    setCustomizationItem(item);
  }, []);
  const handleCloseCustomization = useCallback(() => {
    setCustomizationItem(null);
  }, []);

  // Pedir agora
  const handleOrderClick = useCallback(() => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione itens ao carrinho antes de fazer o pedido",
        variant: "destructive"
      });
      return;
    }
    setIsCartOpen(true);
  }, [cartItems.length]);

  // Checkout
  const handleCheckout = useCallback(() => {
    setCurrentState("checkout");
    setIsCartOpen(false);
  }, []);

  // Finalização
  const handleOrderComplete = useCallback((deliveryInfo: DeliveryInfo) => {
    console.log("Order completed:", {
      cartItems,
      deliveryInfo
    });
    setCartItems([]);
    setCurrentState("orderComplete");
    toast({
      title: "Pedido realizado com sucesso!",
      description: `Entrega prevista em ${deliveryInfo.estimatedTime} minutos`
    });
    setTimeout(() => {
      setCurrentState("menu");
    }, 3000);
  }, [cartItems]);
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  if (currentState === "checkout") {
    return <DeliveryForm cartItems={cartItems} onOrderComplete={handleOrderComplete} onBack={() => setCurrentState("menu")} />;
  }
  if (currentState === "orderComplete") {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
      </div>;
  }
  return <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartItemsCount} onCartOpen={() => setIsCartOpen(true)} onViewMenu={scrollToMenu} onBuildBurger={handleStartBuilder} />
      
      <main>
        <HeroSection onOrderClick={handleOrderClick} onViewMenu={scrollToMenu} />
        <MenuSection onAddToCart={handleAddToCart} onCustomizeItem={handleCustomizeItem} />
      </main>

      <Cart items={cartItems} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveFromCart} onCheckout={handleCheckout} />

      <CustomizationModal item={customizationItem} isOpen={!!customizationItem} onClose={handleCloseCustomization} onAddToCart={handleAddCustomizedToCart} />

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center font-bold text-secondary-foreground">FH</div>
                <span className="text-xl font-bold">Food House Hamburgueria</span>
              </div>
              <p className="text-inherit">Carne artesanal & Recheado sem dó</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <div className="space-y-2 text-primary-foreground/80">
                <p>📞 (14) 3621-5951</p>
                <p>📧 contato@foodhouse.com</p>
                <p>📍 Jau, SP</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Horário</h3>
              <div className="space-y-2 text-primary-foreground/80">
                <p>Quinta a Domingo: 18:30h - 22h</p>
                
                <p>🚚 Delivery em 30-40 min</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 Smash Point. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;