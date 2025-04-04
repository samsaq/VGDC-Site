"use server";

import { getDocuments } from "outstatic/server";

export async function getTeamsData() {
  const teams = getDocuments("teams", ["title", "content", "coverImage"]);
  return teams;
}
export async function getAboutData(){
  const about = getDocuments("about", ["title", "content", "coverImage"]);
  return about;
}