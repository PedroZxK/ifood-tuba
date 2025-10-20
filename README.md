# Mora & Meal 🍜

![Mora & Meal Logo](https://github.com/PedroZxK/ifood-tuba/blob/main/mora-and-meal/public/logo.png)

Bem-vindo ao **Mora & Meal**, uma aplicação web moderna de delivery de comida, inspirada em plataformas como o iFood. O projeto foi desenvolvido com React e Firebase, oferecendo uma experiência de utilizador completa, desde o registo e autenticação até à finalização de um pedido.

## ✨ Funcionalidades Principais

* **Autenticação de Utilizadores:** Sistema completo de registo, login, verificação de e-mail e recuperação de senha.
* **Gestão de Perfil:** Os utilizadores podem visualizar e atualizar as suas informações, incluindo nome, e-mail, senha e foto de perfil com upload de imagens.
* **Cardápio Interativo:** Navegação por um cardápio com pratos, com funcionalidades de pesquisa e filtros dinâmicos.
* **Carrinho de Compras:** Adicione, remova e ajuste a quantidade de itens no carrinho de forma intuitiva.
* **Rotas Protegidas:** Acesso restrito a páginas como perfil, carrinho e pedidos apenas para utilizadores autenticados.
* **Design Responsivo:** Interface adaptável a diferentes tamanhos de ecrã, com um menu "hambúrguer" para uma experiência mobile fluida.
* **Feedback ao Utilizador:** Indicadores visuais, como a contagem de itens no carrinho e caixas de diálogo de confirmação para ações importantes (ex: logout).

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com um conjunto de tecnologias modernas, focadas em performance e escalabilidade:

* **Frontend:** **React 19**
* **Build Tool:** **Vite**
* **Roteamento:** **React Router DOM v7**
* **Backend as a Service (BaaS):**
    * **Firebase Authentication:** Para gestão de utilizadores (Email/Senha).
    * **Firebase Cloud Firestore:** Como banco de dados NoSQL em tempo real para perfis de utilizadores.
* **Hospedagem de Mídia:** **Cloudinary** para armazenamento e gestão de avatares de perfil.
* **Gestão de Estado:** **React Context API** (`AuthContext`, `CartContext`).
* **Estilização:** **CSS Modules** para estilos componentizados e sem conflitos.

## 🚀 Como Começar

Siga os passos abaixo para configurar e executar o projeto no seu ambiente local.

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)
* Uma conta no [Firebase](https://firebase.google.com/)
* Uma conta no [Cloudinary](https://cloudinary.com/)

### Instalação e Configuração

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/pedrozxk/ifood-tuba.git](https://github.com/pedrozxk/ifood-tuba.git)
    cd ifood-tuba/mora-and-meal
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um ficheiro `.env` na raiz do projeto (`mora-and-meal`) e adicione as suas credenciais do Firebase. Pode encontrar estas credenciais nas configurações do seu projeto Firebase.

    ```env
    VITE_FIREBASE_API_KEY="SUA_API_KEY"
    VITE_FIREBASE_AUTH_DOMAIN="SEU_AUTH_DOMAIN"
    VITE_FIREBASE_PROJECT_ID="SEU_PROJECT_ID"
    VITE_FIREBASE_STORAGE_BUCKET="SEU_STORAGE_BUCKET"
    VITE_FIREBASE_MESSAGING_SENDER_ID="SEU_SENDER_ID"
    VITE_FIREBASE_APP_ID="SEU_APP_ID"
    ```

4.  **Configure o Cloudinary:**
    No ficheiro `src/pages/ProfilePage/ProfilePage.jsx`, localize a função `uploadToCloudinary` e substitua os valores de exemplo pelo seu **Cloud Name** e **Upload Preset**.

    * **Nota:** O seu Upload Preset no Cloudinary deve ser configurado como **"Unsigned"**.

5.  **Execute o projeto:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173`.

## 📁 Arquitetura do Projeto

A estrutura de pastas foi organizada para promover a separação de responsabilidades e facilitar a manutenção:
