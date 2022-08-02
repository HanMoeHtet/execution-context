var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseAuthorization();

app.MapGet("/", () =>
{
  Counter.count++;
  return "Count: " + Counter.count + "\n";
});

app.UseAuthorization();

app.Run();
