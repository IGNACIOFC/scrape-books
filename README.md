# scrape-books
PDF Book Downloader
This script downloads PDF books from PDFDrive using the Playwright library.

Dependencies
Before running the script, make sure to install the required dependencies:

sql
Copy code
npm install playwright node-fetch
Usage
Replace the bookLink and bookTitle variables with the desired book link and title, respectively.
javascript
Copy code
const bookLink = '/example-book-link.html';
const bookTitle = 'Example Book Title';
Run the script using Node.js:
Copy code
node your_script_file_name.js
The script will download the PDF and save it in a new downloads directory.

How it works
The script performs the following steps:

Launches a new Playwright browser instance.
Navigates to the book page on PDFDrive.
Clicks the download button and waits for 12 seconds.
Retrieves the intermediate download link.
Fetches the PDF file using the intermediate download link.
Saves the PDF file in the downloads directory.
Closes the browser instance.
Note
This script is designed to work with the specific structure of PDFDrive. Changes to the website may cause the script to stop working. If that happens, you'll need to update the script to match the new structure.
