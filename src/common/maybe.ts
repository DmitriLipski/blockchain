export enum MaybeType {
	Just = 'maybe-type__just',
	Nothing = 'maybe-type__nothing',
}

interface Just<T> {
	type: typeof MaybeType.Just;
	value: T;
}

interface Nothing {
	type: typeof MaybeType.Nothing;
}

export type Maybe<T> = Just<T> | Nothing;

export const Nothing = (): Nothing => ({
	type: MaybeType.Nothing,
});

export const Just = <T>(value: T): Just<T> => ({
	type: MaybeType.Just,
	value,
});
