# Kirtfield Application API

Within this api, a user will be able to add, delete, update, and recieve applications of interns applying for this position.

To use this api:

1. For `GET` all applicants and `POST` applications
   > /api/v1/applicants
2. For `GET` specific applicants, `DELETE` applications, and `PUT` applications
   > /api/v1/applicants/:app_id

## Formatting

The request body should be simple JSON

```json
{
  "first_name": "Keith",
  "last_name": "Kirtfield",
  "position": "Dev Intern",
  "school": "VCU",
  "degree": "Computer Science"
}
```

For the Update request both req below are valid

```json
({
  "first_name": "Ryan",
  "last_name": "Kirtfield",
  "position": "Dev Intern",
  "school": "VCU",
  "degree": "Computer Science"
},
{
  "first_name": "Ryan"
})
```

## The API contains:

- [x] Local instance of SQL database
- [x] Flask Web Server
- [x] Basic CRUD Functions
- [x] Status Codes and Error Handling
- [x] DockerFile For Universal preformance
- [x] Many Unit Test to Ensure Functionality

## Docker-Compose

I decided to use this specificlly for the volumes tag (automatic updating without rebuilding) and Nginx, so port hosting should not be an issue

```
docker-compose up --build
```
