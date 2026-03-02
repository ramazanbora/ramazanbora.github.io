(function () {
  "use strict";

  var RESULT_STORAGE_KEY = "quiz_game_results";
  var SAMPLE_INTRO_MICRO_QUIZ = {
    title: "Introductory Microeconomics Sample Quiz",
    gameId: "MICRO-INTRO-10",
    timeLimitMinutes: 5,
    cohorts: [
      { id: "A", password: "microA2026" },
      { id: "B", password: "microB2026" }
    ],
    questions: [
      {
        id: "m1",
        type: "multiple_choice",
        prompt: "When price rises, quantity demanded usually falls. This is the:",
        options: ["Law of Supply", "Law of Demand", "Income Effect", "Marginal Product"],
        answer: 1
      },
      {
        id: "m2",
        type: "multiple_choice",
        prompt: "A shift of the demand curve to the right means:",
        options: [
          "Demand decreased",
          "Quantity demanded decreased",
          "Demand increased",
          "Supply increased"
        ],
        answer: 2
      },
      {
        id: "m3",
        type: "multiple_choice",
        prompt: "A price ceiling set below equilibrium typically causes:",
        options: ["Surplus", "Shortage", "No change", "Market clearing above equilibrium"],
        answer: 1
      },
      {
        id: "m4",
        type: "multiple_choice",
        prompt: "Price elasticity of demand measures responsiveness of:",
        options: [
          "Quantity demanded to price changes",
          "Price to demand changes",
          "Quantity supplied to wage changes",
          "Revenue to tax changes"
        ],
        answer: 0
      },
      {
        id: "m5",
        type: "true_false",
        prompt: "If demand is inelastic, a price increase tends to raise total revenue.",
        answer: "true"
      },
      {
        id: "m6",
        type: "multiple_choice",
        prompt: "Marginal cost is best defined as:",
        options: [
          "Total cost divided by output",
          "The cost of fixed inputs",
          "Additional cost of producing one more unit",
          "Opportunity cost of labor only"
        ],
        answer: 2
      },
      {
        id: "m7",
        type: "multiple_choice",
        prompt: "In perfect competition, in the long run firms earn:",
        options: ["Positive economic profit", "Zero economic profit", "Negative accounting profit", "Monopoly rent"],
        answer: 1
      },
      {
        id: "m8",
        type: "multiple_choice",
        prompt: "A positive externality leads to:",
        options: [
          "Overproduction in competitive market",
          "Efficient market outcome automatically",
          "Underproduction relative to social optimum",
          "No wedge between private and social benefits"
        ],
        answer: 2
      },
      {
        id: "m9",
        type: "multiple_choice",
        prompt: "Consumer surplus is the area:",
        options: [
          "Below supply and above price",
          "Above demand and below market price",
          "Below demand and above market price",
          "Between demand and supply below equilibrium quantity only"
        ],
        answer: 2
      },
      {
        id: "m10",
        type: "short_text",
        prompt: "Name the market structure with one seller.",
        answer: "monopoly"
      }
    ]
  };

  var state = {
    quiz: null,
    cohorts: {},
    startTime: null,
    remainingSeconds: 0,
    timerHandle: null,
    submitted: false
  };

  var els = {
    fileInput: document.getElementById("quiz-file-input"),
    urlInput: document.getElementById("quiz-url-input"),
    loadUrlBtn: document.getElementById("quiz-load-url-btn"),
    loadSampleBtn: document.getElementById("quiz-load-sample-btn"),
    loadStatus: document.getElementById("quiz-load-status"),
    startSection: document.getElementById("quiz-start-section"),
    runSection: document.getElementById("quiz-run-section"),
    resultSection: document.getElementById("quiz-result-section"),
    quizTitle: document.getElementById("quiz-title"),
    quizMeta: document.getElementById("quiz-meta"),
    studentName: document.getElementById("student-name"),
    gameIdInput: document.getElementById("game-id-input"),
    cohortInput: document.getElementById("cohort-input"),
    passwordInput: document.getElementById("password-input"),
    startBtn: document.getElementById("quiz-start-btn"),
    startStatus: document.getElementById("quiz-start-status"),
    studentBanner: document.getElementById("quiz-student-banner"),
    timer: document.getElementById("quiz-timer"),
    form: document.getElementById("quiz-form"),
    submitBtn: document.getElementById("quiz-submit-btn"),
    submitStatus: document.getElementById("quiz-submit-status"),
    resultPreview: document.getElementById("quiz-result-preview")
  };

  function setStatus(el, msg, isError) {
    el.textContent = msg || "";
    el.classList.remove("error", "success");
    if (msg) {
      el.classList.add(isError ? "error" : "success");
    }
  }

  function pad2(num) {
    return String(num).padStart(2, "0");
  }

  function formatTime(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return pad2(m) + ":" + pad2(s);
  }

  function normalizeCohorts(raw) {
    var map = {};
    if (!raw) {
      return map;
    }

    if (Array.isArray(raw)) {
      raw.forEach(function (item) {
        if (!item || !item.id) return;
        map[String(item.id).trim().toLowerCase()] = {
          id: String(item.id),
          password: String(item.password || "")
        };
      });
      return map;
    }

    Object.keys(raw).forEach(function (k) {
      var val = raw[k];
      if (typeof val === "string") {
        map[k.trim().toLowerCase()] = { id: k, password: val };
      } else if (val && typeof val === "object") {
        map[k.trim().toLowerCase()] = {
          id: val.id || k,
          password: String(val.password || "")
        };
      }
    });
    return map;
  }

  function validateQuizShape(quiz) {
    if (!quiz || typeof quiz !== "object") {
      return "Invalid JSON: expected an object.";
    }
    if (!quiz.gameId) {
      return "Quiz JSON must include gameId.";
    }
    if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
      return "Quiz JSON must include a non-empty questions array.";
    }
    return null;
  }

  function loadQuiz(quiz) {
    var err = validateQuizShape(quiz);
    if (err) {
      setStatus(els.loadStatus, err, true);
      return;
    }

    state.quiz = quiz;
    state.cohorts = normalizeCohorts(quiz.cohorts || {});

    els.quizTitle.textContent = quiz.title || "Untitled Quiz";
    els.quizMeta.textContent =
      "Game ID: " +
      quiz.gameId +
      " | Questions: " +
      quiz.questions.length +
      " | Time Limit: " +
      (quiz.timeLimitMinutes || 5) +
      " minutes";

    els.startSection.classList.remove("hidden");
    els.runSection.classList.add("hidden");
    els.resultSection.classList.add("hidden");
    setStatus(els.loadStatus, "Quiz loaded.", false);
    setStatus(els.startStatus, "", false);
    setStatus(els.submitStatus, "", false);
  }

  function renderQuestions(quiz) {
    els.form.innerHTML = "";

    quiz.questions.forEach(function (q, idx) {
      var qWrap = document.createElement("div");
      qWrap.className = "quiz-question";
      qWrap.dataset.questionId = q.id || ("q" + (idx + 1));

      var title = document.createElement("div");
      title.className = "quiz-question-title";
      title.textContent = (idx + 1) + ". " + (q.prompt || q.question || "Question");
      qWrap.appendChild(title);

      var type = (q.type || "multiple_choice").toLowerCase();
      var inputName = "question_" + idx;

      if (type === "short_text") {
        var input = document.createElement("input");
        input.type = "text";
        input.name = inputName;
        input.className = "quiz-short-answer";
        input.autocomplete = "off";
        qWrap.appendChild(input);
      } else if (type === "true_false") {
        var tfList = document.createElement("ul");
        tfList.className = "quiz-options";
        ["true", "false"].forEach(function (value) {
          var li = document.createElement("li");
          li.innerHTML =
            '<label><input type="radio" name="' +
            inputName +
            '" value="' +
            value +
            '"> ' +
            value +
            "</label>";
          tfList.appendChild(li);
        });
        qWrap.appendChild(tfList);
      } else {
        var options = q.options || [];
        var list = document.createElement("ul");
        list.className = "quiz-options";

        options.forEach(function (opt, optIdx) {
          var li = document.createElement("li");
          li.innerHTML =
            '<label><input type="radio" name="' +
            inputName +
            '" value="' +
            String(optIdx) +
            '"> ' +
            String(opt) +
            "</label>";
          list.appendChild(li);
        });
        qWrap.appendChild(list);
      }

      els.form.appendChild(qWrap);
    });
  }

  function getAnswerForQuestion(q, idx) {
    var inputName = "question_" + idx;
    var type = (q.type || "multiple_choice").toLowerCase();

    if (type === "short_text") {
      var input = els.form.querySelector('input[name="' + inputName + '"]');
      return input ? input.value.trim() : "";
    }

    var checked = els.form.querySelector('input[name="' + inputName + '"]:checked');
    if (!checked) return null;

    if (type === "multiple_choice") {
      var selectedIndex = Number(checked.value);
      var selectedOption = Array.isArray(q.options) ? q.options[selectedIndex] : null;
      return {
        selectedIndex: selectedIndex,
        selectedOption: selectedOption
      };
    }

    return checked.value;
  }

  function evaluateAnswer(q, rawAnswer) {
    if (typeof q.answer === "undefined" && typeof q.correctAnswer === "undefined") {
      return null;
    }
    var expected = typeof q.answer !== "undefined" ? q.answer : q.correctAnswer;
    var type = (q.type || "multiple_choice").toLowerCase();

    if (rawAnswer === null || rawAnswer === "") {
      return false;
    }

    if (type === "short_text") {
      return String(rawAnswer).toLowerCase().trim() === String(expected).toLowerCase().trim();
    }
    if (type === "multiple_choice") {
      if (typeof expected === "number") {
        return rawAnswer.selectedIndex === expected;
      }
      return String(rawAnswer.selectedOption) === String(expected);
    }
    return String(rawAnswer).toLowerCase() === String(expected).toLowerCase();
  }

  function buildResult(timedOut) {
    var now = new Date();
    var quiz = state.quiz;
    var answers = [];
    var scored = 0;
    var gradable = 0;

    quiz.questions.forEach(function (q, idx) {
      var raw = getAnswerForQuestion(q, idx);
      var correctness = evaluateAnswer(q, raw);
      if (correctness !== null) {
        gradable += 1;
        if (correctness) scored += 1;
      }

      answers.push({
        questionId: q.id || ("q" + (idx + 1)),
        prompt: q.prompt || q.question || "",
        type: q.type || "multiple_choice",
        answer: raw,
        isCorrect: correctness
      });
    });

    var result = {
      quizTitle: quiz.title || "",
      gameId: quiz.gameId,
      cohort: els.cohortInput.value.trim(),
      studentName: els.studentName.value.trim(),
      startedAt: state.startTime.toISOString(),
      endedAt: now.toISOString(),
      durationSeconds: Math.round((now.getTime() - state.startTime.getTime()) / 1000),
      timedOut: timedOut,
      answeredQuestions: answers.filter(function (a) {
        if (a.type === "short_text") return Boolean(a.answer);
        return a.answer !== null;
      }).length,
      totalQuestions: quiz.questions.length,
      score: gradable > 0 ? scored : null,
      maxScore: gradable > 0 ? gradable : null,
      answers: answers
    };

    return result;
  }

  function persistLocally(result) {
    try {
      var prev = JSON.parse(localStorage.getItem(RESULT_STORAGE_KEY) || "[]");
      prev.push(result);
      localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(prev));
    } catch (e) {
      // no-op fallback if localStorage is blocked
    }
  }

  function downloadResult(result) {
    var stamp = result.endedAt.replace(/[:.]/g, "-");
    var safeStudent = (result.studentName || "student").replace(/[^a-z0-9_-]/gi, "_");
    var fileName = "quiz_result_" + result.gameId + "_" + safeStudent + "_" + stamp + ".json";
    var blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function submitToEndpointIfConfigured(result) {
    var endpoint = state.quiz && state.quiz.submitEndpoint;
    if (!endpoint) return;

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result)
    }).catch(function () {
      // no-op; local save/download already completed
    });
  }

  function finalizeQuiz(timedOut) {
    if (state.submitted) return;
    state.submitted = true;

    clearInterval(state.timerHandle);
    state.timerHandle = null;

    var result = buildResult(timedOut);
    persistLocally(result);
    downloadResult(result);
    submitToEndpointIfConfigured(result);

    els.submitBtn.disabled = true;
    var msg = timedOut
      ? "Time is up. Result saved and downloaded."
      : "Submitted. Result saved and downloaded.";
    setStatus(els.submitStatus, msg, false);

    els.resultSection.classList.remove("hidden");
    els.resultPreview.textContent = JSON.stringify(result, null, 2);
  }

  function startTimer() {
    els.timer.textContent = formatTime(state.remainingSeconds);

    state.timerHandle = setInterval(function () {
      state.remainingSeconds -= 1;
      els.timer.textContent = formatTime(Math.max(state.remainingSeconds, 0));
      if (state.remainingSeconds <= 0) {
        finalizeQuiz(true);
      }
    }, 1000);
  }

  function onStartQuiz() {
    if (!state.quiz) {
      setStatus(els.startStatus, "Load a quiz JSON first.", true);
      return;
    }

    var student = els.studentName.value.trim();
    var gameId = els.gameIdInput.value.trim();
    var cohort = els.cohortInput.value.trim();
    var password = els.passwordInput.value;

    if (!student || !gameId || !cohort || !password) {
      setStatus(els.startStatus, "Please fill all fields.", true);
      return;
    }
    if (gameId !== String(state.quiz.gameId)) {
      setStatus(els.startStatus, "Invalid Game ID.", true);
      return;
    }

    var cohortKey = cohort.toLowerCase();
    var cohortConfig = state.cohorts[cohortKey];
    if (!cohortConfig) {
      setStatus(els.startStatus, "Invalid cohort.", true);
      return;
    }
    if (String(password) !== String(cohortConfig.password)) {
      setStatus(els.startStatus, "Invalid password.", true);
      return;
    }

    state.startTime = new Date();
    state.submitted = false;
    state.remainingSeconds = Math.max(1, Number(state.quiz.timeLimitMinutes || 5) * 60);

    renderQuestions(state.quiz);

    els.studentBanner.textContent =
      student + " | Cohort: " + cohortConfig.id + " | Game: " + state.quiz.gameId;
    els.runSection.classList.remove("hidden");
    els.resultSection.classList.add("hidden");
    els.submitBtn.disabled = false;
    setStatus(els.startStatus, "Quiz started.", false);
    setStatus(els.submitStatus, "", false);

    if (state.timerHandle) {
      clearInterval(state.timerHandle);
    }
    startTimer();
  }

  function parseAndLoadQuizText(text) {
    try {
      var parsed = JSON.parse(text);
      loadQuiz(parsed);
    } catch (e) {
      setStatus(els.loadStatus, "Could not parse JSON file.", true);
    }
  }

  els.fileInput.addEventListener("change", function (evt) {
    var file = evt.target.files && evt.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function () {
      parseAndLoadQuizText(String(reader.result || ""));
    };
    reader.onerror = function () {
      setStatus(els.loadStatus, "Could not read file.", true);
    };
    reader.readAsText(file);
  });

  els.loadUrlBtn.addEventListener("click", function () {
    var url = els.urlInput.value.trim();
    if (!url) {
      setStatus(els.loadStatus, "Enter a JSON URL.", true);
      return;
    }
    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("Fetch failed");
        return res.text();
      })
      .then(parseAndLoadQuizText)
      .catch(function () {
        setStatus(
          els.loadStatus,
          "Could not load JSON from URL. Check the path/CORS and try again.",
          true
        );
      });
  });

  els.startBtn.addEventListener("click", onStartQuiz);
  els.submitBtn.addEventListener("click", function () {
    finalizeQuiz(false);
  });
  els.loadSampleBtn.addEventListener("click", function () {
    var sampleQuiz = JSON.parse(JSON.stringify(SAMPLE_INTRO_MICRO_QUIZ));
    loadQuiz(sampleQuiz);
    els.gameIdInput.value = sampleQuiz.gameId;
    els.cohortInput.value = "A";
    els.passwordInput.value = "microA2026";
    setStatus(
      els.loadStatus,
      "Sample Intro Micro quiz loaded. Enter student name and start.",
      false
    );
  });
})();
