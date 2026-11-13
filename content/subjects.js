/*
  SUBJECTS AND CHAPTERS
  This file holds only the text for the home page books and the subject menus.
  To fix a typo: change the words inside the quotes. Keep the quotes and commas.

  status: "ready" = page is live, "preview" = some stops are live, "soon" = coming soon
  page:   the file that opens when the chapter is tapped (leave out if not built yet)
  part page: the part title links to that page (e.g. Part 1 intro). tab: short name on the page tabs.
  count: false = an extra page (Part 1 intro, second half of a chapter) that is not counted as a chapter
*/
window.SUBJECTS = [
  {
    id: "psychotherapy",
    name: "Psychotherapy and Counseling",
    color: "#8B5E3C", light: "#EDE6DF", dark: "#3E2F2A",
    icon: "chairs",
    /* APA 7th edition. Words between *stars* show in italics. color = the book's citation color. */
    references: [
      { color: "#7A8F7E", apa: "Prochaska, J. O., & Norcross, J. C. (2010). *Systems of psychotherapy: A transtheoretical analysis* (7th ed.). Brooks/Cole, Cengage Learning." },
      { color: "#6E8496", apa: "Capuzzi, D., & Stauffer, M. D. (Eds.). (2022). *Counseling and psychotherapy: Theories and interventions* (7th ed.). American Counseling Association." },
      { color: "#8A7268", apa: "Corey, G. (2024). *Theory and practice of counseling and psychotherapy* (11th ed.). Cengage Learning." },
      { color: "#A07A86", apa: "Gehart, D. R. (2016). *Theory and treatment planning in counseling and psychotherapy* (2nd ed.). Cengage Learning." },
      { color: "#9C8A5A", apa: "Jones-Smith, E. (2021). *Theories of counseling and psychotherapy: An integrative approach* (3rd ed.). SAGE Publications." }
    ],
    parts: [
      { name: "General Topics", sub: "Chapters 1 to 4", color: "#5E4B45", light: "#EDE6DF",
        chapters: [
          { n: 1, title: "Introduction and Overview", tab: "Introduction", status: "ready", note: "Study", page: "chapters/psychotherapy/ch01.html" },
          { n: 2, title: "The Counselor as Person and Professional", tab: "Counselor as Person", status: "ready", note: "Study", page: "chapters/psychotherapy/ch02.html" },
          { n: 3, title: "Ethical Issues in Counseling Practice", tab: "Ethics", status: "ready", note: "Study", page: "chapters/psychotherapy/ch03.html" },
          { n: 4, title: "Case Documentation", tab: "Case Documentation", status: "ready", note: "Study", page: "chapters/psychotherapy/ch04.html" }
        ] },
      { name: "The First Force", sub: "Psychodynamic", color: "#9E3D62", light: "#F6DCE5", page: "chapters/psychotherapy/part1.html", tab: "Part 1 intro",
        chapters: [
          { n: "5A", title: "Psychoanalytic Therapy (Chapter 5, first half)", tab: "Psychoanalytic", status: "ready", note: "Study", page: "chapters/psychotherapy/ch05a.html" },
          { n: "5B", title: "Psychodynamic Therapy (Chapter 5, second half)", tab: "Psychodynamic", count: false, status: "ready", note: "Study", page: "chapters/psychotherapy/ch05b.html" },
          { n: 6, title: "Adlerian Therapy", tab: "Adlerian", status: "ready", note: "Study", page: "chapters/psychotherapy/ch06.html" }
        ] },
      { name: "The Second Force", sub: "Cognitive-behavioral", color: "#5F6328", light: "#E7E9CC",
        chapters: [
          { n: 7, title: "Behavior Therapy" },
          { n: 8, title: "Cognitive Behavior Therapy" },
          { n: 9, title: "Choice Theory/Reality Therapy" }
        ] },
      { name: "The Third Force", sub: "Existential, humanistic", color: "#2F6E8E", light: "#DDEFF7",
        chapters: [
          { n: 10, title: "Existential Therapy" },
          { n: 11, title: "Person-Centered Therapy" },
          { n: 12, title: "Gestalt Therapy" },
          { n: 13, title: "Motivational Interviewing and the Stages of Change" },
          { n: 14, title: "The Expressive Arts and Counseling" }
        ] },
      { name: "The Fourth Force", sub: "Constructivism, postmodern", color: "#6E4A73", light: "#EEDFEE",
        chapters: [
          { n: 15, title: "Multicultural Counseling Theories and Practice" },
          { n: 16, title: "Transcultural and International Approaches to Counseling and Psychotherapy" },
          { n: 17, title: "Feminist Therapy" },
          { n: 18, title: "Integrating Spiritual and Religious Issues During Psychotherapy" },
          { n: 19, title: "Postmodern Approaches" },
          { n: 20, title: "Strengths-Based Therapy" },
          { n: 21, title: "Family Systems Therapy" }
        ] },
      { name: "The Fifth Force", sub: "Neuroscience", color: "#85600F", light: "#F8EBC8",
        chapters: [
          { n: 22, title: "Neuroscience, Interpersonal Neurobiology, and Trauma-Informed Counseling" },
          { n: 23, title: "An Integrative Perspective" }
        ] }
    ]
  },
  {
    id: "assessment",
    name: "Psychological Assessment",
    color: "#2B6A8A", light: "#DCEDF5", dark: "#173E52",
    icon: "clipboard",
    parts: []
  },
  {
    id: "abnormal",
    name: "Abnormal Psychology",
    color: "#4F7A4A", light: "#E1EEDC", dark: "#2B4628",
    icon: "brain",
    parts: []
  },
  {
    id: "personality",
    name: "Theories of Personality",
    color: "#6E4A73", light: "#EEDFEE", dark: "#432C46",
    icon: "iceberg",
    parts: []
  }
];
