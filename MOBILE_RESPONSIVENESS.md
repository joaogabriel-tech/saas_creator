# Documentação de Responsividade Mobile - KRYO Platform

## Visão Geral

O site KRYO foi otimizado para dispositivos móveis, garantindo uma experiência fluida em todas as telas, desde smartphones pequenos (375px) até desktops grandes (1920px+).

---

## Breakpoints Utilizados

Seguimos os breakpoints padrão do Tailwind CSS:

| Breakpoint | Largura Mínima | Dispositivos Típicos |
|------------|----------------|----------------------|
| `sm` | 640px | Smartphones grandes (landscape) |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Desktops grandes |

**Mobile-First Approach:** Todas as classes sem prefixo aplicam-se a mobile (< 640px), e adicionamos modificadores para telas maiores.

---

## Páginas Otimizadas

### 1. Dashboard (`/dashboard`)

**Ajustes Implementados:**

- **Header**
  - Título: `text-3xl sm:text-4xl md:text-5xl`
  - Subtítulo: `text-base sm:text-lg`
  - Botões: Empilham verticalmente em mobile (`flex-col sm:flex-row`)
  - Botões ocupam largura total em mobile (`w-full sm:w-auto`)

- **Grid de Estatísticas**
  - Mobile: 1 coluna
  - Tablet (sm): 2 colunas
  - Desktop (lg): 4 colunas
  - Gap reduzido em mobile: `gap-4 sm:gap-6`

- **Card Insight Diário**
  - Padding responsivo: `p-6 sm:p-8 md:p-10`
  - Título: `text-2xl sm:text-3xl`
  - Texto: `text-sm sm:text-base`

- **Action Cards (Nova Análise / Novo Roteiro)**
  - Mobile: 1 coluna
  - Tablet: 2 colunas (`grid-cols-1 sm:grid-cols-2`)
  - Padding reduzido: `p-6 sm:p-8`

- **Roteiros Recentes**
  - Padding de cards reduzido: `p-4 sm:p-6`
  - Gap entre elementos: `gap-2 sm:gap-4`

---

### 2. Referências (`/references`)

**Ajustes Implementados:**

- **Header**
  - Título: `text-3xl sm:text-4xl`
  - Subtítulo: `text-base sm:text-lg`

- **Card de Nova Análise**
  - Padding: `px-6 sm:px-8`, `pt-6 sm:pt-8`, `pb-6 sm:pb-8`

- **Tabs**
  - Texto abreviado em mobile: "Shorts" ao invés de "Shorts/Reels"
  - Tamanho de fonte: `text-xs sm:text-sm`
  - Gap: `gap-1 sm:gap-2`
  - Margin bottom: `mb-6 sm:mb-8`

- **Formulário de Análise**
  - Input e botão empilham verticalmente: `flex-col sm:flex-row`
  - Botão "Analisar": `w-full sm:w-auto`
  - Altura do botão: `h-12 sm:h-14`
  - Padding do botão: `px-6 sm:px-8`

- **Campos Opcionais**
  - Mobile: 1 coluna
  - Tablet: 2 colunas (`grid-cols-1 sm:grid-cols-2`)

- **Cards de Referências**
  - Layout vertical em mobile, horizontal em tablet
  - Thumbnail: `w-full sm:w-40`
  - Flex direction: `flex-col sm:flex-row`
  - Alinhamento: `items-start sm:items-center`

- **Sidebar de Estatísticas**
  - Aparece abaixo do conteúdo em mobile (grid natural do Tailwind)
  - Lado a lado em desktop (`lg:grid-cols-3`)

---

## Componentes Globais

### DashboardLayout

O componente `DashboardLayout` já possui suporte nativo para mobile através do **shadcn/ui Sidebar**:

- **Mobile (< 768px):** Sidebar colapsada por padrão, acessível via menu hamburger
- **Desktop (>= 768px):** Sidebar sempre visível

**Componentes utilizados:**
- `SidebarTrigger`: Botão hamburger para abrir/fechar sidebar em mobile
- `SidebarProvider`: Gerencia estado de abertura/fechamento
- `SidebarInset`: Container responsivo que ajusta margem baseado no estado da sidebar

---

## Padrões de Design Responsivo

### Tipografia

```css
/* Títulos principais */
text-3xl sm:text-4xl md:text-5xl

/* Subtítulos */
text-base sm:text-lg

/* Texto de corpo */
text-sm sm:text-base

/* Texto pequeno (labels, badges) */
text-xs sm:text-sm
```

### Espaçamento

```css
/* Padding de cards */
p-4 sm:p-6 md:p-8

/* Gap entre elementos */
gap-3 sm:gap-4 md:gap-6

/* Margin vertical */
space-y-6 lg:space-y-8
```

### Layout

```css
/* Empilhamento vertical -> horizontal */
flex-col sm:flex-row

/* Grid responsivo */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-4

/* Largura total -> auto */
w-full sm:w-auto
```

### Botões

```css
/* Altura responsiva */
h-12 sm:h-14

/* Padding responsivo */
px-6 sm:px-8

/* Largura responsiva */
w-full sm:w-auto
```

---

## Checklist de Responsividade

Ao criar novos componentes, verifique:

- [ ] Tipografia escala adequadamente (3xl → 4xl → 5xl)
- [ ] Padding reduz em mobile (p-8 → p-6 → p-4)
- [ ] Grids adaptam colunas (4 → 2 → 1)
- [ ] Botões empilham verticalmente em mobile
- [ ] Botões ocupam largura total em mobile quando apropriado
- [ ] Touch targets têm mínimo 44x44px
- [ ] Imagens/thumbnails são responsivas
- [ ] Texto não quebra de forma estranha
- [ ] Elementos não transbordam da tela
- [ ] Sidebar funciona corretamente em mobile

---

## Testes Recomendados

### Breakpoints Críticos

1. **375px** - iPhone SE (mobile pequeno)
2. **640px** - Smartphones grandes (sm breakpoint)
3. **768px** - Tablets (md breakpoint)
4. **1024px** - Laptops (lg breakpoint)
5. **1920px** - Desktops grandes

### Ferramentas

- **Chrome DevTools:** Device toolbar (Cmd+Shift+M)
- **Firefox Responsive Design Mode:** (Cmd+Opt+M)
- **Dispositivos reais:** Teste em iPhone e Android quando possível

---

## Próximas Melhorias

- [ ] Otimizar Home page (não autenticada) para mobile
- [ ] Ajustar páginas de Ideias, Roteiros e Planos
- [ ] Implementar lazy loading de imagens
- [ ] Adicionar skeleton loaders para melhor UX
- [ ] Testar performance em dispositivos reais
- [ ] Validar acessibilidade (WCAG 2.1)

---

## Recursos Adicionais

- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [shadcn/ui Sidebar Component](https://ui.shadcn.com/docs/components/sidebar)
- [Mobile-First CSS](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive/Mobile_first)
