using Portfolio.Infrastructure;
using Serilog;
using Serilog.Events;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddMediatR(x => x.RegisterServicesFromAssemblies(typeof(Program).Assembly));
// Настройка Serilog
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
    .Enrich.FromLogContext()
    .WriteTo.Console() // Для вывода в консоль
    .WriteTo.File(
        path: "logs/app.log", // Путь к файлу логов
        rollingInterval: RollingInterval.Day, // Логи разделяются по дням
        retainedFileCountLimit: 7, // Хранить логи за последние 7 дней
        fileSizeLimitBytes: 10 * 1024 * 1024, // Ограничение на размер файла
        rollOnFileSizeLimit: true // Создавать новый файл при превышении размера
    )
    .CreateLogger();

// Добавление Serilog в приложение
builder.Host.UseSerilog();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true)
    .AllowCredentials());


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.UseHttpsRedirection();
app.Run();