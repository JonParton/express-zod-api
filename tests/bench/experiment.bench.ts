import { bench } from "vitest";
import { jsonReplacer as current } from "../../src/server-helpers";

const sample = {
  a: {
    b: {
      c: {
        d: new Map(),
        e: new Set(),
        f: 10,
        g: 20,
        h: 30,
        i: 40,
      },
    },
  },
};

const control = (_key: PropertyKey, v: unknown) => v;

const featured = (_key: PropertyKey, value: unknown) => {
  if (value instanceof Map || value instanceof Set) return Array.from(value);
  return value;
};

describe("Experiment", () => {
  bench("no replacer", () => {
    JSON.stringify(sample);
  });

  bench("empty replacer", () => {
    JSON.stringify(sample, control);
  });

  bench(
    "current implementation",
    () => {
      JSON.stringify(sample, current);
    },
    { time: 10000 },
  );

  bench(
    "featured implementation",
    () => {
      JSON.stringify(sample, featured);
    },
    { time: 10000 },
  );
});
