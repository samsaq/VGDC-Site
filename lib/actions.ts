"use server";

import { load } from "outstatic/server";

export async function getTeamsData() {
  try {
    const db = await load();
    const teams = await db
      .find({
        collection: "teams",
      })
      .project(["title", "content", "coverImage"])
      .toArray();

    return teams;
  } catch (error) {
    console.error("Error fetching teams data:", error);
    return [];
  }
}

export async function getAboutData() {
  try {
    const db = await load();
    const about = await db
      .find({
        collection: "about",
      })
      .project(["title", "content", "coverImage", "slug"])
      .toArray();

    return about;
  } catch (error) {
    console.error("Error fetching about data:", error);
    return [];
  }
}

export async function getGamesData() {
  try {
    const db = await load();
    const games = await db
      .find({
        collection: "games",
      })
      .project(["title", "content", "coverImage", "slug"])
      .toArray();

    return games;
  } catch (error) {
    console.error("Error fetching games data:", error);
    return [];
  }
}

export async function getOfficerData() {
  try {
    const db = await load();
    const games = await db
      .find({
        collection: "officers",
      })
      .project(["title", "content", "coverImage", "slug", "name", "major"])
      .toArray();

    return games;
  } catch (error) {
    console.error("Error fetching officer data:", error);
    return [];
  }
}