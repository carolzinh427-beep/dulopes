export const companyConfig = {
  nome: "Dulopes Máquinas e Equipamentos | Inox",
  nomeCurto: "Dulopes Máquinas",
  slogan: "Precisão e produtividade que chega em todo Brasil",
  descricao: "Máquinas e equipamentos profissionais para empresas. Atendimento em todo o Brasil a partir de Cariacica - ES.",
  email: "contato@dulopes.com",
  whatsapp: "+55 27 98898-1312",
  whatsappFormatted: "5527988981312",
  whatsappDisplay: "(27) 98898-1312",
  instagram: "@dulopesmaquinas",
  instagramUrl: "https://www.instagram.com/dulopesmaquinas/",
  endereco: "Rua Paraná, 262",
  bairro: "Boa Sorte",
  cidade: "Cariacica",
  estado: "ES",
  atendimento: "Brasil inteiro",
  horario: "Segunda a Sexta: 08:00 às 18:00"
};

export const categories = [
  { id: "todas", label: "Todas as Máquinas" },
  { id: "maquinas", label: "Máquinas" },
  { id: "inox", label: "Equipamentos em Inox" },
  { id: "industria", label: "Equipamentos para Indústria" },
  { id: "alimentos", label: "Equipamentos para Alimentos" },
  { id: "compactos", label: "Compactos" },
  { id: "outros", label: "Outros Equipamentos" }
];

export const products = [
  {
    id: "envasadora-dosadora-inox",
    nome: "Envasadora e Dosadora Pneumática em Inox",
    categoria: "maquinas",
    categoriasSecundarias: ["inox", "industria", "alimentos"],
    descricao: "Dosagem pneumática de precisão para líquidos e pastosos com estrutura inteiramente em Aço Inox AISI 304.",
    descricaoCompleta: "Equipamento pneumático desenvolvido para dosagem e envase de produtos líquidos, viscosos e pastosos com rigoroso controle de volume. Fabricada em estrutura robusta de Aço Inoxidável AISI 304, atende integralmente aos padrões sanitários industriais e de alimentos.",
    imagens: [
      "/images/envasadora_inox.jpg",
      "/images/hero_equipment.jpg"
    ],
    preco: null,
    precoPromocional: null,
    status: "Pronta Entrega",
    destaque: true,
    ordem: 1,
    especificacoes: {
      "Material": "Aço Inox AISI 304 Sanitário",
      "Acionamento": "Pneumático com pedal ou automático",
      "Faixa de Dosagem": "Configurável conforme necessidade",
      "Precisão": "± 0.5%",
      "Aplicação": "Alimentos, cosméticos, químicos e bebidas",
      "Tensão": "220V / 60Hz"
    }
  },
  {
    id: "seladora-continua-industrial-inox",
    nome: "Seladora Contínua Industrial em Inox",
    categoria: "maquinas",
    categoriasSecundarias: ["inox", "industria", "compactos"],
    descricao: "Selagem contínua automatizada para sacos e embalagens plásticas com controle digital de temperatura.",
    descricaoCompleta: "Seladora contínua de alta produtividade ideal para linhas de embalagem comercial e industrial. Possui esteira acoplada, controle térmico digital ajustável e velocidade regulável para selagem perfeita de diversos tipos de laminados.",
    imagens: [
      "/images/seladora_inox.jpg"
    ],
    preco: null,
    precoPromocional: null,
    status: "Pronta Entrega",
    destaque: true,
    ordem: 2,
    especificacoes: {
      "Estrutura": "Aço Inox com acabamento escovado",
      "Controle de Temp.": "Digital regulável até 300°C",
      "Esteira": "Integrada com ajuste de velocidade",
      "Tipo de Selagem": "Térmica contínua de alta resistência",
      "Velocidade": "0 - 12 metros/minuto",
      "Alimentação": "220V Single-phase"
    }
  },
  {
    id: "tanque-misturador-processo-inox",
    nome: "Tanque Misturador em Aço Inox Sanitário",
    categoria: "inox",
    categoriasSecundarias: ["industria", "alimentos"],
    descricao: "Tanque industrial para homogeneização, mistura e preparação com motorredutor e válvula de escoamento.",
    descricaoCompleta: "Tanque misturador vertical em aço inox de grau sanitário, projetado para processos de preparação, homogeneização e agitação de fluidos em indústrias alimentícias, cosméticas e químicas. Acabamento interno polido espelhado.",
    imagens: [
      "/images/tanque_misturador.jpg"
    ],
    preco: null,
    precoPromocional: null,
    status: "Sob Encomenda",
    destaque: true,
    ordem: 3,
    especificacoes: {
      "Material": "Aço Inox AISI 304 / 316L",
      "Agitação": "Hélice / Âncora com motorredutor industrial",
      "Escoamento": "Válvula sanitária Borboleta / Tri-Clamp",
      "Acabamento": "Polimento sanitário interno e escovado externo",
      "Capacidade": "Sob medida conforme demanda da operação",
      "Atendimento": "Suporte comercial direto para dimensionamento"
    }
  },
  {
    id: "esteira-transportadora-inox",
    nome: "Esteira Transportadora Industrial em Inox",
    categoria: "industria",
    categoriasSecundarias: ["inox", "maquinas"],
    descricao: "Sistema de transporte modular para integração de linhas de envase, selagem e empacotamento.",
    descricaoCompleta: "Esteira transportadora industrial desenvolvida para otimizar o fluxo operacional e movimentação contínua de produtos. Chassi em perfil inox de alta resistência, variador eletrônico de velocidade e guias de contenção reguláveis.",
    imagens: [
      "/images/esteira_inox.jpg"
    ],
    preco: null,
    precoPromocional: null,
    status: "Pronta Entrega",
    destaque: false,
    ordem: 4,
    especificacoes: {
      "Estrutura": "Aço Inox sanitário",
      "Velocidade": "Variável via inversor de frequência",
      "Corrente/Lona": "Módulos termoplásticos de grau alimentar",
      "Comprimento": "Módulos padrão e projetos customizados",
      "Painel": "Com botão de emergência e chave liga/desliga",
      "Garantia": "Qualidade fabril Dulopes"
    }
  },
  {
    id: "misturador-batedeira-alimentos-inox",
    nome: "Misturador e Batedeira Industrial de Alimentos Inox",
    categoria: "alimentos",
    categoriasSecundarias: ["inox", "compactos"],
    descricao: "Misturador reforçado para massas, molhos, recheios e misturas alimentícias industriais.",
    descricaoCompleta: "Equipamento robusto para produção alimentícia profissional. Tacho basculante em aço inox e batedor especial para garantir homogeneidade rápida em misturas pesadas e de média viscosidade.",
    imagens: [
      "/images/batedeira_misturador.jpg"
    ],
    preco: null,
    precoPromocional: null,
    status: "Pronta Entrega",
    destaque: true,
    ordem: 5,
    especificacoes: {
      "Tacho": "Aço Inox sanitário reforçado",
      "Capacidade": "Dimensionado para produção contínua",
      "Segurança": "Grade protetora com sensor de parada",
      "Motor": "Motor de alta performance e baixo ruído",
      "Uso": "Padarias, confeitarias, cozinhas industriais e fábricas de alimentos"
    }
  }
];

export const offers = [
  {
    id: "oferta-1",
    titulo: "Condições Especiais para Linha de Envase",
    subtitulo: "Envasadoras e Dosadoras Pneumáticas com atendimento imediato",
    destaqueBadge: "Oportunidade Comercial",
    equipamento: "Envasadora e Dosadora Pneumática em Inox",
    imagem: "/images/envasadora_inox.jpg",
    beneficios: [
      "Estrutura reforçada em Aço Inox AISI 304",
      "Pronta entrega com suporte comercial dedicado",
      "Envio garantido para todo o Brasil",
      "Atendimento direto com especialistas em máquinas"
    ],
    ctaText: "Consultar Condições no WhatsApp"
  },
  {
    id: "oferta-2",
    titulo: "Equipamentos em Inox para Produção Alimentícia",
    subtitulo: "Kits de Misturadores, Tanques e Seladoras em Aço Inox",
    destaqueBadge: "Produtividade Fabril",
    equipamento: "Soluções em Inox Dulopes",
    imagem: "/images/tanque_misturador.jpg",
    beneficios: [
      "Grau sanitário adequado para normas de higiene",
      "Projetados para alta durabilidade e fácil higienização",
      "Orçamento rápido e sem complicação",
      "Despacho a partir da sede em Cariacica - ES"
    ],
    ctaText: "Falar com Especialista"
  }
];

export const solutions = [
  {
    id: "solucao-producao",
    icon: "Factory",
    titulo: "Produção de Equipamentos",
    descricao: "Desenvolvimento e comercialização de máquinas e equipamentos projetados para encarar a rotina exigente da sua fábrica ou agroindústria."
  },
  {
    id: "solucao-inox",
    icon: "ShieldCheck",
    titulo: "Equipamentos em Inox",
    descricao: "Construção com foco em Aço Inox AISI 304, proporcionando resistência à corrosão, higiene sanitária impecável e facilidade de limpeza."
  },
  {
    id: "solucao-empresas",
    icon: "Cog",
    titulo: "Soluções para Empresas",
    descricao: "Atendemos desde pequenas e médias empresas até grandes unidades industriais que buscam padronizar seus processos produtivos."
  },
  {
    id: "solucao-produtividade",
    icon: "Sparkles",
    titulo: "Foco em Produtividade",
    descricao: "Máquinas criadas para acelerar o tempo de embalagem, mistura e dosagem, reduzindo perdas e aumentando a margem operacional."
  },
  {
    id: "solucao-suporte",
    icon: "Truck",
    titulo: "Atendimento & Envio Nacional",
    descricao: "Orientação especializada para escolha do equipamento correto e logística estruturada para entrega em qualquer estado do Brasil."
  }
];

export const whyUsBenefits = [
  {
    titulo: "Precisão Operacional",
    descricao: "Dosagens e selagens com repetição exata para manter o padrão de qualidade do seu produto final."
  },
  {
    titulo: "Produtividade Elevada",
    descricao: "Substitua processos manuais por equipamentos de alta eficiência e acelere sua capacidade de entrega."
  },
  {
    titulo: "Qualidade Industrial",
    descricao: "Construção robusta em Aço Inox para máxima durabilidade, atendendo às normas de uso sanitário e fabril."
  },
  {
    titulo: "Equipamentos Profissionais",
    descricao: "Linha selecionada para atender às demandas reais das empresas com alto desempenho."
  },
  {
    titulo: "Atendimento Especializado",
    descricao: "Equipe preparada para entender sua necessidade real e indicar a máquina ideal para sua aplicação."
  },
  {
    titulo: "Atendimento em todo Brasil",
    descricao: "Operação sólida com envio estruturado para atender empresas em todas as regiões brasileiras."
  }
];

export const faqItems = [
  {
    pergunta: "Vocês atendem todo o Brasil?",
    resposta: "Sim! Nossa sede está localizada em Cariacica - ES e atendemos e enviamos equipamentos para empresas situadas em todos os estados do Brasil."
  },
  {
    pergunta: "Como faço para solicitar orçamento?",
    resposta: "É simples e rápido. Você pode clicar nos botões de WhatsApp do site para conversar diretamente com nossa equipe comercial, tirar dúvidas e solicitar o orçamento do equipamento desejado."
  },
  {
    pergunta: "Os equipamentos possuem especificações técnicas?",
    resposta: "Sim. Cada equipamento possui ficha com informações sobre materiais, acionamento, tensão e aplicações. Entre em contato com nossa equipe pelo WhatsApp para consultar a ficha detalhada."
  },
  {
    pergunta: "Posso tirar dúvidas antes de comprar?",
    resposta: "Com certeza. Nossa equipe especializada está disponível no WhatsApp para entender seu processo produtivo e indicar a máquina ideal para sua demanda."
  },
  {
    pergunta: "Vocês trabalham com equipamentos em inox?",
    resposta: "Sim, o Aço Inoxidável (principalmente Inox AISI 304 sanitário) é um dos pilares da nossa linha, garantindo durabilidade, higiene e adequação às exigências da indústria."
  },
  {
    pergunta: "Como funciona a entrega?",
    resposta: "Entre em contato com nossa equipe pelo WhatsApp para consultar as condições de envio, frete e prazos disponíveis para o equipamento e região desejada."
  },
  {
    pergunta: "Como entrar em contato com a equipe?",
    resposta: "Você pode nos chamar via WhatsApp pelo número (27) 98898-1312, pelo e-mail contato@dulopes.com, acompanhar nossas redes sociais no Instagram @dulopesmaquinas ou visitar nossa sede em Cariacica - ES."
  }
];

export const instagramPosts = [
  {
    id: 1,
    image: "/images/hero_equipment.jpg",
    caption: "Máquinas e Equipamentos Profissionais em Aço Inox com entrega para todo o Brasil. ⚙️📦 #dulopesmaquinas #inox #industria",
    link: "https://www.instagram.com/dulopesmaquinas/"
  },
  {
    id: 2,
    image: "/images/envasadora_inox.jpg",
    caption: "Envasadora Pneumática em Aço Inox AISI 304. Precisão absoluta para sua linha de produção. 🧪✨",
    link: "https://www.instagram.com/dulopesmaquinas/"
  },
  {
    id: 3,
    image: "/images/seladora_inox.jpg",
    caption: "Seladora Contínua Industrial: agilidade e fechamento perfeito para embalagens comerciais. 🚀",
    link: "https://www.instagram.com/dulopesmaquinas/"
  },
  {
    id: 4,
    image: "/images/tanque_misturador.jpg",
    caption: "Tanque Misturador Sanitário Inox sob medida para processos industriais e de alimentos. 🏭⚡",
    link: "https://www.instagram.com/dulopesmaquinas/"
  }
];
