// API type definitions

// phase 1.5

type Paginated<T> = {
  items: T[];
  total: number;
  skip: number;
  limit: number;
};

type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

export type { Paginated, AsyncState };
