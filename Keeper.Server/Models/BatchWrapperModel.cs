namespace Keeper.Server.Models
{
    public class BatchWrapperModel<T> where T : new()
    {
        public IEnumerable<T> Batch { get; }
        public int BatchOffset { get; }
        public int BatchCount { get; }
        public int HowMuchLeftCount { get; }
        public bool IsThereMoreBatch { get; }

        public BatchWrapperModel()
        {
            Batch = new List<T>();
        }

        public BatchWrapperModel(IEnumerable<T> batch, int batchOffset, int howMuchLeftCount)
        {
            Batch = batch;
            BatchOffset = batchOffset;
            BatchCount = batch.Count();
            HowMuchLeftCount = howMuchLeftCount;
            IsThereMoreBatch = howMuchLeftCount > 0;
        }
    }
}