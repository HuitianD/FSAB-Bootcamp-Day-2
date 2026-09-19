# FSAB Developer Bootcamp — Day 2

Connect the React event page from Day 1 to an Express backend.

You will complete two small exercises in `server.cjs`:
- **Practice 1:** Customize a message returned by the server.
- **Practice 2:** Save an event registration in server memory.

The React page and connection code are already prepared. These exercises are for learning; a backend is not required for your FSAB application project.

## 1. Install the tools

### Node.js and npm

Install **Node.js 24 LTS** from [nodejs.org](https://nodejs.org/en/download). npm is included with the installer.

After installation, reopen your terminal. If VS Code was already open, restart it too.

Check your installation:

```bash
node -v
npm -v
```

Both commands should display a version number.

### Code editor

We recommend [VS Code](https://code.visualstudio.com/). You may use another editor you already know. No extensions are required.

### Git — only needed for cloning

If you want to download the project using `git clone`, install [Git](https://git-scm.com/downloads).

You can also use **Code → Download ZIP** on this GitHub repository. Git is not required for the ZIP option.

You do not need Python, a virtual environment, Postman, or Firebase for these exercises.

## 2. Open the project locally

1. Download or clone this repository.
2. If you downloaded a ZIP, extract it first.
3. In VS Code, select **File → Open Folder**.
4. Open the project folder that directly contains `package.json`.
5. Select **Terminal → New Terminal**.

Run the following commands in that terminal.

First, install the project dependencies:

```bash
npm install
```

This installs React, Express, Vite, and the other packages the project needs. You do not need to install them individually.

Then start the frontend and backend:

```bash
npm run dev:all
```

Keep this terminal running while you use the project.

Open **http://localhost:5173** in your browser.

You should see the FSAB event page.

| Program | Port | Purpose |
| --- | --- | --- |
| React frontend, served by Vite | 5173 | Displays the event page |
| Express backend | 8080 | Receives requests and stores temporary registrations |

Both programs must be running for the registration feature to work.

## 3. Practice 1: Your own server greeting

**Goal:** See how changing backend code changes the data returned to the browser.

1. Open `server.cjs`.
2. Find **TODO 1** inside the GET `/api/hello` handler.
3. Replace `"Hello, Full Stack!"` with a greeting of your choice.
4. Keep the property name `greeting` unchanged.
5. Save the file.
6. Click inside the running terminal and press **Control+C**.
7. Restart the programs:

   ```bash
   npm run dev:all
   ```

8. On the React page, click **“Practice 1: Open the server greeting”**.
9. If the JSON response tab was already open, refresh it.

**Done when:** The JSON response contains your custom greeting.

Opening this link sends a GET request. Express handles the request and returns JSON using `res.json()`.

## 4. Practice 2: Remember an event registration

**Goal:** Send information from React to Express and read it back after a page refresh.

1. In `server.cjs`, find **TODO 2** inside the POST `/api/signups` handler.
2. Add one line that stores `eventId` in `joinedEvents`.
   - `joinedEvents` is a Set: a collection of unique values.
   - Hint: use its `.add(...)` method.
3. Save the file.
4. Stop the running programs with **Control+C**, then restart:

   ```bash
   npm run dev:all
   ```

5. Return to the React page and click **Join event** on one card.
6. Wait for the button to show **Joined!**
7. Refresh the page without restarting the backend.

**Done when:** The event returns to **Joined!** after the page reloads.

Before TODO 2 is completed, this message is expected:

> The server has not saved the registration yet.

### What happens when you click Join?

1. React sends a POST request to `/api/signups` containing the event ID.
2. Express checks the ID and stores it in server memory.
3. Express replies with the registration result.
4. React updates its state and displays **Joined!**
5. After a page refresh, React sends GET `/api/signups` to retrieve the saved registrations.

Optional: Open your browser’s **Developer Tools → Network**, click Join, and inspect the `/api/signups` request. Look at its method, request body, and response.

## 5. Refreshing versus restarting

| Action | What happens? |
| --- | --- |
| Refresh the React page while the backend keeps running | React reads the saved registrations from the backend |
| Stop and restart the backend | Its temporary registrations are cleared |
| Restart the backend, then refresh the React page | The buttons return to **Join event** |

These registrations are stored in **server memory**, not a database.

Each student runs an independent copy of the backend. Registrations are not shared across the class.

## 6. After editing backend code

Our backend does **not** automatically restart when you edit `server.cjs`.

Always:

1. Save.
2. Press **Control+C** in the running terminal.
3. Run `npm run dev:all`.
4. Refresh the page or send another request.

On macOS, use **Control+C**, not Command+C.

Refreshing the browser alone does not load updated backend code.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| `node` or `npm` is not recognized | Install Node.js and restart your terminal or VS Code |
| npm cannot find `package.json` | Open a terminal in the project folder containing that file |
| A port is already in use | Stop the earlier running copy with Control+C before starting another |
| Your new greeting does not appear | Save, restart the programs, and refresh the JSON response tab |
| The page cannot load registrations | Confirm both programs started successfully, then refresh the page |
| Join says the server has not saved the registration | Complete TODO 2, save, restart, and click Join again |
| Registrations disappear after restarting | This is expected: restarting clears server memory |

If local setup does not work, use the classroom StackBlitz link provided by the instructors. It contains the same exercises.

## Project files

| File | Purpose |
| --- | --- |
| `server.cjs` | Backend routes and both classroom TODOs |
| `src/App.jsx` | React components and API requests |
| `src/App.css` | Page styling |
| `vite.config.js` | Forwards frontend `/api` requests to Express |
| `package.json` | Dependencies and run commands |

For these exercises, you only need to edit `server.cjs`.