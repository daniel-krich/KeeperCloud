﻿namespace Keeper.Server.Models
{
    public class FileModel
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public long FileSize { get; set; }
        public bool IsPublic { get; set; }
    }
}