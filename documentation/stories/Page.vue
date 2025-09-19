<script lang="ts" setup>
import { ref } from "vue";

import MyHeader from "./Header.vue";

const user = ref<{ name: string } | null>(null);

const onLogin = () => {
  user.value = { name: "Jane Doe" };
};

const onLogout = () => {
  user.value = null;
};

const onCreateAccount = () => {
  user.value = { name: "Jane Doe" };
};
</script>

<template>
  <article>
    <my-header
      :user="user"
      @login="onLogin"
      @logout="onLogout"
      @create-account="onCreateAccount"
    />

    <section class="storybook-page">
      <h2>Pages in Storybook</h2>
      <p>
        We recommend building UIs with a
        <a
          href="https://componentdriven.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>component-driven</strong>
        </a>
        process starting with atomic components and ending with pages.
      </p>
      <p>
        Render pages with mock data. This makes it easy to build and review page
        states without needing to navigate to them in your app. Here are some
        handy patterns for managing page data in Storybook:
      </p>
      <ul>
        <li>
          Use a higher-level connected component. Storybook helps you compose
          such data from the "args" of child component stories
        </li>
        <li>
          Assemble data in the page component from your services. You can mock
          these services out using Storybook.
        </li>
      </ul>
      <p>
        Get a guided tutorial on component-driven development at
        <a
          href="https://storybook.js.org/tutorials/"
          target="_blank"
          rel="noopener noreferrer"
          >Storybook tutorials</a
        >
        . Read more in the
        <a
          href="https://storybook.js.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          >docs</a
        >
        .
      </p>
      <div class="tip-wrapper">
        <span class="tip">Tip</span>
        Adjust the width of the canvas with the
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fill-rule="evenodd">
            <path
              id="a"
              d="M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z"
              fill="#999"
            />
          </g>
        </svg>
        Viewports addon in the toolbar
      </div>
    </section>
  </article>
</template>

<style scoped>
.storybook-page {
  max-width: 600px;
  padding: var(--kds-spacing-page-padding-3x)
    var(--kds-spacing-page-padding-1-25x);
  margin: 0 auto;
  font-family:
    var(--kds-core-font-family-roboto), "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  font-size: var(--kds-core-font-size-scaled-0-87x);
  line-height: var(--kds-core-line-height-multiline-wide);
  color: var(--kds-color-text-and-icon-neutral);
}

.storybook-page h2 {
  display: inline-block;
  margin: 0 0 var(--kds-spacing-container-0-25x);
  font-size: var(--kds-core-font-size-scaled-2x);
  font-weight: var(--kds-core-font-weight-strong);
  line-height: var(--kds-core-line-height-singleline);
  vertical-align: top;
}

.storybook-page p {
  margin: var(--kds-core-paragraph-spacing-large) 0;
}

.storybook-page a {
  color: inherit;
}

.storybook-page ul {
  padding-left: 30px;
  margin: var(--kds-core-paragraph-spacing-large) 0;
}

.storybook-page li {
  margin-bottom: var(--kds-spacing-container-0-5x);
}

.storybook-page .tip {
  display: inline-block;
  padding: var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-75x);
  margin-right: var(--kds-spacing-container-0-75x);
  font-size: var(--kds-core-font-size-scaled-0-68x);
  font-weight: var(--kds-core-font-weight-strong);
  line-height: var(--kds-core-line-height-singleline);
  vertical-align: top;
  color: var(--kds-color-background-success-bold-initial);
  background: var(--kds-color-background-success-initial);
  border-radius: var(--kds-border-radius-container-pill);
}

.storybook-page .tip-wrapper {
  margin-top: var(--kds-spacing-page-padding-3x);
  margin-bottom: var(--kds-spacing-page-padding-3x);
  font-size: var(--kds-core-font-size-scaled-0-81x);
  line-height: var(--kds-core-line-height-multiline-narrow);
}

.storybook-page .tip-wrapper svg {
  display: inline-block;
  width: var(--kds-dimension-icon-0-75x);
  height: var(--kds-dimension-icon-0-75x);
  margin-top: 3px;
  margin-right: var(--kds-spacing-container-0-25x);
  vertical-align: top;
}

.storybook-page .tip-wrapper svg path {
  fill: var(--kds-color-background-primary-bold-initial);
}
</style>
