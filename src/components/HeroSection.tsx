import { Button } from "@/components/ui/button";
import { Clock, Truck, Star } from "lucide-react";
import heroImage from "@/assets/hero-burger.jpg";
interface HeroSectionProps {
  onOrderClick: () => void;
  onViewMenu: () => void;
}
export const HeroSection = ({
  onOrderClick,
  onViewMenu
}: HeroSectionProps) => {
  return <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Delicious gourmet burgers" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-secondary mr-2" />
            <span className="text-sm font-medium">Hambúrgueres Artesanais Premium</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Sabor que
            <span className="text-secondary block">Transforma</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">Monte seu lanche perfeito com ingredientes premium e receba no conforto da sua casa!</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button onClick={onOrderClick} className="btn-hero text-lg px-8 py-4" aria-label="Fazer pedido agora">
              Fazer Pedido Agora
            </Button>
            <Button variant="outline" onClick={onViewMenu} className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 text-lg transition-all duration-300" aria-label="Ver cardápio completo">
              Ver Cardápio Completo
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="glass p-6 rounded-xl text-center">
              <Clock className="w-8 h-8 text-secondary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Delivery em 30min</h3>
              <p className="text-sm text-gray-300">Entrega rápida garantida</p>
            </div>
            <div className="glass p-6 rounded-xl text-center">
              <Truck className="w-8 h-8 text-secondary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Frete Grátis</h3>
              <p className="text-sm text-gray-300">Pedidos acima de R$ 35</p>
            </div>
            <div className="glass p-6 rounded-xl text-center">
              <Star className="w-8 h-8 text-secondary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Monte seu Lanche</h3>
              <p className="text-sm text-gray-300">Personalização completa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" aria-hidden="true">
        
      </div>
    </section>;
};