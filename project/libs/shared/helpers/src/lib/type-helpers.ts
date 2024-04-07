export type DiscriminatedUnion<
  KeyT extends string,
  T extends Record<KeyT, unknown>
> = T;
