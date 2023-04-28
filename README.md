# KeeperCloud - File Management Platform

KeeperCloud is a File Management Platform developed using C# ASP.NET Core and Angular. It provides a secure and efficient way to store files in repositories, similar to buckets in AWS. With KeeperCloud, users can perform CRUD operations on files using the Manage API from external services. The platform ensures security by encrypting and compressing files. The architecture style follows a monolithic approach with Clean Architecture principles.

## Features

- User Management: KeeperCloud provides APIs to manage users and their permissions.
- Repository Management: Users can create, update, and delete repositories.
- File Operations: Users can upload, download, update, and delete files within repositories.
- Encryption and Compression: Files are encrypted and compressed for enhanced security.
- External Service Integration: KeeperCloud exposes APIs for external services to perform CRUD operations on files.

## Technology Stack

- Backend: C# ASP.NET Core.
- Frontend: Angular 15, NgRx.
- Database: Microsoft SQL server.
- Authentication: JWT, custom API auth keys.
- Encryption: AES-256.

## Architecture

KeeperCloud follows the Clean Architecture principles, which provides separation of concerns and maintainability. The architecture consists of the following layers:

- **Presentation Layer:** This layer contains the API controllers and Angular frontend which is responsible for providing a user-friendly interface to interact with the platform.
- **Application Layer:** This layer handles the business logic and application workflows. It defines the application services and interfaces with the infrastructure layer.
- **Domain Layer:** The domain layer represents the core business entities, including users, repositories, and files.
- **Infrastructure Layer:** This layer interacts with external resources and services, such as databases, file storage, and APIs. It implements the interfaces defined in the application layer.

## Add a Migration

To add a new migration, open a command prompt or terminal and navigate to the root directory of the project. Then run the following command:

```shell
dotnet ef migrations add "migration name" --project src\Keeper.Infrastructure --startup-project src\Keeper.WebApi
```

## Apply Migrations

To apply the pending migrations and update the database, run the following command:

```shell
dotnet ef database update --project src/Keeper.Infrastructure --startup-project src/Keeper.WebApi
```

## API Usage Example

To help you understand how to use the KeeperCloud API, I have provided an example project that demonstrates the usage of various API endpoints. The example project showcases repository and files operations.

You can find the example project in the examples directory of the KeeperCloud repository.

## Interface images

Here are some demo images showcasing the user interface and features of the KeeperCloud platform:

![Capture1](https://user-images.githubusercontent.com/87533517/235132360-35e9564e-26ac-4040-9237-916dbb5e4604.PNG)
***
![Capture2](https://user-images.githubusercontent.com/87533517/235132364-f867f58e-c537-485c-95d5-410b48be23f5.PNG)
***
![Capture3](https://user-images.githubusercontent.com/87533517/235132342-01046b98-b4a8-41e7-a968-56a9dd28ffee.PNG)
***
![Capture4](https://user-images.githubusercontent.com/87533517/235132351-69934a6a-76a7-4578-bf8a-b23dabbb2ed5.PNG)
***
![Capture5](https://user-images.githubusercontent.com/87533517/235132355-07c18750-8b88-4ba6-8493-eb82ca02b8e7.PNG)
***
![Capture6](https://user-images.githubusercontent.com/87533517/235132359-81d550b7-849a-4004-992e-f5199ee0e0ed.PNG)