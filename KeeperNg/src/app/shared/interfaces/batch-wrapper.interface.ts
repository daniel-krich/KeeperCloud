export interface BatchWrapperInterface<T> {
    batch: T[];
    batchOffset: number;
    batchCount: number;
    howMuchLeftCount: number;
    isThereMoreBatch: boolean;
}