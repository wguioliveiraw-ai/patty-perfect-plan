import { useState } from "react";
import { ShoppingCart, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
interface HeaderProps {
  cartItemsCount: number;
  onCartOpen: () => void;
  onViewMenu: () => void;
  onBuildBurger: () => void;
}
export const Header = ({
  cartItemsCount,
  onCartOpen,
  onViewMenu,
  onBuildBurger
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Erro ao fazer logout');
    } else {
      toast.success('Logout realizado com sucesso!');
    }
  };
  return <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center font-bold text-secondary-foreground" aria-label="Smash Point logo">SP</div>
            <span className="text-xl font-bold text-foreground">Smash Point</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" aria-label="Navegação principal">
            <button className="text-foreground hover:text-secondary transition-colors font-medium" onClick={onViewMenu} aria-label="Ver cardápio">
              Cardápio
            </button>
            <button className="text-foreground hover:text-secondary transition-colors font-medium" onClick={onBuildBurger} aria-label="Montar lanche">
              Monte seu Lanche
            </button>
            <button className="text-foreground hover:text-secondary transition-colors font-medium" onClick={onCartOpen} aria-label="Abrir carrinho">
              Delivery
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* User info */}
            {user && (
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Olá, {user.email}</span>
              </div>
            )}
            
            {/* Cart */}
            <Button variant="outline" size="icon" onClick={onCartOpen} className="relative btn-outline-yellow" aria-label="Abrir carrinho">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center" aria-live="polite">
                  {cartItemsCount}
                </span>
              )}
            </Button>

            {/* Logout button */}
            <Button variant="outline" size="icon" onClick={handleLogout} className="hidden md:flex" aria-label="Fazer logout">
              <LogOut className="h-4 w-4" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden" aria-label="Abrir menu mobile">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <nav className="flex flex-col space-y-3" aria-label="Navegação mobile">
              <button 
                className="text-left text-foreground hover:text-secondary transition-colors font-medium py-2" 
                onClick={() => {
                  onViewMenu();
                  setIsMenuOpen(false);
                }} 
                aria-label="Ver cardápio"
              >
                Cardápio
              </button>
              <button 
                className="text-left text-foreground hover:text-secondary transition-colors font-medium py-2" 
                onClick={() => {
                  onBuildBurger();
                  setIsMenuOpen(false);
                }} 
                aria-label="Montar lanche"
              >
                Monte seu Lanche
              </button>
              <button 
                className="text-left text-foreground hover:text-secondary transition-colors font-medium py-2" 
                onClick={() => {
                  onCartOpen();
                  setIsMenuOpen(false);
                }} 
                aria-label="Abrir carrinho"
              >
                Delivery
              </button>
              {user && (
                <div className="border-t border-border pt-3 mt-3">
                  <p className="text-sm text-muted-foreground mb-2">Olá, {user.email}</p>
                  <button 
                    className="text-left text-red-600 hover:text-red-700 transition-colors font-medium py-2 flex items-center gap-2" 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }} 
                    aria-label="Fazer logout"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>;
};