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

  const renderContent = () => {
    if (loading) {
      return <p>Loading teams...</p>;
    }

    if (!currentTeam) {
      return <p>No team selected</p>;
    }

    return (
      <div>
        <h2>{currentTeam.title}</h2>
        <p>{currentTeam.content}</p>
        {currentTeam.coverImage && (
          <img
            src={currentTeam.coverImage}
            alt={currentTeam.title}
            className="aspect-auto max-w-64"
          />
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
        <h1 className="py-4 text-center text-4xl font-bold">Teams</h1>
        {renderContent()}
      </div>
    </section>
  );
}
