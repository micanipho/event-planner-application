# Event Planner Application

## Table of Contents
1.  [Introduction](#1-introduction)
2.  [Features](#2-features)
3.  [Technical Stack](#3-technical-stack)
4.  [Architecture Overview](#4-architecture-overview)
5.  [Core Entities](#5-core-entities)
6.  [Data Persistence Strategy](#6-data-persistence-strategy)
7.  [Installation & Setup](#7-installation--setup)
8.  [Usage](#8-usage)
9.  [Future Enhancements](#9-future-enhancements)
10. [Contributing](#10-contributing)
11. [License](#11-license)
12. [Contact](#12-contact)

---

## 1. Introduction
The Event Planner Application is a powerful, user-friendly tool designed to simplify the complexities of event organization. From intimate gatherings to larger celebrations, this application empowers users to meticulously plan every detail, manage guest lists, track RSVPs, and oversee associated tasks. Developed as a modern web application, it offers a responsive and intuitive interface for a seamless planning experience.

## 2. Features
The application provides a comprehensive suite of features to cover the full lifecycle of event management:

*   **Event Creation**: Easily create new events by defining essential details such as name, date, time, location, and a descriptive overview.
*   **Event Management (CRUD)**:
    *   **Create**: Add new events.
    *   **Read**: View a consolidated list of all planned events and drill down into individual event details.
    *   **Update**: Modify existing event details, including name, date, time, location, and description.
    *   **Delete**: Remove events that are no longer needed.
*   **Guest Management**:
    *   Add guests to specific events with their contact information.
    *   Edit guest details.
    *   Remove guests from an event.
*   **RSVP Tracking**: Monitor and update the RSVP status for each invited guest (e.g., Attending, Not Attending, Pending).
*   **Task Management**:
    *   Associate a list of tasks with each event.
    *   Add new tasks, mark them as complete, and edit their descriptions.
    *   Delete tasks as required.
*   **Event Listing**: A centralized dashboard or page to view all created events at a glance.
*   **Event Details View**: A dedicated page for each event, displaying all its specific information, associated guests, and tasks.

## 3. Technical Stack
This application leverages a modern and robust set of technologies to deliver a high-quality user experience:

*   **Framework**: **Next.js**
    *   *Why:* Chosen for its excellent developer experience, server-side rendering (SSR) and static site generation (SSG) capabilities (though primarily client-side data in this iteration), file-system based routing, and optimized performance.
*   **Language**: **TypeScript**
    *   *Why:* Provides static type-checking, enhancing code quality, maintainability, and developer productivity by catching errors early in the development cycle.
*   **Styling**: **Ant Design / Tailwind CSS**
    *   *Why:* **Ant Design** provides a rich set of enterprise-grade UI components, ensuring consistency and accelerating UI development. **Tailwind CSS** offers a utility-first approach for highly customizable styling, allowing for precise control over the visual presentation and easy integration with Ant Design components where custom styles are needed.
*   **Database**: **None**
    *   *Implication:* Data is managed entirely client-side, typically in-memory or persisted via browser's `localStorage`. This simplifies initial setup but limits scalability and multi-user capabilities.
*   **ORM (Object-Relational Mapping)**: **None**
    *   *Implication:* Not applicable due to the absence of a relational database. Data manipulation is handled directly within the application logic.
*   **Authentication**: **None**
    *   *Implication:* The application is designed for single-user, client-side operation without user accounts or secure access control.

## 4. Architecture Overview
The Event Planner Application follows a client-centric, component-based architecture inherent to Next.js applications.

*   **Presentation Layer (UI Components)**: Built with React components within Next.js, utilizing Ant Design and Tailwind CSS for styling. This layer is responsible for rendering the user interface and handling user interactions.
*   **Application Logic / Services Layer**: Contains the core business logic for managing events, guests, and tasks. This layer interacts with the data persistence mechanism (e.g., `localStorage`). It defines functions for CRUD operations and state management.
*   **Data Store / Persistence Layer**: As there is no backend database, data is managed in the client's browser.
    *   **In-Memory Store**: For transient data or application state during a single session.
    *   **`localStorage`**: For basic persistence of events, guests, and tasks across browser sessions. This acts as a pseudo-database for the client-side application.
*   **Routing**: Handled by Next.js's file-system based routing, providing clear navigation paths for event listings, event details, and management forms.

This architecture prioritizes rapid development and a rich client-side experience, with a clear separation of concerns between UI, business logic, and data handling.

## 5. Core Entities
The application revolves around three primary data entities, each with its own set of attributes:

*   **Event**: Represents a planned occasion.
    *   `id`: Unique identifier (e.g., UUID).
    *   `name`: Name of the event (string).
    *   `date`: Date of the event (Date object or string).
    *   `time`: Time of the event (string).
    *   `location`: Venue or address (string).
    *   `description`: Detailed description of the event (string).
    *   `guests`: An array of `Guest` IDs associated with this event.
    *   `tasks`: An array of `Task` IDs associated with this event.

*   **Guest**: Represents an invited individual to an event.
    *   `id`: Unique identifier (e.g., UUID).
    *   `eventId`: The ID of the event the guest is invited to.
    *   `name`: Guest's name (string).
    *   `email`: Guest's email address (string, optional).
    *   `phone`: Guest's phone number (string, optional).
    *   `rsvpStatus`: Current RSVP status (e.g., "Pending", "Attending", "Not Attending").

*   **Task**: Represents an action item related to an event.
    *   `id`: Unique identifier (e.g., UUID).
    *   `eventId`: The ID of the event this task belongs to.
    *   `description`: Description of the task (string).
    *   `isCompleted`: Boolean indicating if the task is completed.
    *   `dueDate`: Optional due date for the task (Date object or string).

## 6. Data Persistence Strategy
Given the constraint of "No Database," the application employs a client-side data persistence strategy:

*   **`localStorage`**: All event, guest, and task data will be serialized (e.g., JSON.stringify) and stored in the browser's `localStorage`. This ensures that data persists across browser sessions, allowing users to close and reopen the application without losing their event plans.
*   **In-Memory State**: During active use, data will be managed in React's component state or a global state management solution (e.g., React Context API, Zustand, Redux) for reactive updates and efficient UI rendering. Changes to this in-memory state will be periodically or immediately synchronized with `localStorage`.

**Limitations:**
*   **Single-User Focus**: This approach is suitable for individual users and local data management only.
*   **No Multi-Device Sync**: Data is tied to the specific browser and device.
*   **Limited Scalability**: Not suitable for large datasets or complex queries.
*   **Security**: `localStorage` is not secure for sensitive data.

## 7. Installation & Setup
To get this project up and running on your local machine:

### Prerequisites
*   Node.js (LTS version recommended)
*   npm or yarn

### Steps
1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd event-planner-application
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    This will start the application in development mode, typically accessible at `http://localhost:3000`.

4.  **Build for production (optional)**:
    ```bash
    npm run build
    # or
    yarn build
    ```
    This compiles the application for production deployment. You can then start the production server with `npm start` or `yarn start`.

## 8. Usage
Once the application is running, you can:

1.  **Navigate to the Event Listing**: The homepage will likely display a list of all current events.
2.  **Create a New Event**: Click on a "Create Event" or similar button to open a form where you can input event details.
3.  **View Event Details**: Click on any event from the list to see its specific information, including guests and tasks.
4.  **Manage Guests**: Within an event's details, you can add new guests, update their RSVP status, or remove them.
5.  **Manage Tasks**: Similarly, you can add new tasks, mark them as complete, or delete them for a specific event.
6.  **Edit/Delete**: Most entities (Events, Guests, Tasks) will have options to edit their details or delete them from the system.

## 9. Future Enhancements
This application serves as a strong foundation. Potential future enhancements could include:

*   **Backend Integration**: Implement a robust backend (e.g., Node.js with Express, Python with Django/Flask) and a database (e.g., PostgreSQL, MongoDB) for true data persistence, multi-user support, and scalability.
*   **Authentication & User Accounts**: Allow users to create accounts, log in, and manage their own events securely.
*   **Advanced UI/UX**:
    *   **Calendar View**: Integrate a calendar component to visualize events chronologically.
    *   **Search & Filter**: Add functionality to search for events, guests, or tasks, and filter events by date, status, etc.
    *   **Notifications**: Implement reminder notifications for upcoming events or overdue tasks.
*   **Event Templates**: Allow users to save event templates for quick creation of recurring event types.
*   **Export/Import Data**: Functionality to export event data (e.g., CSV, JSON) or import existing data.
*   **Real-time Updates**: For multi-user scenarios, integrate WebSockets for real-time updates.

## 10. Contributing
Contributions are welcome! If you have suggestions for improvements or new features, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## 11. License
This project is licensed under the [MIT License](LICENSE.md) - see the `LICENSE.md` file for details.

## 12. Contact
For any questions, suggestions, or feedback, please open an issue in the GitHub repository.

---