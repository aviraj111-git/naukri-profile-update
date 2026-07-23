# Profile Updater

This repository contains a Playwright test project for automating a Naukri user profile update workflow.

## Prerequisites

- Node.js installed.
- Valid `.env` file at the repository root with the following values:

```env
USER_NAME=your-email@example.com
PASSWORD=yourPassword
RP_UUID=reportPortalAPIKey
```

## Install Dependencies

```bash
npm install
```

## Run the Test
```bash
npm run test:update-profile
```