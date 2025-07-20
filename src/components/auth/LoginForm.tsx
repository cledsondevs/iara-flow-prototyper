import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2, User } from 'lucide-react';

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginWithMock } = useAuth();

  // Verificar se está em modo de desenvolvimento
  const isDevelopment = import.meta.env.DEV || import.meta.env.VITE_ENABLE_MOCK_LOGIN === 'true';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Por favor, preencha todos os campos');
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(username, password);
      if (!result.success) {
        setError(result.error || 'Erro no login');
      }
    } catch (error) {
      setError('Erro de conexão');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMockLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      const result = await loginWithMock();
      if (!result.success) {
        setError(result.error || 'Erro no login mock');
      }
    } catch (error) {
      setError('Erro ao fazer login com usuário mock');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Entre com suas credenciais para acessar o sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Nome de usuário</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu nome de usuário"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              disabled={isLoading}
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </Button>
          
          {isDevelopment && (
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Modo Desenvolvimento
                  </span>
                </div>
              </div>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full" 
                onClick={handleMockLogin}
                disabled={isLoading}
              >
                <User className="mr-2 h-4 w-4" />
                Usar Usuário Mock
              </Button>
            </div>
          )}
          {onSwitchToRegister && (
            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={onSwitchToRegister}
                disabled={isLoading}
              >
                Não tem uma conta? Registre-se
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};
