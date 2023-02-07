internal class Entry
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var app = builder.Build();

        

        app.MapGet("/", () =>
            "Why are you looking at this? :("
        );

        app.MapPost("/addsolved", async () => {

        });

        app.Run();
    }
}