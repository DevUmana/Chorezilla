# Chorezilla

## Description

**Chorezilla** is a kanban-style task management app with three task buckets: **Todo**, **In Progress**, and **Done**. Users must be authenticated to add, edit, or delete tasks. For security, sessions are monitored, and users are automatically redirected to the login page if their session expires due to inactivity. This ensures that all task management actions are secure and user sessions are properly managed.

[![MIT license](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

1. Save the repository code to your computer
2. Invoke npm install
3. Invoke npm run start

## Usage

- Application Site [https://chorezilla.onrender.com/](https://chorezilla.onrender.com/)
- Test User, Username: SunnyScribe Password: password
- Application Walkthrough [https://drive.google.com/file/d/1_BdKegamjPqkaZYsd_spYwoUlR2TTWpF/view](https://drive.google.com/file/d/1_BdKegamjPqkaZYsd_spYwoUlR2TTWpF/view)

## License

MIT License

Copyright (c) 2024 David Umana

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Contributing

I am open to any feedback and improvements that others may have!

## Tests

### **User Authentication:**

**AC-1**: Users must be authenticated to add a ticket.
   - Given a user is not authenticated, when they attempt to add a ticket, they should be redirected to the login page.
   - Given a user is authenticated, they should be able to successfully add a ticket.

**AC-2**: Users must be authenticated to edit a ticket.
   - Given a user is not authenticated, when they attempt to edit a ticket, they should be redirected to the login page.
   - Given a user is authenticated, they should be able to edit an existing ticket.

**AC-3**: Users must be authenticated to delete a ticket.
   - Given a user is not authenticated, when they attempt to delete a ticket, they should be redirected to the login page.
   - Given a user is authenticated, they should be able to delete a ticket successfully.

### **Kanban Board:**

**AC-4**: The application must have three task buckets: Todo, In Progress, and Done.
   - When a user adds a new ticket, it should appear in the "Todo" bucket by default.
   - Users must be able to drag and drop tickets between **Todo**, **In Progress**, and **Done** buckets.

### **Session Management:**

**AC-5**: The system should monitor user activity and automatically log the user out after X minutes of inactivity.
   - Given a user session has expired, when they interact with the application, they should be redirected to the login page.

### **Redirect on Session Timeout:**

**AC-6**: On session timeout, the user is redirected to the login page.
   - Given a user session expires, they must be automatically redirected to the login page with a message like: “Your session has expired. Please log in again to continue.”


## Authors and acknowledgment

- Badge information was pulled from [https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba](https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba)

## Questions

For any questions, please contact me using the information below:

GitHub: [DevUmana](https://github.com/DevUmana)

Email: [dumana92@gmail.com](mailto:dumana92@gmail.com)
