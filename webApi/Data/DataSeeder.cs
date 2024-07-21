using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;
using webApi.Entities;
namespace webApi.Data 
{
    public class DataSeeder 
    {
        public static async Task SeedDatabaseAsync(ApplicationDbContext context)
        {
            if (context.Students.Any())
            {
                return;
            }
            
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "SeedData", "data.csv");

            using (var reader = new StreamReader(filePath))
            using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)
                {
                    HasHeaderRecord = true,
                    Delimiter = ",",
                }))
            {
                var records = csv.GetRecords<Student>().ToList();
                await context.Students.AddRangeAsync(records);
                await context.SaveChangesAsync();
            }
        }
    }
}
