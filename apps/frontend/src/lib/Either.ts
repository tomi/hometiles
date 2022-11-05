export type EitherOk<T> = [null, T];
export type EitherErr<T> = [T, null];
export type Either<TErr, TOk> = EitherErr<TErr> | EitherOk<TOk>;
export type AsyncEither<TErr, TOk> = Promise<Either<TErr, TOk>>;
