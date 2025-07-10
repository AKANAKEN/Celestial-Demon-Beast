const express = require("express");
const os = require("os");
const osu = require("os-utils");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/status", (req, res) => {
    osu.cpuUsage((cpu) => {
        const memUsage = (1 - os.freemem() / os.totalmem()) * 100;
        const storageUsage = Math.random() * 100; // Simulasi karena Node.js tidak punya API bawaan
        const netSpeed = Math.random() * 100; // Simulasi kecepatan internet

        res.json({
            cpu: (cpu * 100).toFixed(2),
            ram: memUsage.toFixed(2),
            storage: storageUsage.toFixed(2),
            internet: netSpeed.toFixed(2),
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
