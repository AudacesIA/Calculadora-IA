export interface Option {
  text: string;
  points: number;
  letter: 'A' | 'B' | 'C' | 'D';
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface Dimension {
  name: string;
  description: string;
  questions: Question[];
}

export const dimensions: Dimension[] = [
  {
    name: "Estratégia & Liderança",
    description: "Mede se existe intenção real e direcionamento estratégico vindo do topo da organização.",
    questions: [
      {
        id: "P1",
        text: "Como a IA está posicionada na estratégia da sua empresa?",
        options: [
          { letter: "A", text: "Nunca discutimos IA formalmente", points: 0 },
          { letter: "B", text: "Já ouvimos falar, mas ainda não há nenhuma decisão tomada", points: 33 },
          { letter: "C", text: "Temos iniciativas isoladas, mas sem um plano estruturado", points: 66 },
          { letter: "D", text: "A IA faz parte do planejamento estratégico e há metas definidas", points: 100 }
        ]
      },
      {
        id: "P2",
        text: "A liderança da empresa (dono, diretores, gerentes) usa IA no próprio trabalho?",
        options: [
          { letter: "A", text: "Não, ninguém na liderança usa", points: 0 },
          { letter: "B", text: "Usam esporadicamente, sem rotina", points: 33 },
          { letter: "C", text: "Alguns líderes usam com frequência", points: 66 },
          { letter: "D", text: "A liderança usa IA diariamente e incentiva o time a fazer o mesmo", points: 100 }
        ]
      },
      {
        id: "P4",
        text: "Como a empresa reage quando um processo poderia ser automatizado?",
        options: [
          { letter: "A", text: "A reação comum é \"aqui sempre foi assim\"", points: 0 },
          { letter: "B", text: "Discutimos, mas raramente avançamos", points: 33 },
          { letter: "C", text: "Avaliamos caso a caso, às vezes implementamos", points: 66 },
          { letter: "D", text: "Automatizar é uma prioridade ativa — buscamos oportunidades constantemente", points: 100 }
        ]
      }
    ]
  },
  {
    name: "Processos & Automação",
    description: "Mede a maturidade na aplicação de IA e automação nas operações do dia a dia.",
    questions: [
      {
        id: "P5",
        text: "Quantos processos da sua empresa hoje são executados (pelo menos em parte) por IA ou automação?",
        options: [
          { letter: "A", text: "Nenhum", points: 0 },
          { letter: "B", text: "1 ou 2 processos pontuais, quase como teste", points: 33 },
          { letter: "C", text: "Alguns processos relevantes, mas ainda há muito manual", points: 66 },
          { letter: "D", text: "Múltiplos processos críticos rodando com IA de forma estável", points: 100 }
        ]
      },
      {
        id: "P6",
        text: "Como é feito o atendimento inicial de clientes (WhatsApp, e-mail, redes sociais)?",
        options: [
          { letter: "A", text: "Totalmente manual, uma pessoa responde tudo", points: 0 },
          { letter: "B", text: "Temos alguns templates prontos, mas ainda é manual", points: 33 },
          { letter: "C", text: "Parte é automatizada, mas depende de humano para avançar", points: 66 },
          { letter: "D", text: "Um agente de IA qualifica, responde e direciona sem intervenção humana", points: 100 }
        ]
      },
      {
        id: "P7",
        text: "Tarefas repetitivas como geração de relatórios, cobranças ou follow-up com clientes são feitas como?",
        options: [
          { letter: "A", text: "Manualmente por colaboradores", points: 0 },
          { letter: "B", text: "Temos planilhas e controles, mas alguém precisa executar", points: 33 },
          { letter: "C", text: "Parte está automatizada com ferramentas simples", points: 66 },
          { letter: "D", text: "Totalmente automatizadas — acontecem sem ninguém precisar lembrar", points: 100 }
        ]
      }
    ]
  },
  {
    name: "Dados & Infraestrutura",
    description: "Avalia se a empresa possui a base necessária de dados e conexões para a IA funcionar.",
    questions: [
      {
        id: "P9",
        text: "Onde ficam as informações dos seus clientes (histórico, pedidos, conversas)?",
        options: [
          { letter: "A", text: "Espalhadas — WhatsApp, papel, cabeça dos funcionários", points: 0 },
          { letter: "B", text: "Em planilhas, mas desatualizadas ou incompletas", points: 33 },
          { letter: "C", text: "Em um sistema (CRM, ERP), mas com uso inconsistente", points: 66 },
          { letter: "D", text: "Centralizadas, atualizadas e acessíveis para quem precisa", points: 100 }
        ]
      },
      {
        id: "P10",
        text: "Se um cliente antigo entrar em contato hoje, em quanto tempo sua equipe consegue acessar o histórico completo dele?",
        options: [
          { letter: "A", text: "Não temos esse histórico estruturado", points: 0 },
          { letter: "B", text: "Precisa perguntar para quem atendeu antes", points: 33 },
          { letter: "C", text: "Está em algum sistema, mas leva tempo para achar", points: 66 },
          { letter: "D", text: "Em segundos, qualquer colaborador acessa tudo", points: 100 }
        ]
      },
      {
        id: "P11",
        text: "Como vocês usam os dados que têm para tomar decisões comerciais?",
        options: [
          { letter: "A", text: "As decisões são baseadas em percepção e experiência", points: 0 },
          { letter: "B", text: "Olhamos alguns números básicos de vez em quando", points: 33 },
          { letter: "C", text: "Temos relatórios regulares que orientam algumas decisões", points: 66 },
          { letter: "D", text: "Decisões são orientadas por dados em tempo real, com dashboards ativos", points: 100 }
        ]
      },
      {
        id: "P12",
        text: "As ferramentas que sua empresa usa \"conversam\" entre si (CRM, sistema financeiro, WhatsApp, calendário)?",
        options: [
          { letter: "A", text: "Não — cada ferramenta é uma ilha", points: 0 },
          { letter: "B", text: "Algumas se integram, mas há muito copiar e colar manual", points: 33 },
          { letter: "C", text: "A maioria está integrada, mas ainda há gaps", points: 66 },
          { letter: "D", text: "Todo o stack é integrado e os dados fluem automaticamente", points: 100 }
        ]
      }
    ]
  },
  {
    name: "Pessoas & Cultura",
    description: "Mede o nível de abertura, capacitação e preparação do time frente às inovações de IA.",
    questions: [
      {
        id: "P13",
        text: "Como o time costuma reagir quando a empresa tenta implementar um processo ou ferramenta nova?",
        options: [
          { letter: "A", text: "Resistência — \"aqui sempre foi assim\" / \"mais uma coisa pra aprender\"", points: 0 },
          { letter: "B", text: "Indiferença — fazem se forem obrigados, sem engajamento real", points: 33 },
          { letter: "C", text: "Curiosidade — boa parte do time topa, mas há resistência de alguns", points: 66 },
          { letter: "D", text: "Iniciativa — o time busca e sugere melhorias por conta própria", points: 100 }
        ]
      },
      {
        id: "P14",
        text: "Como sua empresa lida com o tema de automação e IA internamente?",
        options: [
          { letter: "A", text: "Não tocamos no assunto — há desconforto ou medo visível", points: 0 },
          { letter: "B", text: "Comentamos às vezes, mas sem nenhuma ação ou capacitação estruturada", points: 33 },
          { letter: "C", text: "Já tivemos conversas formais e fizemos alguns testes pontuais", points: 66 },
          { letter: "D", text: "Temos uma cultura ativa de experimentação e capacitação contínua", points: 100 }
        ]
      }
    ]
  },
  {
    name: "Resultados & Mensuração",
    description: "Avalia se a empresa tem visibilidade operacional e plano concreto para evoluir com IA.",
    questions: [
      {
        id: "P17",
        text: "Você sabe hoje quanto tempo sua equipe gasta em tarefas repetitivas como cobranças, relatórios ou follow-up com clientes?",
        options: [
          { letter: "A", text: "Não temos essa visibilidade", points: 0 },
          { letter: "B", text: "Temos uma estimativa, mas sem nenhum dado concreto", points: 33 },
          { letter: "C", text: "Sabemos para algumas tarefas específicas", points: 66 },
          { letter: "D", text: "Temos o custo operacional mapeado por processo", points: 100 }
        ]
      },
      {
        id: "P19",
        text: "Qual é o plano da sua empresa para adotar IA ou automação nos próximos 12 meses?",
        options: [
          { letter: "A", text: "Não temos nenhum plano concreto", points: 0 },
          { letter: "B", text: "Queremos explorar, mas ainda não definimos nada", points: 33 },
          { letter: "C", text: "Já temos 1 ou 2 iniciativas mapeadas para implementar", points: 66 },
          { letter: "D", text: "Temos um roadmap estruturado com metas e prazos definidos", points: 100 }
        ]
      },
      {
        id: "P20",
        text: "Se você tivesse que dar uma nota para o quanto sua empresa está preparada para competir em um mercado onde os concorrentes usam IA, qual seria?",
        options: [
          { letter: "A", text: "1 a 3 — estamos muito atrás", points: 0 },
          { letter: "B", text: "4 a 5 — estamos começando a entender o problema", points: 33 },
          { letter: "C", text: "6 a 7 — temos iniciativas, mas ainda há muito a evoluir", points: 66 },
          { letter: "D", text: "8 a 10 — estamos à frente da maioria", points: 100 }
        ]
      }
    ]
  }
];

export const getQuestionByIndex = (index: number): { question: Question; dimension: Dimension; dimensionIndex: number } => {
  let count = 0;
  for (let d = 0; d < dimensions.length; d++) {
    const dim = dimensions[d];
    if (index >= count && index < count + dim.questions.length) {
      return {
        question: dim.questions[index - count],
        dimension: dim,
        dimensionIndex: d
      };
    }
    count += dim.questions.length;
  }
  throw new Error(`Question index ${index} out of bounds`);
};

export const allQuestions = dimensions.reduce<Question[]>((acc, dim) => [...acc, ...dim.questions], []);
