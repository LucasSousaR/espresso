Teste Técnico para Desenvolvedores Ruby on Rails
Introdução
Bem-vindo ao teste técnico para a posição de desenvolvedor Ruby on Rails no Espresso. Este teste foi elaborado para avaliar suas habilidades de programação, conhecimento do framework Ruby on Rails e sua capacidade de resolver problemas.

Instruções Gerais
Faça um fork desse repositório e desenvolva sua solução a partir dessa base. Certifique-se de incluir testes automatizados e cobertura total para sua aplicação.

Você irá criar uma aplicação web para gerenciamento de despesas de cartões corporativos integrados a um BaaS (Banking as a Service), onde os funcionários poderão comprovar e classificar suas despesas.

Requisitos Funcionais
Registros

1.1. O usuário de perfil administrador deve ser capaz de:

Criar uma nova conta, informando os seus dados pessoais e os dados da empresa;
Cadastrar os funcionários dessa empresa;
Cadastrar os cartões corporativos, e associá-los aos usuários;
Cadastrar as categorias para classificação das despesas;
1.2. O usuário de perfil funcionário deve ser capaz de:

Anexar um comprovante em despesas do seu cartão (.jpeg, .png ou .pdf);
Associar uma categoria em despesas do seu cartão;
Autenticação e Autorização

2.1. O usuário de perfil administrador deve ser capaz de:

Acessar o sistema com seu email e senha;
Visualizar todas as despesas de cartões dos seus funcionários;
Visualizar de forma segmentada as despesas com e sem prestação de contas (comprovação e classificação);
Arquivar despesas que não necessitam de prestação de contas;
2.2. O usuário de perfil funcionário deve ser capaz de:

Acessar o sistema com o seu email, e senha (temporária) recebida em sua caixa de entrada;
Visualizar todas as despesas do seu cartão;
Editar a comprovação e classificação das despesas;
Gerenciamento de Despesas

As despesas devem ser listadas pela ordem das mais recentes primeiro. Deve haver uma segmentação das despesas com prestação de contas concluídas e das despesas que ainda estão pendentes de comprovação e classificação. Nenhuma despesa de cartão poderá ser excluída, porém o administrador terá a possibilidade de arquivar alguma despesa que não necessite de prestação de contas.

A criação das despesas se dará por meio de um webhook integrado ao BaaS. A aplicação deve receber a notificação de uma nova compra no cartão no seguinte formato:

// POST /api/baas/webhooks
{
"merchant": "Uber *UBER *TRIP",
"cost": 1790,
"created_at": "2024-07-04 12:15:52 -03:00",
"last4": "1234",
"transaction_id": "3e85a730-bb1f-451b-9a39-47c55aa054db"
}
Observações:

O valor da transação de compra no cartão é recebida como um inteiro. O valor em Reais (R$) é obtido após divisão por 100.
A data e hora da compra no cartão é recebida em UTC. Deve-se ter um cuidado ao apresentar a data e hora de forma correta no timezone da aplicação.
Framework e Ferramentas

Utilize Ruby on Rails (versão 5.2) e MySQL 8.x como banco de dados. Utilize o ReactJS juntamente com MUI (https://mui.com/) como meio principal de desenvolvimento do frontend. RSpec e Jest devem ser as ferramentas utilizadas para o desenvolvimento de testes automatizados.

Boas Práticas de Código

Siga as melhores práticas de Ruby on Rails para estruturação e organização do código. Garanta que o código seja limpo, e fácil de entender. Procure seguir os princípios SOLID. Mantenha uma organização dos commits bem descritiva de forma que conte uma história da evolução da aplicação.

Testes

Implemente testes para o backend e frontend. Mantenha a cobertura de testes em 100% da aplicação. Procure desenvolver testes que abranjam bem os cenários possíveis de cada funcionalidade, com uma boa qualidade.

Diagrama ER

Para apoiar no entendimento da estrutura proposta para aplicação, segue o diagrama de Entidade-Relacionamento. Esse diagrama deve ser apenas um guia e não um requisito de desenvolvimento.

---
title: Diagrama Entidade-Relacionamento
---
erDiagram
Company ||--|{ User : "company has_many users"
Company ||--o{ Card : "company has_many cards"
Company ||--o{ Category : "company has_many categories"
User ||--o| Card : "user has_one card"
Card ||--o{ Statement : "card has_many statements"
Statement ||--o| Attachment : "statement has_one attachments"
Statement }o--o| Category : "statement belongs_to category"
Company {
string name
string cnpj
datetime created_at
datetime updated_at
}
User {
string name
string email
string password
int role
reference Company
datetime created_at
datetime updated_at
}
Card {
string last4
reference User
datetime created_at
datetime updated_at
}
Category {
string name
reference Company
datetime created_at
datetime updated_at
}
Statement {
datetime performed_at
int cost
string merchant
int transaction_id
reference Category
datetime created_at
datetime updated_at
}
Attachment {
attachment file
reference Statement
datetime created_at
datetime updated_at
}
Avaliação
Seu teste será avaliado com base nos seguintes critérios:

Funcionalidade: O quanto das funcionalidades requeridas foram implementadas e se funcionam corretamente.
Qualidade do Código: Clareza, organização e aderência às melhores práticas.
Testes: Cobertura e qualidade dos testes automatizados.
Usabilidade: Experiência do usuário na interface web.
Integração de Tecnologias: Uso eficaz de ReactJS.
Bônus:

Segurança: Implementação de mecanismos de segurança;
Disponibilidade: Realizar o deploy da aplicação em algum PaaS (ex.: Heroku);
Entrega
Ao concluir o desenvolvimento, envie o link do seu repositório para o email walter@espressoapp.com.br. O prazo de entrega estimado para esse teste é de 5 dias corridos, a partir da confirmação do recebimento. Porém, o candidato pode negociar o prazo de entrega para mais ou menos dias, aproveite esse recurso.

Boa sorte! Se tiver qualquer dúvida durante o desenvolvimento, não hesite em nos contatar.