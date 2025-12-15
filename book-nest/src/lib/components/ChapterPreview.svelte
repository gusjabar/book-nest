<script lang="ts">
  const chapters = [
    {
      number: 1,
      title: "Navigating Spanish Bureaucracy",
      strapline: "Understanding Visas, Residency, and Legal Essentials",
      excerpt:
        "Moving to Spain involves navigating a labyrinth of bureaucratic processes that can feel overwhelming at first. This chapter",
    },
    {
      number: 2,
      title: "Finding Your New Home",
      strapline: "A Guide to Apartments, Neighborhoods, and Housing Contracts",
      excerpt:
        "When searching for accommodation in Spain, it's essential to understand the local housing market, rental agreements, and neighborhood dynamics.",
    },
    {
      number: 3,
      title: "Learning Spanish Made Easy",
      strapline: "Mastering the Basics and Cultural Nuances",
      excerpt:
        "Language is more than just communication—it’s a key to understanding culture. This chapter will help you grasp the fundamentals of Spanish.",
    },
    {
      number: 4,
      title: "Understanding Spanish Culture",
      strapline: "Beyond Tapas and Flamenco—True Integration",
      excerpt:
        "Spain is a land of rich traditions, family values, and social etiquette. This chapter explores how to embrace these cultural aspects.",
    },
    {
      number: 5,
      title: "Building Your Social Life",
      strapline: "Making Friends, Networking, and Joining Communities",
      excerpt:
        "From local festivals to expat meetups, this chapter will guide you in building a vibrant social life in Spain.",
    },
    {
      number: 6,
      title: "Health and Safety in Spain",
      strapline: "Navigating Healthcare, Emergencies, and Staying Safe",
      excerpt:
        "Understanding the Spanish healthcare system, emergency services, and safety measures is crucial for a smooth transition.",
    },
    {
      number: 7,
      title: "Work-Life Balance in Spain",
      strapline: "Adapting to Spanish Professional Culture",
      excerpt:
        "Spain’s approach to work-life balance is unique. This chapter explores how to navigate professional life while maintaining personal well-being.",
    },
  ];
  let selectedChapterNumber = $state<Number>(1);

  let currentChapterSelect = $derived(
    chapters.find((c) => c.number === selectedChapterNumber)
  );

  function selectChapter(chapter: Number) {
    selectedChapterNumber = chapter;
  }
</script>

<section class="landing-page-section default-margin">
  <h2 class="mb-l">What you're getting</h2>
  <div class="chapter-container">
    <ul>
      {#each chapters as chapter}
        <li>
          <button
            class="chapter-title"
            class:selected-chapter-title={selectedChapterNumber ===
              chapter.number}
            aria-controls={`chapter-info-${chapter.number}`}
            aria-expanded={selectedChapterNumber === chapter.number}
            onclick={() => selectChapter(chapter.number)}
            ><h3>Chapter {chapter.number}: {chapter.title}</h3>
          </button>
        </li>
      {/each}
    </ul>
    <div class="chapter-info">
      <h3 class="chapter-strapline italic mb-s">
        {currentChapterSelect?.title}
      </h3>
      <p class="light-grey">
        {currentChapterSelect?.strapline}
      </p>
    </div>
  </div>
</section>

<style>
  .chapter-container {
    display: flex;
    justify-content: space-between;
    gap: 40px;
  }
  .chapter-container ul {
    width: 40%;
  }

  .chapter-title {
    border-bottom: 1px solid gray;
    width: 100%;
    display: block;
    padding: 12px;
    text-align: left;
  }

  .selected-chapter-title {
    background-color: black;
    border: none;
    color: white;
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.1),
      0 1px 3px rgba(0, 0, 0, 0, 08);
  }

  /* .chapter-title h3 {
    margin: 0;
    color: black;
  } */

  .chapter-info {
    width: 55%;
  }
</style>
