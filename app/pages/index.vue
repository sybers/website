<script setup lang="ts">
useSeoMeta({
  title: 'Hey 👋',
  description: 'Software engineer at Indy, passionate about building smooth, user-friendly software experiences.',
  ogTitle: 'Stanyslas Bres',
  ogDescription: 'Software engineer at Indy, passionate about building smooth, user-friendly software experiences.',
  ogType: 'website',
});

defineOgImageComponent('Default', {
  title: 'Stanyslas Bres',
  description: 'Software engineer, building smooth user-friendly experiences.',
}, {
  fonts: ['Space Mono:400', 'Space Mono:700'],
});
</script>

<template>
  <div>
    <h1>Hello, I'm sybers 👋</h1>
    <p>
      Also known as <strong>Stanyslas Bres</strong> outside of the internet, I'm a <strong>software engineer</strong> currently crafting solutions at <a
        href="https://www.indy.fr/"
        target="_blank"
      >Indy</a>, where we build an all-in-one accounting platform for freelancers and small businesses.
    </p>
    <p>
      I love building smooth, user-friendly software experiences, and I've been lucky enough to work on some cool projects along the way, from <a
        href="https://mailbutler.io/"
        target="_blank"
      >Mailbutler.io</a> to <a
        href="https://www.lahautesociete.com/"
        target="_blank"
      >La Haute Société</a>, and even research at the <a
        href="https://www.liglab.fr/fr"
        target="_blank"
      >Grenoble Computer Science Laboratory</a>.
    </p>
    <p>
      On the side, I <strong>freelance</strong> for startups and small businesses. I designed and built the website for <a
        href="https://elyosis.art"
        target="_blank"
      >Elyosis</a>, showcasing their video production work, and for <a
        href="https://www.casa-belle.fr"
        target="_blank"
      >Casa Belle</a>, highlighting their charming B&B offerings.
    </p>
    <p>
      I also like giving back. I contribute to open-source projects like <a
        href="https://npmx.dev"
        target="_blank"
      >npmx.dev</a> and I've taught Node.js to students at <a
        href="https://www.mydigitalschool.com"
        target="_blank"
      >MyDigitalSchool</a> in Grenoble.
    </p>
    <p>
      Originally from the French Alps 🇫🇷, I also happen to hold a <strong>Master's in Computer Science</strong> from <a
        href="https://www.univ-grenoble-alpes.fr/"
        target="_blank"
      >Université Grenoble Alpes</a>.
    </p>
    <p>
      When I'm not coding, you'll find me listening to drum and bass, taking photos, or discovering new places 🌏.
    </p>
    <p>
      Feel free to check out my <a href="https://github.com/sybers">GitHub</a> to explore my other projects.
      <br>
      You can also <a
        href="https://drive.google.com/open?id=1dAbCJAqo7Qr53haytpReTdabFBmhxDze"
        target="_blank"
      >grab my resume</a>, <a
        href="https://www.linkedin.com/in/stanyslasbres/"
        target="_blank"
      >connect with me on LinkedIn</a> or <a
        href="https://bsky.app/profile/sybers.fr"
        target="_blank"
      >on Bluesky</a>.
    </p>
  </div>
</template>
