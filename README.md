# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/844cb71a-0bde-4693-b715-1d05b2f0148b

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/844cb71a-0bde-4693-b715-1d05b2f0148b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/844cb71a-0bde-4693-b715-1d05b2f0148b) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)


## Deploy no Servidor (Manual)

Este projeto foi configurado para ser deployado manualmente em um servidor Ubuntu com Nginx. O backend da aplicação já está rodando na porta `5000` do servidor.

### Pré-requisitos no Servidor:
- Nginx instalado e configurado.
- Acesso SSH com credenciais de root ou usuário com permissões sudo.

### Passos para o Deploy Inicial:

1.  **Acessar o Servidor via SSH:**
    ```bash
    ssh root@200.98.64.133
    ```
    (Use a senha fornecida: `Bc180a?8`)

2.  **Criar o diretório para o frontend (se não existir):**
    ```bash
    mkdir -p /var/www/html
    ```

3.  **Configurar o Nginx para servir o frontend e proxy para o backend:**
    Edite o arquivo de configuração padrão do Nginx (geralmente `/etc/nginx/sites-available/default`):
    ```bash
    nano /etc/nginx/sites-available/default
    ```
    Substitua o conteúdo existente pelo seguinte:
    ```nginx
    server {
        listen 80 default_server;
        listen [::]:80 default_server;
        
        root /var/www/html;
        index index.html index.htm index.nginx-debian.html;
        
        server_name _;
        
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        location /api/ {
            proxy_pass http://localhost:5000/api/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
    ```
    Salve e saia do editor (Ctrl+X, Y, Enter).

4.  **Testar a configuração do Nginx e reiniciar o serviço:**
    ```bash
    nginx -t
    systemctl restart nginx
    systemctl status nginx
    ```

5.  **No seu ambiente local, prepare o frontend:**
    Certifique-se de que a variável de ambiente `VITE_API_URL` no arquivo `.env` do seu projeto local esteja apontando para o IP do servidor:
    ```
    VITE_API_URL=http://200.98.64.133:5000/api
    ```
    Instale as dependências e faça o build do projeto:
    ```bash
    npm install
    npm run build
    ```

6.  **Enviar os arquivos buildados para o servidor:**
    A partir do diretório raiz do seu projeto local, use `scp` para copiar os arquivos da pasta `dist` para o servidor:
    ```bash
    scp -r dist/* root@200.98.64.133:/var/www/html/
    ```
    (Será solicitada a senha do root: `Bc180a?8`)

### Sincronização de Atualizações do Git com o Servidor:

Para atualizar o frontend no servidor após novas alterações no repositório Git, siga estes passos:

1.  **No seu ambiente local, puxe as últimas alterações do Git:**
    ```bash
    git pull origin main
    ```
    (Ou a branch que você estiver utilizando)

2.  **Instale novas dependências (se houver) e faça o build do projeto novamente:**
    ```bash
    npm install
    npm run build
    ```

3.  **Envie os arquivos buildados atualizados para o servidor:**
    ```bash
    scp -r dist/* root@200.98.64.133:/var/www/html/
    ```
    (Será solicitada a senha do root: `Bc180a?8`)

Isso garantirá que a versão mais recente do seu frontend esteja sempre disponível no servidor.

