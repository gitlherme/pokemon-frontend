# Pokemon Abilities Frontend
This is a project created to display the pokémon abilities ordered by name alphabetically.

You can see this project running LIVE [here]('https://pokemonabilities.vercel.app/').

!['Pokemon ability'](https://i.imgur.com/zXK4qii.png)
---

## Tech Stack
- React 18
- Next 14
- Tailwind CSS
- Shadcn UI
- React Query
- Docker
- Zod
- React Hook Form
- Jest
- Testing Library
- PNPM

---

## How to run

First of all, please clone this repo on your local machine.
```bash
git clone https://github.com/gitlherme/pokemon-frontend.git
```

Install the dependencies
```bash
pnpm install 
```

### Development environment
To see the development mode, use
```bash
pnpm dev
```

The project will be started on your [http://localhost:8080](http://localhost:8080)

---

### Production environment

To see the production mode, use
```bash
pnpm build
```
and after build, run the following command to start the production mode.
```bash
pnpm start
```

---

## How to test
To see results of unit tests use
```bash
pnpm run test
```
or if you want also see the coverage, run
```bash
pnpm run test:coverage
```