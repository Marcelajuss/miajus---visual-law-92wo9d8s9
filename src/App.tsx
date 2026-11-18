/* Main App Component - MiaJus - Visual Law
   Contém todas as rotas oficiais e navegação da plataforma */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'

// Páginas principais
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import { FormatacaoInteligente } from './pages/FormatacaoInteligente'
import { MeuAcervoPage } from './pages/MeuAcervoPage'
import { BuscadorJurisprudenciaPage } from './pages/BuscadorJurisprudenciaPage'
import { FluxogramaPage } from './pages/FluxogramaPage'
import { LinhaTempoPage } from './pages/LinhaTempoPage'
import { TabelaPage } from './pages/TabelaPage'
import { GraficoPage } from './pages/GraficoPage'
import { GeradorQrCodePage } from './pages/GeradorQrCodePage'
import { AcervoIconesPage } from './pages/AcervoIconesPage'
import { BlocoNotasPage } from './pages/BlocoNotasPage'
import { AgendaPage } from './pages/AgendaPage'
import { PlanosTokensPage } from './pages/PlanosTokensPage'
import { PendingIaToolPage } from './pages/PendingIaPages'

const App = () => (
  <BrowserRouter>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route element={<Layout />}>
          {/* Central de Ferramentas */}
          <Route path="/" element={<Index />} />

          {/* Ferramentas Oficiais */}
          <Route path="/meu-acervo" element={<MeuAcervoPage />} />
          <Route path="/formatacao-inteligente" element={<FormatacaoInteligente />} />
          <Route path="/buscador-jurisprudencia" element={<BuscadorJurisprudenciaPage />} />
          <Route path="/fluxograma" element={<FluxogramaPage />} />
          <Route path="/linha-tempo" element={<LinhaTempoPage />} />
          <Route path="/tabela" element={<TabelaPage />} />
          <Route path="/grafico" element={<GraficoPage />} />
          <Route path="/gerador-qr-code" element={<GeradorQrCodePage />} />
          <Route path="/acervo-icones" element={<AcervoIconesPage />} />
          <Route path="/bloco-notas" element={<BlocoNotasPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/planos" element={<PlanosTokensPage />} />

          {/* Ferramentas aguardando ativação de IA */}
          <Route
            path="/inteligencia-visual"
            element={
              <PendingIaToolPage
                toolId="inteligencia-visual"
                nome="Inteligência Visual"
                descricao="Módulo de sugestões de diagramação e paletas de cores harmônicas para petições modernas."
                exemploEntrada="Petição inicial com excesso de texto contínuo sem respiro visual e sem quadros de síntese fática."
                exemploSaida={`[DIAGRAMAÇÃO VISUAL LAW RECOMENDADA]
• Cabeçalho: Barra superior com identificação da sociedade de advogados e número OAB.
• Quadro de Síntese: Caixa destacada em lilás (#8B6FB8) com os 3 fatos principais.
• Cronologia: Linha do tempo vertical demonstrando a tempestividade do ajuizamento.`}
              />
            }
          />
          <Route
            path="/texto-otimizado"
            element={
              <PendingIaToolPage
                toolId="texto-otimizado"
                nome="Texto Otimizado"
                descricao="Simplificação de linguagem jurídica complexa para Plain English / Linguagem Cidadã e direta."
                exemploEntrada="In casu, verifica-se que a quaestio iuris repousa sobre a desídia da parte ré, que, inobstante notificada, olvidou-se do adimplemento da obrigação pactuada."
                exemploSaida={`[VERSÃO OTIMIZADA EM LINGUAGEM CIDADÃ / VISUAL LAW]
O caso trata do descumprimento do contrato pelo réu. Mesmo após ser formalmente notificado com prazo de 5 dias, ele deixou de pagar a quantia devida, gerando prejuízo direto ao autor.`}
              />
            }
          />
          <Route
            path="/resumo-documentos"
            element={
              <PendingIaToolPage
                toolId="resumo-documentos-juridicos"
                nome="Resumo de Documentos Jurídicos"
                descricao="Síntese em tópicos executivos de laudos periciais, decisões extensas e contratos densos."
                exemploEntrada="Laudo pericial médico trabalhista de 48 páginas atestando nexo de concausalidade em LER/DORT."
                exemploSaida={`[RESUMO EXECUTIVO DO LAUDO PERICIAL]
1. Conclusão Principal: Há nexo de concausalidade entre as atividades de digitação e a lesão no punho direito (fls. 24).
2. Redução da Capacidade Laboral: Fixada em 25% pelo perito judicial.
3. Período de Afastamento: 14 meses com percepção de auxílio-doença acidentário (B91).`}
              />
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
