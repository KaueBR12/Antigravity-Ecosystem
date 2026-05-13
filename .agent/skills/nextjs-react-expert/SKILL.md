---
name: nextjs-react-expert
description: React 19 and Next.js 15 best practices 2025. Server components, React Compiler, Actions API.
---

# ⚛️ React 19 & Next.js 15 (Best Practices 2025)

> **Filosofia:** "Server-first architecture. Maximize a performance reduzindo JavaScript no cliente, otimizando o cache e usando streaming."

## 1. Arquitetura Server-First (Server Components)

*   **Server Components como Default:** Todos os componentes são Server Components por padrão. Eles rodam no servidor, buscam dados direto do banco/API e não enviam JS para o browser.
*   **Uso restrito do `"use client"`:** Utilize a diretiva *apenas* nos "leaf nodes" (nós folha da árvore) que exigem:
    *   Interatividade (`onClick`, `onChange`)
    *   Hooks de estado/ciclo de vida (`useState`, `useEffect`)
    *   APIs exclusivas do navegador (`window`, `localStorage`)
*   **Composição Server/Client:** Nunca importe um Server Component dentro de um Client Component diretamente. Ao invés disso, passe o Server Component como *`children` prop* para o Client Component.

## 2. Novo Ecossistema React 19

*   **React Compiler (Fim do memo manual):** O React Compiler memoiza automaticamente. Pare de usar `useMemo`, `useCallback` e `React.memo` para otimização prematura. Escreva o código focado em legibilidade.
*   **O Hook `use()`:** Utilize o `use(Promise)` para resolver promessas e contextos de forma síncrona visualmente, integrando-se nativamente com os limites de `<Suspense>`.
*   **Actions API (Data Mutations):** Utilize as `Server Actions` nativas do Next.js/React para formulários e mutações (ex: `action={createItem}`). Isso substitui antigas rotas de API apenas para salvar dados, oferecendo progressão aprimorada sem JS.

## 3. Data Fetching, Streaming e Cache (Next.js 15)

*   **Caching é Opt-in:** No Next.js 15, requisições `fetch` dinâmicas não são cacheadas por padrão. Use `{ cache: 'force-cache' }` ou funções de unstable_cache quando precisar guardar os dados.
*   **Memoização de fetch:** O React deduplica automaticamente requests com `fetch()`. Para funções normais de banco de dados (ex: via ORM), encapsule com a função `cache()` do React.
*   **Streaming e `<Suspense>`:** Utilize agressivamente `loading.tsx` e `<Suspense>` para renderizar o "shell" estático da página imediatamente, enquanto dados pesados entram depois por streaming (melhorando o TTFB e TTI).
*   **PPR (Partial Prerendering):** Projete a UI com "buracos" dinâmicos. O Next.js servirá o estático direto do CDN e preencherá os buracos dinamicamente numa única requisição HTTP.

## 4. Estrutura e Escalonamento (App Router)

*   **Domain-Driven Folders:** Para apps robustos (como PontoUau), use pastas por feature (ex: `features/time-entries/components`, `features/reports/api`) em vez de agrupar tudo por tipo (todos os components num canto, todas as apis no outro).
*   **Validação Forte:** Utilize **Zod** para validar inputs no client, no middleware (Actions) e na resposta da API. Zod + TypeScript garante tipagem end-to-end.

---
**Checklist React/Next.js 2025:**
- [ ] O componente precisava mesmo de `"use client"`?
- [ ] A mutação está usando Actions API ao invés de endpoints REST antigos?
- [ ] As telas pesadas estão envoltas em `<Suspense>` para streaming?
- [ ] Removi `useMemo` manuais focando no React Compiler?
