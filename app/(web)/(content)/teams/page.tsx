import { load } from "outstatic/server";

async function getTeamsData() {
  const db = await load();
  const teams = db
    .find({
      collection: "teams",
    })
    .sort({
      title: 1,
    })
    .toArray();

  console.log(teams);

  return teams;
}

export default async function Teams() {
  const teams = await getTeamsData();

  return (
    <section className="relative z-10 flex h-full flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className="text-4xl font-bold">Teams</h1>
      {teams.map((team) => (
        <div key={team.title}>
          <h2>{team.title}</h2>
          <p>{team.content}</p>
          <img src={team.coverImage} alt={team.title} />
        </div>
      ))}
    </section>
  );
}
