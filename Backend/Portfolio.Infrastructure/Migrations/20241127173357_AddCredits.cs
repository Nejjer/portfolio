using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Portfolio.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddCredits : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Company",
                table: "WorkExperiences");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "WorkExperiences");

            migrationBuilder.DropColumn(
                name: "Event",
                table: "Presentations");

            migrationBuilder.RenameColumn(
                name: "Position",
                table: "WorkExperiences",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "PresentationDate",
                table: "Presentations",
                newName: "Image");

            migrationBuilder.AddColumn<List<string>>(
                name: "Credits",
                table: "Portfolios",
                type: "text[]",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Conferences",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Credits",
                table: "Portfolios");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Conferences");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "WorkExperiences",
                newName: "Position");

            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Presentations",
                newName: "PresentationDate");

            migrationBuilder.AddColumn<string>(
                name: "Company",
                table: "WorkExperiences",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EndDate",
                table: "WorkExperiences",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Event",
                table: "Presentations",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
