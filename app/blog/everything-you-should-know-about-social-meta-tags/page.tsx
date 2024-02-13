import { TypographyH1, TypographyP } from '@/app/ui/components/typography'

export default function BlogPage() {
  return (
    <div className="flex w-full max-w-3xl flex-col items-start justify-start gap-4 p-4 lg:p-12">
      <TypographyH1>
        Everything You Should Know About Social Meta Tags
      </TypographyH1>
      <TypographyP>
        Meta tags are the unsung heroes of digital content, working behind the
        scenes to boost visibility, engagement, and interaction across search
        engines and social platforms. This guide will walk you through each
        essential meta tag, offering insights and tips to optimize your online
        presence.
        <br />
        <strong>title </strong> <br /> The title tag is the headline of your web
        page in search engine results and browser tabs. It&apos; also used in
        social previews when no og:title is specified. It&apos;s crucial for SEO
        and user click-through rates. Keep it under 60 characters to avoid
        truncation and ensure it&apos;s unique and descriptive of your
        page&apos;s content, incorporating relevant keywords.
        <br />
        <strong>description </strong> <br /> This tag offers a brief summary of
        your page&apos;s content, appearing under the title in search results.
        Though not a direct ranking factor, a well-crafted meta description
        (150-160 characters) can improve click-through rates by providing a
        clear, actionable summary of the page.
        <br />
        <strong>og:title </strong> <br /> The Open Graph title tag dictates how
        titles appear on social media, encouraging engagement when content is
        shared. Craft these titles to capture attention on social platforms,
        keeping them concise and relevant.
        <br />
        <strong>OG:Description </strong> <br /> Similar to the meta description
        but for social media, the OG description should entice users with a
        compelling summary of the content, tailored for social sharing.
        <br />
        <strong>OG:Image </strong> <br /> This tag specifies the image used in
        social shares, crucial for capturing attention on platforms like
        Facebook and LinkedIn. Choose an image that is visually appealing and
        representative of the content, adhering to recommended dimensions for
        optimal display.
        <br />
        <strong>OG:Image:Width & OG:Image:Height </strong> <br /> Defining the
        dimensions of your OG image ensures it displays correctly across social
        platforms. The generally recommended size is 1200x630 pixels to ensure
        your content looks its best when shared. Use og:image:width and
        og:image:height Open Graph tags to specify the image dimensions to the
        crawler so that it can render the image immediately without having to
        asynchronously download and process it.
        <br />
        <strong>OG:Image:Type </strong> <br /> The type of image (JPEG, PNG,
        GIF) used in OG tags affects how it&apos;s rendered on social media.
        Select the format that best maintains the quality and load speed of your
        image. MIME type of the image. One of image/jpeg, image/gif or image/png
        <br />
        <strong>OG:URL </strong> <br /> This tag identifies the canonical URL of
        your content, helping to consolidate link equity and ensure consistency
        in how your content is shared and displayed.
        <br />
        <strong>OG:Site_Name </strong> <br /> Indicate the name of your website
        or app with the OG:Site_Name tag to provide context for your shared
        content on social media platforms. Some platforms such as Slack, Discord
        or Telegram use this tag in their previews.
        <br />
        <strong>OG:Type </strong> <br /> Specifying the type of content (e.g.,
        article, video) with the OG:Type tag helps social platforms understand
        and properly display your shared content.
        <br />
        <strong>Twitter:Title </strong> <br /> This tag customizes how your
        content&apos;s title appears in tweets, allowing for a Twitter-specific
        title that can differ from the main title tag to better engage the
        Twitter audience.
        <br />
        <strong>Twitter:Description </strong> <br /> A brief description for
        Twitter shares, this tag should be concise and compelling, tailored to
        catch the attention of users scrolling through their Twitter feed.
        <br />
        <strong>Twitter:Card </strong> <br /> The Twitter:Card tag determines
        the layout of your content on Twitter, whether it&apos;s a summary,
        summary with a large image, app, or player card, influencing how
        engaging your tweet appears.
        <br />
        <strong>Twitter:Image </strong> <br /> & Twitter:Image:Src These tags
        define the image displayed in tweets, with Twitter:Image:Src providing
        an alternative method to specify the image source. Ensure the image is
        engaging and sized appropriately for Twitter.
        <br />
        <strong>Twitter:Image:Width & Twitter:Image:Height </strong> <br />{' '}
        Specifying the width and height of your Twitter image ensures it appears
        as intended, without unexpected cropping or distortion.
        <br />
        <strong>Twitter:Image:Type </strong> <br /> The format of your Twitter
        image (JPEG, PNG, GIF) can impact its display and loading time on the
        platform. Choose the best format for clarity and speed.
        <br />
        <strong>Twitter:Site </strong> <br /> Identify the Twitter handle of
        your website or publisher with this tag, helping to link the shared
        content back to its source and increase your brand&apos;s visibility on
        Twitter.
        <br />
        <strong>Twitter:Creator </strong> <br /> This tag credits the individual
        creator of the content, promoting their Twitter handle alongside the
        shared content and fostering a connection with the audience.
        <br />
        By attentively crafting each of these meta tags, you can significantly
        enhance how your content is presented and perceived on search engines
        and social media, driving more traffic, engagement, and conversions.
        Remember, consistency and relevance across these tags are key to a
        unified and effective online presence.
      </TypographyP>
    </div>
  )
}
