exports.up = function (knex) {
  return knex.schema
    .createTable("project", (tbl) => {
      tbl.increments("id");
      tbl.string("project_name", 255).unique().notNullable();
      tbl.text("project_description");
      tbl.boolean("isCompleted").defaultsTo(false).notNullable();
    })
    .createTable("task", (tbl) => {
      tbl.increments("id");
      tbl.text("task_description").notNullable();
      tbl.text("task_notes");
      tbl.boolean("isCompleted").defaultsTo(false).notNullable();
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("project")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    })
    .createTable("resource", (tbl) => {
      tbl.increments("id");
      tbl.string("resource_name", 255).unique().notNullable();
      tbl.text("resource_description");
    })
    .createTable("project_resource", (tbl) => {
      tbl.increments("id");
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("project")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      tbl
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resource")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("project_resource")
    .dropTableIfExists("resource")
    .dropTableIfExists("task")
    .dropTableIfExists("project");
};
