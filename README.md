# Truck Manager User Interface (UI)

Truck Manager is a personal project designed for managing the in-house operations of Tnuchaporn company. Unauthorized use of this project may result in prohibition.

## Getting Started

1. Run `npm i` to install the necessary packages.
2. Run `npm run dev` to start the application.

## Deploying the Application

- [Demo](https://tnuchaporn-truckmanager--demo-98o3rwr3.web.app)
- [Prod](https://tnuchaporn-truckmanager.web.app)

1. Run `npm run build` to package all assets into the `dist` directory.
2. Run `npm run preview` to see how it will look on the production environment.
3. Create a pull request (PR) to the `main` branch.
   - Wait for the `Deploy Preview Version` to run successfully. The application will be deployed to the [Demo](https://tnuchaporn-truckmanager--demo-98o3rwr3.web.app) link.
4. After the merge is complete:
   - The application will be deployed to the [Prod](https://tnuchaporn-truckmanager.web.app) link.

## Known Issue

### Debugging Demo Site Not Working

1. Check the workflow `Deploy Preview Version` to see if the `details_url` has changed.
2. If it has changed, remove the previous `details_url`.
3. Inside `Run: FirebaseExtended/action-hosting-deploy@v0`, you will find `details_url: 'https://tnuchaporn-truckmanager--demo-xxxxxxxx.web.app'`.
4. Add the updated `details_url` to both `Authorized JavaScript origins` and `Authorized redirect URIs` by accessing the [Google Cloud Console](https://console.cloud.google.com/apis/credentials/oauthclient/122246639521-9lag1a2kpgqssjd56lukmb6r8qrs3gbb.apps.googleusercontent.com?project=tnuchaporn-truckmanager).
5. Wait a few seconds. Note: It might take 5 minutes to a few hours for the settings to take effect.
6. Access the site again.
