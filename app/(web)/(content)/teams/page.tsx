"use client";

import { useState, useEffect } from "react";
import { SideNav } from "@/components/sideNav";
import { getTeamsData } from "@/lib/actions";

interface Team {
  title: string;
  content: string;
  coverImage?: string;
  [key: string]: unknown;
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const data = await getTeamsData();
        setTeams(data);
        if (data.length > 0) {
          setSelectedTeam(data[0].title);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);

  // Find the currently selected team
  const currentTeam = teams.find((team) => team.title === selectedTeam);

  //processing for the content of each team - since its markdown
  //we want to pull out of the sub-headers and their content and store them as a
  //list of tuples - [sub-header, headerType, content]
  //headerType is either "h2" or "h3" based on if they have ## or ###
  const processContent = (content: string) => {
    const lines = content.split("\n");
    const processedContent = [];
    let currentSection = null;

    for (const element of lines) {
      const line = element;

      if (line.startsWith("###")) {
        // Create a new h3 section
        currentSection = {
          header: line.slice(3).trim(),
          headerType: "h3",
          content: "",
        };
        processedContent.push(currentSection);
      } else if (line.startsWith("##")) {
        // Create a new h2 section
        currentSection = {
          header: line.slice(2).trim(),
          headerType: "h2",
          content: "",
        };
        processedContent.push(currentSection);
      } else if (line.startsWith("#") && !line.startsWith("##")) {
        // Create a new h1 section
        currentSection = {
          header: line.slice(1).trim(),
          headerType: "h1",
          content: "",
        };
        processedContent.push(currentSection);
      } else if (currentSection && line.trim() !== "") {
        // Add non-empty lines to the current section's content up till the next header
        currentSection.content += (currentSection.content ? "\n" : "") + line;
      }
    }

    return processedContent;
  };

  //for rendering the per-team content of the page
  const renderContent = () => {
    if (loading) {
      return <p>Loading teams...</p>;
    }

    if (!currentTeam) {
      return <p>No team selected</p>;
    }

    const processedSections = processContent(currentTeam.content);

    return (
      <div className="flex h-full w-full flex-col items-center overflow-y-auto">
        <div className="mb-4 flex w-full flex-row items-start justify-evenly gap-6 px-8">
          <div className="flex flex-col items-start">
            <h2 className="mb-2 w-full text-center text-2xl font-bold text-warning-alternative">
              {currentTeam.title}
            </h2>
            {processedSections.length > 0 && (
              <div>
                <h3
                  className={`${
                    processedSections[0].headerType === "h1"
                      ? "text-2xl font-bold"
                      : processedSections[0].headerType === "h2"
                        ? "text-xl font-bold"
                        : "text-lg font-semibold"
                  } mb-1`}
                >
                  {processedSections[0].header}
                </h3>
                <p className="text-sm">{processedSections[0].content}</p>
              </div>
            )}
          </div>
          {currentTeam.coverImage && (
            <img
              src={currentTeam.coverImage}
              alt={currentTeam.title}
              className="aspect-square w-64 rounded-2xl"
            />
          )}
        </div>

        {/* Additional sections below the image */}
        {processedSections.length > 1 && (
          <div className="mt-4 w-full px-8">
            {processedSections.slice(1).map((section, index) => (
              <div key={index} className="mb-6">
                <h3
                  className={`${
                    section.headerType === "h1"
                      ? "text-2xl font-bold"
                      : section.headerType === "h2"
                        ? "text-xl font-bold"
                        : "text-lg font-semibold"
                  } mb-1`}
                >
                  {section.header}
                </h3>
                <p className="text-sm">{section.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="relative z-10 flex h-full w-full flex-row overflow-hidden">
      <div className="flex h-full min-w-[25%]">
        <SideNav
          items={teams.map((team) => ({
            label: team.title,
            href: `#${team.title}`,
          }))}
          onItemSelect={setSelectedTeam}
          defaultSelected={teams[0]?.title}
        />
      </div>

      <div className="flex flex-1 flex-col overflow-auto p-4">
        {renderContent()}
      </div>
    </section>
  );
}
