export interface BatchWrapperInterface<T> {
    batch: T[];
    batchOffset: number;
    batchCount: number;
    isThereMoreBatch: boolean;
}