import { db } from "./index";
import { usersTable } from "./models/user";
import { formsTable } from "./models/forms";
import { formFieldsTable } from "./models/formFields";
import { responsesTable } from "./models/responses";
import { answersTable } from "./models/answers";
import crypto from "crypto";

async function seed() {
  console.log("Seeding database...");

const salt = crypto.randomBytes(16).toString("hex");

function generateHash(salt: string, password: string) {
  return crypto
    .createHmac("sha256", salt)
    .update(password)
    .digest("hex");
}

const hashedPassword = generateHash(salt, "password123");

const [user] = await db
  .insert(usersTable)
  .values({
    email: "demo@test.com",
    password: hashedPassword,
    salt: salt,
    fullName: "Demo User",
  })
  .onConflictDoNothing()
  .returning();

  if (!user) {
    console.log("User already exists, skipping seed...");
    return;
  }

  console.log("Demo user created");

  const [startupForm] = await db
    .insert(formsTable)
    .values({
      title: "Startup Feedback",
      description: "Collect insights from early users and founders",
      creatorId: user.id,
      isPublished: true,
      visibility: "PUBLIC",
    })
    .returning();

  const startupFields = await db
    .insert(formFieldsTable)
    .values([
      {
        formId: startupForm.id,
        label: "What problem are you solving?",
        type: "TEXTAREA",
        required: true,
        order: 1,
      },
      {
        formId: startupForm.id,
        label: "Startup Stage",
        type: "SELECT",
        options: JSON.stringify(["Idea", "MVP", "Growth", "Scaling"]),
        required: true,
        order: 2,
      },
      {
        formId: startupForm.id,
        label: "Monthly Active Users",
        type: "NUMBER",
        required: false,
        order: 3,
      },
    ])
    .returning();

  const [startupResponse] = await db
    .insert(responsesTable)
    .values({
      formId: startupForm.id,
    })
    .returning();

  await db.insert(answersTable).values([
    {
      responseId: startupResponse.id,
      fieldId: startupFields[0].id,
      value: "AI-powered resume builder for students",
    },
    {
      responseId: startupResponse.id,
      fieldId: startupFields[1].id,
      value: "MVP",
    },
    {
      responseId: startupResponse.id,
      fieldId: startupFields[2].id,
      value: "1200",
    },
  ]);

  console.log("Startup form seeded");

  const [animeForm] = await db
    .insert(formsTable)
    .values({
      title: "Anime Survey",
      description: "Understand anime preferences and watch habits",
      creatorId: user.id,
      isPublished: true,
      visibility: "PUBLIC",
    })
    .returning();

  const animeFields = await db
    .insert(formFieldsTable)
    .values([
      {
        formId: animeForm.id,
        label: "Favorite Anime",
        type: "TEXT",
        required: true,
        order: 1,
      },
      {
        formId: animeForm.id,
        label: "Preferred Genre",
        type: "SELECT",
        options: JSON.stringify([
          "Shonen",
          "Seinen",
          "Isekai",
          "Romance",
          "Slice of Life",
        ]),
        required: true,
        order: 2,
      },
      {
        formId: animeForm.id,
        label: "Rating (1-10)",
        type: "NUMBER",
        required: true,
        order: 3,
      },
    ])
    .returning();

  const [animeResponse] = await db
    .insert(responsesTable)
    .values({
      formId: animeForm.id,
    })
    .returning();

  await db.insert(answersTable).values([
    {
      responseId: animeResponse.id,
      fieldId: animeFields[0].id,
      value: "Attack on Titan",
    },
    {
      responseId: animeResponse.id,
      fieldId: animeFields[1].id,
      value: "Shonen",
    },
    {
      responseId: animeResponse.id,
      fieldId: animeFields[2].id,
      value: "9",
    },
  ]);

  console.log("Anime form seeded");

  const [hackathonForm] = await db
    .insert(formsTable)
    .values({
      title: "Hackathon Registration",
      description: "Register for FormVerse Hackathon 2026",
      creatorId: user.id,
      isPublished: true,
      visibility: "PUBLIC",
    })
    .returning();

  const hackathonFields = await db
    .insert(formFieldsTable)
    .values([
      {
        formId: hackathonForm.id,
        label: "Full Name",
        type: "TEXT",
        required: true,
        order: 1,
      },
      {
        formId: hackathonForm.id,
        label: "Email",
        type: "EMAIL",
        required: true,
        order: 2,
      },
      {
        formId: hackathonForm.id,
        label: "Experience Level",
        type: "SELECT",
        options: JSON.stringify(["Beginner", "Intermediate", "Advanced"]),
        required: true,
        order: 3,
      },
      {
        formId: hackathonForm.id,
        label: "Why do you want to join?",
        type: "TEXTAREA",
        required: false,
        order: 4,
      },
    ])
    .returning();

  const [hackathonResponse] = await db
    .insert(responsesTable)
    .values({
      formId: hackathonForm.id,
    })
    .returning();

  await db.insert(answersTable).values([
    {
      responseId: hackathonResponse.id,
      fieldId: hackathonFields[0].id,
      value: "Tejas dev",
    },
    {
      responseId: hackathonResponse.id,
      fieldId: hackathonFields[1].id,
      value: "demo@test.com",
    },
    {
      responseId: hackathonResponse.id,
      fieldId: hackathonFields[2].id,
      value: "Intermediate",
    },
    {
      responseId: hackathonResponse.id,
      fieldId: hackathonFields[3].id,
      value: "To build real-world SaaS experience",
    },
  ]);


  console.log("Seed completed successfully");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });