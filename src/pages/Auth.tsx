import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import { Eye, EyeOff, Phone, Mail, Gift, Star, Percent, Clock } from 'lucide-react'
import { FaGoogle, FaFacebook } from 'react-icons/fa'

interface AuthProps {
  onContinue?: () => void;
}

const Auth = ({ onContinue }: AuthProps) => {
  const navigate = useNavigate()
  const { signIn, signUp, signInWithPhone, signInWithGoogle, signInWithFacebook, isSupabaseConfigured } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email')

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  // Signup form state
  const [signupData, setSignupData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  // Phone OTP state
  const [phoneNumber, setPhoneNumber] = useState('')

  const validatePassword = (password: string): string[] => {
    const errors: string[] = []
    
    if (password.length < 8) {
      errors.push('A senha deve ter pelo menos 8 caracteres')
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('A senha deve conter pelo menos 1 letra maiúscula')
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('A senha deve conter pelo menos 1 letra minúscula')
    }
    
    if (!/\d/.test(password)) {
      errors.push('A senha deve conter pelo menos 1 número')
    }

    return errors
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[1-9]\d{10,14}$/
    const numbersOnly = phone.replace(/\D/g, '')
    return phoneRegex.test(numbersOnly) && numbersOnly.length >= 11
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3')
    }
    return value
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!loginData.email || !loginData.password) {
        toast.error('Preencha todos os campos')
        return
      }

      if (!validateEmail(loginData.email)) {
        toast.error('E-mail inválido')
        return
      }

      const { error } = await signIn(loginData.email, loginData.password)
      
      if (error) {
        toast.error('Erro ao fazer login: ' + error.message)
      } else {
        toast.success('Login realizado com sucesso!')
        navigate('/')
      }
    } catch (error) {
      toast.error('Erro inesperado')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (loginMethod === 'email' && !signupData.email) {
        toast.error('E-mail é obrigatório')
        return
      }

      if (loginMethod === 'phone' && !signupData.phone) {
        toast.error('Telefone é obrigatório')
        return
      }

      if (!signupData.password || !signupData.confirmPassword) {
        toast.error('Preencha todos os campos')
        return
      }

      if (signupData.password !== signupData.confirmPassword) {
        toast.error('As senhas não coincidem')
        return
      }

      if (loginMethod === 'email' && !validateEmail(signupData.email)) {
        toast.error('E-mail inválido')
        return
      }

      if (loginMethod === 'phone' && !validatePhone(signupData.phone)) {
        toast.error('Telefone inválido. Use o formato (XX) XXXXX-XXXX')
        return
      }

      const passwordErrors = validatePassword(signupData.password)
      if (passwordErrors.length > 0) {
        passwordErrors.forEach(error => toast.error(error))
        return
      }

      const email = loginMethod === 'email' ? signupData.email : `${signupData.phone.replace(/\D/g, '')}@temp.com`
      const { error } = await signUp(email, signupData.password, loginMethod === 'phone' ? signupData.phone : undefined)
      
      if (error) {
        toast.error('Erro ao criar conta: ' + error.message)
      } else {
        toast.success('Conta criada com sucesso!')
        navigate('/')
      }
    } catch (error) {
      toast.error('Erro inesperado')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhoneLogin = async () => {
    if (!phoneNumber) {
      toast.error('Digite seu número de telefone')
      return
    }

    if (!validatePhone(phoneNumber)) {
      toast.error('Número de telefone inválido')
      return
    }

    setIsLoading(true)
    try {
      const phoneWithCountryCode = '+55' + phoneNumber.replace(/\D/g, '')
      const { error } = await signInWithPhone(phoneWithCountryCode)
      
      if (error) {
        toast.error('Erro ao enviar código: ' + error.message)
      } else {
        toast.success('Código enviado para seu telefone!')
      }
    } catch (error) {
      toast.error('Erro inesperado')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const { error } = await signInWithGoogle()
      if (error) {
        toast.error('Erro ao fazer login com Google: ' + error.message)
      }
    } catch (error) {
      toast.error('Erro inesperado')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFacebookLogin = async () => {
    setIsLoading(true)
    try {
      const { error } = await signInWithFacebook()
      if (error) {
        toast.error('Erro ao fazer login com Facebook: ' + error.message)
      }
    } catch (error) {
      toast.error('Erro inesperado')
    } finally {
      setIsLoading(false)
    }
  }

  const handleContinueWithoutLogin = () => {
    if (onContinue) {
      onContinue();
    }
    navigate('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg shadow-2xl border-2 border-secondary/20">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-secondary-foreground">FH</span>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Food House
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Entre para aproveitar benefícios exclusivos
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Benefits Section */}
          <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Gift className="h-5 w-5 text-secondary" />
              Vantagens de ter uma conta:
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-secondary" />
                Acumule pontos a cada pedido
              </li>
              <li className="flex items-center gap-2">
                <Percent className="h-4 w-4 text-secondary" />
                Descontos e promoções exclusivas
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-secondary" />
                Histórico de pedidos e favoritos salvos
              </li>
            </ul>
          </div>

          {/* Social Login Buttons */}
          {isSupabaseConfigured && (
            <div className="space-y-3">
              <Button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                variant="outline"
                className="w-full flex items-center justify-center gap-2 h-11"
              >
                <FaGoogle className="h-5 w-5 text-red-500" />
                Continuar com Google
              </Button>

              <Button
                onClick={handleFacebookLogin}
                disabled={isLoading}
                variant="outline"
                className="w-full flex items-center justify-center gap-2 h-11"
              >
                <FaFacebook className="h-5 w-5 text-blue-600" />
                Continuar com Facebook
              </Button>
            </div>
          )}

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
              ou
            </span>
          </div>

          {/* Traditional Login/Signup */}
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Criar Conta</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Button
                  type="button"
                  variant={loginMethod === 'email' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLoginMethod('email')}
                  className="flex-1"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  E-mail
                </Button>
                <Button
                  type="button"
                  variant={loginMethod === 'phone' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLoginMethod('phone')}
                  className="flex-1"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Telefone
                </Button>
              </div>

              {loginMethod === 'email' ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">E-mail</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Senha</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Sua senha"
                        value={loginData.password}
                        onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone-number">Número de Telefone</Label>
                    <Input
                      id="phone-number"
                      type="tel"
                      placeholder="(XX) XXXXX-XXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(formatPhone(e.target.value))}
                    />
                  </div>
                  <Button 
                    onClick={handlePhoneLogin}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Enviando...' : 'Enviar Código'}
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="signup">
              <div className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button
                    type="button"
                    variant={loginMethod === 'email' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLoginMethod('email')}
                    className="flex-1"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    E-mail
                  </Button>
                  <Button
                    type="button"
                    variant={loginMethod === 'phone' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLoginMethod('phone')}
                    className="flex-1"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Telefone
                  </Button>
                </div>
                
                <form onSubmit={handleSignup} className="space-y-4">
                  {loginMethod === 'email' ? (
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">E-mail</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="signup-phone">Telefone</Label>
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="(XX) XXXXX-XXXX"
                        value={signupData.phone}
                        onChange={(e) => setSignupData(prev => ({ ...prev, phone: formatPhone(e.target.value) }))}
                        required
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Senha</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Mínimo 8 caracteres"
                        value={signupData.password}
                        onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Deve conter: 1 maiúscula, 1 minúscula e 1 número
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirmar Senha</Label>
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      placeholder="Confirme sua senha"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Criando...' : 'Criar Conta'}
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>

          <Separator />

          {/* Continue Without Login */}
          <Button
            onClick={handleContinueWithoutLogin}
            variant="ghost"
            className="w-full"
          >
            Continuar sem fazer login
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Auth