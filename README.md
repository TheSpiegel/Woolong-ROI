# Woolong ROI

Woolong ROI is a mobile app I built to help eBay and marketplace sellers track their exact net profits. 

### The Backstory
My dad is an active eBay seller. Watching him source inventory at thrift stores, I realized that trying to calculate true profit margins on the fly is a massive pain. You have to factor in item costs, shipping, and constantly shifting eBay category fees. Spreadsheets are clunky to use on a phone while walking down an aisle, so I built this to solve his exact problem. 

(The name is a nod to the currency used in *Cowboy Bebop*, but the tool itself is all business).

### How It Works (The Math Engine)
The core of this app is what I call the "Bebop Engine." I completely separated the math logic from the visual interface. 

eBay has weird, highly specific fee structures (like an 8% discount for sneakers over $150, or a $7,500 maximum fee cap for luxury watches). I isolated all of those variables into a central `fee_config.json`. This way, when eBay inevitably changes their policies next year, I only have to update a single file rather than tearing apart my React components. 

### The Tech Stack
I built this for my Senior CS Capstone to prove I can handle a full-stack, mobile-first environment:

* **Frontend:** Built with **Expo (React Native)**. Resellers need a fast, tactile app they can use with one hand. A standard web app just wasn't going to cut it.
* **Styling:** **NativeWind** (Tailwind CSS) to keep the UI clean and the codebase uncluttered. 
* **Backend & Database:** **Supabase (PostgreSQL)**. I needed a true relational database to link user inventory with category fees. I chose this over a NoSQL option like Firebase because document databases get messy fast with relational data.
* **Security:** I'm using Supabase's built-in Row Level Security (RLS) to ensure every user's financial data is completely isolated.

### What's Next
Right now, the app is a rock-solid manual calculator. Moving forward, I am working on:
* **eBay API Integration:** Syncing live sales data directly to the app.
* **OCR Scanning:** Using the phone's camera to scan physical receipts and auto-fill the "Cost of Goods" data.
* **Tax Exports:** Generating a simple CSV at the end of the year so my dad can just hand it to his accountant.

---
**Matthew Spiegel** *Southern Nazarene University - Senior CS Capstone (2026)*