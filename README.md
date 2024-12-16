Dummy domain: https://appclip-demo.com/appclip


Generate App Clip code locally:

```
AppClipCodeGenerator generate \
    --url 'https://appclip-demo.com/appclip' \
    --type cam \
    --foreground E0FF31 \
    --background 000000 \
    --output appclip-demo-code.svg

```

QR Code: appclip-demo-qr-code.png (with the dummy domain above).

QR Code generated using: https://www.qr-code-generator.com/


Testing App Clip invocation locally:

1. Go to Settings -> Developer -> App Clips Testing.

2. Click `Local Experiences` -> `Register Local Experience`

3. 
    * Set url prefix with the domain set above (https://appclip-demo.com/appclip)
    * Set the bundle id as: `com.timmyjose.appclipdemo.Clip` (note the `.Clip` at the end!)
    * Set details for the app clip card:
        - Title: Calculator App Clip Demo
        - Subtitle: For all your calculation needs
        - Action: Open (default)

Now scan the App Clip code generated previously, and it should show the App Clip Card.
Clicking `Open` on the App Clip Card should open the app clip.


AppStoreConnect
===============

1. Create an app group for the app and the app clip.
