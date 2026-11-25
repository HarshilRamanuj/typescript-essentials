# POC: "ShopLite" Product Catalog

Learning goal: go from **static UI developer** to **full frontend developer**.
First you build the screens (the part you already know). Then you add the logic yourself, the same way a React developer does after you hand over a design.

> **How to use this file**
> - Work top to bottom. Change `[ ]` to `[x]` when a step is done.
> - Each step has **Hints**, not answers. Try it yourself first.
> - When you're stuck, ask Claude: *"I'm on step 4.2, here's my code, here's the error"*. You'll get a nudge, not the full solution (unless you ask for it).
> - Update the **Progress tracker** below after each phase.

---

## 1. The big picture: what happens after a UI handover

When you hand a static page to a React developer, this is roughly what they do:

| # | What they do | In plain words | Phase in this plan |
|---|---|---|---|
| 1 | Study the design | "What does this screen show? What can the user click?" | Phase 1 |
| 2 | List the **states** | Every screen has 4 moods: **loading, error, empty, data**. Designers often only draw "data". | Phase 1 |
| 3 | Read the API docs | "Where does the data come from? What does the JSON look like?" | Phase 2 |
| 4 | Write **types** | Describe the JSON shape in TypeScript so the editor catches mistakes | Phase 2 |
| 5 | Build an **API layer** | One place that talks to the server. Components never call `fetch` directly | Phase 3 |
| 6 | Load data into the UI | `useState` + `useEffect` (or a custom hook) → pass data to your components through props | Phase 4 |
| 7 | Add interactions | Search, sort, filter, pagination | Phase 5 |
| 8 | Add routing | Click a card → go to `/products/5` | Phase 6 |
| 9 | Forms | Controlled inputs, validation, submit to the API | Phase 7 |
| 10 | Shared state | Data that many components need (theme, user, cart) | Phase 8 |
| 11 | Polish and check | Edge cases, lint, build, clean up, open a PR | Phase 9 |

**Simple mental model:**
Your static component is like a **mannequin**. It has the shape but no clothes.
Logic means **dressing it with real data**: the data comes from the API, goes into state, and reaches the component through props.

```
API (server)  →  service function  →  hook / state  →  page  →  component (your UI)
   JSON           fetch + types       loading/error    decides    just shows props
```

**Golden rule:** UI components (`ProductCard`, `Button`, `SearchBar`) **only receive props and show them**. They do not fetch anything. Pages and hooks do the "thinking". This is how you keep design and logic separate, just like your current handover workflow.

---

## 2. The POC we're building

**ShopLite**: a small product catalog that uses the free **DummyJSON** API (no login or key needed).
Your `Products` type in `src/types/product.ts` already matches this API, so we keep going with it.

**Screens**

1. **Product list** `/products`: grid of cards, search bar, sort dropdown, category filter, pagination
2. **Product detail** `/products/:id`: big image, details, price with discount, stock badge
3. **Add product** `/products/new`: form with validation that submits to the API
4. **Theme toggle**: light/dark across the whole app (shared state)

**API endpoints you'll use**

| Purpose | Method + URL |
|---|---|
| List products (with pages) | `GET https://dummyjson.com/products?limit=12&skip=0` |
| Sort | `GET https://dummyjson.com/products?sortBy=price&order=asc` |
| Search | `GET https://dummyjson.com/products/search?q=phone` |
| Categories list | `GET https://dummyjson.com/products/category-list` |
| By category | `GET https://dummyjson.com/products/category/smartphones` |
| Single product | `GET https://dummyjson.com/products/1` |
| Add product (fake save) | `POST https://dummyjson.com/products/add` |

> Note: DummyJSON **pretends** to save a new product. It returns the new item, but the item won't appear in the list later. That's fine for a POC, and real APIs behave like this in testing environments too.

---

## 3. Progress tracker

| Phase | Topic | Status |
|---|---|---|
| 0 | Clean the workbench | ⬜ Not started ← **you are here** |
| 1 | Static UI (your zone) | ⬜ Not started |
| 2 | API contract and types | 🟨 Partly done (types exist) |
| 3 | API layer | ⬜ Not started |
| 4 | Load data into the UI | ⬜ Not started |
| 5 | Search, sort, filter, pagination | ⬜ Not started |
| 6 | Routing and detail page | ⬜ Not started |
| 7 | Form + validation + POST | ⬜ Not started |
| 8 | Shared state (theme) | ⬜ Not started |
| 9 | Polish and handover-ready | ⬜ Not started |

Legend: ⬜ Not started · 🟨 In progress · ✅ Done

**Decisions**
- Styling: **plain CSS** (one `.css` file per component, CSS variables for the theme)
- Version control: **git**, branch `main`. Commit at the end of every phase (see "Git routine" below)
- Review: at the end of each phase, ask Claude to **"review phase N"**. Claude checks your code, ticks the boxes, and updates this tracker.

**Git routine (after each phase)**
```bash
git status                          # what changed?
git add -A                          # stage everything
git commit -m "phase 1: static UI"  # save a checkpoint
```
Made a mess? `git restore <file>` throws away uncommitted changes to that file. `git log --oneline` shows your checkpoints.

### Where you are right now (review from 25 Nov 2026)

**Already done well 👍**
- Product types with `Pick`, `Partial`, `Record`, `as const`, tuples (`src/types/product.ts`)
- `AsyncState<T>` discriminated union and `Paginated<T>` generic (`src/types/api.ts`). You'll use these a lot in Phase 4.
- Utility functions `formatPrice`, `getFinalPrice`, `getStockStatus`, `parseProductId`, `getErrorMessage` (`src/utils/format.ts`). Clean and reusable.
- Hooks practice: `useState` (objects, arrays, CRUD), `useEffect` (with cleanup ✅), `useContext`
- Router setup with a `Layout` + `Outlet`
- Empty starter files already exist for this exact plan (`http.ts`, `productService.ts`, `useFetch.ts`, `useDebounce.ts`, `SearchBar`, `SortSelect`, `AddProductForm`, `ui/Button`, `ui/Input`, `ThemeContext`)

**To fix (that's Phase 0)**
- `npx tsc -b` currently shows about 26 type errors, so `npm run build` fails.

---

## Phase 0: Clean the workbench

Why: a real developer never starts a feature on a broken build. Errors pile up and hide new ones.

- [ ] **0.1** Run `npx tsc -b --noEmit` and read the errors. Fix the ones in these files:
  - `src/types/product.ts`: `id: readonly number`
    - *Hint:* `readonly` goes **before the property name**, not before the type.
  - `src/pages/ProductExamples.tsx`: imports `Product` but the file exports `Products`
    - *Hint:* real projects use a **singular** name for one item's type (`Product`). Consider renaming the type everywhere.
  - `src/components/HooksPractice/UseState.tsx`: about 10 errors, all from `useState([])` and `useState()`
    - *Hint:* an empty `[]` makes TypeScript guess `never[]` ("an array of nothing"). Tell it what goes inside: `useState<Address[]>([])`. Same idea for `updateText`.
    - *Bonus:* your `arr.map(...)` is missing a `key`.
- [ ] **0.2** For `TypeBasics/*` practice files: fix them, or exclude that folder from the build if they're just notes. (Ask Claude how to exclude it if you want.)
- [ ] **0.3** `npm run build` passes ✅

**Done when:** `npm run build` finishes with no errors.

---

## Phase 1: Static UI (your comfort zone)

Why: this is exactly what you hand over today. Build it with **hard-coded fake data** and **props only**. Don't add any logic yet.

Create a file `src/mocks/products.ts` with 3–4 fake products typed as `Product[]`. Copy one real item from `https://dummyjson.com/products/1` so the shape is correct.

- [ ] **1.1** `ui/Button.tsx`: props: `children`, `variant` (`"primary" | "secondary"`), `onClick`, `disabled`, `type`
  - *Hint:* extend the native button props: `React.ComponentProps<"button">` & your own props. That way `onClick`, `disabled`, and `type` come for free.
- [ ] **1.2** `ui/Input.tsx`: props: `label`, `error?`, plus the native input props
  - *Hint:* same trick: `React.ComponentProps<"input">`. Show `error` in red text under the input.
- [ ] **1.3** `ui/StatusBadge.tsx`: takes `status: StockStatus` and shows "In stock" / "Low stock" / "Out of stock" with colors
- [ ] **1.4** Redesign `ProductCard.tsx` to take **one** prop: `product: Product` (or `ProductPreview`)
  - Show thumbnail, title, the original price struck through, the final price, a discount badge, and a stock badge
  - *Hint:* use your own `formatPrice`, `getFinalPrice`, and `getStockStatus` from `utils/format.ts`
- [ ] **1.5** `ProductList.tsx`: props: `products: Product[]`. Renders a grid of cards.
- [ ] **1.6** `SearchBar.tsx`: props: `value: string`, `onChange: (value: string) => void`
  - *Hint:* the parent owns the value and SearchBar just reports changes. This is called a **controlled component**.
- [ ] **1.7** `SortSelect.tsx`: props: `value: SortKey`, `onChange: (value: SortKey) => void`
- [ ] **1.8** Design the **4 states** as small components: `Loader`, `ErrorMessage` (with a "Retry" button), `EmptyState` ("No products found"), and the normal list.
- [ ] **1.9** `ProductDetail.tsx`: props: `product: Product`. Big image, gallery thumbnails, description, brand, rating, price, stock.
- [ ] **1.10** `AddProductForm.tsx`: static layout only. Fields: title, description, price, stock, category (select from `CATEGORIES`), and a Submit button.
- [ ] **1.11** Pages that use the mock data: `pages/ProductsPage.tsx`, `pages/ProductDetailPage.tsx`, `pages/AddProductPage.tsx`. Add routes `/products`, `/products/:id`, `/products/new`, and sidebar links.

**Done when:** all 3 pages look finished with fake data, and **no component inside `components/` imports mock data directly**. Only pages do that.

> 💡 Self-check: imagine handing this to a React developer. Could they plug in real data by only changing the **pages**? If yes, your component design is good.

---

## Phase 2: Read the API contract and write types

Why: before writing logic, a developer checks what the server actually sends. Designs and APIs often disagree.

- [ ] **2.1** Open every API URL from section 2 in your browser (or Postman). Look at the JSON.
- [ ] **2.2** Compare the list response with your `Paginated<T>` type.
  - The API sends `{ products, total, skip, limit }`, but your type has `items`.
  - *Hint:* create a separate type for the **raw API shape** (e.g. `ProductsResponse`). Then convert it to `Paginated<Product>` in the service (Phase 3). Converting server data into the shape your UI wants is called **mapping**, and it's very common in real projects.
- [ ] **2.3** Check `CATEGORIES` against `/products/category-list`. Are there more categories? Decide whether to keep a fixed list or load them from the API (loading them is better).
- [ ] **2.4** Note which fields can be missing (for example, `brand` is missing on some products). Make them optional with `?`.

**Done when:** you can explain each field in your `Product` type and which endpoint returns it.

---

## Phase 3: API layer (`services/`)

Why: if 10 components each call `fetch`, then changing the URL or error handling means editing 10 files. One service layer means editing one place.

- [ ] **3.1** `services/http.ts`: write one generic helper:
  ```ts
  // signature only: you write the body
  export async function http<T>(path: string, options?: RequestInit): Promise<T>
  ```
  - Put `BASE_URL = "https://dummyjson.com"` in one place
  - *Hint 1:* `fetch` does **not** throw on 404/500. Check `response.ok` and `throw` yourself.
  - *Hint 2:* `return response.json() as Promise<T>`
  - *Hint 3 (later):* put the base URL in a `.env` file as `VITE_API_URL` and read it with `import.meta.env.VITE_API_URL`
- [ ] **3.2** `services/productService.ts`: small functions that use `http`:
  - `getProducts({ limit, skip, sortBy, order })` → `Promise<Paginated<Product>>`
  - `searchProducts(query)`
  - `getProductById(id)` → `Promise<Product>`
  - `getCategories()` → `Promise<string[]>`
  - `addProduct(data: NewProduct)` → `Promise<Product>`
  - *Hint:* build query strings with `new URLSearchParams({ ... }).toString()` instead of gluing strings by hand
- [ ] **3.3** Test it quickly: call `getProducts()` once inside a `useEffect` and `console.log` the result.

**Done when:** you see real products in the console, and wrong URLs show a clear error message.

---

## Phase 4: Load data into the UI

Why: this is the heart of "integration". Data → state → props → your UI.

- [ ] **4.1** In `ProductsPage`, fetch the list in a `useEffect` and store it in **one** state:
  ```ts
  const [state, setState] = useState<AsyncState<Paginated<Product>>>({ status: "idle" });
  ```
  - Set `loading` → call the service → `success` with data, or `error` with `getErrorMessage(err)`
  - *Hint:* `useEffect` can't be `async` directly. Write an `async function load()` inside it and call it.
- [ ] **4.2** Render by status:
  - `loading` → `<Loader />`, `error` → `<ErrorMessage />`, `success` with 0 items → `<EmptyState />`, otherwise `<ProductList />`
  - *Hint:* use `if (state.status === "error")`. TypeScript then **knows** `state.message` exists. That's the power of your discriminated union.
- [ ] **4.3** Make "Retry" work. *Hint:* move `load` outside the effect, or keep a `reloadKey` counter state in the effect's dependency array.
- [ ] **4.4** Handle **race conditions**: if the user changes pages quickly, an old response can arrive last.
  - *Hint:* `AbortController`. Pass `signal` into `fetch` and call `controller.abort()` in the effect's cleanup. (You already wrote cleanup for `setInterval`. Same idea.)
- [ ] **4.5** Move that logic into a reusable hook `hooks/useFetch.ts`:
  ```ts
  function useFetch<T>(fetcher: (signal: AbortSignal) => Promise<T>, deps: unknown[]): AsyncState<T> & { retry: () => void }
  ```
- [ ] **4.6** Delete the mock data import from `ProductsPage`. 🎉

**Done when:** the list shows real products, you see a loader on a slow network (DevTools → Network → "Slow 3G"), and you see an error when you turn the network "Offline".

---

## Phase 5: Search, sort, filter, pagination

Why: this is how a static page becomes a usable tool.

- [ ] **5.1** Search: `const [query, setQuery] = useState("")` in the page, passed to `SearchBar`. Call `searchProducts` when `query` isn't empty.
- [ ] **5.2** `hooks/useDebounce.ts`: wait 400 ms after the user stops typing before searching.
  - *Hint:* `useEffect` + `setTimeout` + cleanup with `clearTimeout`. It returns the "calm" value.
  - Check it in the Network tab: typing "phone" should make **1** request, not 5.
- [ ] **5.3** Sort: connect `SortSelect` and pass `sortBy` and `order` to `getProducts`.
- [ ] **5.4** Category filter: load categories from the API and show them as chips or a select.
- [ ] **5.5** Pagination: Prev/Next buttons, "Page 2 of 17". `skip = (page - 1) * limit`.
  - *Hint:* go back to page 1 whenever the search, sort, or category changes.
- [ ] **5.6** ⭐ Bonus: store search, sort, and page in the URL (`?q=phone&page=2`) with `useSearchParams` from react-router. Refreshing the page keeps the filters, and you can share the link.

**Done when:** you can search, sort, filter, and page through results, and no extra requests fire while typing.

---

## Phase 6: Routing and detail page

- [ ] **6.1** Clicking a `ProductCard` goes to `/products/:id`. *Hint:* wrap the card in `<Link to={...}>` at the **list/page** level, or pass an `onClick` prop.
- [ ] **6.2** In `ProductDetailPage`, read the id with `useParams()`, check it with your `parseProductId`, then call `getProductById`.
  - *Hint:* `useParams` returns `string | undefined`. Handle `undefined` and invalid ids by showing a "Product not found" state.
- [ ] **6.3** Reuse `useFetch` for loading and error handling.
- [ ] **6.4** Add a "← Back to products" link. ⭐ Bonus: keep the list's filters when going back (you get this for free if you did 5.6).
- [ ] **6.5** Add a catch-all 404 route (`path: "*"`).

**Done when:** opening `/products/1` directly in a new tab works, and `/products/abc` shows a friendly message.

---

## Phase 7: Form, validation, POST

- [ ] **7.1** Make the form **controlled**: one state object of type `NewProduct`, and one `handleChange` for all inputs. You already did this in `UseState.tsx` with `address`.
  - *Hint:* inputs always give strings. Convert `price` and `stock` to numbers.
- [ ] **7.2** Write `validate(values: NewProduct): ProductFormErrors`. It should be a **pure function** in `utils/` (no React inside), so it's easy to test.
  - Rules: title is required (min 3 characters), price > 0, stock ≥ 0 and a whole number, category is required
  - Show errors under each field using your `Input`'s `error` prop
- [ ] **7.3** On submit: `e.preventDefault()`, validate, and stop if there are errors. Otherwise call `addProduct`.
- [ ] **7.4** Submitting state: disable the button and show "Saving…" to prevent double submits.
- [ ] **7.5** Success: show a message with the returned product's id, then reset the form or navigate (`useNavigate`). Failure: show the error and **keep** what the user typed.

**Done when:** empty submit shows errors, valid submit shows success, and the button can't be double-clicked.

---

## Phase 8: Shared state (theme)

Why: some data is needed everywhere. Passing it through 5 levels of props ("prop drilling") gets messy. Context solves this.

- [ ] **8.1** In `context/ThemeContext.tsx`, create the context with `{ theme, toggleTheme }` and a `ThemeProvider` component that holds `useState<"light" | "dark">`.
- [ ] **8.2** Write a `useTheme()` hook that throws a clear error if it's used outside the provider.
  - *Hint:* create the context with `undefined` as the default, then check for it in the hook.
- [ ] **8.3** Wrap the app in `App.tsx` and replace the old `ThemeContext.Provider value="dark"`.
- [ ] **8.4** Add a toggle button in the sidebar. Apply the theme with `document.documentElement.dataset.theme` plus CSS variables. You're the CSS expert, so this part is yours.
- [ ] **8.5** ⭐ Remember the choice in `localStorage`.

**Done when:** the theme toggles everywhere and survives a page refresh.

---

## Phase 9: Polish and handover-ready

- [ ] **9.1** Remove `console.log`s and unused imports
- [ ] **9.2** `npm run lint` and `npm run build` both pass
- [ ] **9.3** Edge-case walkthrough: slow network, offline, empty search, a very long title, a product with no `brand`, `/products/99999`
- [ ] **9.4** Basic accessibility: labels on inputs, `alt` on images, buttons are real `<button>` elements, keyboard navigation works
- [ ] **9.5** Move `createBrowserRouter` **outside** the `App` function, so it isn't recreated on every render
- [ ] **9.6** Write a short section in `README.md`: what the app does, folder structure, how to run it
- [x] **9.7** Git set up (25 Nov 2026). Keep committing after every phase. Real developers work in small commits.

**Done when:** you could hand this project to another developer and they'd understand it in 10 minutes.

---

## Cheat sheet: words you'll hear from React developers

| Word | Simple meaning |
|---|---|
| **Props** | Inputs to a component (like function arguments) |
| **State** | Data that changes and re-draws the UI when it changes |
| **Controlled input** | Input whose value lives in React state |
| **Side effect** | Anything outside "draw the UI", e.g. fetching data or timers (`useEffect`) |
| **Lifting state up** | Moving state to the parent so siblings can share it |
| **Prop drilling** | Passing props through many layers that don't use them |
| **Service / API layer** | Functions that talk to the server |
| **Mapping** | Converting the API's JSON shape into the shape your UI wants |
| **Debounce** | Wait until the user stops typing before doing something |
| **Race condition** | An old request finishing after a newer one and showing stale data |
| **Discriminated union** | Your `AsyncState`: one `status` field that tells TS which other fields exist |

---

## Learning log (write 1–2 lines after each phase)

- Phase 0:
- Phase 1:
- Phase 2:
- Phase 3:
- Phase 4:
- Phase 5:
- Phase 6:
- Phase 7:
- Phase 8:
- Phase 9:
