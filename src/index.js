import "dotenv/config";
import Server from "@discovery-solutions/json-server";

const server = new Server({
  name: "boilerplate server",
  label: "Boilerplate Server",
  config: {
    port: process.env.PORT,
    type: "rest",
    format: "json",
  },
  entities: [{
    name: "admin",
    alias: "Admin",
    fields: {
      name: {
        type: "string",
        required: true
      },
      email: {
        type: "string",
        required: true
      },
      password: {
        type: "string",
        required: true,
        secure: true,
      }
    },
    auth: {
      type: "jwt",
      fields: ["login", "password"],
      permission: {
        "*": {
          insert: true,
          update: true,
          delete: true,
          list: true,
          get: true,
        }
      }
    }
  }, {
    name: "post",
    alias: "Post",
    fields: {
      title: {
        type: "string",
        required: true
      },
      subtitle: {
        type: "string",
        required: true
      },
      content: {
        type: "string",
        required: true
      },
      category: {
        type: "string",
        required: true
      },
      tags: "object",
    },
    permission: {
      insert: false,
      update: false,
      delete: false,
      list: true,
      get: true,
    }
  }, {
    name: "category",
    alias: "Category",
    fields: {
      label: {
        type: "string",
        required: true
      },
      description: "string",
    },
    permission: {
      insert: false,
      update: false,
      delete: false,
      list: true,
      get: true,
    }
  }]
});

server.setup({
  database: {
    default: "boilerplate-database",
  },
  request: {
    limit: 50
  }
});

server.routes.get("/system/status", (req, res) => {
  res.json({ message: "YEAH! IT'S WORKING!" });
});

server.run();
