<h1>REPOSITÓRIO CENTRAL</h1>
<p>
  O Repositório Central do Sistema de Registro e Análise Integrada, ou apenas SiRAI, é um ambiente estruturado para conter todas as camadas da aplicação, reúnindo todas as informações pertinentes do sistema.
</p>
<h2>Objetivo do SiRAI</h2>
<p>
  O sistema visa estruturar e consolidar meios para que pesquisadores armazenem e visualizem dados do monitoramento de animais domésticos e selvagens. Um dos focos é análisar a movimentação de animais cadastrados via gps e observar sua relação com doenças contraídas e organizar dados veterinários feitos em visitas com proficionais da área.
</p>
<p>
  Além disso, o sistema gerencia dados de animais envolvidos em atropelamentos e registra informações detalhadas da necrópsia realizada, bem como as amostras coletadas e análises feitas sobro estas amostras.
</p>
<p>
  Por fim, outro objetivo é implementar ferramentas de dashboard e análise integrada.
</p>
<h2>Desenvolvimento do SiRAI</h2>
<p>
  O SiRAI é um projeto web fullstack e utiliza as seguintes tecnologias:
  <ul>
    <li><a href='https://www.typescriptlang.org/'>Typescript</a></li>
    <li><a href='https://react.dev/'>React</a></li>
    <li><a href='https://tailwindcss.com/'>Tailwindcss</a></li>
    <li><a href='https://axios-http.com/ptbr/'>Axios</a></li>
    <li><a href='https://zod.dev/'>Zod</a></li>
    <li><a href='https://www.prisma.io/'>Prisma</a></li>
    <li><a href='https://expressjs.com/'>Express</a></li>
    <li><a href='https://www.mysql.com/'>MySQL</a></li>
  </ul>
</p>

<h2>Copiando o SiRAI</h2>
<p>
  A estrutura do sistema pode ser utilizada, mas é necessário configurar o ambiente de desenvolimento para que o site funcione corretamente.
</p>
<h3>.env</h3>
<p>
  Você vai precisar de um .env para o repositório funcionar localmente. Crie <strong>.env's</strong> tanto na pasta de <strong>front-end</strong> quanto na de <strong>back-end</strong> e siga os exemplos:
</p>
<h5>Front-end</h5>
<pre>
VITE_API_URL=http://localhost:3333
</pre>
<h5>Back-end</h5>
<pre>
DATABASE_URL="mysql://[user]:[senha]@localhost:3306/[banco_de_dados]?schema=public"
DATABASE_USER="[user]"
DATABASE_PASSWORD="[senha]"
DATABASE_NAME="[banco_de_dados]"
DATABASE_HOST="localhost"
DATABASE_PORT=3306
<br/>
PORT=3333
JWT_SECRET="[string_aleatória]"
<br/>
MAILTRAP_API_KEY="xxxxx"
MAILTRAP_USE_SANDBOX='true'
MAILTRAP_INBOX_ID=xxxxx
</pre>

<h3>Instalação</h3>
<h5>1. Instalar Dependências</h5>
<p>Na pasta raiz do projeto, execute:</p>
<pre>
npm i
</pre>
<p>O projeto utiliza <strong>npm workspaces</strong>, então esse único comando instala as dependências do front-end, back-end e shared-types.</p>

<h5>2. Banco de Dados</h5>
<p>Crie um banco de dados MySQL/MariaDB e importe os dados básicos utilizando o arquivo <a href='https://github.com/nicolasfouv/sistema-resgistro-analise-integrada/blob/main/tables-and-data.sql'>tables-and-data.sql</a>.</p>

<h5>3. Gerar o Prisma Client</h5>
<p>Na pasta de <strong>back-end</strong>, execute:</p>
<pre>
cd srf-backend
npx prisma generate
cd ..
</pre>

<h5>4. Rodar o Projeto</h5>
<pre>
npm run dev
</pre>
<p>
  Desta forma, o sistema estará pronto para ser utilizado localmente.
</p>
<h3>Utilizando o Sistema</h3>
<p>
  Há usuários pré-cadastrados para que você possa experimentar diferentes visões do sistema rapidamente:
  <ul>
    <li>
      Visão como um administrador do sistema:<br/>
        E-mail: admin@exemplo.com<br/>
        Senha: 123123
    </li>
    <li>
      Visão como um usuário comum do sistema:<br/>
        E-mail: comum@exemplo.com<br/>
        Senha: 123123
    </li>
  </ul>
</p>


<footer>
  <hr>
  <p align="center">
    <em>Sistema desenvolvido para apoio à pesquisa do LEIMa.</em>
  </p>
</footer>
