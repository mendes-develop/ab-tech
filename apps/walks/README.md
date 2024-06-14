# Video Player Edtech

## Getting Started

To run the development server run te following command:

```bash
pnpm dev
```

If you don't have `pnpm` installed, remove the existing lockfile and install your prefered package manager.
In the example bellow we chose yarn, instead.

```bash
  rm -rf pnpm-lock.yaml
  yarn install
  yarn dev
```

## App Functionality: The website must have the following capabilities:

✅ Show a list of videos and allow users to select a video from the list.

✅ Allow the user to create a new video object with a title, description and a video URL.

✅ A user must be able to comment on a video and view comments from other users.

✅ Open the videos in full screen with full playback functionality.

✅ Include options for adjusting playback speed and volume.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## E2E Tests

-   In order to garantee project reliability, e2e tests was implemented. To run Cypress, make sure your development server is running on [http://localhost:3000](http://localhost:3000) and run the test script on your terminal

```bash
  pnpm test
```

## Learn More

-   [Features Documentation](docs/FEATURES.md)
-   [Stack Documentation](docs/Stack.md)
