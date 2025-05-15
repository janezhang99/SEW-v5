// Fetch the CSV data
const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/XFAiwPkR%20-%20micro-grants-template-board%20%282%29-HIPqBWXiWVl7JyXr10adshBv5GMC3q.csv');
const csvText = await response.text();

// Simple CSV parser
function parseCSV(text) {
  const lines = text.split('\n');
  const headers = lines[0].split(',').map(header => header.replace(/"/g, '').trim());
  
  const results = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    // Handle commas within quoted fields
    let row = [];
    let inQuotes = false;
    let currentValue = '';
    
    for (let char of lines[i]) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row.push(currentValue.replace(/"/g, '').trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    row.push(currentValue.replace(/"/g, '').trim());
    
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j] || null;
    }
    results.push(obj);
  }
  
  return results;
}

const data = parseCSV(csvText);

// Analyze the data structure
const listNames = [...new Set(data.map(item => item['List Name']))].filter(Boolean);
console.log('Lists (Categories):', listNames);

// Count items per list
const itemsPerList = {};
listNames.forEach(list => {
  itemsPerList[list] = data.filter(item => item['List Name'] === list).length;
});
console.log('Items per list:', itemsPerList);

// Sample of card names to understand the content
const sampleCards = {};
listNames.forEach(list => {
  sampleCards[list] = data
    .filter(item => item['List Name'] === list)
    .slice(0, 3)
    .map(item => item['Card Name']);
});
console.log('Sample cards per list:', sampleCards);

// Check for attachments
const cardsWithAttachments = data.filter(item => 
  item['Attachment Count'] && parseInt(item['Attachment Count']) > 0
).length;
console.log('Cards with attachments:', cardsWithAttachments);

// Output a few complete records to understand the structure
console.log('Sample complete records:');
console.log(data.slice(0, 2));
