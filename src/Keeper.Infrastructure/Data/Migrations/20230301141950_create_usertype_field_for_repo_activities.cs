using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Keeper.Infrastructure.Data.Migrations
{
    public partial class create_usertype_field_for_repo_activities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserType",
                table: "RepositoryActivities",
                type: "nvarchar(64)",
                maxLength: 64,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserType",
                table: "RepositoryActivities");
        }
    }
}
