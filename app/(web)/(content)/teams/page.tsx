"use client";

import { useState, useEffect } from "react";
import { SideNavAlt } from "@/components/sideNav-Alt";
import { getTeamsData } from "@/lib/actions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AnimatedContent } from "@/components/AnimatedContent";

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
      return <p className="text-lg md:text-xl lg:text-2xl">Loading teams...</p>;
    }

    if (!currentTeam) {
      return <p className="text-lg md:text-xl lg:text-2xl">No team selected</p>;
    }

    // Custom components for ReactMarkdown with tailwind styling
    const components = {
      h1: ({ ...props }) => (
        <h1
          className="mb-3 text-2xl font-bold md:text-3xl lg:text-4xl"
          {...props}
        />
      ),
      h2: ({ ...props }) => (
        <h2
          className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl"
          {...props}
        />
      ),
      h3: ({ ...props }) => (
        <h3
          className="mb-2 text-lg font-semibold md:text-xl lg:text-2xl"
          {...props}
        />
      ),
      p: ({ ...props }) => (
        <p className="mb-4 text-base md:text-lg lg:text-xl" {...props} />
      ),
      // Improve list rendering
      ul: ({ ...props }) => (
        <ul
          className="mb-4 list-disc space-y-2 pl-5 text-base md:space-y-3 md:text-lg lg:text-xl"
          {...props}
        />
      ),
      ol: ({ ...props }) => (
        <ol
          className="mb-4 list-decimal space-y-2 pl-5 text-base md:space-y-3 md:text-lg lg:text-xl"
          {...props}
        />
      ),
      li: ({ ...props }) => (
        <li className="text-base md:text-lg lg:text-xl" {...props} />
      ),
      // Improve blockquote styling
      blockquote: ({ ...props }) => (
        <blockquote
          className="my-4 border-l-4 border-gray-300 pl-4 text-base italic md:text-lg lg:text-xl"
          {...props}
        />
      ),
      // Better code block styling
      code: ({ ...props }) => (
        <code
          className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm md:text-base lg:text-lg"
          {...props}
        />
      ),
      pre: ({ ...props }) => (
        <pre
          className="my-4 overflow-x-auto rounded bg-gray-100 p-3 font-mono text-sm md:text-base lg:text-lg"
          {...props}
        />
      ),
      // Improve table styling
      table: ({ ...props }) => (
        <div className="my-4 overflow-x-auto">
          <table
            className="min-w-full divide-y divide-gray-300 text-sm md:text-base lg:text-lg"
            {...props}
          />
        </div>
      ),
      thead: ({ ...props }) => <thead className="bg-gray-100" {...props} />,
      th: ({ ...props }) => (
        <th
          className="px-3 py-2 text-left font-semibold md:px-4 md:py-3 lg:px-5 lg:py-4"
          {...props}
        />
      ),
      td: ({ ...props }) => (
        <td
          className="border-t border-gray-200 px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:py-4"
          {...props}
        />
      ),
      img: ({ ...props }) => (
        <img
          className="rounded-4xl p-4 align-middle md:p-6 lg:p-8"
          {...props}
        />
      ),
      a: ({ ...props }) => (
        <a
          className="md:decoration-3 underline decoration-warning-alternative decoration-2 underline-offset-2 transition-colors hover:text-warning-alternative lg:decoration-4"
          {...props}
        />
      ),
    };

    return (
      <div className="flex h-full w-full flex-col items-center overflow-y-auto">
        <AnimatedContent uniqueKey={currentTeam.title}>
          <div className="w-full">
            <h2 className="mb-4 w-full text-center text-3xl font-bold text-warning-alternative md:mb-6 md:text-4xl lg:mb-8 lg:text-5xl xl:text-6xl">
              {currentTeam.title}
            </h2>

            {currentTeam.coverImage ? (
              <>
                {/* Check if content has any headers */}
                {/^#{1,3}\s.+$/m.test(currentTeam.content) ? (
                  <>
                    <div className="mb-8 flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8 lg:gap-10">
                      <div className="prose prose-base md:prose-lg lg:prose-xl order-2 w-full md:order-1 md:flex-1">
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
                        className="order-1 mx-auto mb-4 aspect-square w-full max-w-sm shrink-0 rounded-2xl md:order-2 md:mx-4 md:mb-0 md:w-64 lg:w-80 xl:w-96"
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
                              <div className="prose prose-base md:prose-lg lg:prose-xl w-full">
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
                    <div className="mb-8 flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8 lg:gap-10">
                      <div className="prose prose-base md:prose-lg lg:prose-xl order-2 w-full md:order-1 md:flex-1">
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
                        className="order-1 mx-auto mb-4 aspect-square w-full max-w-sm shrink-0 rounded-2xl md:order-2 md:mx-4 md:mb-0 md:w-64 lg:w-80 xl:w-96"
                      />
                    </div>
                    {currentTeam.content.split(/\s+/).length > 50 && (
                      <div className="prose prose-base md:prose-lg lg:prose-xl w-full">
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
              <div className="prose prose-base prose-ul:pl-0 prose-ol:pl-0 prose-li:pl-0 prose-table:my-0 md:prose-lg lg:prose-xl w-full max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={components}
                >
                  {currentTeam.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </AnimatedContent>
      </div>
    );
  };

  return (
    <section className="relative z-10 flex h-full w-full flex-row overflow-hidden">
      <div className="h-full w-[70px] min-w-[70px] sm:w-auto sm:min-w-[20%] lg:min-w-[18%] xl:min-w-fit">
        <SideNavAlt
          items={teams.map((team) => ({
            label: team.title,
            href: `#${team.title}`,
          }))}
          onItemSelect={setSelectedTeam}
          defaultSelected={teams[0]?.title}
          colorOnHover="#3F746E"
        />
      </div>

      <div className="flex flex-1 flex-col overflow-auto p-4 md:p-6 lg:p-8">
        {renderContent()}
      </div>
    </section>
  );
}
