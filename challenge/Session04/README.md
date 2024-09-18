
## Challenge_04

Welcome to the CRUD backoffices coding challenge! Your task is to create a technical solution for a manage users and roles matrix of them for an English learning application.

## Acceptance Criteria

1.  **User CRUD**:

    -   Admin can create, modify and deactive/inactive users..
    -   The system do not allow user with same phone and email
2.  **Roles CRUD**:

    -   Admin can create, modify and delete roles (that not bind to any users).
    -   Roles should have unique name
3.  **Roles Matrix**:

    -   Admin can define roles permission.
    -   An user belong to roles only can use permission that defined in the system.

## Challenge Requirements

### Part 1: System Design

1.  **System Design Document**:
    -   **Architecture Diagram**: Create an architecture diagram illustrating how different components of the system interact. This should include all components required for the feature, including the server, client applications, database, and any external services.
    -   **Component Description**: Describe each component's role in the system.
    -   **Data Flow**: Explain how data flows through the system from when a user joins a quiz to when the leaderboard is updated.
    -   **Technologies and Tools**: List and justify the technologies and tools chosen for each component.

### Part 2: Implementation

1.  **Pick a Component**:

    -   Implement one of the core components below using the technologies that you are comfortable with. The rest of the system can be mocked using mock services or data.

2.  **Build For the Future**:

    - **Scalability**: Design and implement your component with scalability in mind. Consider how the system would handle a large number of users  Discuss any trade-offs you made in your design and implementation.
    - **Performance**: Your component should perform well even under heavy load. Consider how you can optimize your code and your use of resources to ensure high performance.
    - **Reliability**: Your component should be reliable and handle errors gracefully. Consider how you can make your component resilient to failures.
    - **Maintainability**: Your code should be clean, well-organized, and easy to maintain. Consider how you can make it easy for other developers to understand and modify your code.
    - **Monitoring and Observability**: Discuss how you would monitor the performance of your component and diagnose issues. Consider how you can make your component observable.

### Part 3: Scan and refactor for any insecure coding

-   Using any tools/toys or review from other to detect insecure coding parts.
-   Fix all the issues.