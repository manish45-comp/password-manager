import express, { json } from "express";
const app = express();
const port = 3001;
import cors from "cors";
import fs from "fs";

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("<h1>Hello, this is your Express server!</h1>");
});

app.post("/saveData", (req, res) => {
  const newData = req.body;

  // Read existing data from file
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error reading data" });
    }

    let jsonData = [];
    if (data) {
      try {
        // If file contains data, parse it
        jsonData = JSON.parse(data);
        if (!Array.isArray(jsonData)) {
          throw new Error("Data is not an array");
        }
      } catch (parseError) {
        console.error("Error parsing JSON data:", parseError);
        return res
          .status(500)
          .json({ success: false, message: "Error parsing data" });
      }
    }

    // Append new data to existing data array
    jsonData.push(newData);

    // Write updated data to JSON file
    const jsonString = JSON.stringify(jsonData);
    fs.writeFile("data.json", jsonString, "utf8", (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return res
          .status(500)
          .json({ success: false, message: "Error saving data" });
      } else {
        console.log("Data saved successfully");
        return res
          .status(200)
          .json({ success: true, message: "Data saved successfully" });
      }
    });
  });
});

// Endpoint to fetch passwords from data.json
app.get("/fetchPasswords", (req, res) => {
  // Read data from file
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error reading data" });
    }

    let jsonData = [];
    if (data) {
      try {
        // If file contains data, parse it
        jsonData = JSON.parse(data);
        if (!Array.isArray(jsonData)) {
          throw new Error("Data is not an array");
        }
      } catch (parseError) {
        console.error("Error parsing JSON data:", parseError);
        return res
          .status(500)
          .json({ success: false, message: "Error parsing data" });
      }
    }

    return res.status(200).json({ success: true, passwords: jsonData });
  });
});

// Endpoint to delete password from data.json
app.delete("/deletePassword/:id", (req, res) => {
  const passwordId = req.params.id;

  // Read data from file
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error reading data" });
    }

    let jsonData = [];
    if (data) {
      try {
        // If file contains data, parse it
        jsonData = JSON.parse(data);
        if (!Array.isArray(jsonData)) {
          throw new Error("Data is not an array");
        }
      } catch (parseError) {
        console.error("Error parsing JSON data:", parseError);
        return res
          .status(500)
          .json({ success: false, message: "Error parsing data" });
      }

      // Find index of password with provided ID
      const index = jsonData.findIndex(
        (password) => password.id === passwordId
      );
      if (index !== -1) {
        // Remove password from array
        jsonData.splice(index, 1);

        // Write updated data to JSON file
        const jsonString = JSON.stringify(jsonData);
        fs.writeFile("data.json", jsonString, "utf8", (err) => {
          if (err) {
            console.error("Error writing to file:", err);
            return res
              .status(500)
              .json({ success: false, message: "Error saving data" });
          } else {
            console.log("Password deleted successfully");
            return res.status(200).json({
              success: true,
              message: "Password deleted successfully",
            });
          }
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Password not found" });
      }
    }
  });
});

// Endpoint to toggle favorite status of password in data.json
app.put("/toggleFavorite/:id", (req, res) => {
  const passwordId = req.params.id;

  // Read data from file
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error reading data" });
    }

    let jsonData = [];
    if (data) {
      try {
        // If file contains data, parse it
        jsonData = JSON.parse(data);
        if (!Array.isArray(jsonData)) {
          throw new Error("Data is not an array");
        }
      } catch (parseError) {
        console.error("Error parsing JSON data:", parseError);
        return res
          .status(500)
          .json({ success: false, message: "Error parsing data" });
      }

      // Find password with provided ID
      const password = jsonData.find((password) => password.id === passwordId);
      if (password) {
        // Toggle favorite status
        password.favorite = !password.favorite;

        // Write updated data to JSON file
        const jsonString = JSON.stringify(jsonData);
        fs.writeFile("data.json", jsonString, "utf8", (err) => {
          if (err) {
            console.error("Error writing to file:", err);
            return res
              .status(500)
              .json({ success: false, message: "Error saving data" });
          } else {
            console.log("Favorite status toggled successfully");
            return res.status(200).json({
              success: true,
              message: "Favorite status toggled successfully",
            });
          }
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Password not found" });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
