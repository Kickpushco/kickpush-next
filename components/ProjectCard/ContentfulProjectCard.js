import ProjectCard from "./ProjectCard";

const projectCardTextColorMap = {
  Light: "light",
  Dark: "dark",
};

function ContentfulProjectCard({ project, ...props }) {
  const { slug, clientName, year, cardTitle, cardColor, cardTextColor } =
    project.fields;

  const textColor = projectCardTextColorMap[cardTextColor];

  return (
    <ProjectCard
      slug={slug}
      byline={clientName}
      year={year}
      title={cardTitle}
      backgroundColor={cardColor}
      textColor={textColor}
      {...props}
    />
  );
}

export default ContentfulProjectCard;
