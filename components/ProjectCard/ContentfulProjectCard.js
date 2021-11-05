import ProjectCard from "./ProjectCard";

const projectCardTextColorMap = {
  Light: "light",
  Dark: "dark",
};

function ContentfulProjectCard({ project, ...props }) {
  const {
    slug,
    clientName,
    year,
    cardTitle,
    cardColor,
    cardTextColor,
    cardImage,
  } = project.fields;

  const textColor = projectCardTextColorMap[cardTextColor];
  const cardImageUrl = cardImage ? `https:${cardImage.fields.file.url}` : null;

  return (
    <ProjectCard
      slug={slug}
      byline={clientName}
      year={year}
      title={cardTitle}
      backgroundColor={cardColor}
      backgroundImage={cardImageUrl}
      textColor={textColor}
      {...props}
    />
  );
}

export default ContentfulProjectCard;
