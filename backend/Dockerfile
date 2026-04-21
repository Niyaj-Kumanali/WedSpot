# -------- Stage 1: Build --------
FROM mcr.microsoft.com/dotnet/sdk:10.0-preview AS build
WORKDIR /app

# Copy project files and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the source code and build
COPY . ./
RUN dotnet publish -c Release -o /app/out

# -------- Stage 2: Run --------
FROM mcr.microsoft.com/dotnet/aspnet:10.0-preview
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/out ./

# Expose the application port
EXPOSE 8080
EXPOSE 8081

# Set the entry point to run the application
ENTRYPOINT ["dotnet", "backend.dll"]
