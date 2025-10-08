# naimuri-technical-task-github-api

A single-page application that consumes the GitHub REST API to search for a user's repositories, display repository metadata (stars, forks, watchers, issues), and render the repository README inline.

This project was built as a coding test and focuses on a small, accessible UI that demonstrates interacting with GitHub's REST endpoints.

## Behavior

- Search for GitHub users. Autocomplete suggestions appear while typing. Minimum string length 2 characters.
- Select a user to load their public repositories.
- Repository cards show lanaguage and counts for stars, forks, watchers and open issues.
- Links to the repository and the author's profile.
- Click a repository to view its README (markdown rendered to HTML).
- Rate-limit indicator displays remaining GitHub API requests.

## Tech stack

- Vue 3 + TypeScript
- Vite (dev server + build)
- Vuetify (UI components)
- Pinia (state management)
- Axios (HTTP client)
- marked + github-markdown-css (render README markdown)

## Requirements

- Node.js
- npm
- (Optional but recommended) GitHub Personal Access Token to increase API rate limits. Provide it via `VITE_GITHUB_TOKEN` in your environment.

## Environment variable

Create a `.env` file in the project root (do not commit this file). Example:

VITE_GITHUB_TOKEN=ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

**Required Scopes**

- Fine-grained Personal Access Token
- Repository Access: All Repositories
- Permissions: Contents (Read Only)

## Setup & run (Windows PowerShell)

```shell
npm install
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

## Lint & format

```shell
npm run lint
npm run format
```

## Important files

- `src/services/githubService.ts` — API actions (uses `VITE_GITHUB_TOKEN`).
- `src/stores/useRepoStore.ts` — Main repo/user store, suggestions debounce, README loading.
- `src/stores/useRateLimitStore.ts` — Rate-limit tracking.
- `src/components/` — UI components: search, repo list/table, README viewer, rate limit UI.

## Accessibility notes

- UI built with Vuetify.
- Form controls include aria labels.
- Error messages displayed with snackbar.

## Implementation details

- The README is fetched with the `Accept: application/vnd.github.v3.raw` header so the API returns raw markdown. The app converts markdown to HTML with `marked` and uses `github-markdown-css` for styling.
- User suggestions come from `/search/users` and are debounced to minimize requests.
- Rate limit is read from `/rate_limit`. If remaining requests reach 0 the app displays a message advising the user to wait for reset.

## Limitations & future improvements

- Pagination for repositories is not implemented (the app fetches a single page).
- Improve error messaging with status codes and warning levels.
- Add end-to-end tests and accessibility testing.
