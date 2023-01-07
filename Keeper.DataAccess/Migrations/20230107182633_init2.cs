using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Keeper.DataAccess.Migrations
{
    public partial class init2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EncryptKey",
                table: "Files");

            migrationBuilder.AddColumn<byte[]>(
                name: "EncIV",
                table: "Files",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<byte[]>(
                name: "EncKey",
                table: "Files",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EncIV",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "EncKey",
                table: "Files");

            migrationBuilder.AddColumn<string>(
                name: "EncryptKey",
                table: "Files",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "");
        }
    }
}
