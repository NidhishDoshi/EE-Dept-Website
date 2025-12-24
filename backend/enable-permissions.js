const { createStrapi } = require("@strapi/strapi");

async function enablePermissions() {
  console.log("Starting Strapi to update permissions...");
  const strapi = await createStrapi().load();

  try {
    // 1. Find the Public role
    const publicRole = await strapi
      .db.query("plugin::users-permissions.role")
      .findOne({
        where: { type: "public" },
      });

    if (!publicRole) {
      console.error("Public role not found");
      process.exit(1);
    }

    console.log(`Found Public role with ID: ${publicRole.id}`);

    // 2. Get all API content types
    const apiContentTypes = Object.keys(strapi.contentTypes).filter((uid) =>
      uid.startsWith("api::")
    );

    console.log("Found API Content Types:", apiContentTypes);

    // 3. Define actions to enable
    const actionsToEnable = [];

    // For standard content types, enable find and findOne
    for (const uid of apiContentTypes) {
      actionsToEnable.push(`${uid}.find`);
      actionsToEnable.push(`${uid}.findOne`);
    }

    // Add custom controller actions
    actionsToEnable.push("api::fuzzy-search.fuzzy-search.search");

    // 4. Enable permissions
    let enabledCount = 0;
    for (const action of actionsToEnable) {
      const existing = await strapi
        .db.query("plugin::users-permissions.permission")
        .findOne({
          where: {
            action: action,
            role: publicRole.id,
          },
        });

      if (!existing) {
        await strapi.db.query("plugin::users-permissions.permission").create({
          data: {
            action: action,
            role: publicRole.id,
          },
        });
        console.log(`Enabled permission: ${action}`);
        enabledCount++;
      }
    }

    console.log(`\nSuccessfully enabled ${enabledCount} new permissions.`);
    console.log("You can now restart the server with 'npm run develop'");

  } catch (error) {
    console.error("Error updating permissions:", error);
  } finally {
    strapi.stop();
    process.exit(0);
  }
}

enablePermissions();
