import { useState } from "react";
import { CartItem, DeliveryInfo } from "@/types/menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, CreditCard, Clock, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DeliveryFormProps {
  cartItems: CartItem[];
  onOrderComplete: (deliveryInfo: DeliveryInfo) => void;
  onBack: () => void;
}

export const DeliveryForm = ({ cartItems, onOrderComplete, onBack }: DeliveryFormProps) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "debit" | "pix" | "cash">("credit");
  const [needsChange, setNeedsChange] = useState(false);
  const [changeAmount, setChangeAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = subtotal >= 35 ? 0 : 8.90;
  const total = subtotal + deliveryFee;
  const estimatedTime = 30; // Fixed 30 minute estimate

  const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace('.', ',')}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !address.trim() || !phone.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "cash" && needsChange && !changeAmount.trim()) {
      toast({
        title: "Informe o valor do troco",
        description: "Por favor, informe para quanto precisa de troco",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate order processing
    setTimeout(() => {
      // Get current date and time
      const now = new Date();
      const dateStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      
      let orderMessage = `➡ *NOVO PEDIDO ${dateStr} ${timeStr}*\n\n`;
      
      // Items
      cartItems.forEach((item, index) => {
        orderMessage += `✔ ${item.quantity}x de ${item.name} ${formatPrice(item.price)}\n`;
        
        if (item.customizations && item.customizations.length > 0) {
          orderMessage += `*** Personalizações:\n`;
          item.customizations.forEach(custom => {
            orderMessage += `- ${custom.name} ${formatPrice(custom.price)}\n`;
          });
        }
        orderMessage += `\n`;
      });
      
      // Customer Info
      orderMessage += `✅ *CLIENTE*\n`;
      orderMessage += `${name.trim()}\n`;
      orderMessage += `${address.trim()}\n`;
      orderMessage += `Telefone: ${phone.trim()}\n\n`;
      
      // Payment Method
      const paymentLabels = {
        credit: "Crédito",
        debit: "Débito",
        pix: "PIX",
        cash: "Dinheiro"
      };
      
      // Totals
      orderMessage += `💲 *TOTAL ${formatPrice(total)}*\n`;
      orderMessage += `Pedido: ${formatPrice(subtotal)}   Tx Entrega: ${formatPrice(deliveryFee)}\n`;
      orderMessage += `Forma PGTO: ${paymentLabels[paymentMethod]}\n`;
      
      if (paymentMethod === "cash" && needsChange) {
        orderMessage += `Troco para: ${changeAmount}\n`;
      }
      
      orderMessage += `\n${name.trim()} favor aguardar a resposta confirmando o pedido.`;
      
      // WhatsApp URL
      const whatsappNumber = "5514981637609"; // (14) 98163-7609 in international format
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderMessage)}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Pedido enviado!",
        description: "Você será redirecionado para o WhatsApp para confirmar seu pedido",
      });
      
      setIsSubmitting(false);
      
      // Call onOrderComplete to handle app state
      const deliveryInfo: DeliveryInfo = {
        address: address.trim(),
        phone: phone.trim(),
        paymentMethod,
        estimatedTime,
        deliveryFee,
      };
      onOrderComplete(deliveryInfo);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="mb-4"
          >
            ← Voltar ao Carrinho
          </Button>
          <h1 className="text-3xl font-bold">
            Finalizar <span className="text-secondary">Pedido</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Delivery Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Endereço de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome completo *</Label>
                    <Input
                      id="name"
                      placeholder="Seu nome completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Endereço completo *</Label>
                    <Input
                      id="address"
                      placeholder="Rua, número, bairro, CEP"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                    <Input
                      id="phone"
                      placeholder="(14) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Forma de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={(value: any) => {
                  setPaymentMethod(value);
                  if (value !== 'cash') {
                    setNeedsChange(false);
                    setChangeAmount("");
                  }
                }}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50">
                      <RadioGroupItem value="credit" id="credit" />
                      <Label htmlFor="credit" className="flex-1 cursor-pointer">
                        Cartão de Crédito
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50">
                      <RadioGroupItem value="debit" id="debit" />
                      <Label htmlFor="debit" className="flex-1 cursor-pointer">
                        Cartão de Débito
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50">
                      <RadioGroupItem value="pix" id="pix" />
                      <Label htmlFor="pix" className="flex-1 cursor-pointer">
                        PIX
                      </Label>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex-1 cursor-pointer">
                          Dinheiro
                        </Label>
                      </div>
                      
                      {paymentMethod === "cash" && (
                        <div className="ml-8 space-y-3 p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="needsChange"
                              checked={needsChange}
                              onChange={(e) => {
                                setNeedsChange(e.target.checked);
                                if (!e.target.checked) setChangeAmount("");
                              }}
                              className="w-4 h-4"
                            />
                            <Label htmlFor="needsChange" className="cursor-pointer">
                              Precisa de troco?
                            </Label>
                          </div>
                          
                          {needsChange && (
                            <div>
                              <Label htmlFor="changeAmount" className="text-sm">Troco para quanto? *</Label>
                              <Input
                                id="changeAmount"
                                placeholder="Ex: R$ 50,00"
                                value={changeAmount}
                                onChange={(e) => setChangeAmount(e.target.value)}
                                className="mt-1"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      {item.customizations && item.customizations.length > 0 && (
                        <p className="text-sm text-muted-foreground">
                          {item.customizations.map(c => c.name).join(", ")}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Qtd: {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium">{formatPrice(item.totalPrice)}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Taxa de entrega</span>
                    <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                      {deliveryFee === 0 ? "GRÁTIS" : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-secondary">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Tempo estimado: {estimatedTime} minutos</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !name.trim() || !address.trim() || !phone.trim()}
                  className="w-full btn-hero text-lg py-6 mt-6"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Processando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Confirmar Pedido
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};