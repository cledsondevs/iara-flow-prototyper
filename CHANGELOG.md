# CHANGELOG

Todas as modificações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Unreleased] - 2025-07-26

### Adicionado

#### Novo Agente Gemini
- **Agente Gemini** adicionado à paleta de agentes de IA
- Integração com API Google Gemini via endpoint `/api/v2/chat/gemini`
- Suporte ao modelo `gemini-1.5-flash` com temperatura configurável
- Ícone Brain e cor roxa para identificação visual
- Descrição: "Assistente conversacional usando Google Gemini"

#### Melhorias no User Input
- **Campo de entrada de texto** no painel de propriedades lateral
- Textarea com limite de 500 caracteres e contador visual
- Sincronização automática entre painel de propriedades e visualização do nó
- Modo de visualização apenas no nó (sem edição direta)
- Placeholder inteligente: "Digite sua mensagem no painel de propriedades..."

#### Integração Email Sender com Output
- **Envio automático** da resposta do Gemini por e-mail
- Detecção automática de Email Sender conectado ao fluxo
- Assunto padrão: "Resposta do Agente Gemini"
- Logs detalhados do processo de envio
- Notificações toast para sucesso/erro do envio

#### Melhorias no Agent Output
- **Exibição da resposta** do Gemini em tempo real
- Área de texto scrollável com altura máxima de 120px
- Atualização automática do conteúdo após execução
- Indicador visual "Aguardando resultado..." quando vazio

### Modificado

#### NodePalette.tsx
```typescript
// Adicionado novo agente na paleta
{
  id: 'gemini-agent',
  label: 'Agente Gemini',
  icon: Brain,
  description: 'Assistente conversacional usando Google Gemini',
  color: 'text-purple-600',
  data: {
    label: 'Agente Gemini',
    agentType: 'gemini_agent',
    provider: 'gemini',
    model: 'gemini-1.5-flash',
    temperature: 0.7,
    instructions: 'Assistente conversacional usando Google Gemini'
  }
}
```

#### NodeTypes.tsx
```typescript
// Adicionado suporte ao gemini_agent
case 'gemini_agent': return Brain; // Ícone
case 'gemini_agent': return 'text-purple-600'; // Cor

// Modificado User Input para modo visualização
{data.dataType === 'input' && (
  <div className="mt-2">
    <div className="p-2 bg-muted rounded text-sm min-h-[60px] max-h-[100px] overflow-y-auto border">
      {userInput || 'Digite sua mensagem no painel de propriedades...'}
    </div>
    <div className="text-xs text-muted-foreground mt-1">
      {userInput.length}/500 caracteres
    </div>
  </div>
)}

// Melhorado Agent Output
{data.dataType === 'output' && (
  <div className="mt-2">
    <div className="p-2 bg-muted rounded text-xs min-h-[60px] max-h-[120px] overflow-y-auto">
      {(data as any).outputText || 'Aguardando resultado...'}
    </div>
  </div>
)}
```

#### PropertiesPanel.tsx
```typescript
// Adicionado campo para User Input
{dataData.dataType === 'input' && (
  <div className="space-y-2">
    <Label>Conteúdo da Mensagem</Label>
    <Textarea
      value={(dataData as any).userInput || ''}
      onChange={(e) => updateField('userInput', e.target.value)}
      placeholder="Digite sua mensagem aqui..."
      className="min-h-[100px] max-h-[200px] resize-none"
      rows={4}
    />
    <div className="text-xs text-muted-foreground">
      {((dataData as any).userInput || '').length}/500 caracteres
    </div>
  </div>
)}
```

#### PrototypeEditor.tsx
```typescript
// Adicionado detecção do Agente Gemini
const hasGeminiAgent = agentNodes.some(node => node.data.agentType === 'gemini_agent');

// Implementado fluxo de execução do Gemini
if (hasGeminiAgent) {
  result = await apiService.chatWithGemini(userInput as string, mockUserId);
  
  // Atualizar Agent Output
  const outputNodes = nodes.filter(node => node.type === 'data' && node.data.dataType === 'output');
  if (outputNodes.length > 0) {
    const outputNodeId = outputNodes[0].id;
    updateNodeData(outputNodeId, { 
      outputText: result.data.response || 'Resposta do Gemini',
      hasResult: true 
    });
  }
  
  // Integração com Email Sender
  if (hasEmailSender) {
    const emailSenderNode = agentNodes.find(node => node.data.agentType === 'email_sender');
    const emailResult = await apiService.sendEmail(recipient, subject, geminiResponse);
  }
}
```

#### api.ts
```typescript
// Adicionado método para chat com Gemini
async chatWithGemini(message: string, userId: string): Promise<ApiResponse<any>> {
  return this.request('/v2/chat/gemini', {
    method: 'POST',
    body: JSON.stringify({
      message,
      user_id: userId,
      session_id: `session_${Date.now()}`
    }),
  });
}
```

### Corrigido

#### Sincronização de Estado
- **useEffect** adicionado para sincronizar estado local com dados do nó
- Correção de imports duplicados (useState, useEffect)
- Validação de limite de caracteres (500) no User Input

#### Detecção de Fluxo
- **Logs de debug** adicionados para identificar tipos de agentes
- Correção na lógica de detecção do hasGeminiAgent
- Tratamento de erro "Unexpected token '<'" corrigido

#### Interface do Usuário
- **Tamanho mínimo** do nó User Input aumentado para 220px
- Bordas mais visíveis no textarea com focus highlight
- Contador de caracteres em tempo real

### Técnico

#### Estrutura de Dados
```typescript
// Interface estendida para suporte ao Gemini
export interface AgentNodeData extends BaseNodeData {
  agentType: 'chatbot' | 'analyzer' | 'retriever' | 'generator' | 'processor' | 
             'langchain_agent' | 'review_collector' | 'sentiment_analyzer' | 
             'backlog_generator' | 'memory_manager' | 'email_sender' | 
             'postgresql_memory' | 'gemini_agent'; // Novo tipo adicionado
}
```

#### API Endpoints
- **GET/POST** `/api/v2/chat/gemini` - Chat com Google Gemini
- **POST** `/api/send-email` - Envio de e-mails (já existente)

#### Fluxos Suportados
1. **Básico**: User Input → Agente Gemini → Agent Output
2. **Avançado**: User Input → Agente Gemini → Agent Output + Email Sender
3. **Híbrido**: Qualquer combinação com outros agentes existentes

### Branches

#### Frontend
- **Repositório**: `cledsondevs/iara-flow-prototyper`
- **Branch**: `feature/gemini-chat-integration`
- **Commits**: 6 commits com implementações incrementais

#### Backend
- **Repositório**: `cledsondevs/iara-flow-bff`
- **Branch**: `feature/gemini-chat-integration`
- **Status**: Sem alterações necessárias (APIs já existentes)

### Dependências

#### Mantidas
- Todas as dependências existentes mantidas
- Compatibilidade com React Flow preservada
- APIs existentes não foram modificadas

#### Utilizadas
- `@xyflow/react` - Para manipulação de nós e fluxos
- `lucide-react` - Ícones (Brain para Gemini)
- `@/components/ui/*` - Componentes de UI (Textarea, Input, etc.)

### Testes

#### Cenários Testados
1. ✅ Criação do nó Agente Gemini
2. ✅ Edição de texto no painel de propriedades
3. ✅ Sincronização visual User Input ↔ Propriedades
4. ✅ Execução do fluxo Gemini com resposta no output
5. ✅ Integração Email Sender com output do Gemini
6. ✅ Logs detalhados e notificações toast

#### Validações
- Limite de 500 caracteres no User Input
- Tratamento de erros de API
- Fallbacks para campos vazios
- Responsividade da interface

---

## Notas de Desenvolvimento

### Padrões Seguidos
- **Nomenclatura**: camelCase para variáveis, kebab-case para IDs
- **Tipagem**: TypeScript strict com interfaces bem definidas
- **Componentes**: Functional components com hooks
- **Estado**: useState + useEffect para sincronização
- **API**: Async/await com tratamento de erro

### Arquitetura
- **Separação de responsabilidades**: UI, lógica de negócio e API
- **Reutilização**: Componentes modulares e extensíveis
- **Manutenibilidade**: Código limpo e bem documentado
- **Escalabilidade**: Estrutura preparada para novos agentes

### Próximos Passos Sugeridos
1. Testes unitários para os novos componentes
2. Documentação de API atualizada
3. Validação de entrada mais robusta
4. Suporte a múltiplos modelos Gemini
5. Histórico de conversas
6. Configurações avançadas de temperatura e tokens

