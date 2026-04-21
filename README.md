# Dev Mathias Portfolio

## Configuracao do EmailJS

Para o formulario de contato funcionar, crie o arquivo `.env` na raiz do projeto com as variaveis abaixo (pode copiar de `.env.example`):

```bash
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

Depois reinicie o servidor (`npm run dev`).

Se aparecer erro `412 (Precondition Failed)`, confira no painel do EmailJS:

1. Se os IDs e a chave publica estao corretos.
2. Se o template usado esta ativo.
3. Se o dominio/origem atual (ex.: localhost) esta permitido nas configuracoes de seguranca da conta.
