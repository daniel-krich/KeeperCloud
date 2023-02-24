namespace Keeper.Domain.Common;

public class PaginationWrapperModel<T> where T : new()
{
    public IEnumerable<T> PageItems { get; }
    public int PageItemsCount { get; }
    public int CurrentPage { get; }
    public int PagesCount { get; }

    public PaginationWrapperModel()
    {
        PageItems = new List<T>();
    }

    public PaginationWrapperModel(IEnumerable<T> pageItems, int currentPage, int pagesCount)
    {
        PageItems = pageItems;
        PageItemsCount = PageItems.Count();
        CurrentPage = currentPage;
        PagesCount = pagesCount;
    }
}
