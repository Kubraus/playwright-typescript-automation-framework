# Playwright RealWorld Framework Roadmap

## Project Goal
Build an interview-ready Playwright framework demonstrating modern UI and API test automation practices using TypeScript, Playwright and GitHub Actions.

## Completed

### Architecture

- Layered architecture based on Page Objects, Flow layer and API layer.
- Page Objects encapsulate locators and low-level UI interactions.
- Flow layer contains reusable business workflows to keep test scenarios clean and readable.
- API layer provides helper classes for direct backend interactions.
- Custom Playwright fixtures inject reusable objects into tests.
- Multi-user fixtures provide dedicated Author and Reader accounts for collaboration scenarios.
- Test specifications focus on business scenarios rather than implementation details.

### UI Testing

- Supports end-to-end UI scenarios.
- Supports authentication and multi-user UI scenarios.
- Reusable Page Objects encapsulate UI interactions and locators.
- Business workflows are abstracted into the Flow layer, keeping tests concise and readable.
- API is used to prepare test data before executing UI scenarios.
- Uses Playwright's built-in auto-waiting for reliable UI interactions.

### API Testing

- Uses API to prepare test data before UI execution.
- Supports article lifecycle management (create, retrieve, favorite and delete).
- Provides reusable API helper classes for backend interactions.
- Supports authenticated requests using dedicated test users.
- Enables fast cleanup of test data after execution.

### Test Data

- Supports dedicated Author and Reader test accounts.
- Generates dynamic article data to avoid collisions between test runs.
- Uses reusable TypeScript models for structured test data.
- Supports JSON-based data driven testing.

### CI/CD

## Current Focus

Preparing the framework for public release and portfolio presentation.

## Next Milestones

### High Priority

- Negative API tests
- README
- GitHub documentation

### Medium Priority

- Architecture diagram
- Interview preparation
- Repository polish

### Nice to Have

- AI-assisted test data generation
- Docker support
- Advanced reporting

### High Priority

### Medium Priority

### Nice to Have