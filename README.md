# Hometiles

## Deploy api

```bash
npm run deploy -w ./apps/api
```

## Deploy site

```bash
# Build
VITE_API_BASE_URL=<api_url> npm run build
# Publish
npx wrangler pages publish apps/frontend/dist
```
