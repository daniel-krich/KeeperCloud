#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/Keeper.WebApi/Keeper.WebApi.csproj", "src/Keeper.WebApi/"]
COPY ["src/Keeper.Infrastructure/Keeper.Infrastructure.csproj", "src/Keeper.Infrastructure/"]
COPY ["src/Keeper.Application/Keeper.Application.csproj", "src/Keeper.Application/"]
COPY ["src/Keeper.Domain/Keeper.Domain.csproj", "src/Keeper.Domain/"]
COPY ["src/Keeper.RepositoriesAccess/Keeper.RepositoriesAccess.csproj", "src/Keeper.RepositoriesAccess/"]
COPY ["src/Keeper.Utilities/Keeper.Utilities.csproj", "src/Keeper.Utilities/"]
RUN dotnet restore "src/Keeper.WebApi/Keeper.WebApi.csproj"
COPY . .
WORKDIR "/src/src/Keeper.WebApi"
RUN dotnet build "Keeper.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Keeper.WebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Keeper.WebApi.dll"]