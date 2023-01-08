namespace Keeper.Server.Models
{
    public class BatchWrapperModel<T> where T : new()
    {
        public IEnumerable<T> Batch { get; }
        public int BatchOffset { get; }
        public int BatchCount { get; }
        public bool IsThereMoreBatch { get; }

        public BatchWrapperModel(IEnumerable<T> batch, int batchOffset, bool isThereMoreBatch)
        {
            Batch = batch;
            BatchOffset = batchOffset;
            BatchCount = batch.Count();
            IsThereMoreBatch = isThereMoreBatch;
        }
    }
}