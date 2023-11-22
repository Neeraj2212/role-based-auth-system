
### About the Project
Design an Advanced RBAC auth system where one user can have multiple roles and each role an have multiple permissions, Authorize user access based on permission,
- Make role and permission dynamic so that admin can change roles and permissions any time form dashboard,
- Create two micro services one is auth service and another is task, so task service will depend on auth service (any time user tries to access task service it will first authenticate the user then let the user perform action)

### Getting Started
- Clone the repo
- Install docker and docker-compose
- Run `docker-compose up` to start the project
- Run `docker-compose down` to stop the project

### API Documentation
- [Postman Collection](https://www.postman.com/interstellar-firefly-437250/workspace/role-based-auth-system/collection/16239037-69911915-0fc6-49bd-904a-35562042c45b?action=share&creator=16239037)
- [Postman Documentation](https://documenter.getpostman.com/view/16239037/2s9YeBdDG4)

