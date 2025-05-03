"use client";

import { useState, useEffect } from "react";
import { SideNav } from "@/components/sideNav";
import { getTeamsData } from "@/lib/actions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { image } from "@nextui-org/theme";

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

  //for rendering the per-team content of the page
  const renderContent = () => {
    if (loading) {
      return <p>Loading teams...</p>;
    }

    if (!currentTeam) {
      return <p>No team selected</p>;
    }

    // Custom components for ReactMarkdown with tailwind styling
    const components = {
      h1: ({ ...props }) => (
        <h1 className="mb-2 text-2xl font-bold" {...props} />
      ),
      h2: ({ ...props }) => (
        <h2 className="mb-1 text-xl font-bold" {...props} />
      ),
      h3: ({ ...props }) => (
        <h3 className="mb-1 text-lg font-semibold" {...props} />
      ),
      // Improve list rendering
      ul: ({ ...props }) => (
        <ul className="mb-4 list-disc space-y-1 pl-5" {...props} />
      ),
      ol: ({ ...props }) => (
        <ol className="mb-4 list-decimal space-y-1 pl-5" {...props} />
      ),
      // Improve blockquote styling
      blockquote: ({ ...props }) => (
        <blockquote
          className="my-4 border-l-4 border-gray-300 pl-4 italic"
          {...props}
        />
      ),
      // Better code block styling
      code: ({ ...props }) => (
        <code
          className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm"
          {...props}
        />
      ),
      pre: ({ ...props }) => (
        <pre
          className="my-4 overflow-x-auto rounded bg-gray-100 p-3 font-mono text-sm"
          {...props}
        />
      ),
      // Improve table styling
      table: ({ ...props }) => (
        <div className="my-4 overflow-x-auto">
          <table
            className="min-w-full divide-y divide-gray-300 text-sm"
            {...props}
          />
        </div>
      ),
      thead: ({ ...props }) => <thead className="bg-gray-100" {...props} />,
      th: ({ ...props }) => (
        <th className="px-3 py-2 text-left font-semibold" {...props} />
      ),
      td: ({ ...props }) => (
        <td className="border-t border-gray-200 px-3 py-2" {...props} />
      ),
      img: ({ ...props }) => (
        <img className="rounded-4xl p-8 align-middle" {...props} />
      ),
    };

    return (
      <div className="flex h-full w-full flex-col items-center overflow-y-auto">
        <div className="w-full">
          <h2 className="mb-4 w-full text-center text-4xl font-bold text-warning-alternative">
            {currentTeam.title}
          </h2>

          {currentTeam.coverImage ? (
            <>
              {/* Check if content has any headers */}
              {/^#{1,3}\s.+$/m.test(currentTeam.content) ? (
                <>
                  <div className="mb-8 flex flex-col items-center gap-6 md:flex-row md:items-start">
                    <div className="prose prose-sm order-2 w-full md:order-1 md:flex-1">
                      {/* Display text up to the first heading */}
                      {currentTeam.content.match(/^[^#].*$/m) && (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={components}
                        >
                          {currentTeam.content.split(/^#{1,3}\s.+$/m)[0]}
                        </ReactMarkdown>
                      )}

                      {/* Display first heading and its content */}
                      {(() => {
                        const regex = /^#{1,3}\s.+$/m;
                        const match = regex.exec(currentTeam.content);
                        if (match) {
                          const firstHeading = match[0];
                          const parts = currentTeam.content.split(regex);
                          return (
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={components}
                            >
                              {firstHeading + "\n" + (parts[1] || "")}
                            </ReactMarkdown>
                          );
                        }
                        return null;
                      })()}
                    </div>
                    <img
                      src={currentTeam.coverImage}
                      alt={currentTeam.title}
                      className="order-1 mx-auto mb-4 aspect-square w-full max-w-[250px] shrink-0 rounded-2xl md:order-2 md:mx-4 md:mb-0 md:w-72"
                    />
                  </div>

                  {/* Display remaining headings and content */}
                  {(() => {
                    const regex = /^#{1,3}\s.+$/gm;
                    const matches = currentTeam.content.match(regex);
                    if (matches && matches.length > 1) {
                      // Get all content after the first header and its content
                      const firstHeaderRegex = /^#{1,3}\s.+$/m;
                      const firstMatch = firstHeaderRegex.exec(
                        currentTeam.content,
                      );

                      if (firstMatch) {
                        const firstHeaderPos = firstMatch.index;
                        const firstHeaderEndPos =
                          firstHeaderPos + firstMatch[0].length;

                        // Find the position of the second header
                        const afterFirstHeader =
                          currentTeam.content.substring(firstHeaderEndPos);
                        const secondHeaderMatch = /^#{1,3}\s.+$/m.exec(
                          afterFirstHeader,
                        );

                        if (secondHeaderMatch) {
                          const secondHeaderPos =
                            firstHeaderEndPos + secondHeaderMatch.index;
                          // Get everything after the first header's content
                          const remainingContent =
                            currentTeam.content.substring(secondHeaderPos);

                          return (
                            <div className="prose prose-sm w-full">
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={components}
                              >
                                {remainingContent}
                              </ReactMarkdown>
                            </div>
                          );
                        }
                      }
                    }
                    return null;
                  })()}
                </>
              ) : (
                /* No headers - show content split by word count - defaults to 50 */
                <>
                  <div className="mb-8 flex flex-col items-center gap-6 md:flex-row md:items-start">
                    <div className="prose prose-sm order-2 w-full md:order-1 md:flex-1">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={components}
                      >
                        {currentTeam.content.split(/\s+/).length > 50
                          ? currentTeam.content
                              .split(/\s+/)
                              .slice(0, 50)
                              .join(" ") + "..."
                          : currentTeam.content}
                      </ReactMarkdown>
                    </div>
                    <img
                      src={currentTeam.coverImage}
                      alt={currentTeam.title}
                      className="order-1 mx-auto mb-4 aspect-square w-full max-w-[250px] shrink-0 rounded-2xl md:order-2 md:mx-4 md:mb-0 md:w-64"
                    />
                  </div>
                  {currentTeam.content.split(/\s+/).length > 50 && (
                    <div className="prose prose-sm w-full">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={components}
                      >
                        {currentTeam.content.split(/\s+/).slice(50).join(" ")}
                      </ReactMarkdown>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            /* No image - render content at full width */
            <div className="prose prose-sm prose-ul:pl-0 prose-ol:pl-0 prose-li:pl-0 prose-table:my-0 w-full max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={components}
              >
                {currentTeam.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="relative z-10 flex h-full w-full flex-row overflow-hidden">
      <div className="h-full w-[70px] min-w-[70px] sm:w-auto sm:min-w-[25%]">
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
