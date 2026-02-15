export type SocialLink = {
  label: string;
  icon: string;
  to: string;
};

export function useSocialLinks() {
  const runtimeConfig = useRuntimeConfig();
  const socialConfig = runtimeConfig.public.social;

  const socialLinks = computed(() => {
    const links: Record<string, SocialLink> = {};
    if (socialConfig.bluesky) {
      links.bluesky = {
        label: 'Bluesky',
        icon: 'mingcute:bluesky-social-line',
        to: `https://bsky.app/profile/${socialConfig.bluesky}`,
      };
    }
    if (socialConfig.github) {
      links.github = {
        label: 'GitHub',
        icon: 'mingcute:github-line',
        to: `https://github.com/${socialConfig.github}`,
      };
    }
    if (socialConfig.linkedin) {
      links.linkedin = {
        label: 'LinkedIn',
        icon: 'mingcute:linkedin-line',
        to: `https://www.linkedin.com/in/${socialConfig.linkedin}`,
      };
    }

    return links;
  });

  return { socialLinks };
}
