import type { StandardSchemaV1 } from "@standard-schema/spec";
import type * as keys from "./keys";
import type { StandardSchemaV1Dictionary } from "./standard";

export interface EnumValue<
  Variant extends string,
  VariantSchema extends StandardSchemaV1,
> {
  [keys.id]: string;
  [keys.variant]: Variant;
  values: StandardSchemaV1.InferOutput<VariantSchema>;
}

export type UnknownVariantMap = StandardSchemaV1Dictionary<
  Record<string, ReadonlyArray<unknown>>
> &
  Partial<Record<keyof EnumStatic<any>, never>>;

export type UnknownEnumValue = EnumValue<string, StandardSchemaV1>;

export interface EnumVariant<
  Variant extends string,
  VariantSchema extends StandardSchemaV1<ReadonlyArray<unknown>>,
> {
  /** parse and validate */
  (
    ...values: StandardSchemaV1.InferInput<VariantSchema>
  ): EnumValue<Variant, VariantSchema>;
  /** check if value is of this variant */
  matches(value: UnknownEnumValue): value is EnumValue<Variant, VariantSchema>;
  /** skip parsing */
  from(
    ...values: StandardSchemaV1.InferOutput<VariantSchema>
  ): EnumValue<Variant, VariantSchema>;
}

export type EnumVariants<VariantMap extends UnknownVariantMap> = {
  [Variant in keyof VariantMap & string]: EnumVariant<
    Variant,
    VariantMap[Variant]
  >;
};

export interface EnumStatic<VariantMap extends UnknownVariantMap> {
  [keys.id]: string;
  matches(value: UnknownEnumValue): value is EnumValueFor<Enum<VariantMap>>;
}

export type Enum<VariantMap extends UnknownVariantMap> =
  EnumVariants<VariantMap> & EnumStatic<VariantMap>;

export type EnumVariantMap<E extends Enum<UnknownVariantMap>> =
  E extends Enum<infer VariantMap> ? VariantMap : never;

export type EnumValueFor<E extends Enum<UnknownVariantMap>> = EnumValue<
  keyof EnumVariantMap<E> & string,
  EnumVariantMap<E>[keyof EnumVariantMap<E>]
>;

export type VariantMatchers<
  VariantMap extends UnknownVariantMap,
  Variant extends keyof VariantMap & string,
  MatcherValues extends Record<Variant, unknown>,
> = {
  [V in Variant]: V extends Variant
    ? (
        ...values: StandardSchemaV1.InferOutput<VariantMap[V]>
      ) => MatcherValues[V]
    : never;
};
