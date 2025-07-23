import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, BarChart3, PieChart, TrendingUp, Users, AlertTriangle, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiService } from '@/services/api';

interface DashboardData {
  id: string;
  title: string;
  description: string;
  package_name: string;
  custom_url: string;
  created_at: string;
  expires_at: string;
  access_count: number;
  config: {
    title: string;
    description: string;
    layout: {
      components: DashboardComponent[];
    };
    theme: {
      primary_color: string;
      secondary_color: string;
      background: string;
      text_color: string;
    };
  };
  metadata: any;
}

interface DashboardComponent {
  id: string;
  type: string;
  title: string;
  value?: any;
  data?: any;
  icon?: string;
  color?: string;
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

export const Dashboard = () => {
  const { customUrl } = useParams<{ customUrl: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (customUrl) {
      loadDashboard(customUrl);
    }
  }, [customUrl]);

  const loadDashboard = async (url: string) => {
    try {
      setLoading(true);
      const response = await apiService.getDashboard(url);
      
      if (response.success && response.dashboard) {
        setDashboard(response.dashboard);
      } else {
        setError(response.error || 'Dashboard não encontrado');
      }
    } catch (err) {
      setError('Erro ao carregar dashboard');
      console.error('Erro ao carregar dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      'list': BarChart3,
      'alert-triangle': AlertTriangle,
      'trending-down': TrendingUp,
      'trending-up': TrendingUp,
      'tag': Users,
      'check-circle': CheckCircle,
      'clock': Clock
    };
    
    const IconComponent = icons[iconName] || BarChart3;
    return <IconComponent className="w-6 h-6" />;
  };

  const getColorClass = (color: string) => {
    const colorClasses: { [key: string]: string } = {
      'blue': 'bg-blue-500 text-white',
      'red': 'bg-red-500 text-white',
      'green': 'bg-green-500 text-white',
      'purple': 'bg-purple-500 text-white',
      'orange': 'bg-orange-500 text-white',
      'yellow': 'bg-yellow-500 text-white'
    };
    
    return colorClasses[color] || 'bg-gray-500 text-white';
  };

  const renderComponent = (component: DashboardComponent) => {
    switch (component.type) {
      case 'metric_card':
        return (
          <Card key={component.id} className="h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {component.title}
                  </p>
                  <p className="text-2xl font-bold">
                    {component.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${getColorClass(component.color || 'blue')}`}>
                  {getIconComponent(component.icon || 'list')}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'bar_chart':
      case 'pie_chart':
        return (
          <Card key={component.id} className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">{component.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-48 text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Gráfico: {component.title}</p>
                  <p className="text-xs">
                    {component.data?.labels?.length || 0} itens de dados
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'data_table':
        return (
          <Card key={component.id} className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">{component.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                <div className="space-y-2">
                  {component.data?.rows?.slice(0, 5).map((row: any[], index: number) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <span className="text-sm font-medium">{row[0]}</span>
                      <div className="flex gap-2">
                        <Badge variant="outline">P{row[1]}</Badge>
                        <Badge variant="secondary">{row[2]}</Badge>
                      </div>
                    </div>
                  ))}
                  {(component.data?.rows?.length || 0) > 5 && (
                    <p className="text-xs text-muted-foreground text-center pt-2">
                      +{(component.data?.rows?.length || 0) - 5} itens adicionais
                    </p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        );

      case 'gauge_chart':
        return (
          <Card key={component.id} className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">{component.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-2">
                    <div className="absolute inset-0 rounded-full border-8 border-muted"></div>
                    <div 
                      className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent"
                      style={{
                        transform: `rotate(${(component.data?.value || 0) * 3.6}deg)`
                      }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold">{component.data?.value || 0}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Análise de Sentimento</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return (
          <Card key={component.id} className="h-full">
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground">
                <p className="text-sm">Componente: {component.type}</p>
                <p className="text-xs">{component.title}</p>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Dashboard não encontrado</CardTitle>
            <CardDescription className="text-center">
              {error || 'O dashboard solicitado não existe ou expirou.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => navigate('/')} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Editor
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{dashboard.config.title}</h1>
                <p className="text-sm text-muted-foreground">
                  {dashboard.package_name} • Criado em {new Date(dashboard.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {dashboard.access_count} visualizações
              </Badge>
              <Badge variant="secondary">
                Expira em {new Date(dashboard.expires_at).toLocaleDateString('pt-BR')}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {dashboard.config.layout.components
            .filter(c => c.type === 'metric_card')
            .map(component => renderComponent(component))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {dashboard.config.layout.components
            .filter(c => ['bar_chart', 'pie_chart', 'gauge_chart'].includes(c.type))
            .map(component => renderComponent(component))}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {dashboard.config.layout.components
            .filter(c => c.type === 'data_table')
            .map(component => renderComponent(component))}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>
            Dashboard gerado automaticamente pelo Iara Flow Prototyper
          </p>
          <p className="mt-1">
            Baseado na análise de reviews do aplicativo {dashboard.package_name}
          </p>
        </div>
      </div>
    </div>
  );
};

