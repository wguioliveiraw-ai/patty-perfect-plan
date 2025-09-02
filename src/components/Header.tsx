import { useState } from "react";
import { ShoppingCart, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

interface HeaderProps {
  cartItemsCount: number;
  onCartOpen: () => void;
}

export const Header = ({ cartItemsCount, onCartOpen }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center font-bold text-secondary-foreground">
              SP
            </div>
            <span className="text-xl font-bold text-foreground">Smash Point</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button className="text-foreground hover:text-secondary transition-colors font-medium">
              Cardápio
            </button>
            <button className="text-foreground hover:text-secondary transition-colors font-medium">
              Monte seu Lanche
            </button>
            <button className="text-foreground hover:text-secondary transition-colors font-medium">
              Delivery
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-secondary/20"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Cart */}
            <Button
              variant="outline"
              size="icon"
              onClick={onCartOpen}
              className="relative btn-outline-yellow"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <nav className="flex flex-col space-y-3">
              <button className="text-left text-foreground hover:text-secondary transition-colors font-medium py-2">
                Cardápio
              </button>
              <button className="text-left text-foreground hover:text-secondary transition-colors font-medium py-2">
                Monte seu Lanche
              </button>
              <button className="text-left text-foreground hover:text-secondary transition-colors font-medium py-2">
                Delivery
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};