# Basketball Scraper

A web scraper built using Puppeteer that collects player statistics from the website Basketball-Reference.

## Installation

1. Clone the repository
git clone https://github.com/chufurd/basketball-reference-scrapper.git

2. Install the required dependencies
npm install

3. Run the script
node index.js


## Usage
The script will scrape player statistics from the website and save the data in a JSON file named `players.json` in the root of the project.
You can also configure the script to save the data to a MongoDB database by replacing the `saveToJSON` function with the appropriate MongoDB code.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- [Puppeteer](https://github.com/puppeteer/puppeteer) for automating the browser and scraping the website.
- [Basketball-Reference](https://www.basketball-reference.com/) for providing the player statistics.
