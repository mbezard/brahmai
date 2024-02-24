type Params = {
  input: string[];
  flags: Record<string, unknown>;
};
export const app = ({ input, flags }: Params) => {
  console.log("Hello, World!");
  console.log("Input:", input);
  console.log("Flags:", flags);
};
