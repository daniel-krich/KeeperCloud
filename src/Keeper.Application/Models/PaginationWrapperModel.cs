namespace Keeper.Application.Models;

public class PaginationWrapperModel<T> where T : new()
{
    public IEnumerable<T> PageItems { get; }
    public int PageItemsCount { get; }
    public int CurrentPage { get; }
    public int PagesCount { get; }
    public int ItemsPerPage { get; }
    public int TotalItems { get; }

    public PaginationWrapperModel()
    {
        PageItems = new List<T>();
    }

    public PaginationWrapperModel(IEnumerable<T> pageItems, int currentPage, int pagesCount, int itemsPerPage, int totalItems)
    {
        PageItems = pageItems;
        PageItemsCount = PageItems.Count();
        CurrentPage = currentPage;
        PagesCount = pagesCount;
        ItemsPerPage = itemsPerPage;
        TotalItems = totalItems;
    }
}
