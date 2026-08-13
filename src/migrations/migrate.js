//migrate.js

// This script runs all the migration files in the migrations folder to set up the database schema.
require("dotenv").config();
const fs=require("fs");
const path=require("path");
const db=require("../config/db");
async function runMigrations(){
    try{
        const migrationsPath = __dirname;
        // Read and sort all SQL migration files
        const files=fs.readdirSync(migrationsPath).filter(file=>file.endsWith(".sql")).sort();
        for(const file of files){
             // Read and execute each migration file
            const filePath=path.join(migrationsPath, file);
            const sql=fs.readFileSync(filePath, "utf-8");
            await db.query(sql);
            console.log(`Migration ${file} executed successfully`);
           

        }
        console.log("All migrations executed successfully");
    }
    catch(error){
        console.error("Error occurred while running migrations:", error);
    }
    finally{
        await db.end();
    }
}
runMigrations();