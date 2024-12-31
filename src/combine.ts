import { flow, pipe } from "fp-ts/lib/function";

const size = (s: string) => {
  return s.length;
};

const isBig = (size: number) => {
  return size > 4;
};

const test = (s: string) => {
  const sizeIsBig = flow(size, isBig);
  console.log(isBig(size(s)));
  console.log(pipe(s, size, isBig));
  console.log(sizeIsBig(s));
};

test("hello");
test("world");
test("ws");
