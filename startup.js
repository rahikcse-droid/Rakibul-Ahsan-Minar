const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env.local") });

const createAdmin = require("./scripts/create-admin");
const seedData = require("./scripts/seed-data");

async function initializeDatabase() {
  console.log("Initializing database...");

  try {
    await createAdmin();
    await seedData();
    console.log("Database initialization completed!");
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
}

// Run initialization then start Next.js
initializeDatabase().then(() => {
  const { spawn } = require("child_process");
  console.log("Starting Next.js development server...");

  const child = spawn("npx", ["next", "dev"], {
    stdio: "inherit",
    shell: true,
  });

  child.on("error", (error) => {
    console.error("Error starting development server:", error);
  });
});
