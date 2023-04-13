## nx workspace

Nx is a smart, fast and extensible build system with first class monorepo support and powerful integrations.

> Website: https://nx.dev/
>
> Official Docs: https://nx.dev/getting-started/intro

## Applications and libraries (apps/ and libs/)

- A typical Nx workspace is structured into "apps" and "libs".
- This distinction allows us to have a more modular architecture by following a separation of concerns methodology

How do we utilize this architecture and organize our code?

1. place `80%` of your logic into the `libs/` folder
2. and `20%` into `apps/`

Here `apps/` folder acts as a **main driver** and `libs/` contains most of the business logic and consumed by `apps/` in an abstract manner like consuming APIs.

**Links**

- [Angular monorepo](https://nx.dev/angular-tutorial/1-code-generation)
- [Angular MFE with dynamic module federation](https://nx.dev/recipes/module-federation/dynamic-module-federation-with-angular)
