export const BARBERIA = {
  id: "barbearia-01",
  name: "Ferro & Navalha",
  tagline: "Barbearia tradicional com técnica de precisão",
  description:
    "A Ferro & Navalha é uma barbearia que resgata o cuidado clássico com o visual masculino, unindo técnica de precisão a um atendimento acolhedor. Cortes, barba e bigode executados com navalha, tesoura e máquina, em um ambiente pensado para o homem que valoriza estilo e tradição.",
  address: "São Paulo, SP",
  neighborhood: "Centro — perto de você",
  phone: null, // Configurável: número de WhatsApp autorizado pelo cliente
  whatsappLink: null, // Configurável: https://wa.me/55XXXXXXXXXX
  email: "contato@ferronavalha.com.br",
  instagram: "@ferronavalha",
  hours: [
    { day: "Segunda", time: "Fechado" },
    { day: "Terça", time: "10h às 19h" },
    { day: "Quarta", time: "10h às 19h" },
    { day: "Quinta", time: "10h às 20h" },
    { day: "Sexta", time: "10h às 20h" },
    { day: "Sábado", time: "9h às 18h" },
    { day: "Domingo", time: "Fechado" },
  ],
  services: [
    {
      name: "Corte Masculino",
      description: "Corte clássico ou moderno, com máquina e tesoura.",
      price: "R$ 45,00",
      duration: "30 min",
    },
    {
      name: "Barba Navalha",
      description: "Barba completa com navalha, toalha quente e pós-barba.",
      price: "R$ 55,00",
      duration: "40 min",
    },
    {
      name: "Corte + Barba",
      description: "Combo completo de corte masculino e barba navalha.",
      price: "R$ 90,00",
      duration: "60 min",
    },
    {
      name: "Bigode",
      description: "Aparagem e modelagem de bigode com navalha.",
      price: "R$ 25,00",
      duration: "15 min",
    },
    {
      name: "Sobrancelha Masculina",
      description: "Revisão de sobrancelha para acabamento limpo.",
      price: "R$ 20,00",
      duration: "10 min",
    },
  ],
  demoNotice:
    "Esta é uma página de demonstração criada pela Code Maestro Tech. Os preços, contatos e endereços são fictícios e meramente ilustrativos.",
};
