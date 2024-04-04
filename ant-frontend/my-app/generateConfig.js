const fs = require('fs');

if (fs.existsSync('src/config.josn')) {
    return;
} else {
    const apiKey = 'YOUR_API_KEY';
    const someOtherValue = 3.14;
    const someOtherOtherValue = 'Hello, World!';

    const configContent = JSON.stringify({
        apiKey,
        someOtherValue,
        someOtherOtherValue,
    }, null, 2);
    fs.writeFileSync('src/config.json', configContent);
}