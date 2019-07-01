This helps you setup your own BOT integration with Zoho/Vertical CRM on the Platform.


1. Create a Bot in DialogFlow first and follow these steps

https://cloud.google.com/video-intelligence/docs/common/auth


https://dialogflow.com/docs/reference/v2-auth-setup



2. The json file has to be downloaded as it has the credentials

We can create as many Intents as we want but we can only create a single
fulfillment. So we need to write the Fulfillment code such that we are 
able to address the requirements properly.

3. Run server.js as that is the server and link this to the Widget in the VCRM

When you start the VCRM, this widget will be loaded.


4. Go to chatbot folder. Run the chatbot.js file and then run the ngrok
get the ngrok details and paste in the Fulfillment section in DialogFlow.

5. Now you have linked your Bot to the Vertical CRM on the Platform.

6. I have linked this to imdb. So signup and get a key. Set the key value in the apiKey.js file.

7. Now launch the Widget from the Detail View (that is where I did it from) and ask the bot any movie
related queries like, say, How is Superman?
You will get a response back from the Bot and that can then be snapped as an image and stored in the CRM
as an attachment.

8. I have used a 3rd party for taking the snapshot. It is called https://html2canvas.hertzen.com/. Kudos to the developer!

And don't forget to place your Branding and Price and to publish it!

Enjoy
