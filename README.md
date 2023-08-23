# Truck Manager UI

Truck Manager is a personal project designed to manage the in-house work of Tnuchaporn company. Unauthorized use of this project may result in a prohibition.

## Getting Started

1. Run `npm i` to install packages
2. Run `npm run dev` to start application

## Deploy Application

1. Run `npm run build` to pack all assets to `dist`
2. Run `npm run preview` to see how it look like on production
3. Create PR to main
   - Waiting `Deploy Preview Version` to run successful
   - In `Run: FirebaseExtended/action-hosting-deploy@v0`, you will see `details_url: 'https://tnuchaporn-truckmanager--demo-98o3rwr3.web.app'`
   - Add `details_url value` in `Authorized JavaScript origins` and `Authorized redirect URIs` by open [Google Cloud Console](https://console.cloud.google.com/apis/credentials/oauthclient/122246639521-9lag1a2kpgqssjd56lukmb6r8qrs3gbb.apps.googleusercontent.com?project=tnuchaporn-truckmanager)
   - Waiting a few second
     > Note: It may take 5 minutes to a few hours for settings to take effect
   - Go to that site
4. After merge
    - Application will deploy to [Prod](https://tnuchaporn-truckmanager.web.app)
    - Remove unused `details_url`
