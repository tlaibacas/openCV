const siteUrl = "https://your-domain.com";
const siteName = "OpenCV";
const authorName = "Tiago";
const fullstack = "Full-Stack Developer";
const description =
  "Explore my web development portfolio, projects, technical skills, and experience building modern web applications.";
const title = siteName;
const img = "image/png";
const ogImg = "/og-image.png";

type SiteUrl = typeof siteUrl;
type SiteName = typeof siteName;
type AuthorName = typeof authorName;
type Fullstack = typeof fullstack;
type Description = typeof description;
type Title = typeof title;
type Img = typeof img;
type OgImg = typeof ogImg;

type Props = {
  siteUrl: SiteUrl;
  siteName: SiteName;
  authorName: AuthorName;
  fullstack: Fullstack;
  description: Description;
  title: Title;
  img: Img;
  ogImg: OgImg;
};

export const config: Props = {
  siteUrl,
  siteName,
  authorName,
  fullstack,
  description,
  title,
  img,
  ogImg,
};
