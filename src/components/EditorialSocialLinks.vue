<template>
  <div class="social-links">
    <a
      href="https://github.com/karlodelarosa"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
      class="icon-link"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path
          d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"
        />
      </svg>
    </a>
    <a
      href="https://www.linkedin.com/in/karlo-dela-rosa/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      class="icon-link"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path
          d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.48v6.26ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"
        />
      </svg>
    </a>
  </div>
</template>

<style scoped>
.social-links {
  display: flex;
  gap: 14px;
  align-items: center;
}

.icon-link {
  color: #080809;
  display: inline-flex;
  transition: color 0.2s ease;
}

.icon-link:hover {
  color: #64748b;
}
</style>
