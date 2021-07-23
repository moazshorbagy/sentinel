export interface IUseCase<Params, T> {
    execute(input: Params): Promise<T>;
}