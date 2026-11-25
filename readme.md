# 📱 Controle de Acesso & Geolocalização — App Mobile

Aplicativo mobile desenvolvido em **React Native com Expo e TypeScript**, focado em controle de acesso local (CRUD de usuários com persistência no dispositivo) e visualização interativa de pontos de interesse em mapa via GPS.

O projeto foi estruturado seguindo princípios de **Clean Code**, **SOLID**, validação de contratos com **Zod**, testes automatizados com **Jest** e análise de qualidade de testes (mutação) com **StrykerJS**, mantendo uma arquitetura enxuta e pragmática sem *overengineering*.

---

## ✨ Funcionalidades

* **Autenticação Local:** Tela de acesso com criação automática de usuário padrão inicial (`admin` / `1234`) caso o armazenamento esteja vazio.
* **Gerenciamento de Usuários (CRUD):** Listagem, cadastro, edição e exclusão de usuários persistidos localmente via `AsyncStorage`, com validação de formulário e confirmação de senha.
* **Mapa e Marcações (Geolocalização):** Integração com `react-native-maps` e `expo-location` exibindo 3 pontos marcados com identificação visual:
  1. **1 - Faculdade Impacta** (Pin Azul — Barra Funda)
  2. **2 - Bootcamp MBA** (Pin Vermelho — Av. Paulista)
  3. **3 - Lojão do Macarrão** (Pin Vermelho — Ponto de referência dinâmico)
* **Interatividade no Mapa:** Possibilidade de tocar em qualquer ponto do mapa para reposicionar a marcação 3 ou utilizar o GPS do dispositivo para atualizar a posição da marcação 1.

---

## 📸 Evidência de Execução (Dispositivo Físico)

Os testes funcionais e de interface foram executados diretamente em **dispositivo físico (Android) via Expo Go**, garantindo maior agilidade e desempenho em comparação ao emulador no computador, que apresentava lentidão elevada durante a compilação e renderização.

> **Nota para o repositório:** Salve o print de execução dentro da pasta `docs/` com o nome `evidencia-mapa.jpeg` para que a imagem abaixo seja renderizada automaticamente no GitHub.

<p align="center">
  <img src="./docs/evidencia-mapa.jpeg" alt="Evidência da tela de Mapa e Marcações no celular" width="320" />
</p>

---

## 🏗️ Arquitetura do Projeto

```text
controle-acesso-app/
├── docs/
│   └── evidencia-mapa.jpeg                 # Evidência de execução no dispositivo físico
├── src/
│   ├── domain/
│   │   ├── User.ts                         # Entidade e interface do repositório (SOLID - DIP)
│   │   ├── userSchema.ts                   # Schemas e contratos de validação com Zod
│   │   └── UserService.ts                  # Regras de negócio puras (Login e CRUD)
│   ├── infra/
│   │   └── AsyncStorageUserRepository.ts   # Implementação de persistência local
│   ├── components/
│   │   ├── CustomInput.tsx                 # Campo de entrada estilizado (Dark Theme)
│   │   └── PrimaryButton.tsx               # Botão de ação principal com ícone
│   ├── screens/
│   │   ├── LoginScreen.tsx                 # Tela 1: Acesso
│   │   ├── UserListScreen.tsx              # Tela 2: Listagem de Usuários e navegação
│   │   ├── UserFormScreen.tsx              # Tela 3: Cadastro / Edição / Exclusão
│   │   └── MapScreen.tsx                   # Tela 4: Mapa com marcações e GPS
│   └── navigation/
│       └── AppNavigator.tsx                # Configuração de rotas (Native Stack)
├── __tests__/
│   ├── UserService.spec.ts                 # Testes unitários isolados das regras de negócio
│   └── AsyncStorageUserRepository.spec.ts  # Testes de integração com AsyncStorage
├── App.tsx                                 # Ponto de entrada da aplicação
├── app.json                                # Configurações do Expo e permissões de GPS
├── jest.config.js                          # Configuração do Jest
└── stryker.config.mjs                      # Configuração dos testes de mutação (StrykerJS)
```

---

## 🚀 Como Executar o Projeto

### 1. Instalar dependências
```bash
npm install --legacy-peer-deps
```

### 2. Iniciar o servidor Expo (Execução recomendada no celular)
```bash
npx expo start
```
1. Instale o aplicativo **Expo Go** no seu smartphone (Android ou iOS).
2. Conecte o celular na mesma rede Wi-Fi do computador.
3. Escaneie o QR Code exibido no terminal.
4. Utilize as credenciais padrão para o primeiro acesso:
   * **Login:** `admin`
   * **Senha:** `1234`

---

## 🧪 Qualidade de Software e Testes

### Testes Unitários e de Integração (Jest)
Valida as regras de negócio de autenticação, prevenção de logins duplicados, conferência de senhas e persistência no `AsyncStorage`:
```bash
npx jest
```

### Testes de Mutação (StrykerJS)
Avalia a eficácia da suíte de testes sobre o domínio da aplicação (`src/domain/`):
```bash
npx stryker run
```

---

## 🛠️ Tecnologias Utilizadas

* **React Native & Expo** (TypeScript)
* **React Navigation** (Native Stack)
* **AsyncStorage** (Persistência local)
* **React Native Maps & Expo Location** (Mapas e GPS)
* **Zod** (Validação de dados e schemas)
* **Jest & StrykerJS** (Testes unitários, integração e mutação)