---
layout: archive
title: "Quiz Game"
permalink: /quiz-game/
author_profile: false
---

<link rel="stylesheet" href="{{ '/assets/css/quiz-game.css' | relative_url }}">

<div class="quiz-game-wrap">
  <h2>Quiz Setup</h2>
  <p>Load a quiz JSON file, then start the timed game for a student.</p>

  <div class="quiz-panel">
    <label for="quiz-file-input">Load JSON from file</label>
    <input id="quiz-file-input" type="file" accept=".json,application/json">

    <div class="quiz-or">or</div>

    <label for="quiz-url-input">Load JSON from URL</label>
    <div class="quiz-inline">
      <input id="quiz-url-input" type="text" placeholder="https://example.com/quiz.json or /files/quiz-template.json">
      <button id="quiz-load-url-btn" type="button">Load URL</button>
    </div>

    <div class="quiz-sample-row">
      <button id="quiz-load-sample-btn" type="button">Load Sample Quiz (Intro Micro, 10 Questions)</button>
      <span>Demo login: Game ID <code>MICRO-INTRO-10</code>, Cohort <code>A</code>, Password <code>microA2026</code></span>
    </div>

    <div id="quiz-load-status" class="quiz-status"></div>
  </div>

  <div id="quiz-start-section" class="quiz-panel hidden">
    <h3 id="quiz-title"></h3>
    <p id="quiz-meta"></p>

    <div class="quiz-grid">
      <div>
        <label for="student-name">Student Name</label>
        <input id="student-name" type="text" autocomplete="name">
      </div>
      <div>
        <label for="game-id-input">Game ID</label>
        <input id="game-id-input" type="text" autocomplete="off">
      </div>
      <div>
        <label for="cohort-input">Cohort</label>
        <input id="cohort-input" type="text" autocomplete="off" placeholder="e.g. A">
      </div>
      <div>
        <label for="password-input">Password</label>
        <input id="password-input" type="password" autocomplete="off">
      </div>
    </div>

    <button id="quiz-start-btn" type="button">Start Quiz</button>
    <div id="quiz-start-status" class="quiz-status"></div>
  </div>

  <div id="quiz-run-section" class="quiz-panel hidden">
    <div class="quiz-run-header">
      <strong id="quiz-student-banner"></strong>
      <div id="quiz-timer">05:00</div>
    </div>

    <form id="quiz-form"></form>
    <button id="quiz-submit-btn" type="button" class="submit-btn">Submit Answers</button>
    <div id="quiz-submit-status" class="quiz-status"></div>
  </div>

  <div id="quiz-result-section" class="quiz-panel hidden">
    <h3>Result Saved</h3>
    <pre id="quiz-result-preview"></pre>
  </div>

  <div class="quiz-help">
    <h3>JSON Format</h3>
    <p>Use <code>/files/quiz-template.json</code> as a starting point.</p>
  </div>
</div>

<script src="{{ '/assets/js/quiz-game.js' | relative_url }}"></script>
