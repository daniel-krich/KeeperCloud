using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Keeper.DataAccess.Migrations
{
    public partial class add_repo_api_members_and_some_more_mods : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PrivateAccessApiKey",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "StorageCapacityMb",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsPublic",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "PublicAccessKey",
                table: "Files");

            migrationBuilder.AddColumn<long>(
                name: "BytesMaxStorage",
                table: "Users",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<bool>(
                name: "AllowAnonymousFileRead",
                table: "Repositories",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "RepositoryApiMembers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    Role = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    Key = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    PermissionFlags = table.Column<int>(type: "int", nullable: false),
                    RepositoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RepositoryApiMembers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RepositoryApiMembers_Repositories_RepositoryId",
                        column: x => x.RepositoryId,
                        principalTable: "Repositories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RepositoryApiMembers_RepositoryId",
                table: "RepositoryApiMembers",
                column: "RepositoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RepositoryApiMembers");

            migrationBuilder.DropColumn(
                name: "BytesMaxStorage",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "AllowAnonymousFileRead",
                table: "Repositories");

            migrationBuilder.AddColumn<string>(
                name: "PrivateAccessApiKey",
                table: "Users",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StorageCapacityMb",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsPublic",
                table: "Files",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "PublicAccessKey",
                table: "Files",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);
        }
    }
}
