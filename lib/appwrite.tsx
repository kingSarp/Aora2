import SignIn from "@/app/(auth)/sign-in";
import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.foundation.aora",
  projectId: "66a7d22d0028b1595ba9",
  databaseId: "66a7d3ec00334e7d43d0",
  userCollectionId: "66a7d4c3002fe487f362",
  videoCollectionID: "66a7d4ea0023151cc7f7",
  storageId: "66a7d73f000d40a1fe24",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);

// Register User
//functions uses interfaces whiles types goes with component , also react.fc is for componenet
export const createUser = async ({ email, password, name }: userProps) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);

    if (!newAccount) {
      throw new Error("Failed to create a new account");
    }
    const avatarUrl = avatars.getInitials();

      // Check if there's an active session and clear it
      const sessions = await account.listSessions();
      if (sessions.total > 0) {
        for (const session of sessions.sessions) {
          await account.deleteSession(session.$id);
        }
      }

    await signIn({email, password});

    const newUser = await database.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username: name,
        email: email,
        avatar: avatarUrl,
      }
    )
    return newUser;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating user:", error.message);
      throw new Error("Failed to create user: " + error.message);
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error signing user:", error.message);
      throw new Error("Failed to sign in user: " + error.message);
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
