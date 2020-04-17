const express = require("express");

const db = require("./data/db-config");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send({ message: `welcome` });
});

server.get("/api/resources", async (req, res) => {
  try {
    const resources = await db("resource");
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

server.post("/api/resources", async (req, res) => {
  try {
    const ids = await db("resource").insert(req.body);
    const id = ids[0];
    const newResource = await db("resource").where({ id }).first();
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

server.get("/api/projects", async (req, res) => {
  try {
    const projects = await db("project");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

server.post("/api/projects", async (req, res) => {
  try {
    const ids = await db("project").insert(req.body);
    const id = ids[0];
    const newProject = await db("project").where({ id }).first();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

server.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await db("task")
      .select("*")
      .from("task")
      .join("project", "task.project_id", "project.id")
      .select("project.project_name", "project.project_description");
    res.status(201).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

server.post("/api/tasks", async (req, res) => {
  try {
    const ids = await db("task").insert(req.body);
    const id = ids[0];
    const newTask = await db("task").where({ id }).first();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = server;
