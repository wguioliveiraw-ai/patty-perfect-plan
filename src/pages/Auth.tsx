import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import { Eye, EyeOff, Phone, Mail, AlertCircle } from 'lucide-react'

const Auth = () => {
  const { signIn, signUp, isSupabaseConfigured } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email')

  // If Supabase is not configured, show configuration message
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-white">SP</span>
            </div>
            <CardTitle className="text-2xl font-bold text-orange-800 dark:text-orange-200">
              Smash Point
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p><strong>Supabase não configurado</strong></p>
                  <p>Para ativar a autenticação, configure as variáveis de ambiente:</p>
                  <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                    <li><code>VITE_SUPABASE_URL</code></li>
                    <li><code>VITE_SUPABASE_ANON_KEY</code></li>
                  </ul>
                  <p className="text-sm mt-2">Enquanto isso, você pode acessar o site diretamente.</p>
                </div>
              </AlertDescription>
            </Alert>
            
            <Button 
              onClick={() => window.location.reload()} 
              className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            >
              Pular Autenticação (Temporário)
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

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
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/
    return phoneRegex.test(phone)
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
        toast.error('Telefone deve estar no formato (XX) XXXXX-XXXX')
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
      }
    } catch (error) {
      toast.error('Erro inesperado')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">SP</span>
          </div>
          <CardTitle className="text-2xl font-bold text-orange-800 dark:text-orange-200">
            Smash Point
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Entre ou crie sua conta para continuar
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Criar Conta</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
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
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>
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
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Criando...' : 'Criar Conta'}
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default Auth